import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import ErrorBoundary from "./ErrorBoundary";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

function App() {
  const [auth, setAuth] = useState({});
  const [search, setSearch] = useState("");
  const [user, setUser] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    if (auth?.userTypeId === 1) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/candidate/`, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        })
        .then((res) => {
          if (res.data && res.data.length >= 2) {
            setUser(res.data[0]);
            setType(res.data[1]);
          }
        });
    } else if (auth?.userTypeId === 2) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/company/`, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        })
        .then((res) => {
          if (res.data) {
            setUser(res.data[0]);
            setType(res.data[1]);
          }
        });
    } else if (auth?.userTypeId === 3) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/admin/`, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        })
        .then((res) => {
          if (res.data && res.data.length >= 2) {
            setUser(res.data[0]);
            setType(res.data[1]);
          }
        });
    }
  }, [auth?.token, type]);

  return (
    <div>
      <ErrorBoundary>
        <NavBar auth={auth} setAuth={setAuth} type={type} />
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
        <Outlet
          context={{ auth, setAuth, search, setSearch, user, type, setType }}
        />
        <Footer />
      </ErrorBoundary>
    </div>
  );
}

export default App;
