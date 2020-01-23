import React from 'react';
import axios from "axios";
import './App.css';
import AppBar from './components/AppBar/AppBar';
import Error from "./components/Errors/Error";
import HomePage from './containers/HomePage/HomePage';
import Catalogue from './containers/Catalogue/Catalogue';
import UploadForm from "./containers/UploadForm/UploadForm";
import BuyPage from "./containers/BuyPage/BuyPage_GenerateContent"

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import reducer_upload from "./store/reducers/reducer_upload";
import reducer_modal from "./store/reducers/reducer_modal";
import reducer_modal_error from "./store/reducers/reducer_modal_error";
import reducer_artworks from "./store/reducers/reducer_artworks";

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import * as routes_names from './routes';

class App extends React.Component {
    componentDidMount() {
        axios.get('http://localhost:3003/get_image_api', {
            headers: {
                'Content-Type': null
            }
        })
            .then(response => {
                console.log('reussi');
                console.log(response.data);
            })
            .catch(error => {
                console.log('echec');
                console.log(error)
            });
    }

    render() {
        const rootReducer = combineReducers({
            upload: reducer_upload,
            modal: reducer_modal,
            modal_error: reducer_modal_error,
            artworks: reducer_artworks,
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
                <Route path={routes_names.BROWSE} component={Catalogue}/>
                <Route path={routes_names.MISEVENTE} component={UploadForm}/>
                <Route path={routes_names.NO_METAMASK} component={Error}/>
                <Route path={routes_names.BUY + ":id"} component={BuyPage}/>
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
