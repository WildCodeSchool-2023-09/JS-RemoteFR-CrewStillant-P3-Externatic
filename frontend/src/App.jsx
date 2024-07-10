import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import ErrorBoundary from "./ErrorBoundary";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

function App() {
  return (
    <AuthProvider>
      <div>
        <ErrorBoundary>
          <NavBar />
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
          <Outlet />
          <Footer />
        </ErrorBoundary>
      </div>
    </AuthProvider>
  );
}

export default App;
