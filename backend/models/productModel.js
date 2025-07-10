const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product Name is required'],
    trim: true
  },
  actualPrice: {
    type: Number,
    required: [true, 'Please provide the actual price of the product']
  },
  discountedPrice: {
    type: Number,
    required: [true, 'Please provide the discounted price']
  },
  priceOff: {
    type: Number,
    required: [true, 'Please provide the price-off value']
  },
  expiryDate: {
    type: Date,
    required: [true, 'Please provide the expiry date']
  },
  type: {
    type: String,
    required: [true, 'Please provide the type of the product'],
    enum: [
      'grocery', 'electronics', 'clothing', 'furniture', 'books',
      'toys', 'beauty', 'sports', 'automotive', 'health',
      'stationery', 'kitchen', 'footwear', 'jewelry',
      'home decor', 'pet supplies'
    ]
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide the quantity of the product']
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  images: {
    type: [String],
    default: []
  },
  description: {
    type: String,
    trim: true
  },
  location: {
      type: String,
      required: [true, 'Please provide the location of the product']
  },
  weight:{
    type: Number,
    min: 1,
    required: [true, 'Please provide the weight of the product']
  },
  reviews: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    comment: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  avgRating: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});


ProductSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

ProductSchema.statics.calculateAvgRating = function (reviews) {
  if (!reviews.length) return 0;
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return parseFloat((total / reviews.length).toFixed(1));
};



module.exports = mongoose.model('Product' , ProductSchema)