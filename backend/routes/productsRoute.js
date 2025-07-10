const express = require('express')
const router = express.Router()
const authentication = require('../middleware/authentication')
const authoriseRoles = require('../middleware/authoriseRoles')
const {GetAllProducts , CreateProduct , GetSingleProduct , DeleteProduct , UpdateProduct, getSellerProducts} = require('../controllers/products')

const {addReview, deleteReview} = require('../controllers/Reviews')

router.route('/:productId/reviews').patch(authentication, addReview);
router.route('/:productId/reviews/:reviewId').delete(authentication, deleteReview);
router.route('/')
  .get(GetAllProducts)
  .post(authentication, authoriseRoles('admin', 'seller'), CreateProduct);

router.route('/:id')
  .get(GetSingleProduct)
  .delete(authentication, authoriseRoles('admin', 'seller'), DeleteProduct)
  .patch(UpdateProduct);

router.route('/seller/:sellerId')
  .get(authentication, authoriseRoles('admin', 'seller'), getSellerProducts);
module.exports = router
