import * as React from "react";
import { useState } from "react";
import { Companies as CompaniesType } from "@common/apis/types/companies";
import { Button, Box } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import CompaniesList from "./List";
import CompaniesForm from "./Form";
import saveCompany from "@common/apis/services/companies/saveCompany";
import updateCompany from "@common/apis/services/companies/updateCompany";
import getCompanies from "@common/apis/services/companies/listCompanies";
import { useEffect } from "react";
import getErrorData from "@common/http/getErrorData";
import getErrorCode from "@common/http/getErrorCode";

const Companies = () => {
  const [openModal, setOpenModal] = useState(false);
  const [companies, setCompanies] = useState<Array<CompaniesType>>([]);
  const [companyToEdit, setCompanyToEdit] = useState<CompaniesType>();

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
    try {
      if (company.id) {
        await updateCompany(company);
        setCompanies(companies.map(c => {
          if(c.id === company.id){
            c.NIT = company.NIT;
            c.address = company.address;
            c.name = company.name;
            c.phone = company.phone;
          }
          return c;
        }));
      } else {
        const newCompany = await saveCompany(company);
        setCompanies([...companies, newCompany]);
      }
      setOpenModal(false);
      alert('Guardado con exito');
    } catch (error) {
      const code: number | null = getErrorCode(error);
      if (code === 400) {
        const data = getErrorData(error);
        if (data) {
          alert(data.detail);
        }
      } else {
        alert("Ha ocurrido un error interno");
      }
    }
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button
          variant="outlined"
          onClick={() => {
            setCompanyToEdit(undefined);
            setOpenModal(true);
          }}
          startIcon={<AddIcon />}
        >
          Nueva Compañia
        </Button>
      </Box>
      <CompaniesForm
        onSubmit={onSubmit}
        openModal={openModal}
        setOpenModal={setOpenModal}
        companyToEdit={companyToEdit}
      />
      <CompaniesList
        companies={companies}
        setOpenModal={setOpenModal}
        setCompanyToEdit={setCompanyToEdit}
      />
    </div>
  );
};

export default Companies;
