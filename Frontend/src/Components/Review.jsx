import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
function Review({ setmodel, itemsId }) {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const handleReviewSubmit = async (e) => {
        e.preventDefault()
        const data = {
            Star: rating,
            ReviewInText: review,
            ItemsId: itemsId
        }
        try {
            const res = await axios.post("http://localhost:7777/review", data, { withCredentials: true })
            console.log(res.data)
            if (res.status == 200) {
                toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                setmodel((prev) => !prev)
            }
        }
        catch (err) {
            toast.error(
                err.response?.data?.message || "Something went wrong",
                {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "dark",
                }
            );
        }
    }
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="w-full max-w-md bg-zinc-900 rounded-xl p-6 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-5">
                    Write a Review
                </h2>
                <ToastContainer />
                <div className="flex gap-2 mb-6 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => setRating(star)}
                            className={`text-4xl transition ${star <= rating ? "text-yellow-400" : "text-gray-500"
                                }`}
                        >
                            ★
                        </button>
                    ))}
                </div>
                <textarea
                    rows={5}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review..."
                    className="w-full rounded-lg bg-zinc-800 text-white border border-zinc-700 p-3 resize-none focus:outline-none focus:border-blue-500"
                />
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        className="px-5 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white"
                        onClick={() => setmodel((prev) => !prev)}>
                        Cancel
                    </button>

                    <button
                        className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={(e) => handleReviewSubmit(e)}>
                        Submit Review
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Review