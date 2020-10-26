import React, { useState } from "react";
import * as ReactRedux from "react-redux";
import { applyMiddleware, createStore } from "redux";
import * as ReactNativePaper from "react-native-paper";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import createSagaMiddleware from "redux-saga";
import { theme } from "./config/theme";
import rootReducer from "./store/reducers";
import intialiseSagaMiddleware from "./store/sagas";
import AppNavigator from "./navigation/AppNavigator";
import Compose from "./hoc/compose/Compose";
import * as SplashScreen from 'expo-splash-screen';

// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync()
    .then(result => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
    .catch(console.warn); // it's good to explicitly catch and inspect any error

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

intialiseSagaMiddleware(sagaMiddleware);

const fetchFonts = () => {
    return Font.loadAsync({
        "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
    });
};

const providers = [
    [ ReactRedux.Provider, { store } ],
    [ ReactNativePaper.Provider, { theme } ]
]

const App = () => {
    const [ fontLoaded, setFontLoaded ] = useState(false);

    if (!fontLoaded) {
        return (
            <AppLoading
                startAsync={ fetchFonts }
                onFinish={ () => {
                    setFontLoaded(true);
                } }
            />
        );
    }

    return (
        <Compose providers={ providers }>
            <AppNavigator/>
        </Compose>
    );
}

export default App;