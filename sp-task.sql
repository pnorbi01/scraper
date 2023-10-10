-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 10, 2023 at 11:39 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sp-task`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `site_id` varchar(64) NOT NULL,
  `provider` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  `name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  `current_price_in_own_currency` varchar(32) NOT NULL,
  `current_price_in_eur` varchar(32) NOT NULL,
  `old_price` varchar(32) DEFAULT NULL,
  `discount_info` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `link` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  `image` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `site_id`, `provider`, `name`, `current_price_in_own_currency`, `current_price_in_eur`, `old_price`, `discount_info`, `link`, `image`) VALUES
(1, '32169398', 'Emag', 'Xiaomi Redmi 9C NFC Mobiltelefon, Dual SIM, Kártyafüggetlen, 64GB, Midnight Grey', '38.735 Ft', '99.83', 'A termék nincs leárazva', 'A termék nincs leárazva', 'https://www.emag.hu/xiaomi-redmi-9c-nfc-mobiltelefon-dual-sim-kartyafuggetlen-64gb-midnight-grey-redmi-9c-64-3-gray/pd/DJ8RR3MBM/', 'https://s13emagst.akamaized.net/products/32170/32169398/images/res_a0ae106d44c5ef737055bf8ea9146941.jpg?width=720&height=720&hash=72F74FC181BDB76BA99DE661BF915821'),
(2, '53620338', 'Emag', 'Xiaomi Redmi 12C Mobiltelefon, Kártyafüggetlen, Dual SIM, 64GB, 3GB RAM, LTE, Kék', '47.990 Ft', '123.69', 'A termék nincs leárazva', 'A termék nincs leárazva', 'https://www.emag.hu/xiaomi-redmi-12c-mobiltelefon-kartyafuggetlen-dual-sim-64gb-3gb-ram-lte-kek-redmi-12c-blue-3-64/pd/D0P6M6MBM/', 'https://s13emagst.akamaized.net/products/53621/53620338/images/res_711764e76712c3a9b739060fa4ad0955.jpg?width=720&height=720&hash=9C02E0DC1C7805BEE93F4305D2E67D7B'),
(3, '45661723', 'Emag', 'Xiaomi Redmi 9C Mobiltelefon, 3 GB RAM, 64 GB, 4G, zöld', '41.400 Ft', '106.70', 'A termék nincs leárazva', 'A termék nincs leárazva', 'https://www.emag.hu/xiaomi-redmi-9c-mobiltelefon-3-gb-ram-64-gb-4g-zold-6934177759826/pd/DRQZXVMBM/', 'https://s13emagst.akamaized.net/products/45662/45661723/images/res_3caae5416ac48a685287c2b0c08b616e.jpg?width=720&height=720&hash=3C0B27DE5A3605934491293EF1A44377'),
(4, '54194123', 'Emag', 'Xiaomi Redmi 12C mobiltelefon, 3 GB RAM, 64 GB, 4G, Graphite Gray', '44.323 Ft', '114.23', 'A termék nincs leárazva', 'A termék nincs leárazva', 'https://www.emag.hu/xiaomi-redmi-12c-mobiltelefon-3-gb-ram-64-gb-4g-graphite-gray-mzb0dkxeu/pd/DJ92L6MBM/', 'https://s13emagst.akamaized.net/products/54195/54194121/images/res_183b7659df71997f7b4b9f04d31e7582.jpg?width=720&height=720&hash=A414782F04526D1C569977FF15854CFB'),
(5, '32169396', 'Emag', 'Xiaomi Redmi 9C NFC, Mobiltelefon, Dual SIM, Kártyafüggetlen, 64GB, Twilight Blue', '116.713 Ft', '300.81', 'A termék nincs leárazva', 'A termék nincs leárazva', 'https://www.emag.hu/xiaomi-redmi-9c-nfc-mobiltelefon-dual-sim-kartyafuggetlen-64gb-twilight-blue-redmi-9c-64-3-blue/pd/D98RR3MBM/', 'https://s13emagst.akamaized.net/products/32170/32169396/images/res_6b7066062442e6e15bdf5f87d1399e37.jpg?width=720&height=720&hash=8CAFAC2AE6B8C94C2FC87BF4C26EB54A'),
(6, '53620345', 'Emag', 'Xiaomi Redmi 12C Mobiltelefon, Kártyafüggetlen, Dual SIM, 64GB, 3GB RAM, LTE, Szürke', '43.600 Ft', '112.37', 'A termék nincs leárazva', 'A termék nincs leárazva', 'https://www.emag.hu/xiaomi-redmi-12c-mobiltelefon-kartyafuggetlen-dual-sim-64gb-3gb-ram-lte-szurke-redmi-12c-gray-3-64/pd/DSP6M6MBM/', 'https://s13emagst.akamaized.net/products/53621/53620345/images/res_e9db66223b3a7750db9cecd7a03cb9b9.jpg?width=720&height=720&hash=27C66B78603C8082333ACD4F67280132'),
(7, 'ppi-535178', 'Gigatron', 'XIAOMI Redmi 12C 3/64GB Blue', '13.999 RSD', '119.65', 'MP cena: 15.559 RSD', '1.560 RSD', 'https://www.gigatron.rs/mobilni-telefoni/xiaomi-redmi-12c-364gb-blue-535178', 'https://img.gigatron.rs/img/products/medium/image6486f9c1e1e44.webp'),
(8, 'ppi-548369', 'Gigatron', 'XIAOMI Redmi 12C 3/64GB Blue', '13.999 RSD', '119.65', 'MP cena: 15.559 RSD', '1.560 RSD', 'https://www.gigatron.rs/mobilni-telefoni/xiaomi-redmi-12c-364gb-blue-548369', 'https://img.gigatron.rs/img/products/medium/image648179ae1c802.webp'),
(9, 'ppi-486149', 'Gigatron', 'XIAOMI Redmi 9C NFC 3/64GB Midinight Grey', '13.999 RSD', '119.65', 'MP cena: 15.559 RSD', '1.560 RSD', 'https://www.gigatron.rs/mobilni-telefoni/xiaomi-redmi-9c-nfc-364gb-midinight-grey-486149', 'https://img.gigatron.rs/img/products/medium/image648862bc41c9d.webp'),
(10, 'ppi-499727', 'Gigatron', 'XIAOMI Redmi 9C NFC 3/64GB Midinight grey', '13.999 RSD', '119.65', 'MP cena: 15.559 RSD', '1.560 RSD', 'https://www.gigatron.rs/mobilni-telefoni/xiaomi-redmi-9c-nfc-364gb-midinight-grey-499727', 'https://img.gigatron.rs/img/products/medium/image641aa7a6614b8.webp'),
(11, 'ppi-547724', 'Gigatron', 'XIAOMI Redmi 12C 3/64GB Black', '13.999 RSD', '119.65', 'MP cena: 15.559 RSD', '1.560 RSD', 'https://www.gigatron.rs/mobilni-telefoni/xiaomi-redmi-12c-364gb-black-547724', 'https://img.gigatron.rs/img/products/medium/image6486faf1c72e7.webp'),
(12, '000000000001137513', 'Tehnomanija', 'Xiaomi Redmi 9C 64 GB - Sivi', '13.999  RSD', '119.65', '21.165  RSD', '-34%', 'https://www.tehnomanija.rs/telefoni/smart-telefoni/xiaomi-redmi-9c-64-gb-sivi-000000000001137513', 'https://api.tehnomanija.rs/medias/000000000001137513-main-jpeg-166-conversion-media-format?context=bWFzdGVyfGltYWdlc3wyMjc1fGltYWdlL2pwZWd8aDRlL2g2OC84ODUwNjc3MzM0MDQ2LzAwMDAwMDAwMDAwMTEzNzUxMy1tYWluX2pwZWctMTY2LWNvbnZlcnNpb24tbWVkaWEtZm9ybWF0fDQ4OTYyOGRiNDI2NmNhOGRjM2ViYjViMTM5YmUxNTAzM2NhNTc4YmFmNjdjYTdkNGEwMDM4NDNkNWU1MTBhY2U'),
(13, '000000000001196719', 'Tehnomanija', 'Xiaomi Redmi 12C 3GB/64GB - Sivi', '13.999  RSD', '119.65', '17.646  RSD', '-21%', 'https://www.tehnomanija.rs/telefoni/smart-telefoni/xiaomi-redmi-12c-3gb-64gb-sivi-000000000001196719', 'https://api.tehnomanija.rs/medias/jpeg-166-conversion-media-format-xiaomi-mobilni-12c.jpg?context=bWFzdGVyfGltYWdlc3wxOTIzfGltYWdlL2pwZWd8aDdjL2g5Ni8xMDMwNDUzNTE5OTc3NC9qcGVnLTE2Ni1jb252ZXJzaW9uLW1lZGlhLWZvcm1hdF94aWFvbWktbW9iaWxuaS0xMmMuanBnfGVjYTZjYTI1OGQyNGFiYzdiZTdkMDIxMTU4OWMyZDc2NmQ4Y2Q2MDg5NWE2MjU5M2IzMGE1OGU4MzNkOTg5YmY'),
(14, '000000000001196720', 'Tehnomanija', 'Xiaomi Redmi 12C 3GB/64GB - Plavi', '13.999  RSD', '119.65', '17.646  RSD', '-21%', 'https://www.tehnomanija.rs/telefoni/smart-telefoni/xiaomi-redmi-12c-3gb-64gb-plavi-000000000001196720', 'https://api.tehnomanija.rs/medias/jpeg-166-conversion-media-format-xiaomi-mobilni-12c-plavi.jpg?context=bWFzdGVyfGltYWdlc3wxOTg0fGltYWdlL2pwZWd8aDJiL2hhZC8xMDMwNDUzODM0NTUwMi9qcGVnLTE2Ni1jb252ZXJzaW9uLW1lZGlhLWZvcm1hdF94aWFvbWktbW9iaWxuaS0xMmMgcGxhdmkuanBnfDRhNDc3ZDZhZTBhNjU4MGY0OGZkYmZlYmQxZjk5OWZmMTA3MGZmYmZlMTA1YTU2M2FmYWNmNjZhNmU3MTlkODg'),
(15, '282744', 'Euronics', 'Xiaomi Redmi 12C 3/64GB Okostelefon, óceánkék', '47 989 Ft', '123.68', 'A termék nincs leárazva', 'A termék nincs leárazva', 'https://euronics.hu/okostelefonok/xiaomi-redmi-12c-364gb-okostelefon-oceankek-p282744', 'https://images.euronics.hu/product_images/280x210/resize/s1_zfu04s83.jpg?v=1'),
(16, '282739', 'Euronics', 'Xiaomi Redmi 12C 3/64GB Okostelefon, grafitszürke', '47 989 Ft', '123.68', 'A termék nincs leárazva', 'A termék nincs leárazva', 'https://euronics.hu/okostelefonok/xiaomi-redmi-12c-364gb-okostelefon-grafitszurke-p282739', 'https://images.euronics.hu/product_images/280x210/resize/s1_y3wnfc78.png?v=1'),
(17, '278435', 'Euronics', 'Xiaomi Redmi 9C NFC 3/64GB Okostelefon, Aurora zöld', '49 989 Ft', '128.84', '64 989 Ft', '-15 000 Ft', 'https://euronics.hu/okostelefonok/xiaomi-redmi-9c-nfc-364gb-okostelefon-aurora-zold-p278435', 'https://images.euronics.hu/product_images/280x210/resize/s1_pghwwp9s.png?v=2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
