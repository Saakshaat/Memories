import React, { Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { Link } from 'react-router-dom';

import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import AccessTime from "@material-ui/icons/AccessTime";
import LocationOn from "@material-ui/icons/LocationOn";

const styles = {
  paper: {
    padding: 20
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative"
    },
    "& .profile-image": {
      width: 180,
      height: 180,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%"
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle"
      },
      "& a": {
        color: "primary.main"
      }
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    }
  }
};

const StaticProfile = props => {
  const {
    classes,
    profile: { handle, createdAt, imageUrl, bio, location }
  } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className={"profile-image"} />

        </div>
        <hr />
        <div className={classes.profileDetails}>
          <MuiLink
            component={Link}
            to={`/users/${handle}`}
            color="primary"
            variant="h5"
          >
            {handle}
          </MuiLink>
          <hr />
          {bio && <Typography variant="body2">{bio}</Typography>}
          <hr />
          {location && (
            <Fragment>
              <LocationOn color="secondary" />
              <small>{location}</small>
              <hr />
            </Fragment>
          )}
          <hr />
          <AccessTime color="secondary" />{" "}
          <small>Been here since {dayjs(createdAt).format("MMM YYYY")}</small>
        </div>
      </div>
    </Paper>
  );
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StaticProfile);
