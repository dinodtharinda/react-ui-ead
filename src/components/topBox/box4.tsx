import React, { useEffect, useState } from "react";
import { CUSTOMER_BASE_URL, PRODUCT_BASE_URL, topDealUsers } from "../../data";
import "./topBox.scss";
import { getData } from "../API/HttpService";

export const Box4 = () => {
  const [customers, setCustomers] = useState([{
    id: "",
    f_name: "",
    l_name: "",
    email: "",
    phone_number:""
  }]);
  const getAllCustomers = () => {
    getData(`${CUSTOMER_BASE_URL}/api/v1/customers`).then((res: any) => {
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
      <h1>Customers</h1>
      <div className="list">
        {customers.map((customer) => (
          <div className="listItem" key={customer.id}>
            <div className="user">
            <img src={"https://lmd.lk/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"} alt="" />
              <div className="userTexts">
                <span className="userName">{customer.f_name} {customer.l_name}</span>
                <span className="email">{customer.email}</span>
                <span className="email">{customer.phone_number}</span>
              </div>     
              <div className="list-divider"></div>
            </div>
           
          </div>
         
        ))}
      </div>
    </div>
  );
};
