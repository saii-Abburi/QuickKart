const express = require('express');
const authencation = require('../middleware/authentication')
const { saveProduct, unsaveProduct, getSavedProducts } = require('../controllers/savedproducts');
const router = express.Router({ mergeParams: true });


router.route('/').get(authencation , getSavedProducts)
router.route('/:productId').post(authencation , saveProduct).delete(authencation , unsaveProduct)

module.exports = router;