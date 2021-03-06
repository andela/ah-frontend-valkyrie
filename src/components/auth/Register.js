import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signUp } from "../../actions/SignupAction";
import RegisterForm from "./RegisterForm";
import "./styles/RegisterCSS.css";
import "./styles/Login.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      disabled: false,
      errors: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  onChange = (e) => {
    if (e.target.name === "password2") {
      const { password } = this.state;
      if (password !== e.target.value) {
        this.setState({ disabled: true });
        document.getElementById("alert-2").style.display = "block";
      } else {
        this.setState({ disabled: false });
        document.getElementById("alert-2").style.display = "none";
      }
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    this.props.signUp(userData);
  }

  render() {
    const { errors } = this.state;
    const none = "none";
    const block = "block";

    return (
      <div className="container">
        <div
          className="alert alert-success text-center"
          role="alert"
          id="alert"
          style={{ display: none }}
        />
        <div className="row" id="reg_div" style={{ display: block }}>
          <div className="col-md-6 m-auto">
            <h4 className="text-center mt-5 mb-4">Create your account</h4>
            <RegisterForm
              onSubmit={this.onSubmit}
              onChange={this.onChange}
              errors={errors}
              disabled={this.state.disabled}
            />
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  errors: PropTypes.object,
  signUp: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

Register.defaultProps = {
  isAuthenticated: false,
};

const mapStateToProps = state => ({
  errors: state.signupReducer.errors,
  isAuthenticated: state.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { signUp },
)(Register);
