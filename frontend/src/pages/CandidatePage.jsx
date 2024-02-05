import { Outlet, useOutletContext } from "react-router-dom";
// import { useState } from "react";
import SideSection from "../components/SideSection";
import style from "../assets/styles/candidatePage.module.scss";

function CandidatePage() {
  // const { messages, activity, degrees, experience, skills, criteria } =
  //   useLoaderData();
  const { auth, user, type } = useOutletContext();
  // const [authCandidate, setAuthCandidate] = useState(auth);

  return (
    <div>
      <div className={`${style.banner}`}>
        <h1 className={`${style.h1}`}>Mon espace</h1>
      </div>

      <div className={`${style.userpage}`}>
        <SideSection auth={auth} />
        <Outlet
          context={{
            auth,
            user,
            type,
          }}
        />
      </div>
    </div>
  );
}

export default CandidatePage;
