
import "./user.scss";
import { DataTable } from "../../components/dataTable/DataTable";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { userRows } from "../../data";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "avatar",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },

  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 250,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },

  {
    field: "verified",
    headerName: "Verified",
    width: 200,
    type: "boolean",
  },
  
];

const Users = () => {
  return (
    <div className="users">
      <h1>Users</h1>

      <button>Add New User</button>
      <DataTable columns={columns} rows={userRows} slug="users" />
    </div>
  );
};

export default Users;
