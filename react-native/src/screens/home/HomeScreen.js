import React from "react";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import Background from "../../components/Background";
import actions from "../../store/actions";
import { connect } from "react-redux";

const HomeScreen = ({ logout, user }) => (
    <Background>
        <Logo/>
        <Header>UMA Test App</Header>

        <Paragraph>
            Hey { user.firstName }, thank you for helping us test :-)
        </Paragraph>
        <Button mode="contained" onPress={ logout }>
            Logout
        </Button>
    </Background>
);

const mapStateToProps = (state) => ({
    user: state.authentication.user,
});

const mapDispathToProps = (dispatch) => ({
    logout: () => dispatch(actions.authentication.logout()),
});

export default connect(mapStateToProps, mapDispathToProps)(HomeScreen);
