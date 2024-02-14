import "react-loading-skeleton/dist/skeleton.css";
import "./App.css";
import { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayoutUser/BaseLayout";
import Home from "./pages/TrangChu";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Sanpham from "./pages/Sanpham";
import Thanhtoan from "./pages/Thanhtoan";
import Signup from "./pages/Signup/Signup";
import Signin from "./pages/Signin/Signin";
import Hoadon from "./pages/HoaDon/Hoadon";
import BaseLayoutadmin from "./layouts/BaseLayoutAdmin/BaseAdmin";
import Listproduct from "./components/Admin/Product/Listproduct/Listproduct";
import Listdanhmuc from "./components/Admin/Category/Listdanhmuc/Listdanhmuc";
import Listuser from "./components/Admin/Listuser/Listuser";
import Listdonhang from "./components/Admin/Listdonhang/Listdonhang";
import AddProductFormProps from "./components/Admin/Product/Addsanpham/Addsanpham";
import SuaSanPham from "./components/Admin/Product/Updatesanpham/Updatesanpham";
import AddCategory from "./components/Admin/Category/Adddanhmuc/Adddanhmuc";
import UpdateCategory from "./components/Admin/Category/UpdateCategory/UpdateCategory";
import { auth } from "./components/AuthFirebase/auth";
import { onAuthStateChanged } from 'firebase/auth';
import Dashboard from "./components/Admin/Thongke/Thongke";
import Suasanpham from "./components/Admin/Product/Updatesanpham/Updatesanpham";
import UpdateProductForm from "./components/Admin/Product/Updatesanpham/Updatesanpham";

interface Product {
  id: number;
  name: string;
  price: number;
}
interface Category {
  id: number;
  name: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategory] = useState<Category[]>([]);
  const [user, setUser] = useState(null);
  const [, setEmail] = useState(null);
  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const adminEmail = "maitranthi651@gmail.com";
  console.log(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      if (currentUser) {
        setUser(currentUser);
        setEmail(currentUser.email);
        if (currentUser.email === adminEmail) {
          setRole("admin");
        } else {
          setRole("admin");
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAddProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };
  const handleAddCate = (newCate: Product) => {
    setCategory([...categories, newCate]);
  }
  return (
    
    <Router>
      <Routes>
        {/* router user */}
        {/* <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route path="/products">
            <Route index element={<Sanpham />} />
            <Route path=":id" element={<ProductDetail />} />
          </Route>
          <Route path="/thanhtoan" element={<Thanhtoan />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/hoadon" element={<Hoadon />} />
        </Route> */}

        {/* router admin */}
        {role === "admin" && (
          <Route path="/" element={<BaseLayoutadmin />}>
            <Route index element={<Dashboard />} />
            <Route path="admin/products" element={<Listproduct  />} />
            <Route path="admin/addsanpham" element={<AddProductFormProps onAddProduct={handleAddProduct} />} />
            <Route path="admin/suasanpham/:id" element={<UpdateProductForm onUpdateProduct={function (product: any): void {
              throw new Error("Function not implemented.");
            } } />} />
            <Route path="admin/category">
              <Route index element={<Listdanhmuc />} />
              <Route path="addCate" element={<AddCategory onAddCategory={handleAddCate} />} />
              <Route path="updateCate/:id" element={<UpdateCategory />} />
            </Route>
            <Route path="admin/user" element={<Listuser />} />
            <Route path="admin/donhang" element={<Listdonhang />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;
