import { CompaniesFilter } from "./CompaniesFilter";
import { withDependencies } from "../../../Hoc/withDependencies";
import { dependencies } from "../../../dependencies";

export const CompaniesFilterContainer = withDependencies(
  {
    constructionSpecialitiesServiceApi:
      dependencies.constructionSpecialitiesServiceApi,
  },
  CompaniesFilter
);

export { CompaniesFilterContainer as CompaniesFilter };
