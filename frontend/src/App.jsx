// App.jsx
import { Routes, Route } from "react-router";
import ShowProduct from "./component/product/ShowProduct";
import CreateProductForm from "./component/product/createProduct";
import IndividualProduct from "./component/product/individualProduct";

const App = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOFj8pVUJDzcq3-SZMO5PoNXPuNXbFk_BSpA&s')`,
      }}
    >
      {/* Optional Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* App Content */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<ShowProduct />} />
          <Route path="/create" element={<CreateProductForm />} />
          <Route path="/product/:id" element={<IndividualProduct />} />
          <Route path="*" element={<ShowProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
