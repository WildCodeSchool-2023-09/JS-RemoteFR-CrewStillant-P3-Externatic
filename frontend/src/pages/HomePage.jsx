import { useLoaderData } from "react-router-dom";
import MainHomePage from "../components/MainHomePage";

function HomePage() {
  const { job, count } = useLoaderData();

  return (
    <div>
      <MainHomePage job={job} count={count} />
    </div>
  );
}

export default HomePage;
