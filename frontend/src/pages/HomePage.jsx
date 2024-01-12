import { useLoaderData } from "react-router-dom";
import MainHomePage from "../components/MainHomePage";

function HomePage() {
  const job = useLoaderData();
  return (
    <div>
      <MainHomePage job={job} />
    </div>
  );
}

export default HomePage;
