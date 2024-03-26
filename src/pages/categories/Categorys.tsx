import { useEffect, useState } from "react";
import "./categorys.scss";
import { DataTable } from "../../components/dataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { PRODUCT_BASE_URL } from "../../data";
import { deleteData, getData } from "../../components/API/HttpService";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { IconButton, Snackbar } from "@mui/material";
import React from "react";

const Categorys = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Delete",
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
    deleteData(`${PRODUCT_BASE_URL}/api/v1/categories/${id}`).then((res: any) => {
      // setIsLoading(true)
      console.log(res)
      if (res.status) {
        setSnackbarMessage(
          `Category Deleted!`
        );
        getAllCategories()
      }else{
        setSnackbarMessage(
          `Deletion Failed!`
        );
      }
      setIsLoading(false);
    });
  }
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", sortable: true, width: 200 },
    { field: "is_active", headerName: "Is Active", sortable: true, width: 100 },
    actionColumn
  ];

  const getAllCategories = ()=> {
     getData(`${PRODUCT_BASE_URL}/api/v1/categories`).then((res: any) => {
      if (res.status) {
        setProducts(res.data);
        console.log("Done");
      }else{
        console.log(res.message)
        console.log("fail");
      }
      setIsLoading(false);
    });
  }
  useEffect(() => {
    getAllCategories()
   
  }, []);
  const handleCloseSnackbar = () => {
    setSnackbarMessage("");
  };
  return (
    <div className="products">
      <h1>Categories</h1>
      <Link to={"/new-categories"}>
        <Button>Create New Category</Button>
      </Link>

      <DataTable
        columns={columns}
        rows={products}
        isLoading={isLoading}
        slug="categories"
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

export default Categorys;
