import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MyButton from '../../util/MyButton';
// Material UI Imports
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import { logoutUser } from '../../redux/actions/userActions';
import { connect } from "react-redux";

import PostMemory from '../scream/PostMemory';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from './Notifications';

class Navbar extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  }
  render() {
    const { authenticated } = this.props
    return (
      <AppBar /**Default position: fixed */>
        <ToolBar className="nav-container">
          {authenticated ? (
            <Fragment>
              {/* Posting Button */}
              <PostMemory />

              {/* Home button */}
             <Link to="/">
              <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
              </Link>
              {/* Notification button */}
                <Notifications />
              {/* Logout Button */}
               <Button onClick={this.handleLogout}>
                 Logout
              </Button>
            </Fragment>
          ) : (
            <Fragment>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Signup
          </Button>
          </Fragment>
          )}
        </ToolBar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapActionsToProps = { logoutUser };

const mapStateToProps = (state) => ({
  user: state.user,
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps, mapActionsToProps)(Navbar);