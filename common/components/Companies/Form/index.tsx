import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Companies } from "@common/apis/types/companies";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  Input,
  FormGroup,
} from "@mui/material";

interface IProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  companyToEdit?: Companies;
  onSubmit: (companies: Companies) => void;
}

const CompaniesForm = (props: IProps) => {
  const { openModal, setOpenModal, companyToEdit } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Companies>();
  const onSubmit: SubmitHandler<Companies> = (data) => {
    if (companyToEdit) data.id = companyToEdit.id;
    props.onSubmit(data);
  };

  React.useEffect(() => {
    if (companyToEdit) reset(companyToEdit);
    else
      reset({
        NIT: "",
        name: "",
        address: "",
        phone: "",
      });
  }, [companyToEdit]);

  return (
    <Dialog
      maxWidth="xs"
      fullWidth={true}
      open={openModal}
      onClose={() => setOpenModal(false)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{`${
          companyToEdit ? "Editar" : "Crear"
        } compañia`}</DialogTitle>
        <DialogContent>
          <FormGroup>
            <FormControl error={errors.NIT ? true : false} variant="standard">
              <InputLabel htmlFor="NIT">NIT</InputLabel>
              <Input
                id="NIT"
                maxRows={20}
                {...register("NIT", { required: true })}
              />
            </FormControl>
            <FormControl error={errors.name ? true : false} variant="standard">
              <InputLabel htmlFor="name">Nombre de la compañia</InputLabel>
              <Input
                id="name"
                maxRows={50}
                {...register("name", { required: true })}
              />
            </FormControl>
            <FormControl
              error={errors.address ? true : false}
              variant="standard"
            >
              <InputLabel htmlFor="address">
                Dirección de la compañia
              </InputLabel>
              <Input
                id="address"
                maxRows={50}
                {...register("address", { required: true })}
              />
            </FormControl>
            <FormControl error={errors.phone ? true : false} variant="standard">
              <InputLabel htmlFor="phone">Teléfono de la compañia</InputLabel>
              <Input
                id="phone"
                maxRows={15}
                {...register("phone", { required: true })}
              />
            </FormControl>
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CompaniesForm;
