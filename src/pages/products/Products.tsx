import React, { useEffect, useState } from "react";
import "./products.scss";
import { DataTable } from "../../components/dataTable/DataTable";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { PRODUCT_BASE_URL, USER_BASE_URL } from "../../data";
import { getData } from "../../components/API/HttpService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", sortable: true, width: 50 },
    { field: "image", headerName: "Image", sortable: false, width: 100 },
    { field: "name", headerName: "Name", sortable: true, width: 200 },
    { field: "code", headerName: "Code", sortable: true, width: 50 },
    {
      field: "category_id",
      headerName: "Category ID",
      sortable: true,
      width: 100,
    },
    { field: "price", headerName: "Price", sortable: true, width: 150 },
    { field: "cost", headerName: "Cost", sortable: false, width: 100 },
    { field: "qty", headerName: "Quantity", sortable: true, width: 100 },
    {
      field: "alert_quantity",
      headerName: "Alert Quantity",
      sortable: true,
      width: 50,
    },

    { field: "is_active", headerName: "Is Active", sortable: true, width: 100 },
  ];
  useEffect(() => {
    getData(`${PRODUCT_BASE_URL}/api/v1/products`).then((res: any) => {
      if (res["status"]) {
        setProducts(res.data);
      }
    });
  }, []);

  return (
    <div className="users">
      <h1>Users</h1>

      <button>Add New User</button>
      <DataTable columns={columns} rows={products} slug="users" />
    </div>
  );
};

export default Products;
