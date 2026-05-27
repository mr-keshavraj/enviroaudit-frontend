import api from "@/lib/axios";

export class AuditService {

  static async getAuditLogs() {

    const response = await api.get(
      "/audit/"
    );

    return response.data;
  }
}