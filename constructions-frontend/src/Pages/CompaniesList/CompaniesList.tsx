import { ConstructionCompaniesTable } from "../../Components/ConstructionCompaniesTable";
import { ChangeEvent, useEffect, useState } from "react";
import { ConstructionCompany } from "../../Models/ConstructionCompany";
import {
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Paper,
  TextField,
} from "@mui/material";
import { ConstructionSpecialitiesServiceApi } from "../../Services/ConstructionSpecialitiesService.api";
import { ConstructionCompaniesServiceApi } from "../../Services/ConstructionCompaniesService.api";

type CompaniesListProps = {
  constructionCompaniesServiceApi: ConstructionCompaniesServiceApi;
  constructionSpecialitiesServiceApi: ConstructionSpecialitiesServiceApi;
};

export const CompaniesList = ({
  constructionCompaniesServiceApi,
  constructionSpecialitiesServiceApi,
}: CompaniesListProps) => {
  const [companies, setCompanies] = useState<ConstructionCompany[]>([]);
  const [search, setSearch] = useState("");
  const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>(
    []
  );
  const [specialities, setSpecialities] = useState<string[]>([]);

  useEffect(() => {
    constructionCompaniesServiceApi.getCompanies().then((companies) => {
      setCompanies(companies);
    });

    constructionSpecialitiesServiceApi
      .getSpecialities()
      .then((specialities) => {
        setSpecialities(specialities);
      });
  }, []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSpecialityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    if (checked) {
      setSelectedSpecialities([...selectedSpecialities, value]);
    } else {
      setSelectedSpecialities(
        selectedSpecialities.filter((speciality) => speciality !== value)
      );
    }
  };

  useEffect(() => {
    constructionCompaniesServiceApi
      .getCompanies({ search, specialities: selectedSpecialities })
      .then((companies) => setCompanies(companies));
  }, [selectedSpecialities, search]);

  return (
    <Container maxWidth="md">
      <FormControl fullWidth>
        <TextField
          value={search}
          onChange={handleSearch}
          label="Search Companies..."
          variant="outlined"
        />
      </FormControl>

      {specialities.map((speciality) => (
        <FormControlLabel
          key={speciality}
          control={
            <Checkbox
              value={speciality}
              checked={selectedSpecialities.includes(speciality)}
              onChange={handleSpecialityChange}
            />
          }
          label={speciality}
        />
      ))}
      <Paper elevation={1}>
        <ConstructionCompaniesTable companies={companies} />
      </Paper>
    </Container>
  );
};
