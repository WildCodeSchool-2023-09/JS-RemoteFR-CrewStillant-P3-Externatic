import PropTypes from "prop-types";
import JobOffer from "../jobOffer/JobOffer";
import styles from "./jobOffers.module.scss";

function JobOffers({ job, filter }) {
  return (
    <div
      className={`d-flex flex-column align-items-center justify-content-center ${styles.jobOffersContainer}`}
    >
      <h1 className="my-30">Nos dernières offres</h1>
      <section className={` p-20 ${styles.jobOffers}`}>
        {job
          .slice(0, 9)
          .filter((j) => j.title.toLowerCase().startsWith(filter))
          .map((j) => (
            <JobOffer
              key={j.id}
              title={j.title}
              image={j.image}
              type={j.type}
            />
          ))}
      </section>
    </div>
  );
}
JobOffers.propTypes = {
  job: PropTypes.arrayOf(PropTypes.string).isRequired,
  filter: PropTypes.string.isRequired,
};
export default JobOffers;
