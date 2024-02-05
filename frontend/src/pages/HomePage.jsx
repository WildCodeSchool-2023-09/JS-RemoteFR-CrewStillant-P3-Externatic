import { useLoaderData, useOutletContext } from "react-router-dom";
import MainHomePage from "../components/MainHomePage";

function HomePage() {
  const { auth } = useOutletContext();
  const { job, count } = useLoaderData();
  console.info(auth);
  return (
    <div>
      <MainHomePage job={job} count={count} />;
    </div>
  );
}

export default HomePage;
