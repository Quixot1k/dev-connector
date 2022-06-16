import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "../layout/Loading";
import ProfileItem from "./ProfileItem";
import { getAllProfiles } from "../../actions/profile";

const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  return (
    <section className="container">
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Connect with developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <Fragment>
                <h4>No profiles found...</h4>
              </Fragment>
            )}
          </div>
        </Fragment>
      )}
    </section>
  );
};

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ profile: state.profile });
export default connect(mapStateToProps, { getAllProfiles })(Profiles);
