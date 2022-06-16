import React, { Fragment } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { delEducation } from "../../actions/profile";
import PropTypes from "prop-types";

const Education = ({ education, delEducation }) => {
  const educationList = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{""}
        {edu.to ? <Moment format="YYYY/MM/DD">{edu.to}</Moment> : "Now"}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => delEducation(edu._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
          </tr>
        </thead>
        <tbody>{educationList}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  delEducation: PropTypes.func.isRequired,
};

export default connect(null, { delEducation })(Education);
