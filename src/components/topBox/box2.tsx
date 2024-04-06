import React, { useEffect, useState } from "react";
import { CUSTOMER_BASE_URL, PRODUCT_BASE_URL, topDealUsers } from "../../data";
import "./topBox.scss";
import { getData } from "../API/HttpService";

export const Box2 = () => {
  const [customers, setCustomers] = useState();
  const getAllCustomers = () => {
    getData(`${CUSTOMER_BASE_URL}/api/v1/customers/get-count`).then((res: any) => {
       if (res["status"]) {
         setCustomers(res.data);
       }
      
     });
 }

 useEffect(() => {
  getAllCustomers()
 }, []);
  return (
    <div className="topBox">
      <h3>Total Customers</h3>
      <div className="list" style={{alignItems:"center"}}>
        <h1 style={{justifyContent:"center",display:"flex"}}>{customers}</h1>
      </div>
    </div>
  );
};
