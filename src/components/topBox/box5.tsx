import React, { useEffect, useState } from "react";
import { PRODUCT_BASE_URL, SALES_BASE_URL, topDealUsers } from "../../data";
import "./topBox.scss";
import { getData } from "../API/HttpService";

export const Box5 = () => {
    const [sales, setSales] = useState();
    const getAllSales = () => {
      getData(`${SALES_BASE_URL}/api/v1/sales/get-count`).then((res: any) => {
         if (res["status"]) {
           setSales(res.data);
         }
        
       });
   }
  
   useEffect(() => {
    getAllSales()
   }, []);
    return (
      <div className="topBox">
        <h3>Total Sales</h3>
        <div className="list">
          <h1 style={{justifyContent:"center",display:"flex"}}>{sales}</h1>
        </div>
      </div>
    );
};
