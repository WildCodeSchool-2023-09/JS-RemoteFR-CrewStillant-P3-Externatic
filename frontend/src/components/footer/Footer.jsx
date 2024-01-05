import styles from "./footer.module.scss";

function Footer() {
  return (
    <div className={styles.footer}>
      <ul className="d-flex ">
        <li>
          <p>Nos Offres</p>
          <p>Nos Entreprises</p>
          <p>Nos Corps de Métiers</p>
        </li>
        <li>
          <p>Coordonnées</p>
          <p>Qui sommes-nous</p>
          <p>Plan du site</p>
        </li>
        <li>
          <p>Infos Personnelles</p>
          <p>RGPD</p>
        </li>
        <li>
          <p>Adresse:</p>
          <p>105 Rue du Perlinpinpion</p>
          <p>75008 Paris</p>
        </li>
      </ul>
      <p className="d-flex justify-content-center align-content-center">
        Externatic © 2023 - Tous droits réservés
      </p>
    </div>
  );
}

export default Footer;
