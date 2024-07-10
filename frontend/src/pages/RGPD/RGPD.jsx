import style from "../WhoWeAre/whoweare.module.scss";

export default function RGPD() {
  return (
    <section className={`${style.rgpd}`}>
      <h1>Politique de Confidentialité</h1>
      <p>
        Le Règlement Général sur la Protection des Données (RGPD) est une
        réglementation européenne instaurée en 2018. Cette loi informatique et
        libertés vise à renforcer la protection des données personnelles des
        citoyens de l’Union européenne.
      </p>
      <ul>
        <li>
          Obtenez le consentement explicite des utilisateurs avant de collecter
          leurs données personnelles.
        </li>
        <li>
          Mettez en place des mesures de sécurité adéquates pour garantir la
          sécurité des informations.
        </li>
        <li>
          Permettez aux utilisateurs d’accéder à leurs données, de les rectifier
          ou de les supprimer.
        </li>
      </ul>
      <p>
        Le RGPD s’applique non seulement à la collecte de données via votre site
        internet, mais également à toutes les données que vous collectez sur vos
        clients, qu’il s’agisse de données de vente, de marketing ou de service
        à la clientèle.
      </p>
      <p>
        Assurez-vous d’avoir une bonne compréhension de la manière dont vous
        collectez, stockez et utilisez les données dans l’ensemble de votre
        entreprise.
      </p>
      <p>
        N’oubliez pas que le non-respect du RGPD peut entraîner des amendes
        significatives.
      </p>
    </section>
  );
}
