import React, { useState } from "react";
import InscriptionCandidat from "../components/InscriptionCandidat";
import InscriptionEntreprise from "../components/InscriptionEntreprise";
import SearchBar from "../components/SearchBar/SearchBar";

import style from "./signUp.module.scss";

function SignUp() {
  const [form, setForm] = useState("candidate");
  return (
    <>
      <SearchBar />
      <main>
        <section className="title">
          <h2>Inscription</h2>
        </section>

        <section className={`${style.selection}`}>
          <div className={`${style.candidate}`}>
            <p>Candidat</p>
            <input
              type="radio"
              name="radio1"
              value="candidate"
              onClick={(e) => setForm(e.target.value)}
              checked={form === "candidate"}
            />
          </div>

          <div className={`${style.company}`}>
            <p>Entreprise</p>
            <input
              type="radio"
              name="radio2"
              value="company"
              onClick={(e) => setForm(e.target.value)}
              checked={form === "company"}
            />
          </div>
        </section>

        <section>
          {form === "candidate" ? (
            <InscriptionCandidat />
          ) : (
            <InscriptionEntreprise />
          )}
        </section>
      </main>
    </>
  );
}

export default SignUp;
