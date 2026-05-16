require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');

const FALLBACK = [
  { name: 'Urban Street Backpack', category_id: '', original_price: 1499, sale_price: 749, image_url: '/images/bags.jpg', badge_discount: '50% OFF', badge_new: false, in_stock: true },
  { name: 'Slim College Tote', category_id: '', original_price: 999, sale_price: 449, image_url: '/images/college.jpg', badge_discount: '55% OFF', badge_new: true, in_stock: true },
  { name: 'Pro Trolley 24"', category_id: '', original_price: 3999, sale_price: 1599, image_url: '/images/trolleyyy.jpg', badge_discount: '60% OFF', badge_new: false, in_stock: true },
  { name: 'Everyday Crossbody', category_id: '', original_price: 799, sale_price: 349, image_url: '/images/hand.jpg', badge_discount: '56% OFF', badge_new: true, in_stock: true },
  { name: 'Campus Rolltop', category_id: '', original_price: 1299, sale_price: 599, image_url: '/images/all.jpg', badge_discount: '54% OFF', badge_new: false, in_stock: true },
  { name: 'Classy Hand Bags', category_id: '', original_price: 1799, sale_price: 799, image_url: '/images/ladies.jpg', badge_discount: '55% OFF', badge_new: true, in_stock: true },
  { name: 'Minimalist Messenger', category_id: '', original_price: 1199, sale_price: 499, image_url: '/images/hand bag.jpg', badge_discount: '58% OFF', badge_new: false, in_stock: true },
  { name: 'Explorer Hardcase', category_id: '', original_price: 4999, sale_price: 1999, image_url: '/images/trolley.jpg', badge_discount: '60% OFF', badge_new: true, in_stock: true },
];

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany(); // clear existing data
    await Product.insertMany(FALLBACK);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

importData();
