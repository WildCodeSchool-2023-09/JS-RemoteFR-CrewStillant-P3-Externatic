import { useLoaderData } from "react-router-dom";
import NavBar from "../toto/navbar/NavBar";
import MainHomePage from "../toto/MainHomePage";

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
