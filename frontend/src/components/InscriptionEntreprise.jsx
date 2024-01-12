import "./inscriptionEntreprise.css";

function InscriptionEntreprise() {
  return (
    <main>
      <section className="grid">
        <section className="signupEnterprise">
          <div>
            <p>Nom:</p>
            <input type="text" placeholder="Trouver une offre" />
          </div>
          <div>
            <p>E-mail:</p>
            <input type="email" placeholder="Trouver une offre" />
          </div>
          <div>
            <p>Ville:</p>
            <input type="text" placeholder="Trouver une offre" />
          </div>
          <div>
            <p>Pays:</p>
            <input type="text" placeholder="Trouver une offre" />
          </div>
          <div>
            <p>N° SIRET:</p>
            <input type="text" placeholder="Trouver une offre" />
          </div>
          <div>
            <p>Secteur:</p>
            <input type="text" placeholder="Trouver une offre" />
          </div>
          <div>
            <p>Description:</p>
            <textarea type="text" placeholder="Trouver une offre" />
          </div>
        </section>
        <div className="confirmButtonEnterprise">
          <button type="button">Confirmer Inscription</button>
        </div>
      </section>
    </main>
  );
}

export default InscriptionEntreprise;
