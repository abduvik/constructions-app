import { HttpClient } from "../Adapters/HttpClient";
import { ConstructionCompany } from "../Models/ConstructionCompany";

type getConstructionCompaniesParams = {
  search?: string;
  specialities?: string[];
};

export class ConstructionCompaniesServiceApi {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getCompanies({
    search = "",
    specialities = [],
  }: getConstructionCompaniesParams = {}) {
    const query = new URLSearchParams();
    if (search) {
      query.append("search", search);
    }
    if (specialities.length > 0) {
      query.append("specialities", specialities.join(","));
    }

    return this.httpClient.get<ConstructionCompany[]>(
      `/v1/construction-companies?${query.toString()}`
    );
  }
}
