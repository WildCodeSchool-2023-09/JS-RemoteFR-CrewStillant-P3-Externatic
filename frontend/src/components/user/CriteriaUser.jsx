import React from "react";
import PropTypes from "prop-types";

function CriteriaUser({ criteria }) {
  return (
    <select>
      {criteria &&
        criteria.map((c) => (
          <option key={c.id} value={c.value}>
            {c.name}
          </option>
        ))}
    </select>
  );
}

CriteriaUser.propTypes = {
  criteria: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      name: PropTypes.string.isRequired,
      // Add more prop types if needed
    })
  ),
};

CriteriaUser.defaultProps = {
  criteria: [],
};

export default CriteriaUser;
