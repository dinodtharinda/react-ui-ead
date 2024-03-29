import React, { ChangeEvent, useEffect, useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';

import { IconButton, Snackbar } from "@mui/material";
import { PRODUCT_BASE_URL } from "../../data";
import {
  getData,
  postData,
  postFormData,
} from "../../components/API/HttpService";
import { Product } from "../product/Product";
interface Option {
  value: Product;
  label: string;
  qty: 1;
}

interface Product {
  id: "";
  name: "";
  code: "";
  category_id: "";
  price: "";
  cost: "";
  qty: "";
}
type SelectValue = Option[];
import Select, { ActionMeta } from "react-select";
import { GridColDef } from "@mui/x-data-grid";
import { DataTable } from "../../components/dataTable/DataTable";

export const NewSale = () => {
  const [sale, setSale] = useState({
    customer_id: 1,
    total_amount: 0,
    order_discount: 0,
    grand_total: 0,
    product_id: [],
    qty: [],
    unit_prices: [],
    total: [],
  });

  const [products, setProducts] = useState([
    {
      id: "",
      name: "",
      code: "",
      category_id: "",
      price: "",
      cost: "",
      qty: "",
      alert_quantity: "",
      image: "",
      description: "",
      is_active: false,
      created_at: "",
      updated_at: "",
    },
  ]);
  const [editingSale, setEditingSale] = useState({ ...sale });
  const [productOption, setProductOption] = useState<Option[]>();
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingSale({ ...editingSale, [name]: value });
  };

  const options: Option[] = [];
  useEffect(() => {
    getAllProducts();

    console.log(options);
  }, []);
  const columns: GridColDef[] = [
    {
      field: "avatar",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        return (
          <img
            src={
              params.row.image
                ? `data:image/jpeg;base64,${params.row.image}`
                : "https://th.bing.com/th/id/OIP.gV1cXI_SNBK_nU1yrE_hcwHaGp?rs=1&pid=ImgDetMain"
            }
            alt=""
          />
        );
      },
    },
    { field: "name", headerName: "Name", sortable: true, width: 200 },
    { field: "code", headerName: "Code", sortable: true, width: 150 },
    {
      field: "category_id",
      headerName: "Category",
      sortable: true,
      width: 150,
    },
    { field: "price", headerName: "Price", sortable: true, width: 150 },
    {
      field: "quentity",
      headerName: "Quantity",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="col form-group my-2">
            <input
              className="form-control"
              type="number"
              name="qty"
                // value={1}
              onChange={(e) => updateQty(params.row, e)}
            />
          </div>
        );
      },
    },
  ];

  const updateQty = (op: Product, e: any) => {
 
    const newOption: Option = {
      value: op,
      label: op.name,
      qty: e.target.value,
    };

    replaceSelectedValue(op, newOption);
  };

  const handleInsert = () => {
    //   console.log("Start insertion");
    //   postData(`${PRODUCT_BASE_URL}/api/v1/products`, editingSale)
    //     .then((res: any) => {
    //       if (res.status) {
    //         setSnackbarMessage("Product updated successfully.");
    //       } else {
    //         setSnackbarMessage(res.message);
    //       }
    //       console.log("Done insertion");
    //     })
    //     .catch((error: any) => {
    //       setSnackbarMessage(
    //         `Failed to update product. Please try again. ${error}`
    //       );
    //     });
    //   console.log("End insertion");
    console.log(selectedOptions)
  };

  const handleCloseSnackbar = () => {
    setSnackbarMessage("");
  };

  async function handleChange(
    newValue: SelectValue,
    actionMeta: ActionMeta<Option>
  ) {
    setSelectedOptions(newValue);
  }

  const replaceSelectedValue = (oldValue: Product, newValue: Option) => {
    console.log(newValue)
    const updatedOptions = selectedOptions.map((option) => {
      // Check if option and option.value are defined
      if (oldValue == option.value) {
        return newValue;
      }
      return option;
    });
    setSelectedOptions(updatedOptions);
    console.log(selectedOptions);
  };
  

  const getAllProducts = () => {
    getData(`${PRODUCT_BASE_URL}/api/v1/products`).then((res: any) => {
      if (res["status"]) {
        setProducts(res.data);
        const newOptions = res.data.map((product: any) => ({
          value: product,
          label: product.name,
        }));
        setProductOption(newOptions);
      }
    });
  };

  return (
    <div className="col-md-12">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Add New Sale</h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 form-group my-2">
              <span className="itemTitle">Total Amount:</span>
              <input
                type="number"
                name="price"
                className="form-control"
                value={editingSale.total_amount}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 form-group my-2">
              <span className="itemTitle">Order Discount:</span>
              <input
                className="form-control"
                type="number"
                name="cost"
                value={editingSale.order_discount}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 form-group my-2">
              <span className="itemTitle">Quantity:</span>
              <input
                className="form-control"
                type="number"
                name="qty"
                value={editingSale.qty}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 form-group my-2">
              <span className="itemTitle">Grand Total</span>
              <input
                className="form-control"
                type="number"
                name="alert_quantity"
                value={editingSale.grand_total}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-6 form-group my-2">
              <span className="itemTitle">Products</span>
              <Select
                options={productOption}
                isMulti
                value={selectedOptions}
                onChange={(newValue, actionMeta) =>
                  handleChange(newValue as SelectValue, actionMeta)
                }
              />
            </div>

            <div className="bottomInfo">
              <button
                className="updateButton btn btn-primary mt-3 w-25"
                onClick={handleInsert}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <DataTable
        columns={columns}
        rows={
          selectedOptions?.map((op) => {
            return op.value;
          }) ?? []
        }
        isLoading={false}
        slug="products"
      />
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
