// App.jsx
import { Routes, Route } from "react-router";
import ShowProduct from "./component/product/ShowProduct";
import CreateProductForm from "./component/product/createProduct";
import IndividualProduct from "./component/product/individualProduct";
import Navbar from "./component/product/Navbar";
import SearchProduct from "./component/product/SearchProduct";
import Register from "./component/user/Register";
import Login from "./component/user/Login";
import CategoryProduct from "./component/product/CategoryProduct";
import Profile from "./component/user/Profile";
import Cart from "./component/product/Cart";
import AddressPage from "./component/Address";
import OrderSummaryPage from "./component/OrderSummaryPage";


const App = () => {
  return (<>
  

      {/* App Content */}
      <div className="relative z-10">
        <Navbar />

        {/* Main Content with small margin below navbar */}
        <div className="mt-10 bg-gray-50 min-h-screen">
          <Routes>
            <Route path="/" element={<ShowProduct />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/create" element={<CreateProductForm />} />
            <Route path="/product/:id" element={<IndividualProduct />} />
            <Route path="/product/search/:id" element={<SearchProduct />} />
            <Route path="/category/:category" element={<CategoryProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/address" element={<AddressPage />} />
            <Route path="/order-summary" element={<OrderSummaryPage />} />

            <Route path="*" element={<ShowProduct />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
