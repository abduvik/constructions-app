import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {ConstructionCompany} from "../Models/ConstructionCompany";

type ConstructionCompaniesListProps = {
    companies: ConstructionCompany[]
}

export const ConstructionCompaniesTable = ({companies}: ConstructionCompaniesListProps) => {
    return <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="right">Logo</TableCell>
                    <TableCell align="right">Company Name</TableCell>
                    <TableCell align="right">Specialities</TableCell>
                    <TableCell align="right">City</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {companies.map((company) => (
                    <TableRow
                        key={company.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="right">
                            <img src={company.logo} alt={`${company.name} Logo`}/>
                        </TableCell>
                        <TableCell align="right">{company.name}</TableCell>
                        <TableCell align="right">{company.speciality.join(',')}</TableCell>
                        <TableCell align="right">{company.city}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
}