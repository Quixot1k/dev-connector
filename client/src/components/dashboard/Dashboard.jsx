import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Loading from "../layout/Loading";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile";
import { delAccount } from "../../actions/profile";

const Dashboard = ({
  getCurrentProfile,
  delAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Fragment>
      <section className="container">
        <Loading />
      </section>
    </Fragment>
  ) : (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome {user && user.name}
        </p>
        {profile !== null ? (
          <Fragment>
            <DashboardActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div className="my-2">
              <button
                className="btn btn-danger"
                onClick={() => {
                  delAccount();
                }}
              >
                <i className="fas fa-user-minus"></i> Delete my account
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p>
              You have not setup your profile, come and introduce yourself !
            </p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </Fragment>
        )}
      </section>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  delAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, delAccount })(
  Dashboard
);
