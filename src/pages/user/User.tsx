import React, { useEffect, useState } from 'react'
import './user.scss'
import { IconButton, Snackbar } from '@mui/material';
import { CUSTOMER_BASE_URL, USER_BASE_URL } from '../../data';
import { getData, postData, putData } from '../../components/API/HttpService';
export const User = () => {
  const [admin, setAdmin] = useState({
    id: "",
    f_name: "",
    l_name: "",
    email: "",
    company_name:"",
    phone_number:""
  });

  const [editingUser, setEditingCustomer] = useState({ ...admin });
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingCustomer({ ...editingUser, [name]: value });
  };
  useEffect(() => {
    getUserData()
    }, [])
  const getUserData = ()=>{
    const id = localStorage.getItem("user")
    getData(`${USER_BASE_URL}/api/v1/users/${id}`)
      .then((res: any) => {
        if (res.status) {
         
          setAdmin(res.data);
          setEditingCustomer(res.data)
        }else{
          setSnackbarMessage(res.message);
        } 
      })
      .catch((error: any) => {
        setSnackbarMessage(
          `Failed to update product. Please try again. ${error}`
        );
      });
    console.log(editingUser)
  }

  const handleUpdateProduct = () => {
    const id = localStorage.getItem("user")
    putData(`${USER_BASE_URL}/api/v1/users/${id}`, editingUser)
      .then((res: any) => {
        if (res.status) {
          setSnackbarMessage("updated successfully.");
        }else{
          setSnackbarMessage(res.message);
        } 
      })
      .catch((error: any) => {
        setSnackbarMessage(
          `Failed to update product. Please try again. ${error}`
        );
      });
    console.log(editingUser)
  };
  const handleCloseSnackbar = () => {
    setSnackbarMessage("");
  };
  return (
    <div className="col-md-12">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">User Profile</h2>
        </div>
        <div className="card-body">
          <div>
            <div className="col-md-6 mt-2">
              <label className="itemTitle">First Name:</label>
              <input
                className="form-control"
                type="text"
                name="f_name"
                value={editingUser.f_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 mt-2">
              <span className="itemTitle">Last Name:</span>
              <input
                className="form-control"
                type="text"
                name="l_name"
                value={editingUser.l_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 mt-2">
              <span className="itemTitle">Contact Number:</span>
              <input
                className="form-control"
                type="number"
                name="phone_number"
                value={editingUser.phone_number}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 mt-2">
              <span className="itemTitle">Email:</span>
              <input
                className="form-control"
                type="text"
                name="email"
                value={editingUser.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 mt-2">
              <span className="itemTitle">Company Name:</span>
              <input
                className="form-control"
                type="text"
                name="company_name"
                value={editingUser.company_name}
                onChange={handleInputChange}
              />
            </div>
           
          </div>
          <div className="bottomInfo">
            <button className="updateButton btn btn-primary mt-3 w-25" onClick={handleUpdateProduct}>
              Submit
            </button>
          </div>
        </div>
        {/* <div className="image">
          
            <img
              src={`data:image/jpeg;base64,${product.image}`}
              alt=""
            />
          </div> */}
      </div>
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
}
