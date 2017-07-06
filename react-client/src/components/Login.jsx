import React from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tokenId: '' };
  }

  // componentDidMount() {
  //   console.log(this.props, 'didmount');
  // }

  responseGoogle(response) {
    console.log(this.props);
    console.log(response);
    this.setState({ tokenId: response.tokenId })
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 text-center">
          <GoogleLogin
            clientId="663612425604-5tilrctspqjau1je9hgkq9h725gpjbp1.apps.googleusercontent.com"
            scope="profile email"
            buttonText="Login with Google"
            onSuccess={this.props.onSignIn}
            onFailure={this.responseGoogle.bind(this)}
            isSignedIn={true}
            className="btn btn-lg btn-danger"
          />
        </div>
        <div className = "FacebookButton">
        <FacebookLogin 
          appId="184065032128462"
          autoLoad={false}
          fields="name,email"
          icon="fa-facebook"
          callback={this.props.onFBSignIn} />
        </div>
      </div>
    )
  }
}

export default Login;
