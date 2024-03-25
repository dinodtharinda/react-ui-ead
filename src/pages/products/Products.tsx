import { useEffect, useState } from "react";
import "./products.scss";
import { DataTable } from "../../components/dataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { PRODUCT_BASE_URL } from "../../data";
import { getData } from "../../components/API/HttpService";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Actions",
    width: 70,
    renderCell: (param) => {
      return (
        <div className="action">
          <Link to={`/products/${param.row.id}`}>
            <img src="/view.svg" alt="" />
          </Link>
        <div className="delete" onClick={()=>handleDelete(param.row.id)}>
          <img src="/delete.svg" alt="" />
        </div>
        </div>
        
      );
    },
  };

  const handleDelete = (id:number)=>{
    //delete item
    console.log(id + "Has been deleted!")
  }
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", sortable: true, width: 50 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => {
        return (
          <img
            src={
              `data:image/jpeg;base64,${params.row.image}` || "/noavatar.png"
            }
            alt=""
          />
        );
      },
    },
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
    actionColumn
  ];



 
  useEffect(() => {
    getData(`${PRODUCT_BASE_URL}/api/v1/products`).then((res: any) => {
      if (res["status"]) {
        setProducts(res.data);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="products">
      <h1>Products</h1>
      <Link to={"/new-product"}>
        <Button>Create New</Button>
      </Link>

      <DataTable
        columns={columns}
        rows={products}
        isLoading={isLoading}
        slug="products"
      />
    </div>
  );
};

export default Products;
