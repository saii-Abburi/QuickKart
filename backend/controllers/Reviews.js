const productModel = require("../models/productModel");

const addReview = async (req, res) => {
  console.log("Adding/updating review for product:", req.params.productId);
  
  const { productId } = req.params;
  const { comment, rating } = req.body;
  const userId = req.user.id;

  try {
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const reviewIndex = product.reviews.findIndex(
      (review) => review.userId.toString() === userId
    );
    
    if (reviewIndex !== -1) {
      // ✅ User already reviewed — update their review
      product.reviews[reviewIndex].comment = comment;
      product.reviews[reviewIndex].rating = rating;
      product.reviews[reviewIndex].createdAt = new Date();
    } else {
      // ✅ New review
      
      product.reviews.push({ userId, comment, rating });
    }
    product.avgRating = productModel.calculateAvgRating(product.reviews);
    await product.save();

    const updatedProduct = await productModel.findById(productId).populate('reviews.userId' , 'name');

    return res
      .status(200)
      .json({ message: "Review added/updated", product: updatedProduct });
  } catch (error) {
    console.error("Error adding/updating review:", error);
    return res
      .status(500)
      .json({ message: "Error adding/updating review", error });
  }
};


// DELETE /products/:productId/reviews/:reviewId
const deleteReview = async (req, res) => {
  console.log("Deleting review for product:", req.params.productId);
  const { productId, reviewId } = req.params;
  const userId = req.user.id;

  try {
    const product = await productModel.findById(productId);

    const review = product.reviews.id(reviewId);
    console.log("Review to delete:", review);
    
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.userId != userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    review.deleteOne();
    await product.save();

    product.avgRating = productModel.calculateAvgRating(product.reviews);
    await product.save();

    res.status(200).json({ message: "Review deleted", product });
  } catch (err) {
    res.status(500).json({ message: "Error deleting review", error: err });
  }
};

module.exports = {
  addReview,
  deleteReview,
};
