import PropTypes from "prop-types";
import JobOffer from "../jobOffer/JobOffer";
import styles from "./jobOffers.module.scss";

function JobOffers({ job }) {
  return (
    <div
      className={`d-flex flex-column align-items-center justify-content-center ${styles.jobOffersContainer}`}
    >
      <h1 className="my-30">Nos dernières offres</h1>
      <section className={`p-20 ${styles.jobOffers}`}>
        {job.map((j) => (
          <JobOffer key={j.id} job={j} />
        ))}
      </section>
    </div>
  );
}
JobOffers.propTypes = {
  job: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
export default JobOffers;
