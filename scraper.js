const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./database.js');

const emagUrl = 'https://www.emag.hu/mobiltelefonok/brand/xiaomi/c?ref=lst_leftbar_6417_7933';
const euronicsUrl = 'https://euronics.hu/telefon-tablet-okosora/telefonok/okostelefonok-c1594319?filter%5BstockSource%5D%5Bstandard%5D=&filter%5Bsearch%5D=&filter%5Bspecification%5D%5Bmanufacturer%5D%5B%5D=1595125&filter%5Border%5D=publication_date&filter%5Bflags_only_buyable%5D=1&filter%5Blimit%5D=36';
const gigatronUrl = 'https://gigatron.rs/mobilni-telefoni-i-oprema/mobilni-telefoni?brand=!attr_brandXiaomi&poredak=opadajuci&cena=od-13258-do-61938&Boja=!attr_valSiva+!attr_valPlava+!attr_valCrna&Interna%20memorija=!attr_val256%20GB+!attr_val64%20GB';
const tehnomanijaUrl = 'https://www.tehnomanija.rs/c/telefoni/mobilni-telefoni/smart-telefoni-10040201?query=:popularity-desc:allCategories:10040201:inStockFlag:true:brand:1310&sortCode=price-asc&currentPage=0';

const PRODUCT_PROVIDER = "Szolgáltató:";
const PRODUCT_NAME = "Termék neve:";
const PRODUCT_ID = "Termék azonosítója:";
const PRODUCT_CURRENT_PRICE_IN_RSD = "Termék jelenlegi ára RSD-ben";
const PRODUCT_CURRENT_PRICE_IN_HUF = "Termék jelenlegi ára Ft-ben";
const PRODUCT_CURRENT_PRICE_IN_EUR = "Termék jelenlegi ára EUR-ban:";
const PRODUCT_OLD_PRICE = "Termék régi ára:";
const PRODUCT_IS_NOT_DISCOUNTED = "A termék nincs leárazva";
const PRODUCT_DISCOUNT_INFORMATION = "Termék leárazásának információja:";
const PRODUCT_LINK = "Termék linkje:";
const PRODUCT_IMAGE = "Termék képe:";
const FIRST_PRODUCT_INCLUDES = "Redmi 12C";
const FIRST_PRODUCT_INCLUDES_CAPACITY = "64";
const SECOND_PRODUCT_INCLUDES = "Redmi 9C";
const SECOND_PRODUCT_INCLUDES_CAPACITY = "64";

const axiosConfig = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    },
};

const scrape = async () => {
    try {
        const emagResponse = await axios.get(emagUrl, axiosConfig);
        const gigatronResponse = await axios.get(gigatronUrl, axiosConfig);
        const tehnomanijaResponse = await axios.get(tehnomanijaUrl, axiosConfig);
        const euronicsResponse = await axios.get(euronicsUrl, axiosConfig);
        
        const emagSmartPhones = emagPhones(emagResponse);
        const gigatronSmartPhones = gigatronPhones(gigatronResponse);
        const tehnomanijaSmartPhones = tehnomanijaPhones(tehnomanijaResponse);
        const euronicsSmartPhones = euronicsPhones(euronicsResponse);
    
        insertIntoDatabase(emagSmartPhones);
        insertIntoDatabase(gigatronSmartPhones);
        insertIntoDatabase(tehnomanijaSmartPhones);
        insertIntoDatabase(euronicsSmartPhones);
        
    } catch (error) {
        console.error('Error while trying to fetch the website:', error);
    }
}


const emagPhones = (emagResponse) => {
    const emagHtml = emagResponse.data;
    const $ = cheerio.load(emagHtml);

    const smartphoneContainer = $('.page-container #card_grid .card-v2 .card-v2-wrapper');

    const smartPhones = [];

    smartphoneContainer.each((index, element) => {
        const provider = "Emag";
        const productName = $(element).find('.card-v2-info .card-v2-title').text().trim();

        const productPriceInHuf = $(element).find('.card-v2-content .card-v2-pricing .product-new-price').text().trim();
        const numericPrice = parseFloat(productPriceInHuf.replace(/\./g, '').replace(' Ft', ''));
        const productFullPrice = convertHUFToEUR(numericPrice);
        const productPriceInEUR = productFullPrice.toFixed(2);

        const productLink = $(element).find('.card-v2-info a').attr('href');
        const productImage = $(element).find('.card-v2-info .card-v2-thumb .card-v2-thumb-inner img').attr('src');

        let productOldPrice = $(element).find('.card-v2-content .card-v2-pricing .pricing .rrp-lp30d-content').text().trim();
        let percentDiscount = $(element).find('.card-v2-badges .badge-discount').text().trim();
        productOldPrice = productOldPrice === "" ? PRODUCT_IS_NOT_DISCOUNTED : productOldPrice;
        percentDiscount = percentDiscount === "" ? PRODUCT_IS_NOT_DISCOUNTED : percentDiscount;

        const productId = $(element).find('.card-v2-toolbox button').attr('data-productid');
  
        if (productName.includes(FIRST_PRODUCT_INCLUDES) && productName.includes(FIRST_PRODUCT_INCLUDES_CAPACITY) || productName.includes(SECOND_PRODUCT_INCLUDES) && productName.includes(FIRST_PRODUCT_INCLUDES_CAPACITY)) {
            console.log(`${PRODUCT_PROVIDER} ${provider}`);
            console.log(`${PRODUCT_ID} ${productId}`);
            console.log(`${PRODUCT_NAME} ${productName}`);
            console.log(`${PRODUCT_CURRENT_PRICE_IN_HUF} ${productPriceInHuf}`);
            console.log(`${PRODUCT_CURRENT_PRICE_IN_EUR} ${productPriceInEUR}`);
            console.log(`${PRODUCT_OLD_PRICE} ${productOldPrice}`);
            console.log(`${PRODUCT_DISCOUNT_INFORMATION} ${percentDiscount}`);
            console.log(`${PRODUCT_LINK} ${productLink}`);
            console.log(`${PRODUCT_IMAGE} ${productImage}`);
            console.log('------------------------');
            smartPhones.push({
                provider: provider, 
                productId: productId, 
                productName: productName,
                productPriceInOwnCurrency: productPriceInHuf, 
                productPriceInEUR: productPriceInEUR, 
                productOldPrice: productOldPrice, 
                percentDiscount: percentDiscount, 
                productLink: productLink, 
                productImage: productImage
            })
        }
    });
    return smartPhones;
}

const gigatronPhones = (gigatronResponse) => {
    const gigatronHtml = gigatronResponse.data;
    const $ = cheerio.load(gigatronHtml);

    const smartPhoneContainer = $('.filterpage__main .filterpage__main__content #product-grid .item');

    const smartPhones = [];

    smartPhoneContainer.each((index, element) => {
        const provider = "Gigatron";

        const productName = $(element).find('.item__name').text().trim();

        const productPriceInRSD = $(element).find('.item__bottom .item__bottom__prices .item__bottom__prices__price').text().trim();
        const numericPrice = parseFloat(productPriceInRSD.replace(/\./g, '').replace(' RSD', ''));
        const productFullPrice = convertRSDToEUR(numericPrice);
        const productPriceInEUR = productFullPrice.toFixed(2);

        let productOldPrice = $(element).find('.item__bottom .item__bottom__prices .item__bottom__prices__old').text().trim();
        const percentDiscountFull = $(element).find('.item__bottom .item__bottom__prices .item__bottom__prices__saving').text().trim();
        const colonIndex = percentDiscountFull.indexOf(":") + 1;
        let percentDiscount = percentDiscountFull.substring(colonIndex).trim();
        productOldPrice = productOldPrice === "" ? PRODUCT_IS_NOT_DISCOUNTED : productOldPrice;
        percentDiscount = percentDiscount === "" ? PRODUCT_IS_NOT_DISCOUNTED : percentDiscount;

        const productImage = $(element).find('.item__image img').attr('src');
        const productLink = "https://www.gigatron.rs"+$(element).find('a').attr('href');
        const productId = $(element).attr('id');
  
        if (productName.includes(FIRST_PRODUCT_INCLUDES) && productName.includes(FIRST_PRODUCT_INCLUDES_CAPACITY) || productName.includes(SECOND_PRODUCT_INCLUDES) && productName.includes(SECOND_PRODUCT_INCLUDES_CAPACITY)) {
            console.log(`${PRODUCT_PROVIDER} ${provider}`);
            console.log(`${PRODUCT_ID} ${productId}`);
            console.log(`${PRODUCT_NAME} ${productName}`);
            console.log(`${PRODUCT_CURRENT_PRICE_IN_RSD} ${productPriceInRSD}`);
            console.log(`${PRODUCT_CURRENT_PRICE_IN_EUR} ${productPriceInEUR}`);
            console.log(`${PRODUCT_OLD_PRICE} ${productOldPrice}`);
            console.log(`${PRODUCT_DISCOUNT_INFORMATION} ${percentDiscount}`);
            console.log(`${PRODUCT_LINK} ${productLink}`);
            console.log(`${PRODUCT_IMAGE} ${productImage}`);
            console.log('------------------------');
            smartPhones.push({
                provider: provider, 
                productId: productId, 
                productName: productName,
                productPriceInOwnCurrency: productPriceInRSD,  
                productPriceInEUR: productPriceInEUR, 
                productOldPrice: productOldPrice, 
                percentDiscount: percentDiscount, 
                productLink: productLink, 
                productImage: productImage
            })
        }
    });

    return smartPhones;
}

const tehnomanijaPhones = (tehnomanijaResponse) => {
    const tehnomanijaHtml = tehnomanijaResponse.data;
    const $ = cheerio.load(tehnomanijaHtml);

    const tehnomanijaSmartphoneContainer = $('.product-list .product');

    const smartPhones = [];

    tehnomanijaSmartphoneContainer.each((index, element) => {
        const provider = "Tehnomanija";

        const productName = $(element).find('.product-carousel a').text().trim();
        const productLink = "https://www.tehnomanija.rs"+$(element).find('.product-carousel a').attr('href');
        const productImage = $(element).find('.product-carousel .product-carousel--image img').attr('src');

        const productPriceInRSD = $(element).find('.product-carousel--info .product-carousel--price .product-carousel--info-newprice').text().trim();
        const numericPrice = parseFloat(productPriceInRSD.replace(/\./g, '').replace(' RSD', ''));
        const productFullPrice = convertRSDToEUR(numericPrice);
        const productPriceInEUR = productFullPrice.toFixed(2);
        
        let productOldPrice = $(element).find('.product-carousel--info .product-carousel--price .product-carousel--info-oldprice').text().trim();
        let percentDiscount = $(element).find('.product-carousel .product-carousel--discount').text().trim();
        productOldPrice = productOldPrice === "" ? PRODUCT_IS_NOT_DISCOUNTED : productOldPrice;
        percentDiscount = percentDiscount === "" ? PRODUCT_IS_NOT_DISCOUNTED : percentDiscount;

        const productId = productLink.split('-').pop();

        if (productName.includes(FIRST_PRODUCT_INCLUDES) && productName.includes(FIRST_PRODUCT_INCLUDES_CAPACITY) || productName.includes(SECOND_PRODUCT_INCLUDES) && productName.includes(SECOND_PRODUCT_INCLUDES_CAPACITY)) {
            console.log(`${PRODUCT_PROVIDER} ${provider}`);
            console.log(`${PRODUCT_ID} ${productId}`);
            console.log(`${PRODUCT_NAME} ${productName}`);
            console.log(`${PRODUCT_CURRENT_PRICE_IN_RSD} ${productPriceInRSD}`);
            console.log(`${PRODUCT_CURRENT_PRICE_IN_EUR} ${productPriceInEUR}`);
            console.log(`${PRODUCT_OLD_PRICE} ${productOldPrice}`);
            console.log(`${PRODUCT_DISCOUNT_INFORMATION} ${percentDiscount}`);
            console.log(`${PRODUCT_LINK} ${productLink}`);
            console.log(`${PRODUCT_IMAGE} ${productImage}`);
            console.log('------------------------');
            smartPhones.push({
                provider: provider, 
                productId: productId, 
                productName: productName, 
                productPriceInOwnCurrency: productPriceInRSD, 
                productPriceInEUR: productPriceInEUR, 
                productOldPrice: productOldPrice, 
                percentDiscount: percentDiscount, 
                productLink: productLink, 
                productImage: productImage
            })
        }
    });

    return smartPhones;
}

const euronicsPhones = (euronicsResponse) => {
    const euronicsHtml = euronicsResponse.data;
    const $ = cheerio.load(euronicsHtml);

    const euronicsSmartphoneContainer = $('.product-card-list .product-card-list__item');

    const smartPhones = [];

    euronicsSmartphoneContainer.each((index, element) => {
        const provider = "Euronics";

        const productId = $(element).find('.product-card').attr('data-product-id');
        const productName = $(element).find('.product-card__name .product-card__name-link-text').text().trim();

        const productPriceInHuf = $(element).find('.product-card__price .price span').first().text().trim();
        const numericPrice = parseInt(productPriceInHuf.replace(/\s/g, ''), 10);
        const productFullPrice = convertHUFToEUR(numericPrice);
        const productPriceInEUR = productFullPrice.toFixed(2);

        let productOldPrice = $(element).find('.product-card__price .price-original').text().trim();
        let percentDiscount = $(element).find('.product-card__image-wrapper .product-card__image-badge').text().trim();
        productOldPrice = productOldPrice === "" ? PRODUCT_IS_NOT_DISCOUNTED : productOldPrice;
        percentDiscount = percentDiscount === "" ? PRODUCT_IS_NOT_DISCOUNTED : percentDiscount;

        const productLink = $(element).find('.product-card__image-wrapper a').attr('href');
        const productImage = $(element).find('.product-card__image-wrapper .product-image img').attr('src');

        if (productName.includes(FIRST_PRODUCT_INCLUDES) && productName.includes(FIRST_PRODUCT_INCLUDES_CAPACITY) || productName.includes(SECOND_PRODUCT_INCLUDES) && productName.includes(FIRST_PRODUCT_INCLUDES_CAPACITY)) {
            console.log(`${PRODUCT_PROVIDER} ${provider}`);
            console.log(`${PRODUCT_ID} ${productId}`);
            console.log(`${PRODUCT_NAME} ${productName}`);
            console.log(`${PRODUCT_CURRENT_PRICE_IN_HUF} ${productPriceInHuf}`);
            console.log(`${PRODUCT_CURRENT_PRICE_IN_EUR} ${productPriceInEUR}`);
            console.log(`${PRODUCT_OLD_PRICE} ${productOldPrice}`);
            console.log(`${PRODUCT_DISCOUNT_INFORMATION} ${percentDiscount}`);
            console.log(`${PRODUCT_LINK} ${productLink}`);
            console.log(`${PRODUCT_IMAGE} ${productImage}`);
            console.log('------------------------');
            smartPhones.push({
                provider: provider, 
                productId: productId, 
                productName: productName, 
                productPriceInOwnCurrency: productPriceInHuf, 
                productPriceInEUR: productPriceInEUR, 
                productOldPrice: productOldPrice, 
                percentDiscount: percentDiscount, 
                productLink: productLink, 
                productImage: productImage
            })
        }
    });

    return smartPhones;
}

const insertIntoDatabase = (smartPhones) => {
    smartPhones.forEach(element => {
        let sql = "INSERT INTO products (site_id, provider, name, current_price_in_own_currency, current_price_in_eur, old_price, discount_info, link, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [element.productId, element.provider, element.productName, element.productPriceInOwnCurrency, element.productPriceInEUR, element.productOldPrice, element.percentDiscount, element.productLink, element.productImage];

        db.query(sql, values, function (err, result) {
            if (err) throw err;
            console.log("record inserted");
        });
    });
}

function convertHUFToEUR(priceInHUF) {
    const eurExchangeRate = 388;
    if (eurExchangeRate === undefined) {
        throw new Error('The exchange rate is not set yet. Please wait for the query to complete.');
    }

    const price = priceInHUF / eurExchangeRate;
    return price;
}

function convertRSDToEUR(priceInRSD) {
    const eurExchangeRate = 117;
    if (eurExchangeRate === undefined) {
        throw new Error('The exchange rate is not set yet. Please wait for the query to complete.');
    }

    const price = priceInRSD / eurExchangeRate;
    return price;
}

module.exports = scrape;