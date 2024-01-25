import React, { useState } from "react";
import CandidateInscription from "../components/signUp/CandidateInscription";
import CompanyInscription from "../components/signUp/CompanyInscription";

function SignUp() {
  const [Form, setForm] = useState(true);
  const handleClickCandidate = () => setForm(true);
  const handleClickEnterprise = () => setForm(false);

  return (
    <main>
      <section className="title">
        <h2>Inscription</h2>
      </section>

      <section className="selection">
        <div className="candidate">
          <p>Candidat</p>
          <input type="radio" name="radio" onClick={handleClickCandidate} />
        </div>
        <div className="enterprise">
          <p>Entreprise</p>
          <input type="radio" name="radio" onClick={handleClickEnterprise} />
        </div>
      </section>
      <section>
        {Form === true ? <CandidateInscription /> : <CompanyInscription />}
      </section>
    </main>
  );
}

export default SignUp;
