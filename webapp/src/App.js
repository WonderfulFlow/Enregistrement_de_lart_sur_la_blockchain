import React from 'react';
import Home from './containers/Home/Home';
import HomePage from './components/HomePage/HomePage';
import AppBar from './components/AppBar/AppBar';
import './App.css';

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import reducer_upload from "./store/reducers/reducer_upload";

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import * as routes_names from './routes';
import MiseVente from "./containers/MiseVente/MiseVente";

class App extends React.Component {
    render() {
        const rootReducer = combineReducers({
            upload: reducer_upload,
        });

        const logger = store => {
            return next => {
                return action => {
                    const result = next(action);
                    return result;
                }
            }
        };

        const store = createStore(rootReducer, applyMiddleware(logger, thunk));

        const routes = (
            <Switch>
                <Route path={routes_names.HOME} exact component={HomePage}/>
                <Route path={routes_names.BUY} component={Home}/>
                <Route path={routes_names.MISEVENTE} component={MiseVente}/>
                <Redirect to={routes_names.HOME}/>
            </Switch>
        );

        return (
            <Provider store = {store}>
                <BrowserRouter forceRefresh={true}>
                    <AppBar icon="logo">
                        {routes}
                    </AppBar>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
