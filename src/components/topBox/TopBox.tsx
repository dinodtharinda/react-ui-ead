import React, { useEffect, useState } from "react";
import { PRODUCT_BASE_URL, topDealUsers } from "../../data";
import "./topBox.scss";
import { getData } from "../API/HttpService";

export const TopBox = () => {
  const [products, setProducts] = useState([{
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
  }]);
  const getAllProducts = () => {
    getData(`${PRODUCT_BASE_URL}/api/v1/products`).then((res: any) => {
       if (res["status"]) {
         setProducts(res.data);
       }
      
     });
 }

 useEffect(() => {
  getAllProducts()
 }, []);
  return (
    <div className="topBox">
      <h1>Products</h1>
      <div className="list">
        {products.map((product) => (
          <div className="listItem" key={product.id}>
            <div className="user">
            <img
            src={
              product.image?  `data:image/jpeg;base64,${product.image}` : "https://th.bing.com/th/id/OIP.gV1cXI_SNBK_nU1yrE_hcwHaGp?rs=1&pid=ImgDetMain"
            }
            alt=""
          />
              <div className="userTexts">
                <span className="userName">{product.name}</span>
                <span className="email">Quantity {product.qty}</span>
              </div>
            </div>
            <span className="amount">Rs {product.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
