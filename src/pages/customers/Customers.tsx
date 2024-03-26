import React, { useEffect, useState } from 'react'
import './cutomers.scss'
import { DataTable } from '../../components/dataTable/DataTable';
import { CUSTOMER_BASE_URL, PRODUCT_BASE_URL, userRows } from "../../data";
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { deleteData, getData } from '../../components/API/HttpService';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
export const Customers = () => {
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
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
        <div className="delete" onClick={()=>handleDelete(param.row.id)}>
          <img src="/delete.svg" alt="" />
        </div>
        </div>
        
      );
    },
  };
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
   
  
    {
      field: "f_name",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "l_name",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "phone_number",
      headerName: "Phone",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      editable: true,
    },

    actionColumn
  ];
    const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleDelete = (id:number)=>{
    console.log(id)
    deleteData(`${CUSTOMER_BASE_URL}/api/v1/customers/${id}`).then((res: any) => {
      // setIsLoading(true)
      console.log(res)
      if (res.status) {
        setSnackbarMessage(
          `Proudct Deleted!`
        );
        getAllCustomers()
      }else{
        setSnackbarMessage(
          `Deletion Failed!`
        );
      }
      
    });
  }
  useEffect(() => {
   getAllCustomers()
   }, [])
  const getAllCustomers = () => {
    getData(`${CUSTOMER_BASE_URL}/api/v1/customers`).then((res: any) => {
       if (res["status"]) {
         setCustomers(res.data);
       }
     
     });
 }
  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <Link to={"/new-customers"}>
        <Button>Create New Customer</Button>
      </Link>
      </div>
      <DataTable isLoading={false} slug="users" columns={columns} rows={customers} />
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="users" columns={columns} rows={data} />
      )} */}
      {/* {open && <Add slug="user" columns={columns} setOpen={setOpen} />} */}
    </div>
  );
}


