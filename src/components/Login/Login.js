import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Heading, TextInputField, Button } from 'evergreen-ui';
import Logo from '../Logo';

class LoginPage extends React.PureComponent {
  state = {
    email: '',
    password: '',
    loading: false,
    validationMessage: '',
    emailIsValid: true
  }
  
  static propTypes = {
    logoBackground: PropTypes.string,
    logo: PropTypes.string,
    login: PropTypes.func,
    rounded: PropTypes.bool,
    buttonName: PropTypes.string,
    title: PropTypes.string.isRequired
  }

  static defaultProps = {
    login: () => {},
    logoBackground: '#f7f8fa',
    buttonName: 'Login',
    logo: null,
    rounded: false
  }


  emailValidation = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  submit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { login } = this.props;
    const { email, password } = this.state;
    const emailIsValid = this.emailValidation(email);

    this.setState({
      emailIsValid,
      validationMessage: !emailIsValid ? 'Email is invalid' : '',
      loading: emailIsValid
    })

    if (emailIsValid) login();
  }

  loginHeader = () => {
    const { logo, rounded, title, logoBackground } = this.props;

    let logoComponent = null;
    if (logo) {
      const props = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 'calc(50% - 50px)',
        top: -50,
        width: 100,
        height: 100,
        transform: 'rotate(45deg) scale(.7)',
        borderTopColor: "transparent",
        borderRightColor: "#d5dee6",
        borderBottomColor: "#d5dee6",
        borderLeftColor: "transparent",
        borderStyle: 'solid',
        borderWidth: 1,
        background: logoBackground
      };

      const style = {
        height: 60,
        transform: 'rotate(-45deg) translateX(1px)'
      };

      if (rounded) props.borderRadius = '100%';

      logoComponent = (
        <Pane {...props} >
          <Logo src={logo} style={style} />
        </Pane>
      );
    }

    return (
      <Pane is="header" alignSelf="center">
        {logoComponent}
        <Heading size={700} paddingTop={28} marginBottom={28}>{title}</Heading>
      </Pane>
    );
  }

  footerHeader = () => { // TODO some small text and forgot pass butotn
    return null;
    // return (
    //   <Pane
    //     is="footer"
    //     alignSelf="flex-end"
    //     paddingTop={16}
    //   >
    //   {/*
    //     <Link href="https://dashboard.mutable.io/reset" marginRight={12} color="neutral">Forgot password?</Link>
    //   */}
    //   </Pane>
    // )
  }

  getLoginForm = () => {
    const { buttonName } = this.props;
    const {
      email,
      emailIsValid,
      validationMessage,
      password,
      loading
    } = this.state;

    const props = {};
    if (validationMessage.length) props.validationMessage = validationMessage;
     
    return (
      <Pane
        zIndex={1}
        flexShrink={0}
        flexDirection="column"
        padding={32}
        elevation={0}
        display="flex"
        position="relative"
        backgroundColor="white"
        alignSelf="center"
        width={450}
      >
        {this.loginHeader()}
        <Pane
          alignSelf="center"
          width="100%"
        >
          <form onSubmit={e => this.submit(e)}>
            <TextInputField
              required
              type="email"
              isInvalid={!emailIsValid}
              textAlign="left"
              label="Email"
              value={email}
              inputHeight={40}
              onChange={e => this.setState({ email: e.target.value })}
              {...props}
            />
            <TextInputField
              required
              type="password"
              label="Password"
              textAlign="left"
              value={password}
              inputHeight={40}
              onChange={e => this.setState({ password: e.target.value })}
            />
            <Button
              width='100%'
              height={40}
              isLoading={loading}
              marginTop={16}
              justifyContent='center'
              appearance="primary"
              intent="warning"
            >
              {buttonName}
            </Button>
          </form>
        </Pane>
        {this.footerHeader()}
      </Pane>
    );
  }

  render() {
    return this.getLoginForm();
  }
}

export default LoginPage;
