import api from "@/lib/axios";

export class OrganizationService {

  /*
  -----------------------------------------
  Get All Organizations
  API:
  GET /api/organizations/
  -----------------------------------------
  */
  static async getOrganizations() {

    const response = await api.get(
      "/organizations/"
    );

    return response.data;
  }
}