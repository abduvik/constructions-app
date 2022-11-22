export class HttpClient {
  baseUrl: string;

  constructor({ baseUrl }: { baseUrl: string }) {
    this.baseUrl = baseUrl;
  }

  get<T>(url: string, params: any = {}): Promise<T> {
    const query = Object.keys(params?.query || {})
      .map((key) => `${key}=${params.query[key]}`)
      .join("&");

    const requestUrl = this.baseUrl + url + (query ? `?${query}` : "");
    return fetch(requestUrl).then((response) => response.json());
  }
}
