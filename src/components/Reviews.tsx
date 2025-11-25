"use client";

import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "react-toastify";
import { getReviewList, saveReview } from "@/lib/graphql";
import { useAuth } from "@/AuthDialog";

dayjs.extend(relativeTime);

type ReviewItem = {
  id: number | string;
  body?: string;
  score?: number;
  created_at?: string;
  user?: {
    id?: number | string;
    first_name?: string;
    last_name?: string;
    avatar_url?: string | null;
  } | null;
};

type Aggregates = {
  totalRating?: number;
  totalReviews?: number;
  averageRating?: number;
};

type Props = {
  titleId: number | string;
};

const FALLBACK_AVATAR = "/user.png";

export default function Reviews({ titleId }: Props) {
  const { user, token } = useAuth();

  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [aggregates, setAggregates] = useState<Aggregates>({});
  const [loading, setLoading] = useState(true);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  // --------------------------------------------------------------------
  // Fetch reviews
  // --------------------------------------------------------------------
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await getReviewList(Number(titleId));
      setReviews(res?.getReviewList?.data || []);
      setAggregates(res?.getReviewList?.aggregates || []);
    } catch (err) {
      toast.error("Error fetching reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (titleId) fetchReviews();
  }, [titleId]);

  // --------------------------------------------------------------------
  // Submit review
  // --------------------------------------------------------------------
  const handleSubmitReview = async () => {
    if (!token) {
      toast.error("Login required to post a review.");
      return;
    }
    if (!rating) {
      toast.error("Please provide rating 1-5");
      return;
    }

    try {
      const payload = {
        title_id: Number(titleId),
        score: rating,
        body: comment,
        user_id: Number(user?.id),
      };

      const response = await saveReview(payload);

      if (response?.saveReview?.message === "success") {
        toast.success("Review submitted!");
        setShowModal(false);
        setRating(0);
        setComment("");
        fetchReviews();
      } else {
        toast.error("Failed to submit review");
      }
    } catch (e) {
      toast.error("Error posting review");
    }
  };

  return (
    <div className="p-4 border-t border-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT - Reviews */}
        <div className="md:col-span-2 space-y-4 max-h-[450px] overflow-y-auto pr-2">
          {loading ? (
            <p className="text-gray-400">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-gray-400">No reviews yet.</p>
          ) : (
            reviews.map((r) => {
              const name = r.user
                ? `${r.user.first_name || ""} ${r.user.last_name || ""}`.trim()
                : "Unknown User";

              return (
                <div
                  key={r.id}
                  className="border border-gray-700 rounded-lg p-4 flex gap-4 bg-transparent"
                >
                  <img
                    src={r.user?.avatar_url || FALLBACK_AVATAR}
                    className="w-12 h-12 rounded-full object-cover"
                    alt={name}
                  />

                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-white font-semibold">{name}</h3>

                        <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1 mt-1">
                          <FaStar className="w-3 h-3" /> {r.score}
                        </span>
                      </div>

                      <span className="text-gray-400 text-sm">
                        {dayjs(r.created_at).fromNow()}
                      </span>
                    </div>

                    <p className="text-gray-300 mt-3">{r.body}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* RIGHT - Ratings Summary */}
        <div>
          <div className="border border-gray-700 bg-transparent rounded-lg p-4 text-center">
            <div className="flex items-center justify-center text-yellow-400 text-2xl font-bold gap-2">
              <FaStar />
              <span>
                {aggregates?.averageRating
                  ? aggregates.averageRating.toFixed(1)
                  : "0.0"}
              </span>
            </div>

            <p className="text-white mt-2">
              {aggregates?.totalRating || 0} Ratings &nbsp; &nbsp;{" "}
              {aggregates?.totalReviews || 0} Reviews
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="bg-purple-700 text-white rounded-md px-3 py-2 text-sm mt-3"
            >
              WRITE A REVIEW +
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Modal */}
      {/* ------------------------------------------------------------- */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />

          <div className="relative bg-slate-900 w-full max-w-xl rounded-lg p-5 z-10 animate-scaleIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-lg font-semibold">Write A Review</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-xl text-gray-200"
              >
                ✕
              </button>
            </div>

            {/* Rating */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-200 text-sm">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <FaStar
                    key={s}
                    size={28}
                    onClick={() => setRating(s)}
                    onMouseEnter={() => setHover(s)}
                    onMouseLeave={() => setHover(null)}
                    className={`cursor-pointer ${
                      (hover ?? rating) >= s
                        ? "text-yellow-400"
                        : "text-gray-700"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="mb-3">
              <label className="block mb-2 text-gray-200 text-sm">Review</label>
              <textarea
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 bg-gray-800 text-gray-200 rounded border border-gray-700 focus:ring-2 focus:ring-purple-600"
                placeholder="Write your thoughts..."
              />
            </div>

            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-700 text-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="px-4 py-2 bg-purple-700 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
