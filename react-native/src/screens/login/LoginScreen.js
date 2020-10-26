import React from "react";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Paragraph from "../../components/Paragraph";
import actions from "../../store/actions";
import { connect } from "react-redux";

const LoginScreen = ({ authenticate }) => {

    const authenticateWithGoogle = () => {
        authenticate({ idpHint: "google" });
    }

    return (
        <Background>
            <Logo/>

            <Header>UMA Test App</Header>

            <Paragraph>
                Please login to help us test our UMA SDK.
            </Paragraph>
            <Button mode="contained" onPress={ authenticateWithGoogle }>
                Login
            </Button>
        </Background>
    );
};

const mapDispathToProps = (dispatch) => ({
    authenticate: (options) => dispatch(actions.authentication.authenticate(options)),
});

export default connect(null, mapDispathToProps)(LoginScreen);
