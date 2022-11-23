import { useEffect, useState } from "react";
import { Container, Paper } from "@mui/material";
import { ConstructionCompany } from "../../Models/ConstructionCompany";
import { ConstructionCompaniesTable } from "../../Components/ConstructionCompaniesTable";
import { ConstructionCompaniesServiceApi } from "../../Services/ConstructionCompaniesService.api";
import { CompaniesFilter } from "./CompaniesFilter";
import { onFilterChangeEvent } from "./CompaniesFilter/CompaniesFilter";

type CompaniesListProps = {
  constructionCompaniesServiceApi: ConstructionCompaniesServiceApi;
};

export const CompaniesList = ({
  constructionCompaniesServiceApi,
}: CompaniesListProps) => {
  const [companies, setCompanies] = useState<ConstructionCompany[]>([]);

  useEffect(() => {
    constructionCompaniesServiceApi.getCompanies().then((companies) => {
      setCompanies(companies);
    });
  }, []);

  const handleFilterChange: onFilterChangeEvent = ({
    selectedSpecialities,
    search,
  }) => {
    constructionCompaniesServiceApi
      .getCompanies({ search, specialities: selectedSpecialities })
      .then((companies) => setCompanies(companies));
  };

  return (
    <Container maxWidth="md">
      <CompaniesFilter onFilterChange={handleFilterChange} />
      <Paper elevation={1}>
        <ConstructionCompaniesTable companies={companies} />
      </Paper>
    </Container>
  );
};
