import * as React from "react";
import { useState } from "react";
import {
  Companies as CompaniesType,
} from "@common/apis/types/companies";
import { Button, Box } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import CompaniesList from "./List";
import CompaniesForm from "./Form";
import saveCompany from "@common/apis/services/companies/saveCompany";
import getCompanies from "@common/apis/services/companies/listCompanies";
import { useEffect } from "react";
import { useMemo } from "react";

const Companies = () => {
  const [openModal, setOpenModal] = useState(false);
  const [companies, setCompanies] = useState<Array<CompaniesType>>([]);
  const [_, set_] = useState();

  const refetchData = async () => {
    const data = await getCompanies();
    if (data) {
      setCompanies(data);
    }
  };

  useEffect(() => {
    refetchData();
  }, [_]);

  const onSubmit = async (company: CompaniesType) => {
    const newCompany = await saveCompany(company);
    setCompanies([...companies, newCompany]);
    setOpenModal(false);
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button
          variant="outlined"
          onClick={() => setOpenModal(true)}
          startIcon={<AddIcon />}
        >
          Nueva Compañia
        </Button>
      </Box>
      <CompaniesForm
        onSubmit={onSubmit}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <CompaniesList companies={companies} />
    </div>
  );
};

export default Companies;
