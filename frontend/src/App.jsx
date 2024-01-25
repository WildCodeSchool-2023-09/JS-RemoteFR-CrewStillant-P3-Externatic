import { Outlet } from "react-router-dom";
import { useState } from "react";
import "./App.scss";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";

function App() {
  const [auth, setAuth] = useState();

  return (
    <div>
      <NavBar auth={auth} setAuth={setAuth} />
      <Outlet context={{ auth, setAuth }} />
      <Footer />
    </div>
  );
}

export default App;
