import React from 'react';
import Home from './containers/Home/Home';
import AppBar from './components/AppBar/AppBar';
import HomePage from './components/HomePage/HomePage';
import Catalogue from './containers/Catalogue/Catalogue';
import UploadForm from "./containers/UploadForm/UploadForm";
import Sell_page from "./components/Sell_page/Sell_page"
import Error from "./components/Errors/Error";
import './App.css';

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import reducer_upload from "./store/reducers/reducer_upload";
import reducer_modal from "./store/reducers/reducer_modal";
import reducer_modal_error from "./store/reducers/reducer_modal_error";

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import * as routes_names from './routes';

class App extends React.Component {
    render() {
        const rootReducer = combineReducers({
            upload: reducer_upload,
            modal: reducer_modal,
            modal_error: reducer_modal_error,
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
                <Route path={routes_names.Sell} exact component={Sell_page}/>

                <Route path={routes_names.BUY} component={Home}/>
                <Route path={routes_names.BROWSE} component={Catalogue}/>
                <Route path={routes_names.MISEVENTE} component={UploadForm}/>
                <Route path={routes_names.NO_METAMASK} component={Error}/>
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
