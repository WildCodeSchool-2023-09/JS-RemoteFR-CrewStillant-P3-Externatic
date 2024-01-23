import { useState } from "react";
import PropTypes from "prop-types";
import Banner from "./banner/Banner";
import JobOffers from "./jobOffers/JobOffers";
import Gallery from "./carousel/Gallery";

function MainHomePage({ job }) {
  const [filter, setFilter] = useState("");
  return (
    <div>
      <Banner job={job} filter={filter} setFilter={setFilter} />
      <JobOffers job={job} filter={filter} />
      <Gallery />
    </div>
  );
}
MainHomePage.propTypes = {
  job: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default MainHomePage;
