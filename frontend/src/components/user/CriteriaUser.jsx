import React, { useState } from "react";
import PropTypes from "prop-types";

function CriteriaUser({ criteria }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <select value={selectedValue} onChange={handleSelectChange}>
      <option value="">Select a criteria</option>
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
    })
  ),
};

CriteriaUser.defaultProps = {
  criteria: [],
};

export default CriteriaUser;
