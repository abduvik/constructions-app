import { ConstructionCompaniesTable } from "../Components/ConstructionCompaniesTable";
import { ChangeEvent, useEffect, useState } from "react";
import { ConstructionCompany } from "../Models/ConstructionCompany";
import {
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  TextField,
} from "@mui/material";

export const CompaniesList = () => {
  const [companies, setCompanies] = useState<ConstructionCompany[]>([]);
  const [search, setSearch] = useState("");
  const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>(
    []
  );
  const [specialities, setSpecialities] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/construction-companies")
      .then((response) => response.json())
      .then((companies) => setCompanies(companies));

    fetch("http://localhost:3001/api/v1/construction-specialities")
      .then((response) => response.json())
      .then((companies) => setSpecialities(companies));
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
    const query = new URLSearchParams();
    if (search) {
      query.append("search", search);
    }
    if (selectedSpecialities.length > 0) {
      query.append("specialities", selectedSpecialities.join(","));
    }
    fetch(
      `http://localhost:3001/api/v1/construction-companies?${query.toString()}`
    )
      .then((response) => response.json())
      .then((companies) => setCompanies(companies));
  }, [selectedSpecialities, search]);

  return (
    <Container maxWidth="md">
      <TextField
        value={search}
        onChange={handleSearch}
        label="Search Companies..."
        variant="outlined"
      />
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
