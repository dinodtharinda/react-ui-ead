import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import { LoginForm } from "./pages/login/LoginForm";
import "./styles/global.scss";
import { AuthContext } from "./components/routeManage/RouteManage";
import { useContext } from "react";
import { Product } from "./pages/product/Product";
import { User } from "./pages/user/User";
import { NewProduct } from "./pages/product/NewProduct";
import { Customers } from "./pages/customers/Customers";
import Categorys from "./pages/categories/Categorys";
import { NewCategory } from "./pages/categories/NewCategory";



function App() {
  const { authenticated } = useContext(AuthContext)!;
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
         
              <Outlet />
          
          </div>
        </div>
        <Footer  />
      </div>
    );
  };

  const login = createBrowserRouter([
    {
      path: "/*",
      element: <LoginForm />,
    },
  ]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/products",
          element: <Products />,
        },

        {
          path: "/users/:id",
          element: <User />,
        },
        {
          path: "/products/:id",
          element: <Product />,
        },
        {
          path: "/customers",
          element: <Customers />,
        },
        {
          path: "new-product",
          element: <NewProduct />,
        },
        {
          path: "categorys",
          element: <Categorys />,
        }, {
          path: "new-categories",
          element: <NewCategory />,
        },
      ],
    },
  ]);
  // console.log(authenticated);
  return authenticated ? <RouterProvider router={router} />:<RouterProvider router={login} />;
}

export default App;
