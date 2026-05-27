import api from "@/lib/axios";

export class ReviewService {

  static async getReviews() {

    const response = await api.get(
      "/review/"
    );

    return response.data;
  }

  static async approveReview(
    id: string
  ) {

    const response = await api.post(
      `/review/${id}/approve/`,
      {
        reviewed_by: "ESG Analyst",
        analyst_notes: "Approved from frontend",
      }
    );

    return response.data;
  }

  static async rejectReview(
    id: string
  ) {

    const response = await api.post(
      `/review/${id}/reject/`,
      {
        reviewed_by: "ESG Analyst",
        analyst_notes: "Rejected from frontend",
      }
    );

    return response.data;
  }

  static async lockReview(
    id: string
  ) {

    const response = await api.post(
      `/review/${id}/lock/`
    );

    return response.data;
  }
}