import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import style from "./notfound.module.scss";

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/accueil");
    }, 5000);
  }, []);

  return (
    <div className={`${style.Error404}`}>
      <h1>
        404 NOT FOUND, You'll be redirect to the homepage or click{" "}
        <Link to="/accueil">
          <u>HERE</u>
        </Link>
      </h1>
    </div>
  );
}

export default NotFound;
