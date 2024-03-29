import { useEffect, useState } from "react";
import "./categorys.scss";
import { DataTable } from "../../components/dataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { PRODUCT_BASE_URL } from "../../data";
import { deleteData, getData, postData } from "../../components/API/HttpService";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { IconButton, Snackbar } from "@mui/material";
import React from "react";

const Categorys = () => {
  const [categories, setCategories] = useState([]);
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
    actionColumn
  ];

  const getAllCategories = ()=> {
     getData(`${PRODUCT_BASE_URL}/api/v1/categories`).then((res: any) => {
      if (res.status) {
        setCategories(res.data);
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


  const [category, setCategory] = useState({ name: "", is_active: true });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSaveCate = () => {
    if(category.name != ""){
 postData(`${PRODUCT_BASE_URL}/api/v1/categories`, category)
    .then((res: any) => {
      if (res.status) {
        setSnackbarMessage("Category Created Successful!.");
        getAllCategories()
      }
      console.log(res.message);
    })
    .catch((error: any) => {
      setSnackbarMessage(
        `Failed to created Category. Please try again. ${error}`
      );
    });
    }else{
      setSnackbarMessage(
        `Please Fill Category Name`
      );
    }
   
  };
  return (
    <div className="col-md-12">
      <h1>
        <img src="/categories.png" alt="" />
        Categories
      </h1>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Add New Category</h2>
        </div>
        <div className="card-body">
          <div className="col-md-6">
            <span className="itemTitle">Category Name:</span>
            <input
            className="form-control"
              type="text"
              name="name"
              onChange={handleInputChange}
            />
          </div>
         
            <button className="btn btn-primary my-2" onClick={handleSaveCate}>Submit</button>
      
        </div>
      </div>
      <div className="products mt-4">
        <DataTable
          columns={columns}
          rows={categories}
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
    </div>
    
  );
};

export default Categorys;
