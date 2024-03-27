import React, { ChangeEvent, useEffect, useState } from "react";
import "./product.scss";

import { useParams } from "react-router-dom";
import { IconButton, Snackbar } from "@mui/material";
import { PRODUCT_BASE_URL } from "../../data";
import { getData, putData } from "../../components/API/HttpService";

export const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState({
    id: "",
    name:"",
    code: "",
    category_id: "",
    price: "",
    cost:"",
    qty: "",
    alert_quantity: "",
    image: "",
    description: "",
    is_active: false,
    created_at: "",
    updated_at: "",
  });



  const [categories, setCategories] = useState([{id:"",name:"name"}]);
  const [editingProduct, setEditingProduct] = useState({ ...product });
  const [snackbarMessage, setSnackbarMessage] = useState("");
  useEffect(() => {
   getCategories()
   getProductDetails()
  }, []);

  const getProductDetails = () =>{
    getData(`${PRODUCT_BASE_URL}/api/v1/products/${id}`).then(
      (res: any) => {
        if (res.status) {
          setProduct(res.data);
          setEditingProduct(res.data);
       

        }else{
          console.log(res.message)
        }
      }
    );
  }


  const getCategories = ()=>{
    getData(`${PRODUCT_BASE_URL}/api/v1/categories`).then(
      (res: any) => {
        if (res.status) {
          setCategories(res.data)
        }else{
          console.log(res.message)
        }
      }
    );
  }
  const handleCategoriesOption = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
   const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  const handleUpdateProduct = () => {
    putData(`${PRODUCT_BASE_URL}/api/v1/products/${id}`, editingProduct)
      .then((res: any) => {
        if (res.status) {
          setSnackbarMessage("Product updated successfully.");
        }
        console.log(res.message)
      })
      .catch((error: any) => {
        setSnackbarMessage(`Failed to update product. Please try again. ${error}`);
      });
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
  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="details">
            <div className="item">
              <span className="itemTitle">Name:</span>
              <input
                type="text"
                name="name"
                value={editingProduct.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="item">
              <span className="itemTitle">Code:</span>
              <input
                type="text"
                name="code"
                value={editingProduct.code}
                onChange={handleInputChange}
              />
            </div>
            <div className="item">
              <span className="itemTitle">Category:</span>
              <select
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
            <div className="item">
              <span className="itemTitle">Price:</span>
              <input
                type="number"
                name="price"
                value={editingProduct.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="item">
              <span className="itemTitle">Cost:</span>
              <input
                type="number"
                name="cost"
                value={editingProduct.cost}
                onChange={handleInputChange}
              />
            </div>
            <div className="item">
              <span className="itemTitle">Alert Quantity:</span>
              <input
                type="number"
                name="alert_quantity"
                value={editingProduct.alert_quantity}
                onChange={handleInputChange}
              />
            </div>
            <div className="item">
              <span className="itemTitle">Description:</span>
              <input
                type="text"
                name="description"
                value={editingProduct.description}
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
        <div>
          {/* Input element for choosing image */}
          <input type="file" onChange={handleImageChange} />

          {/* Render the image */}
         
          <div className="image">
            <img
              src={
                editingProduct.image ?  `data:image/png;base64,${editingProduct.image}` :"https://th.bing.com/th/id/OIP.gV1cXI_SNBK_nU1yrE_hcwHaGp?rs=1&pid=ImgDetMain"
              }
              alt=""
            />
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
