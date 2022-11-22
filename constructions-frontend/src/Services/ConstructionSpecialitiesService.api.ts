import { HttpClient } from "../Adapters/HttpClient";

export class ConstructionSpecialitiesServiceApi {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getSpecialities() {
    return this.httpClient.get<string[]>("/v1/construction-specialities");
  }
}
