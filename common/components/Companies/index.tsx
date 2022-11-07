import * as React from "react";
import { useState } from "react";
import { Companies as CompaniesType } from "@common/apis/types/companies";
import {
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import {
  Add as AddIcon,
  DownloadForOffline as DownloadForOfflineIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import CompaniesList from "./List";
import CompaniesForm from "./Form";
import saveCompany from "@common/apis/services/companies/saveCompany";
import updateCompany from "@common/apis/services/companies/updateCompany";
import getCompanies from "@common/apis/services/companies/listCompanies";
import { useEffect } from "react";
import getErrorData from "@common/http/getErrorData";
import getErrorCode from "@common/http/getErrorCode";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import FilesDropZone from "../DropZone";
import sendEmail from "@common/apis/services/sendEmail";
import { SubmitHandler, useForm } from "react-hook-form";

const Companies = () => {
  const [openModal, setOpenModal] = useState(false);
  const [companies, setCompanies] = useState<Array<CompaniesType>>([]);
  const [companyToEdit, setCompanyToEdit] = useState<CompaniesType>();
  const [openModalSendPdf, setOpenModalSendPdf] = useState(false);
  const [file, setFile] = useState<File>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();
  const onSubmitSendEmail: SubmitHandler<{ email: string }> = (data) => {
    sendAttach(data.email);
  };

  const printRef = React.useRef(null);

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
        setCompanies(
          companies.map((c) => {
            if (c.id === company.id) {
              c.NIT = company.NIT;
              c.address = company.address;
              c.name = company.name;
              c.phone = company.phone;
            }
            return c;
          })
        );
      } else {
        const newCompany = await saveCompany(company);
        setCompanies([...companies, newCompany]);
      }
      setOpenModal(false);
      alert("Guardado con exito");
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

  const generatePDF = async () => {
    const element = printRef.current;
    if (element) {
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL("image/png");

      const pdf = new jsPDF();
      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

      pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("file.pdf");
    }
  };

  const onDrop = React.useCallback(async (acceptedFiles: Array<File>) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const sendAttach = async (email: string) => {
    if(file){
      await sendEmail(email, file);
    }
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <Box
        m={1}
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Typography variant="h3" style={{ color: "#5B5B5B" }}>
          Compañias
        </Typography>
      </Box>
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
        <Button
          variant="outlined"
          onClick={() => generatePDF()}
          startIcon={<DownloadForOfflineIcon />}
          style={{ marginLeft: "10px" }}
        >
          Descargar PDF
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setOpenModalSendPdf(true);
          }}
          startIcon={<SendIcon />}
          style={{ marginLeft: "10px" }}
        >
          Enviar PDF
        </Button>
      </Box>

      <Dialog
        maxWidth="xs"
        fullWidth={true}
        open={openModalSendPdf}
        onClose={() => setOpenModalSendPdf(false)}
      >
        <form onSubmit={handleSubmit(onSubmitSendEmail)}>
          <DialogTitle>Enviar PDF</DialogTitle>
          <DialogContent>
            <FormControl error={errors.email ? true : false} variant="standard">
              <InputLabel htmlFor="email">Correo</InputLabel>
              <Input
                id="email"
                maxRows={20}
                {...register("email", { required: true })}
              />
            </FormControl>
            <FilesDropZone onDrop={onDrop} accept={{ "application/pdf": [] }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModalSendPdf(false)}>Cancelar</Button>
            <Button type="submit">Enviar</Button>
          </DialogActions>
        </form>
      </Dialog>

      <CompaniesForm
        onSubmit={onSubmit}
        openModal={openModal}
        setOpenModal={setOpenModal}
        companyToEdit={companyToEdit}
      />
      <div ref={printRef}>
        <CompaniesList
          companies={companies}
          setOpenModal={setOpenModal}
          setCompanyToEdit={setCompanyToEdit}
        />
      </div>
    </div>
  );
};

export default Companies;
