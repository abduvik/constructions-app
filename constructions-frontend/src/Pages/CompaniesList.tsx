import {ConstructionCompaniesTable} from "../Components/ConstructionCompaniesTable";
import {useEffect, useState} from "react";
import {ConstructionCompany} from "../Models/ConstructionCompany";

export const CompaniesList = () => {
    const [companies, setCompanies] = useState<ConstructionCompany[]>([]);

    useEffect(() => {
        fetch("http://localhost:3001/api/v1/constructions")
            .then(response => response.json())
            .then(companies => setCompanies(companies))
    }, []);

    return <ConstructionCompaniesTable  companies={companies}/>
}