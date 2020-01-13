import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import MyButton from "../../util/MyButton";
import PropTypes from "prop-types";
import DeleteScream from "./DeleteScream";
import ScreamDialog from './ScreamDialog.js';
import LikeButton from './LikeButton';

// MUI Card Element Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { SET_AUTHENTICATED } from "../../redux/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { object } from "prop-types";

import ChatIcon from "@material-ui/icons/Chat";


import { connect } from "react-redux";


const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    position: 'relative'
  },
  image: {
    maxWidth: 200,
    minWidth: 100,
    objectFit: "cover",
    padding: 50
  },
  content: {
    padding: 25,
    wordWrap: true,
    objectFit: "cover"
  }
};

export class Scream extends Component {
  
  render() {
    dayjs.extend(relativeTime);

    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    
    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile Image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="body1"
            component={Link}
            to={`/users/${userHandle}`}
            color="secondary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="h6">{body}</Typography>
          <LikeButton screamId={screamId}/>
          <span>{likeCount}</span>
          <MyButton tip="Comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount}</span>
          <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog}/>
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});



export default connect(
  mapStateToProps  
)(withStyles(styles)(Scream));
