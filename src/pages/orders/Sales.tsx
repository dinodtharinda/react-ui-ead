import { useEffect, useState } from "react";

import { DataTable } from "../../components/dataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { PRODUCT_BASE_URL, SALES_BASE_URL } from "../../data";
import { deleteData, getData } from "../../components/API/HttpService";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { CircularProgress, IconButton, Snackbar } from "@mui/material";
import React from "react";
const Sales = () => {
  const [sales, setSales] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Actions",
    width: 70,
    renderCell: (param) => {
      return (
        <div className="action">
        <div className="delete" onClick={()=>handleDelete(param.row.id)}>
          <img src="/delete.svg" alt="" />
        </div>
        </div>
        
      );
    },
  };
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleDelete = (id:number)=>{
    console.log(id)
    deleteData(`${SALES_BASE_URL}/api/v1/sales/${id}`).then((res: any) => {
      // setIsLoading(true)
      console.log(res)
      if (res.status) {
        setSnackbarMessage(
          `Deleted!`
        );
        getAllSales()
      }else{
        setSnackbarMessage(
          `Deletion Failed!`
        );
      }
      setIsLoading(false);
    });
  }
  const columns: GridColDef[] = [
    
    { field: "reference_no", headerName: "Reference no", sortable: true, width: 200 },
    { field: "customer_name", headerName: "Customer", sortable: true, width: 150 },
    { field: "total_amount", headerName: "Total Amount", sortable: true, width: 150 },
    { field: "order_discount", headerName: "Order Discount", sortable: true, width: 150 },
    { field: "grand_total", headerName: "Grand Total", sortable: true, width: 150 },
    { field: "paid_amount", headerName: "Paid Amount", sortable: true, width: 150 },
    actionColumn
  ];


const getAllSales = () => {
   getData(`${SALES_BASE_URL}/api/v1/sales`).then((res: any) => {
      if (res["status"]) {
        setSales(res.data);
      }
      setIsLoading(false);
    });
}
 
  useEffect(() => {
   getAllSales()
  }, []);
  const handleCloseSnackbar = () => {
    setSnackbarMessage("");
  };
  return (
    <div className="products">
      <h1>
        <img src="/orders.png" style={{"width":"50px"}} alt="" />
        Sales
        </h1>
      <Link to={"/new-sale"}>
        <button className="btn btn-primary my-2">Place New Sale</button>
      </Link>

      <DataTable
        columns={columns}
        rows={sales}
        isLoading={isLoading}
        slug="products"
      />
       <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={!!snackbarMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              {/* <CloseIcon fontSize="small" /> */}
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

export default Sales;


