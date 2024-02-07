import React, { useState } from "react";
import style from "./signUp.module.scss";
import InscriptionCandidat from "../../components/InscriptionCandidat";
import InscriptionEntreprise from "../../components/InscriptionEntreprise";

function SignUp() {
  const [form, setForm] = useState("candidate");
  return (
    <main>
      <h1 className={`${style.signUp}`}>Inscription</h1>

      <div className={`${style.select}`}>
        <div className={`${style.selection}`}>
          <p>Candidat</p>
          <input
            type="radio"
            name="radio1"
            value="candidate"
            onClick={(e) => setForm(e.target.value)}
            checked={form === "candidate"}
          />
        </div>
        <div className={`${style.selection}`}>
          <p>Entreprise</p>
          <input
            type="radio"
            name="radio2"
            value="company"
            onClick={(e) => setForm(e.target.value)}
            checked={form === "company"}
          />
        </div>
      </div>
      <section>
        {form === "candidate" ? (
          <InscriptionCandidat />
        ) : (
          <InscriptionEntreprise />
        )}
      </section>
    </main>
  );
}

export default SignUp;
