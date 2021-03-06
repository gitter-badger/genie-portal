import React from 'react';
import Modal from 'react-modal';
import ModalStyle from './modal_style';
import Wallet from './wallet/wallet';
import ProfileContainer from './profile/profile_container';

class UserDropdown extends React.Component {
  constructor(props) {
    super(props);


    const fName = this.props.currentUser.first_name;
    const lName = this.props.currentUser.last_name;
    const email = this.props.currentUser.email;
    const parsedUsername = email.match(/^([^@]*)@/)[1];


    const uName = this.props.currentUser.username;

    const userType = fName && lName ? `${fName} ${lName}` : parsedUsername;

    /*
    We initially set the state of the displayName to either the user's
    first and last name (if they have updated their profile with this information)
    or to their truncated username.
    */

    this.state = {
      openModal: false,
      displayName: userType,
    };
    // tokens: 0,
    // user_tokens: 500,
    // total_tokens: 49500

    window.SessionOpenModal = () => {
      this.setState({openModal: true});
    };

    window.SessionOpenModal = window.SessionOpenModal.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateUsernameDisplay = this.updateUsernameDisplay.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  openModal() {
    this.setState({openModal: true});
  }

  closeModal() {
    this.setState({openModal: false});
  }

  updateUsernameDisplay(user) {
    let input = '';
    if (user.first_name && user.last_name) {
      input = `${user.first_name} ${user.last_name}`;
    } else if (user.first_name) {
      input = user.first_name;
    } else if (user.last_name) {
      input = user.last_name;
    } else {
      input = user.email.match(/^([^@]*)@/)[1];
    }
    this.setState({ displayName: input });
  }

  /*
  this function serves to update the user's display name on the
  underlying Navbar Component upon updating their profile, via being
  passed down through props to the Profile Component.
  */

  handleLogOut(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {

    // let { tokens, user_tokens, total_tokens } = this.state;
    let { tokens } = this.props.currentUser;
    return (
      <div>
        <div id="dropdown-container" className="dropdown">
          <a id="dLabel" role="button" data-toggle="dropdown" className="dropdown-link">
            <div className="user-dropdown-button">
              <div className="display-name">
                {this.state.displayName}
              </div>
              <hr/>
              <div className="tokens-cont">
                <div className="total-tokens">{tokens} tokens</div>
              </div>
            </div>
          </a>
          <ul className="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
            <li className="dropdown-submenu">
              <a tabIndex="-1" className="wallet-button butt">
                <img className="button-img" src="https://s3.amazonaws.com/genie-portal-dev/static/wallet.svg" />
                <div className="button-text">wallet#</div>
              </a>
              <ul className="dropdown-menu dropdown-item">
                <Wallet />
              </ul>
            </li>
            <li className="dropdown-submenu profile-menu">
              <a tabIndex="-1" className="profile-button butt">
                <img className="button-img" src="https://s3.amazonaws.com/genie-portal-dev/static/profile.svg" />
                <div className="button-text">profile</div>
              </a>
              <ul className="dropdown-menu dropdown-item">
                <ProfileContainer
                  updateUsernameDisplay={this.updateUsernameDisplay}
                  user={this.props.currentUser}/>
              </ul>
            </li>
            <li>
              <a className="logout-button butt" onClick={this.props.logout}>
                <img className="button-img" src="https://s3.amazonaws.com/genie-portal-dev/static/logout.svg" />
                <div className="button-text">log&nbsp;out</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }



}

export default UserDropdown;
