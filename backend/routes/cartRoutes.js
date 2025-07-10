const express = require('express');
const router = express.Router();
const cart = require('../models/cartModel');
const {getCartByUserId , createCart , deleteCartItem, clearCart, updateCartQuantity} = require('../controllers/cart')

router.get('/:id',getCartByUserId);
router.post('/add',createCart);
router.delete('/remove', deleteCartItem);
router.delete('/clear', clearCart);
router.patch('/update-quantity', updateCartQuantity)

module.exports= router;