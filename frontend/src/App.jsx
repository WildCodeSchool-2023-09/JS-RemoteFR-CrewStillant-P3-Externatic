import { Outlet } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

function App() {
  const [auth, setAuth] = useState("");
  const [search, setSearch] = useState("");

  return (
    <div>
      <NavBar auth={auth} setAuth={setAuth} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
      <Outlet context={{ auth, setAuth, search, setSearch }} />
      <Footer />
    </div>
  );
}

export default App;
