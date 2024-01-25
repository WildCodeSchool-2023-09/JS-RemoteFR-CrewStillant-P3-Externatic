import React, { useState } from "react";
import "./signUp.scss";
import InscriptionCandidat from "../components/InscriptionCandidat";
import InscriptionEntreprise from "../components/InscriptionEntreprise";

function SignUp() {
  const [Form, setForm] = useState(true);
  const handleClickCandidate = () => setForm(true);
  const handleClickEnterprise = () => setForm(false);
  return (
    <>
      <header>
        <input type="text" placeholder="Trouver une offre" />
        <button type="button">Loupe</button>
      </header>

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

      <footer>
        <div className="bottomtext">
          <div className="left">
            <a href="a">Nos Offres</a>
            <a href="a">Nos Entreprises</a>
            <a href="a">Nos Corps de métiers</a>
          </div>
          <div className="centerone">
            <a href="a">Coordonnées</a>
            <a href="a">Qui Sommes Nous</a>
            <a href="a">Plan du site</a>
          </div>
          <div className="centertwo">
            <a href="a">Infos Personnelles</a>
            <a href="a">RGPD</a>
          </div>
          <div className="right">
            <p>
              Adresse:
              <br />
              <br />
              105 Rue de Perlinpinpon <br />
              75008 Paris
            </p>
          </div>
        </div>
        <div className="copyright">
          <p>Externatic © 2023 - Tous droits réservés</p>
        </div>
      </footer>
    </>
  );
}

export default SignUp;
