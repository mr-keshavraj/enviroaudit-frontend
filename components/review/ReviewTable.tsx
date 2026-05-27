"use client";

import { useEffect, useState } from "react";

import {
  ReviewItem,
  PaginatedReviews,
} from "@/types/review";

import { ReviewService } from "@/services/review.service";

export default function ReviewTable() {

  /*
  -----------------------------------------
  States
  -----------------------------------------
  */

  const [reviews, setReviews] =
    useState<ReviewItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState("");

  /*
  -----------------------------------------
  Fetch Reviews
  -----------------------------------------
  */

  useEffect(() => {

    fetchReviews();

  }, []);

  /*
  -----------------------------------------
  Load Review Queue
  API:
  GET /api/review/
  -----------------------------------------
  */

  const fetchReviews = async () => {

    try {

      const response:
        PaginatedReviews =
        await ReviewService.getReviews();

      setReviews(
        response.results
      );

    } catch (error) {

      console.error(
        "Review Fetch Error:",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  /*
  -----------------------------------------
  Approve Review
  -----------------------------------------
  */

  const handleApprove = async (
    id: string
  ) => {

    try {

      setActionLoading(id);

      await ReviewService.approveReview(
        id
      );

      await fetchReviews();

    } catch (error) {

      console.error(
        "Approve Error:",
        error
      );

    } finally {

      setActionLoading("");
    }
  };

  /*
  -----------------------------------------
  Reject Review
  -----------------------------------------
  */

  const handleReject = async (
    id: string
  ) => {

    try {

      setActionLoading(id);

      await ReviewService.rejectReview(
        id
      );

      await fetchReviews();

    } catch (error) {

      console.error(
        "Reject Error:",
        error
      );

    } finally {

      setActionLoading("");
    }
  };

  /*
  -----------------------------------------
  Lock Review
  -----------------------------------------
  */

  const handleLock = async (
    id: string
  ) => {

    try {

      setActionLoading(id);

      await ReviewService.lockReview(
        id
      );

      await fetchReviews();

    } catch (error) {

      console.error(
        "Lock Error:",
        error
      );

    } finally {

      setActionLoading("");
    }
  };

  /*
  -----------------------------------------
  Pending Count
  -----------------------------------------
  */

  const pendingCount =
    reviews.filter(
      (review) =>
        review.status === "PENDING"
    ).length;

  /*
  -----------------------------------------
  Loading State
  -----------------------------------------
  */

  if (loading) {

    return (
      <div className="
        bg-[#111827]
        border
        border-slate-800
        rounded-2xl
        p-10
        text-center
      ">

        <p className="
          text-slate-300
          text-lg
        ">
          Loading ESG reviews...
        </p>

      </div>
    );
  }

  /*
  -----------------------------------------
  Empty State
  -----------------------------------------
  */

  if (reviews.length === 0) {

    return (
      <div className="
        bg-[#111827]
        border
        border-slate-800
        rounded-2xl
        p-10
        text-center
      ">

        <h2 className="
          text-2xl
          font-semibold
          text-white
          mb-3
        ">
          No Review Records
        </h2>

        <p className="text-slate-400">
          Upload ESG CSV files to generate reviews.
        </p>

      </div>
    );
  }

  return (

    <div className="
      bg-[#111827]
      border
      border-slate-800
      rounded-2xl
      overflow-hidden
    ">

      {/* =====================================
          Header
      ===================================== */}

      <div className="
        p-6
        border-b
        border-slate-800
        flex
        items-center
        justify-between
      ">

        <div>

          <h2 className="
            text-2xl
            font-bold
            text-white
          ">
            ESG Review Queue
          </h2>

          <p className="
            text-slate-400
            mt-1
          ">
            Analyst validation workflow
          </p>

        </div>

        {/* Pending Badge */}
        <div className="
          bg-orange-500/20
          text-orange-400
          px-4
          py-2
          rounded-xl
          font-medium
        ">

          {pendingCount} Pending

        </div>

      </div>

      {/* =====================================
          Table
      ===================================== */}

      <div className="overflow-x-auto">

        <table className="w-full">

          {/* Table Header */}

          <thead className="bg-[#1f2937]">

            <tr>

              <th className="
                text-left
                p-4
                text-slate-300
                font-semibold
              ">
                Activity
              </th>

              <th className="
                text-left
                p-4
                text-slate-300
                font-semibold
              ">
                Quantity
              </th>

              <th className="
                text-left
                p-4
                text-slate-300
                font-semibold
              ">
                Scope
              </th>

              <th className="
                text-left
                p-4
                text-slate-300
                font-semibold
              ">
                Status
              </th>

              <th className="
                text-left
                p-4
                text-slate-300
                font-semibold
              ">
                Actions
              </th>

            </tr>

          </thead>

          {/* Table Body */}

          <tbody>

            {reviews.map((review) => {

              const isLocked =
                review.status === "LOCKED";

              return (

                <tr
                  key={review.id}
                  className="
                    border-t
                    border-slate-800
                    hover:bg-[#1e293b]
                    transition
                  "
                >

                  {/* Activity */}

                  <td className="p-4">

                    <p className="
                      font-semibold
                      text-white
                    ">

                      {
                        review.activity_type
                          || "N/A"
                      }

                    </p>

                  </td>

                  {/* Quantity */}

                  <td className="
                    p-4
                    text-slate-200
                    font-medium
                  ">

                    {review.quantity}

                    {" "}

                    <span className="
                      text-slate-400
                    ">

                      {
                        review.normalized_unit
                      }

                    </span>

                  </td>

                  {/* Scope */}

                  <td className="p-4">

                    <span className="
                      bg-blue-500/20
                      text-blue-400
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-medium
                    ">

                      {review.scope}

                    </span>

                  </td>

                  {/* Status */}

                  <td className="p-4">

                    <span className={`
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-medium

                      ${
                        review.status === "APPROVED"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : review.status === "REJECTED"
                          ? "bg-red-500/20 text-red-400"
                          : review.status === "LOCKED"
                          ? "bg-slate-500/20 text-slate-300"
                          : "bg-orange-500/20 text-orange-400"
                      }
                    `}>

                      {review.status}

                    </span>

                  </td>

                  {/* Actions */}

                  <td className="p-4">

                    <div className="
                      flex
                      gap-2
                      flex-wrap
                    ">

                      {/* Approve */}

                      <button
                        onClick={() =>
                          handleApprove(
                            review.id
                          )
                        }
                        disabled={
                          actionLoading === review.id
                          || isLocked
                        }
                        className="
                          bg-emerald-600
                          hover:bg-emerald-700
                          disabled:opacity-40
                          text-white
                          px-4
                          py-2
                          rounded-lg
                          text-sm
                          transition
                        "
                      >
                        Approve
                      </button>

                      {/* Reject */}

                      <button
                        onClick={() =>
                          handleReject(
                            review.id
                          )
                        }
                        disabled={
                          actionLoading === review.id
                          || isLocked
                        }
                        className="
                          bg-red-600
                          hover:bg-red-700
                          disabled:opacity-40
                          text-white
                          px-4
                          py-2
                          rounded-lg
                          text-sm
                          transition
                        "
                      >
                        Reject
                      </button>

                      {/* Lock */}

                      <button
                        onClick={() =>
                          handleLock(
                            review.id
                          )
                        }
                        disabled={
                          actionLoading === review.id
                          || isLocked
                        }
                        className="
                          bg-slate-700
                          hover:bg-slate-600
                          disabled:opacity-40
                          text-white
                          px-4
                          py-2
                          rounded-lg
                          text-sm
                          transition
                        "
                      >
                        Lock
                      </button>

                    </div>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}