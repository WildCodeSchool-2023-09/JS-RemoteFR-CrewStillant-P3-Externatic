import { Link } from "react-router-dom";
import styles from "./footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className="d-flex ">
        <li>
          <a href="https://www.welcometothejungle.com/fr/companies/externatic">
            Nos Offres
          </a>
          <p>Nos Entreprises</p>
          <p>Nos Corps de Métiers</p>
        </li>
        <li>
          <Link to="/rgpd">RGPD</Link>
        </li>
        <li>
          <p>Adresse:</p>
          <p>105 Rue du Perlinpinpion - 75008 Paris</p>
        </li>
      </ul>
      <p className="d-flex justify-content-center align-content-center">
        Externatic © 2023 - Tous droits réservés
      </p>
    </footer>
  );
}

export default Footer;
