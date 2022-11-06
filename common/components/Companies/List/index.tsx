import * as React from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowParams,
} from "@mui/x-data-grid";
import { Companies } from "@common/apis/types/companies";
import { Edit as EditIcon } from "@mui/icons-material";

interface IProps {
  companies: Array<Companies>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCompanyToEdit: React.Dispatch<React.SetStateAction<Companies | undefined>>;
}

const CompaniesList = (props: IProps) => {
  const { companies, setOpenModal, setCompanyToEdit } = props;

  const columns: GridColumns<Companies> = [
    { field: "NIT", headerName: "NIT", flex: 1 },
    { field: "name", headerName: "Nombre de la compañia", flex: 3 },
    { field: "address", headerName: "Dirección", flex: 2 },
    { field: "phone", headerName: "Número de teléfono", flex: 1 },
    { field: "created_at", headerName: "Fecha de creación", flex: 2 },
    {
      field: "actions",
      type: "actions",
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => {
            setCompanyToEdit(params.row);
            setOpenModal(true);
          }}
          label="Delete"
        />,
      ],
    },
  ];

  return (
    <DataGrid
      rows={companies}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
      autoHeight
    />
  );
};

export default CompaniesList;
