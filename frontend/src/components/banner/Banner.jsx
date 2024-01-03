import PropTypes from "prop-types";
import styles from "./banner.module.scss";

function Banner({ job, setFilter }) {
  const handleInput = (e) => {
    const { value } = e.target;
    setFilter(value.trim().toLowerCase());
  };
  return (
    <section
      className={`d-flex flex-column justify-content-center align-items-center ${styles.bannerSection}`}
    >
      <h1>
        <span>{job.length}</span> offres d'emploi disponibles
      </h1>
      <div
        className={`m-20 d-flex justify-content-center align-items-center ${styles.searchBar}`}
      >
        <input
          onInput={handleInput}
          className="p-10 flex-fill"
          type="text"
          placeholder="Recherche"
        />
        <div className="d-flex justify-content-center align-items-center">
          <i className="  fa-solid fa-magnifying-glass" />
        </div>
      </div>
    </section>
  );
}
Banner.propTypes = {
  job: PropTypes.arrayOf(PropTypes.string).isRequired,
  setFilter: PropTypes.func.isRequired,
};
export default Banner;
