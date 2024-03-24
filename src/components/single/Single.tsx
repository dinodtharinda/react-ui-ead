// import React, { useEffect, useState } from "react";
// import "./single.scss";
// import { PRODUCT_BASE_URL } from "../../data";
// import { getData ,postData, putData } from "../API/HttpService";
// import { IconButton, Snackbar } from "@mui/material";
// import Base64ToImageConverter from "../utills/BaseToImage";

// type Props = {
//   id: string;
// };

// export const Single = (props: Props) => {
//   const [product, setProduct] = useState({
//     id: "",
//     name:"",
//     code: "",
//     category_id: "",
//     price: "",
//     cost:"",
//     qty: "",
//     alert_quantity: "",
//     image: "",
//     description: "",
//     is_active: false,
//     created_at: "",
//     updated_at: "",
//   });




//   const [editingProduct, setEditingProduct] = useState({ ...product });
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   useEffect(() => {
//     getData(`${PRODUCT_BASE_URL}/api/v1/products/${props.id}`).then(
//       (res: any) => {
//         if (res.status) {
//           setProduct(res.data);
//           setEditingProduct(res.data);
       

//         }else{
//           console.log(res.message)
//         }
//       }
//     );
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setEditingProduct({ ...editingProduct, [name]: value });
//   };

//   const handleUpdateProduct = () => {
//     putData(`${PRODUCT_BASE_URL}/api/v1/products/${props.id}`, editingProduct)
//       .then((res: any) => {
//         if (res.status) {
//           setSnackbarMessage("Product updated successfully.");
//         }
//         console.log(res.message)
//       })
//       .catch((error: any) => {
//         setSnackbarMessage("Failed to update product. Please try again.");
//       });
//   };
//   const handleCloseSnackbar = () => {
//     setSnackbarMessage("");
//   };
//   return (
//     <div className="single">
//       <div className="view">
//         <div className="info">
//           <div className="details">
//             <div className="item">
//               <span className="itemTitle">Name:</span>
//               <input
//                 type="text"
//                 name="name"
//                 value={editingProduct.name}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="item">
//               <span className="itemTitle">Code:</span>
//               <input
//                 type="text"
//                 name="code"
//                 value={editingProduct.code}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="item">
//               <span className="itemTitle">Category ID:</span>
//               <input
//                 type="text"
//                 name="category_id"
//                 value={editingProduct.category_id}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="item">
//               <span className="itemTitle">Price:</span>
//               <input
//                 type="text"
//                 name="price"
//                 value={editingProduct.price}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="item">
//               <span className="itemTitle">Cost:</span>
//               <input
//                 type="text"
//                 name="cost"
//                 value={editingProduct.cost}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="item">
//               <span className="itemTitle">Alert Quantity:</span>
//               <input
//                 type="text"
//                 name="alert_quantity"
//                 value={editingProduct.alert_quantity}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="item">
//               <span className="itemTitle">Description:</span>
//               <input
//                 type="text"
//                 name="description"
//                 value={editingProduct.description}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>
//           <div className="bottomInfo">
//             <button className="updateButton" onClick={handleUpdateProduct}>
//               Update
//             </button>
//           </div>
//         </div>
//         <div className="image">
        
//           <img
//             src={`data:image/jpeg;base64,${product.image}`}
//             alt=""
//           />
//         </div>
//       </div>
//       <Snackbar
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "left",
//         }}
//         open={!!snackbarMessage}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         message={snackbarMessage}
//         action={
//           <React.Fragment>
//             <IconButton
//               size="small"
//               aria-label="close"
//               color="inherit"
//               onClick={handleCloseSnackbar}
//             >
//               {/* <CloseIcon fontSize="small" /> */}
//             </IconButton>
//           </React.Fragment>
//         }
//       />
//     </div>
//   );
// };
