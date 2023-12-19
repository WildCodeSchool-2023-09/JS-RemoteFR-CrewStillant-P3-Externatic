import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Searchbar from "./components/Searchbar/Search";

function App() {
  return (
    <div>
      <Navbar />
      <Searchbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
