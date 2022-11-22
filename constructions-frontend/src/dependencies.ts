import { HttpClient } from "./Adapters/HttpClient";
import { ConstructionSpecialitiesServiceApi } from "./Services/ConstructionSpecialitiesService.api";
import { ConstructionCompaniesServiceApi } from "./Services/ConstructionCompaniesService.api";

type DependencyContainerType = {
  _dependencies: {
    [key: symbol]: object;
  };
  set: (key: symbol, dependency: object) => void;
  get: <T>(key: symbol) => T;
};

export class DependencyContainer implements DependencyContainerType {
  _dependencies = {};

  set<T>(key: symbol, dependency: T) {
    Object.defineProperty(this._dependencies, key, {
      value: dependency,
    });
  }
  get<T>(key: symbol): T {
    const descriptor = Object.getOwnPropertyDescriptor(this._dependencies, key);
    return descriptor?.value as T;
  }
}

const container = new DependencyContainer();

const httpClient = new HttpClient({
  baseUrl: "http://localhost:3001/api",
});

const constructionSpecialitiesServiceApi =
  new ConstructionSpecialitiesServiceApi(httpClient);
const constructionCompaniesServiceApi = new ConstructionCompaniesServiceApi(
  httpClient
);

const dependencies = {
  constructionSpecialitiesServiceApi: Symbol(
    "constructionSpecialitiesServiceApi"
  ),
  constructionCompaniesServiceApi: Symbol("constructionCompaniesServiceApi"),
};

container.set(
  dependencies.constructionSpecialitiesServiceApi,
  constructionSpecialitiesServiceApi
);
container.set(
  dependencies.constructionCompaniesServiceApi,
  constructionCompaniesServiceApi
);

export { dependencies, container };
