import React, { ChangeEvent, useEffect, useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';

import { IconButton, Snackbar } from "@mui/material";
import { CUSTOMER_BASE_URL, PRODUCT_BASE_URL, SALES_BASE_URL } from "../../data";
import {
  getData,
  postData,
  postFormData,
} from "../../components/API/HttpService";

import Select, { ActionMeta } from "react-select";
import { GridColDef } from "@mui/x-data-grid";
import { DataTable } from "../../components/dataTable/DataTable";

interface Option {
  value: ProductModel;
  label: string;
}

interface ProductModel {
  id: "";
  name: "";
  code: "";
  category_id: "";
  price: 0;
  cost: "";
  image: "";
  quantity:number ;
}
// type SelectValue = Option[];

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

  const [editingSale, setEditingSale] = useState({ ...sale });
  const [productOption, setProductOption] = useState<Option[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [totalAmout, setTotalAmount] = useState(0.0);
  const [quantity, setQuantity] = useState(0.0);
  const [discount, setDiscount] = useState(0.0);
  const [grandTotal, setGrandTotal] = useState(0.0);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingSale({ ...editingSale, [name]: value });
  };

  const options: Option[] = [];
  useEffect(() => {
    getAllProducts();
    getAllCustomers()
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
              min={1}
              // placeholder="1"
              value={params.row.quantity}
              onChange={(e) => updateQty(params.row, e)}
            />
          </div>
        );
      },
    },
  ];

  const updateQty = (op: ProductModel, e: any) => {
    const newPro: ProductModel = {
      id: op.id,
      name: op.name,
      code: op.code,
      category_id: op.category_id,
      price: op.price,
      cost: op.cost,
      image: op.image,
      quantity: parseInt(e.target.value),
    };
    const newOption: Option = {
      value: newPro,
      label: op.name,
    };

    replaceSelectedValue(op, newOption);
    
  };

  const calculate = (op: Option[],dis:number) => {
    var newTotal = 0;
    var newQty = 0;
    var newGTotal = 0;
    var saleQty :number[] =[]
    var saleUnitPrice:number[] =[]
    var saleTotals :number[] =[]
    var saleProducts:string[] = []
    op.forEach((element) => {
      const sub = element.value.price * element.value.quantity;
      saleQty.push(element.value.quantity)
      saleTotals.push(sub)
      saleUnitPrice.push(element.value.price)
      saleProducts.push(element.value.id)
      newTotal = newTotal + sub;
      newQty = newQty + element.value.quantity;
    });

    newGTotal = newTotal - dis;

    setEditingSale({
      ...editingSale,
      total_amount: newTotal,
      grand_total: newGTotal,
      product_id: saleProducts as never[],
      unit_prices: saleUnitPrice as never[],
      total: saleTotals as never[],
      order_discount:dis,
      qty: saleQty as never[]
    });

    setGrandTotal(newGTotal)
    setQuantity(newQty)
    setTotalAmount(newTotal);
  };

  const handleInsert = () => {
      console.log("Start insertion");
      postData(`${SALES_BASE_URL}/api/v1/sales`, editingSale)
        .then((res: any) => {
          if (res.status) {
            setSnackbarMessage("Sale Placed successfully.");
          } else {
            setSnackbarMessage(res.message);
          }
          console.log("Done insertion");
        })
        .catch((error: any) => {
          setSnackbarMessage(
            `Failed to update Sale. Please try again. ${error}`
          );
        });
      console.log("End insertion");
    console.log(editingSale);
  };

  const handleCloseSnackbar = () => {
    setSnackbarMessage("");
  };

  async function handleSelectChange(
    newValue: Option[],
    actionMeta: ActionMeta<Option>
  ) {
    calculate(newValue,discount);
    setSelectedOptions(newValue);
  }

  const replaceSelectedValue = (oldValue: any, newValue: Option) => {
    console.log(newValue);
    const updatedOptions = selectedOptions.map((option) => {
      // Check if option and option.value are defined
      if (oldValue == option.value) {
        return newValue;
      }
      return option;
    });
    setSelectedOptions(updatedOptions);
    console.log(selectedOptions);
    calculate(updatedOptions,discount);
  };


  const getAllProducts = () => {
    calculate(selectedOptions,discount);
    getData(`${PRODUCT_BASE_URL}/api/v1/products`).then((res: any) => {
      if (res["status"]) {
        // setProducts(res.data);
        const newOptions = res.data.map((product: any) => {
          const products: ProductModel = {
            id: product.id,
            name: product.name,
            code: product.code,
            category_id: product.category_id,
            price: product.price,
            image: product.image,
            cost: product.cost,
            quantity: 1,
          };
          return {
            value: products,
            label: product.name,
          };
        });
        setProductOption(newOptions);
      }
    });
  };
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


  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDiscount(parseInt(value));
    calculate(selectedOptions,parseInt(value));
  };

  const handleCategoriesOption = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSale({ ...sale, [name]: value });
  };

  return (
    <div className="col-md-12">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Add New Sale</h2>
        </div>
      </div>
      <div className="col-md-6 form-group my-2">
        <span className="itemTitle">Products</span>
        <Select
          options={productOption}
          isMulti
          value={selectedOptions}
          onChange={(newValue, actionMeta) =>
            handleSelectChange(newValue as Option[], actionMeta)
          }
        />
      </div>
      <div className="col-md-6 form-group my-2">
              <span className="itemTitle">Customer:</span>
              <select
                 className="form-control"
                name="customer_id"
                value={sale.customer_id}
                onChange={handleCategoriesOption}
              >
                <option value="">Select Customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.f_name}>
                 {customer.id}   {customer.f_name} {customer.l_name}
                  </option>
                ))}
              </select>
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
      <div className="card-body">
        <div className="row">
          <div className="col-md-6 form-group my-2">
            <span className="itemTitle">Total Amount:</span>
            <input
              type="number"
              name="price"
              className="form-control"
              value={totalAmout}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 form-group my-2">
            <span className="itemTitle">Order Discount:</span>
            <input
              className="form-control"
              type="number"
              name="cost"
              value={discount}
              onChange={handleDiscountChange}
            />
          </div>
          <div className="col-md-6 form-group my-2">
            <span className="itemTitle">Quantity:</span>
            <input
              className="form-control"
              type="number"
              name="qty"
              value={quantity}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 form-group my-2">
            <span className="itemTitle">Grand Total</span>
            <input
              className="form-control"
              type="number"
              name="alert_quantity"
              value={grandTotal}
              onChange={handleInputChange}
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
