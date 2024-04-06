import React, { ChangeEvent, useEffect, useState } from "react";
import "./newProduct.scss";
// import 'bootstrap/dist/css/bootstrap.min.css';

import { IconButton, Snackbar } from "@mui/material";
import { PRODUCT_BASE_URL } from "../../data";
import {
  getData,
  postData,
  postFormData,
} from "../../components/API/HttpService";
import { useNavigate } from "react-router-dom";

export const NewProduct = () => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    code: "",
    category_id: "",
    price: "",
    cost: "",
    qty: "",
    alert_quantity: "",
    image: "",
    description: "",
    is_active: true,
    created_at: "",
    updated_at: "",
  });
  const navigate = useNavigate();

  const handleRedirectBack = () => {
    navigate(-1); // -1 goes back one step in history
  };

  const [editingProduct, setEditingProduct] = useState({ ...product });
  const [categories, setCategories] = useState([{ id: "", name: "name" }]);

  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  useEffect(() => {
    getData(`${PRODUCT_BASE_URL}/api/v1/categories`).then((res: any) => {
      if (res.status) {
        setCategories(res.data);
      } else {
        console.log(res.message);
      }
    });
  }, []);
  const handleInsertProduct = () => {
    console.log("Start insertion");
    postData(`${PRODUCT_BASE_URL}/api/v1/products`, editingProduct)
      .then((res: any) => {
        if (res.status) {
          setSnackbarMessage("Product added successfully.");
          handleRedirectBack()
        } else {
          setSnackbarMessage(res.message);
        }

        console.log("Done insertion");
      })
      .catch((error: any) => {
        setSnackbarMessage(
          `Failed to update product. Please try again. ${error}`
        );
      });
    console.log("End insertion");
    console.log(editingProduct.image)
  };
  const handleCategoriesOption = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };
  const handleCloseSnackbar = () => {
    setSnackbarMessage("");
  };
  const handleImageChange = (event:any) => {
    const selectedImage = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setEditingProduct({
        ...editingProduct,
        image: arrayBufferToBase64(reader.result as ArrayBuffer), // Set the image to the base64 encoded string
      });
    };

    if (selectedImage) {
      reader.readAsArrayBuffer(selectedImage); // Convert the image to base64
    }
  };
  function arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    console.log("done convert")
    console.log(binary)

    return btoa(binary);
  }

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };
  return (
    <div className="col-md-12">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Add New Product</h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 form-group my-2">
              <span className="itemTitle">Name:</span>
              <input
                 className="form-control"
                type="text"
                name="name"
                value={editingProduct.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 form-group my-2">
              <span className="itemTitle">Code:</span>
              <input
                type="text"
                name="code"
                className="form-control"
                value={editingProduct.code}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 form-group my-2">
              <span className="itemTitle">Category:</span>
              <select
                 className="form-control"
                name="category_id"
                value={editingProduct.category_id}
                onChange={handleCategoriesOption}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 form-group my-2">
              <span className="itemTitle">Price:</span>
              <input
              
                type="number"
                name="price"
                className="form-control"
                value={editingProduct.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 form-group my-2">
              <span className="itemTitle">Cost:</span>
              <input
                 className="form-control"
                type="number"
                name="cost"
                value={editingProduct.cost}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 form-group my-2">
              <span className="itemTitle">Quantity:</span>
              <input
                 className="form-control"
                type="number"
                name="qty"
                value={editingProduct.qty}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 form-group my-2">
              <span className="itemTitle">Alert Quantity:</span>
              <input
                 className="form-control"
                type="number"
                name="alert_quantity"
                value={editingProduct.alert_quantity}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-12 form-group my-2">
              <span className="itemTitle">Description:</span>
              <textarea
                className="form-control"
                name="description"
                value={editingProduct.description}
                onChange={handleTextAreaChange}
              />
            </div>
            <div className="col-md-6 form-group mt-3">
              <label className="itemTitle">Image:</label>
              <input type="file" className="form-control"  onChange={handleImageChange} />

              {/* Render the image */}
            
              <div className="image">
                <img style={{"width":"315px","height":"auto","objectFit":"contain"}}
                  src={
                    editingProduct.image ?  `data:image/png;base64,${editingProduct.image}` :"https://th.bing.com/th/id/OIP.gV1cXI_SNBK_nU1yrE_hcwHaGp?rs=1&pid=ImgDetMain"
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="bottomInfo">
              <button className="updateButton btn btn-primary mt-3 w-25" onClick={handleInsertProduct}>
                Submit
              </button>
            </div>
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
