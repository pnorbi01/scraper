module.exports = function(app, db){
    app.get('/api/products', async (req, res) => { 
        try {
            const [rows, fields] = await db.execute('SELECT * FROM products');

            const formattedData = JSON.stringify(rows, null, 2);
            res.status(200).set('Content-Type', 'application/json').send(formattedData);
        } 
        catch (error) {
            console.error('Error while requesting data:', error);
            res.status(500).json({ error: 'Error while requesting data' });
        }
    });

    app.get('/api/products/search', async (req, res) => {
        const productName = req.query.productName || "";
        const storeName = req.query.storeName || "%";
        const id = req.query.productId || "%";
        const flagCheapest = req.query.flagCheapest;
    
        try {
            const query = `SELECT * FROM products WHERE name LIKE ? AND provider LIKE ? AND site_id LIKE ?`;
            const [rows, fields] = await db.execute(query, [`%${productName}%`, storeName, id]);

            if(flagCheapest === "true") {
                let cheapestProduct = rows[0];
                for (const product of rows) {
                    const priceInEUR = parseFloat(product.current_price_in_eur);
                    const cheapestPrice = parseFloat(cheapestProduct.current_price_in_eur);
    
                    if (priceInEUR < cheapestPrice) {
                        cheapestProduct = product;
                    }
                }
                cheapestProduct && (cheapestProduct.cheapest = true);
            }

            const formattedData = JSON.stringify(rows, null, 2);
            res.status(200).set('Content-Type', 'application/json').send(formattedData);
        } 
        catch (error) {
            console.error('Error while searching:', error);
            res.status(500).json({ error: 'Error while searching' });
        }
    });
}
    