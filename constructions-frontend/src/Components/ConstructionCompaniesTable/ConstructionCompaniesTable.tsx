import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ConstructionCompany } from "../../Models/ConstructionCompany";

type ConstructionCompaniesListProps = {
  companies: ConstructionCompany[];
};

export const ConstructionCompaniesTable = ({
  companies,
}: ConstructionCompaniesListProps) => {
  return (
    <TableContainer sx={{ maxHeight: 500 }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell width="20%">Company Name</TableCell>
            <TableCell width="15%" align="center">
              Logo
            </TableCell>
            <TableCell width="45%">Specialities</TableCell>
            <TableCell width="20%">City</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {companies.map((company) => (
            <TableRow
              key={company.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{company.name}</TableCell>
              <TableCell align="center">
                <img src={company.logo} alt={`${company.name} Logo`} />
              </TableCell>
              <TableCell>
                {company.speciality.map((speciality, index) => (
                  <Chip key={index} sx={{ margin: "5px" }} label={speciality} />
                ))}
              </TableCell>
              <TableCell>{company.city}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
