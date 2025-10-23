import ShowProduct from "./component/product/ShowProduct";
import {Route, Routes} from 'react-router';
import CreateProductForm from "./component/product/createProduct";

const App=()=>{
  return(
    <>
    <Routes>
      <Route path="/" element={<ShowProduct/>} />
      <Route path="/create" element={<CreateProductForm/>} />
      <Route path="*" element={<ShowProduct/>} />
    </Routes>
    </>
  );
}
export default App;