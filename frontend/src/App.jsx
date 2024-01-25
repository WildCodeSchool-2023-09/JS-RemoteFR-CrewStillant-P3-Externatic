import { Outlet } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import "./App.scss";

function App() {
  const [auth, setAuth] = useState({ token: "", userVerified: "" });
  return (
    <div>
      <NavBar />
      <Outlet context={{ auth, setAuth }} />
      <Footer />
    </div>
  );
}

export default App;
