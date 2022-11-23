import {
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { ConstructionSpecialitiesServiceApi } from "../../../Services/ConstructionSpecialitiesService.api";

export type onFilterChangeEvent = ({
  selectedSpecialities,
  search,
}: {
  selectedSpecialities: string[];
  search: string;
}) => void;

type CompaniesFilterProps = {
  constructionSpecialitiesServiceApi: ConstructionSpecialitiesServiceApi;
  onFilterChange: onFilterChangeEvent;
};

export const CompaniesFilter = ({
  constructionSpecialitiesServiceApi,
  onFilterChange,
}: CompaniesFilterProps) => {
  const [specialities, setSpecialities] = useState<string[]>([]);

  const [search, setSearch] = useState("");
  const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>(
    []
  );

  useEffect(() => {
    constructionSpecialitiesServiceApi
      .getSpecialities()
      .then((specialities) => {
        setSpecialities(specialities);
      });
  }, []);

  const handleSpecialityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;

    const updatedSelectedSpecialities = checked
      ? [...selectedSpecialities, value]
      : selectedSpecialities.filter((speciality) => speciality !== value);
    setSelectedSpecialities(updatedSelectedSpecialities);
    onFilterChange({
      selectedSpecialities: updatedSelectedSpecialities,
      search,
    });
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    onFilterChange({ selectedSpecialities, search: event.target.value });
  };

  return (
    <>
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
    </>
  );
};
