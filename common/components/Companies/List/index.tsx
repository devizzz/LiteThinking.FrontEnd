import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Companies } from "@common/apis/types/companies";

const columns: GridColDef[] = [
  { field: "NIT", headerName: "NIT", flex: 1 },
  { field: "name", headerName: "Nombre de la compañia", flex: 3 },
  { field: "address", headerName: "Dirección", flex: 2 },
  { field: "phone", headerName: "Número de teléfono", flex: 1 },
  { field: "created_at", headerName: "Fecha de creación", flex: 2 },
];

interface IProps {
  companies: Array<Companies>;
}

const CompaniesList = (props: IProps) => {
  const { companies } = props;

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
}

export default CompaniesList;
