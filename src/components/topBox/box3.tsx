import React, { useEffect, useState } from "react";
import { PRODUCT_BASE_URL, topDealUsers } from "../../data";
import "./topBox.scss";
import { getData } from "../API/HttpService";

export const Box3 = () => {
    const [Products, setProducts] = useState();
    const getAllCustomers = () => {
      getData(`${PRODUCT_BASE_URL}/api/v1/products/get-count`).then((res: any) => {
         if (res["status"]) {
           setProducts(res.data);
         }
        
       });
   }
  
   useEffect(() => {
    getAllCustomers()
   }, []);
    return (
      <div className="topBox">
        <h3>Total Products</h3>
        <div className="list">
          <h1 style={{justifyContent:"center",display:"flex"}}>{Products}</h1>
        </div>
      </div>
    );
};
