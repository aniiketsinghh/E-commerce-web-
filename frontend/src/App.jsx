// App.jsx
import { Routes, Route } from "react-router";
import ShowProduct from "./component/product/ShowProduct";
import CreateProductForm from "./component/product/createProduct";
import IndividualProduct from "./component/product/individualProduct";
import Navbar from "./component/product/Navbar";
import SearchProduct from "./component/product/SearchProduct";
import Register from "./component/user/Register";
import Login from "./component/user/Login";
const App = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOFj8pVUJDzcq3-SZMO5PoNXPuNXbFk_BSpA&s')`,
      }}
    >
      {/* Optional Overlay */}
      <div className="absolute inset-0 bg-black/20">

      {/* App Content */}
      <div className="relative z-10">
        <Navbar/>
        <div className="pt-16 bg-gray-50 min-h-screen">
        <Routes>

          <Route path="/" element={<ShowProduct />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateProductForm />} />
          <Route path="/product/:id" element={<IndividualProduct />} />
          <Route path="/product/search/:id" element={<SearchProduct />} />
          <Route path="*" element={<ShowProduct />} />
        </Routes>
        </div>
        </div>
      </div>
    </div>
  );
};

export default App;
