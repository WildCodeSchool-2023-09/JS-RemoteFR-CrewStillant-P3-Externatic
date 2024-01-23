import { Outlet } from "react-router-dom";
import "./App.scss";
import NavBar from "./components/navbar/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
