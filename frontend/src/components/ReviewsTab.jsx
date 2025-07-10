import { Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const currentUser = {
  _id: "64a789c1234567890abcdef0",
  name: "Sai Praveen",
};

const ReviewsTab = ({ productId, reviews, fetchProduct }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [reorderedReviews, setReorderedReviews] = useState([]);
  const [userReview, setUserReview] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const handleAddReview = async () => {
    if (!comment.trim()) return alert("Comment cannot be empty");
    if(!userId){
      window.location = '/login'
    }
    try {
      setLoading(true);
      await axios.patch(
        `http://localhost:3000/app/v1/products/${productId}/reviews`,
        { comment, rating, userId: currentUser._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComment("");
      setRating(5);
      fetchProduct();
    } catch (err) {
      console.error("Failed to add review:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(
        `http://localhost:3000/app/v1/products/${productId}/reviews/${reviewId}`,
        {
          data: { userId: currentUser._id },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchProduct();
    } catch (err) {
      console.error("Failed to delete review:", err);
    }
  };

  const fetchReviewViaUser = () => {
    const userReview = reviews.find((review) => review.userId._id === userId);
    if (userReview) setUserReview(true);

    const otherReviews = reviews.filter((review) => review.userId._id !== userId);
    const reordered = userReview ? [userReview, ...otherReviews] : [...reviews];
    setReorderedReviews(reordered);
  };

  useEffect(() => {
    fetchReviewViaUser();
  }, [reviews]);

  return (
    <div className="mt-6 space-y-8">
      {/* Add Review Form */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h3 className="text-xl font-semibold mb-3">Write a Review</h3>
        <div className="flex items-center gap-2 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 cursor-pointer transition-transform duration-200 ${
                i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setRating(i + 1)}
            />
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
          rows={3}
          placeholder="Share your thoughts..."
        />
        <button
          onClick={handleAddReview}
          disabled={loading}
          className="mt-3 px-6 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition-all"
        >
          {loading ? "Posting..." : "Submit Review"}
        </button>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {reorderedReviews.length === 0 ? (
          <p className="text-gray-500 text-sm">No reviews yet. Be the first to leave one.</p>
        ) : (
          reorderedReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 flex gap-5 items-start"
            >
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.userId?.name || "User"}`}
                alt="avatar"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-800">{review.userId?.name || "User"}</p>
                  <p className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-1 text-yellow-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? "fill-yellow-500" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm">{review.comment}</p>

                {review.userId?._id === userId && (
                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="text-red-500 text-xs mt-2 flex items-center gap-1 hover:underline"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsTab;
