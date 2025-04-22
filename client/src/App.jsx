import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";
import { Home, Navbar } from "./routes/routes";
import Footer from "./layouts/Footer";
import LoadingRing from "./utils/Loader";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import { Toaster as SonnerToaster } from "sonner";
import { Toaster as HootToaster } from "react-hot-toast";
import ScrollToTop from "./utils/ScrollToTop";
import LocationModal from "./components/modals/LocationModal";
import ResetPwd from "./auth/ResetPwd";
import ForgotPwd from "./auth/ForgotPwd";
import ErrorPage from "./pages/ErrorPage";
import CheckOut from "./pages/CheckOut";
import DashBoard from "./pages/DashBoard";
import Orders from "./pages/Orders";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import Test from "./pages/Test.jsx";
import DeliveredPage from "./pages/DeliveredPage.jsx";
import CancelledPage from "./pages/CancelledPage.jsx";
import RoleBasedRoutes from "./routes/RoleBasedRoutes.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";

// const cartItemsFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || []

function App() {
  const [location, setLocation] = useState("");

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, []);
  // const [cart, setCart] = useState(cartItemsFromLocalStorage);
  // useEffect(()=>{
  //   localStorage.setItem('cart',JSON.stringify(cart))

  // },[cart])
  // const handleAddToCart = (item)=>{
  //     const isPresent = cart.some((product)=> product._id === item._id)
  //     if(isPresent){
  //       const updatedCart = cart.map((product)=>{
  //         product._id === item._id ? {...product, quantity:product.quantity + 1}:product
  //       })
  //       setCart(updatedCart);
  //     }else{
  //       const newItem = {...item, quantity:1}
  //       setCart([...cart,newItem]);
  //       console.log([...cart,newItem]);

  //     }

  //   }
  // const [cart, setCart] = useState(cartItemsFromLocalStorage);
  // useEffect(()=>{
  //   localStorage.setItem('cart',JSON.stringify(cart))

  // },[cart])
  // console.log(cart);

  // let handleAddToCart = (product) => {
  //   const productSelected = cart.find(
  //     (singleCart) => singleCart._id === product._id
  //   );
  //   if (productSelected) {
  //     setCart(
  //       cart.map((oneItem) =>
  //         oneItem._id === product._id
  //           ? {
  //               ...productSelected,
  //               quantity: productSelected.quantity + 1,
  //             }
  //           : oneItem
  //       )
  //     );
  //   } else {
  //     setCart([...cart, { ...product, quantity: 1 }]);
  //   }
  // };

  return (
    <>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen">
              {" "}
              <LoadingRing />{" "}
            </div>
          }
        >
          <ScrollToTop />
          <LocationModal onLocationSelect={setLocation} />
          <Routes>
            <Route
              element={
                <>
                  <Navbar /> <Footer />
                </>
              }
            >
              <Route path="/test" element={<Test />} />
              <Route path="/" element={<Home />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/check-out" element={<CheckOut />} />
              <Route  path="/orders/delivered/:orderId"  element={<PrivateRoute>
                <OrderDetails/>
              </PrivateRoute>} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <RoleBasedRoutes requiredRole={["admin"]}>
                      <DashBoard />
                    </RoleBasedRoutes>
                  </PrivateRoute>
                }
              />
              <Route path="/orders" element={ <PrivateRoute>
                    <Orders />
                  </PrivateRoute>}>
                {/* <Route index element={<Navigate to="delivered" replace />} /> */}
                <Route index element={<Navigate to="delivered" />} />
                <Route path="delivered" element={<DeliveredPage />} />
                <Route path="cancelled" element={<CancelledPage />} />
              </Route>
              {/* <Route
                path="orders"
                element={
                  <PrivateRoute>
                    <Orders />
                  </PrivateRoute>
                }
              >
                <Route index element={<OrderPage />} />

                <Route path="delivered" element={<DeliveredPage />} />
                <Route path="cancelled" element={<CancelledPage />} />
              </Route> */}
            </Route>
            <Route path="/reset-password" element={<ResetPwd />} />
            <Route path="/forgot-password" element={<ForgotPwd />} />
            <Route path="/reset-password/:resetToken" element={<ResetPwd />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <HootToaster />
      <SonnerToaster />
      {/* <BrowserRouter>
        <Suspense fallback={<div className="flex justify-center items-center h-screen"> <LoadingRing/> </div>}>
        <Navbar cart={cart} setCart={setCart}/>
        <Navbar cart={cart} setCart={setCart}/>
          <Routes>
            <Route path="/" element={<Home  handleAddToCart = {handleAddToCart} />} />
            <Route path="product/:id" element={<Product/>}/>
            <Route path="cart" element={<Cart cart={cart} setCart={setCart}/>}/>
          </Routes>
          <Footer/>
        </Suspense>
      </BrowserRouter>
      <Toaster /> */}
    </>
  );
}

export default App;
