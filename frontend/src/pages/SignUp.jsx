import React, { useState } from "react";
import "./signUp.scss";
import InscriptionCandidat from "../components/InscriptionCandidat";
import InscriptionEntreprise from "../components/InscriptionEntreprise";

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
        {Form === true ? <InscriptionCandidat /> : <InscriptionEntreprise />}
      </section>
    </main>
  );
}

export default SignUp;
