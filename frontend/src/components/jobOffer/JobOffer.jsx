import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./jobOffer.module.scss";

function JobOffer({ job }) {
  return (
    <div className={`${styles.jobOffer}`} role="button" tabIndex={0}>
      <div className={`${styles.imgContainer}`}>
        <img src={job.image} alt="logo" />
      </div>
      <div className={`${styles.jobOfferTitle}`}>
        <h3 className="mb-10">{job.title}</h3>
        <p>{job.type}</p>
        <p>{job.city}</p>
        <NavLink to={`/offre/${job.id}`}>Voir</NavLink>
      </div>
    </div>
  );
}
JobOffer.propTypes = {
  job: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
export default JobOffer;
