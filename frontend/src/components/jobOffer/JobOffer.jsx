import { useState } from "react";
import PropTypes from "prop-types";
import * as IoIcons from "react-icons/io5";
import styles from "./jobOffer.module.scss";

function JobOffer({ image, title, type }) {
  const [liked, setLiked] = useState(false);
  const handleClick = () => {
    setLiked(!liked);
  };
  return (
    <div
      onClick={handleClick}
      onKeyDown={handleClick}
      className={`${styles.jobOffer}`}
      role="button"
      tabIndex={0}
    >
      <div className={`${styles.imgContainer}`}>
        <img src={image} alt="logo" />
      </div>
      <div
        className={`d-flex flex-column justify-content-center align-items-center ${styles.jobOfferTitle}`}
      >
        <h3 className="mb-10">{title}</h3>
        <p>{type}</p>
        <i className={`${liked ? "text-primary" : ""}`}>
          <IoIcons.IoHeart />
        </i>
      </div>
    </div>
  );
}
JobOffer.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
export default JobOffer;
