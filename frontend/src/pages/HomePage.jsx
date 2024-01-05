import { useLoaderData } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";
import MainHomePage from "../components/MainHomePage";

function HomePage() {
  const job = useLoaderData();
  return (
    <div>
      <NavBar />
      <MainHomePage job={job} />
    </div>
  );
}

export default HomePage;
