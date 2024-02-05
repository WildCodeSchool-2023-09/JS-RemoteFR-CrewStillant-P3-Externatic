import PropTypes from "prop-types";
import Banner from "./banner/Banner";
import JobOffers from "./jobOffers/JobOffers";
import Gallery from "./carousel/Gallery";

function MainHomePage({ job, count }) {
  return (
    <div>
      <Banner count={count} />
      <JobOffers job={job} />
      <Gallery />
    </div>
  );
}
MainHomePage.propTypes = {
  job: PropTypes.arrayOf(PropTypes.shape).isRequired,
  count: PropTypes.shape(PropTypes.number).isRequired,
};
export default MainHomePage;
