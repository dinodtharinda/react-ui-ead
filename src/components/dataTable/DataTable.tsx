import {
  DataGrid,
  GridColDef,
  GridToolbar,

} from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";

type Props = {
  columns: GridColDef[];
  rows: object[];
  isLoading:boolean
  slug:string
  
};



export const DataTable = (props: Props) => {




  return (
    <div className="dataTable">
      <DataGrid
    loading={props.isLoading}
        className="dataGrid"

        rows={props.rows}
        columns={[...props.columns]}
       
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
      />
    </div>
  );
};
