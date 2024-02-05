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

  console.info("auth", auth);
  console.info("user&type", user, type);
  useEffect(() => {
    if (auth.userTypeId === 1) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/candidate/`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((res) => setUser(res.data[0]) || setType(res.data[1]))
        .then(console.info("useEffect user done"));
    } else if (auth.userTypeId === 2) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/company/`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((res) => setUser(res.data[0]) || setType(res.data[1]))
        .then(console.info("useEffect company done"));
    } else if (auth.userTypeId === 3) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/admin/`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((res) => setUser(res.data[0]) || setType(res.data[1]))
        .then(console.info("useEffect admin done"));
    }
  }, [auth]);
  console.info("app", user, type);

  return (
    <div>
      <ErrorBoundary>
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
        <Outlet context={{ auth, setAuth, search, setSearch, user, type }} />
        <Footer />
      </ErrorBoundary>
    </div>
  );
}

export default App;
