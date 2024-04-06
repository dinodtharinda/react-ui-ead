import React, { useEffect, useState } from "react";
import "./cutomers.scss";
import { DataTable } from "../../components/dataTable/DataTable";
import { CUSTOMER_BASE_URL, PRODUCT_BASE_URL, userRows } from "../../data";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { deleteData, getData } from "../../components/API/HttpService";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
export const Customers = () => {
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Actions",
    width: 70,
    renderCell: (param) => {
      return (
        <div className="action">
          <Link to={`/customers/${param.row.id}`}>
            <img src="/view.svg" alt="" />
          </Link>
          <div className="delete" onClick={() => handleDelete(param.row.id)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };
  const columns: GridColDef[] = [
    {
      field: "f_name",
      headerName: "First name",
      width: 250,
      editable: true,
    },
    {
      field: "l_name",
      headerName: "Last name",
      width: 250,
      editable: true,
    },
    {
      field: "phone_number",
      headerName: "Phone",
      width: 250,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      editable: true,
    },

    actionColumn,
  ];
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleDelete = (id: number) => {
    console.log(id);
    deleteData(`${CUSTOMER_BASE_URL}/api/v1/customers/${id}`).then(
      (res: any) => {
        // setIsLoading(true)
        console.log(res);
        if (res.status) {
          setSnackbarMessage(`Proudct Deleted!`);
          getAllCustomers(search);
        } else {
          setSnackbarMessage(`Deletion Failed!`);
        }
      }
    );
  };
  useEffect(() => {
    getAllCustomers(search);
  }, []);
  const getAllCustomers = (searchd:String) => {
    getData(`${CUSTOMER_BASE_URL}/api/v1/customers?f_name=${searchd}`).then(
      (res: any) => {
        if (res["status"]) {
          setCustomers(res.data);
        }
      }
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearch(value);
    getAllCustomers(value);
    console.log(value)
  };
  return (
    <div className="users">
      <h1>
        <img src="/customers.png" alt="" />
        Customers
      </h1>
      <Link to={"/new-customers"}>
        <button className="btn btn-primary my-2">Add New Customer</button>
      </Link>
      <div className="col-md-6 mt-2 mb-2">
        <label className="itemTitle">Search Customer By First Name</label>
        <input
          className="form-control"
          type="text"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <DataTable
        isLoading={false}
        slug="users"
        columns={columns}
        rows={customers}
      />
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="users" columns={columns} rows={data} />
      )} */}
      {/* {open && <Add slug="user" columns={columns} setOpen={setOpen} />} */}
    </div>
  );
};
