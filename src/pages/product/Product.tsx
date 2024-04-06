import React, { ChangeEvent, useEffect, useState } from "react";
// import "./product.scss";*
import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate, useParams } from "react-router-dom";
// import { IconButton, Snackbar } from "@mui/material";
import { PRODUCT_BASE_URL } from "../../data";
import { getData, putData } from "../../components/API/HttpService";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";

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
  const navigate = useNavigate();

  const handleRedirectBack = () => {
    navigate(-1); // -1 goes back one step in history
  };
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


  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  const handleUpdateProduct = () => {
    putData(`${PRODUCT_BASE_URL}/api/v1/products/${id}`, editingProduct)
      .then((res: any) => {
        if (res.status) {
          setSnackbarMessage("Product updated successfully.");
          handleRedirectBack()
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
    <div className="col-md-12">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Update Product</h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 form-group my-2">
              <label className="itemTitle">Name:</label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={editingProduct.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 form-group my-2">
              <label className="itemTitle">Code:</label>
              <input
                className="form-control"
                type="text"
                name="code"
                value={editingProduct.code}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 form-group my-2">
              <label className="itemTitle">Category:</label>
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
              <label className="itemTitle">Price:</label>
              <input
                className="form-control"
                type="number"
                name="price"
                value={editingProduct.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 form-group my-2">
              <label className="itemTitle">Cost:</label>
              <input
                className="form-control"
                type="number"
                name="cost"
                value={editingProduct.cost}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 form-group my-2">
              <label className="itemTitle">Quantity:</label>
              <input
                className="form-control"
                type="number"
                name="qty"
                value={editingProduct.qty}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 form-group my-2">
              <label className="itemTitle">Alert Quantity:</label>
              <input
                className="form-control"
                type="number"
                name="alert_quantity"
                value={editingProduct.alert_quantity}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 form-group my-2">
              <label className="itemTitle">Description:</label>
              <textarea
                className="form-control"
                name="description"
                value={editingProduct.description}
                onChange={handleTextAreaChange}
              />
            </div>
            <div className="col-md-6 form-group my-2">
              <label className="itemTitle">Image:</label>
              <input 
                type="file" 
                className="form-control" 
                onChange={handleImageChange} 
              />
              <div className="image">
                <img style={{"width":"315px","height":"200px","objectFit":"contain"}}
                  src={
                    editingProduct.image ?  `data:image/png;base64,${editingProduct.image}` :"https://th.bing.com/th/id/OIP.gV1cXI_SNBK_nU1yrE_hcwHaGp?rs=1&pid=ImgDetMain"
                  }
                  alt=""
                />
              </div>
              
            </div>
          </div>
          <div className="bottomInfo mt-3">
                <button className="updateButton btn btn-primary w-25" onClick={handleUpdateProduct}>
                  Update
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
