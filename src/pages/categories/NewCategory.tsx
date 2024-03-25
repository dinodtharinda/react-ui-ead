import { IconButton, Snackbar } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { PRODUCT_BASE_URL } from "../../data";
import { postData } from "../../components/API/HttpService";

export const NewCategory = () => {
  const [category, setCategory] = useState({ name: "", is_active: true });

  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSaveCate = () => {
    postData(`${PRODUCT_BASE_URL}/api/v1/categories`, category)
    .then((res: any) => {
      if (res.status) {
        setSnackbarMessage("Category Created Successful!.");
      }
      console.log(res.message);
    })
    .catch((error: any) => {
      setSnackbarMessage(
        `Failed to created Category. Please try again. ${error}`
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
              <span className="itemTitle">Category Name:</span>
              <input
                type="text"
                name="name"
                value={category.name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="bottomInfo">
            <button className="updateButton" onClick={handleSaveCate}>
              Save Product
            </button>
          </div>
        </div>
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
