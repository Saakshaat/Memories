import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";
import { resetPassword } from "../redux/actions/userActions";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import EditIcon from "@material-ui/icons/Edit";

const styles = {
  form: {
    textAlign: "center"
  },
  image: {
    margin: "2vmin auto 2vmin auto",
    width: "15vmin",
    height: "15vmin"
  },
  button: {
    marginTop: "-7vmin",
    position: "relative",
    textAlign: "center"
  }
};

class ResetPassword extends Component {
  state = {
    email: "",
    open: false
  };  
  mapUserDetailsToState = credentials => {
    this.setState({
      email: credentials.email ? credentials.email : ""
    });
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(this.props.credentials);
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = () => {
      const userDetails = {
          email: this.state.email
      };
      this.props.resetPassword(userDetails);
      this.handleClose();
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>

          <Button onClick={this.handleOpen} className={classes.button} color="secondary">
            <small>Forgot Password</small>
            </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Please check your email for a reset link</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="email"
                type="text"
                label="Email"
                className={classes.textField}
                value={this.state.email}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={this.handleSubmit} color="secondary">
                    Send Reset Link
                </Button>
             </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials
});

export default connect(mapStateToProps, { resetPassword })(
  withStyles(styles)(ResetPassword)
);
