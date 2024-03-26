import { IconButton, Snackbar } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { getData, putData } from "../../components/API/HttpService";
import { CUSTOMER_BASE_URL } from "../../data";
import { useParams } from "react-router-dom";

export const Customer = () => {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState({
    id: "",
    f_name: "",
    l_name: "",
    email: "",
    phone_number:""

  });

  const [editingCustomer, setEditingCustomer] = useState({ ...customer });
  const [snackbarMessage, setSnackbarMessage] = useState("");
  useEffect(() => {
  
    getCustomerDetails();
  }, []);

  const getCustomerDetails = () => {
    getData(`${CUSTOMER_BASE_URL}/api/v1/customers/${id}`).then((res: any) => {
      if (res.status) {
        setCustomer(res.data);
        setEditingCustomer(res.data);
      } else {
        console.log(res.message);
      }
    });
  };



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingCustomer({ ...editingCustomer, [name]: value });
  };

  const handleUpdateProduct = () => {
    putData(`${CUSTOMER_BASE_URL}/api/v1/customers/${id}`, editingCustomer)
      .then((res: any) => {
        if (res.status) {
          setSnackbarMessage("Product updated successfully.");
        }
        console.log(res.message);
      })
      .catch((error: any) => {
        setSnackbarMessage(
          `Failed to update product. Please try again. ${error}`
        );
      });
  };
  const handleCloseSnackbar = () => {
    setSnackbarMessage("");
  };
  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="details">
            <div className="item">
              <span className="itemTitle">First Name:</span>
              <input
                type="text"
                name="f_name"
                value={editingCustomer.f_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="item">
              <span className="itemTitle">Last Name:</span>
              <input
                type="text"
                name="l_name"
                value={editingCustomer.l_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="item">
              <span className="itemTitle">Contact Number:</span>
              <input
                type="number"
                name="phone_number"
                value={editingCustomer.phone_number}
                onChange={handleInputChange}
              />
            </div>
            <div className="item">
              <span className="itemTitle">Email:</span>
              <input
                type="text"
                name="email"
                value={editingCustomer.email}
                onChange={handleInputChange}
              />
            </div>
           
          </div>
          <div className="bottomInfo">
            <button className="updateButton" onClick={handleUpdateProduct}>
              Update
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
};
