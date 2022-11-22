import { CompaniesList } from "./CompaniesList";
import { withDependencies } from "../../Hoc/withDependencies";
import { dependencies } from "../../dependencies";

export default withDependencies(
  {
    constructionCompaniesServiceApi:
      dependencies.constructionCompaniesServiceApi,
    constructionSpecialitiesServiceApi:
      dependencies.constructionSpecialitiesServiceApi,
  },
  CompaniesList
);
