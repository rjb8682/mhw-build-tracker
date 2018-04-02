import * as i18n from 'i18next';
import * as XHR from "i18next-xhr-backend";
import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Menu} from "semantic-ui-react";
import {Redirect, Route, RouteComponentProps, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {RouterMenuItem} from "./components/routedItems";
import {Weapons} from "./pages/weapons";
import Options = i18n.InitOptions;

interface MainState {
    isLoading: boolean;
}

class Main extends React.Component<RouteComponentProps<any>, MainState> {
    private localeOptions: Options = {
        lng: "en-US",
        backend: {
            loadPath: "/resources/locales/{{lng}}.json",
        },
        fallbackLng: "en",
        interpolation: {escapeValue: false},
    };

    constructor(props: any, context: any) {
        super(props, context);

        i18n.use(XHR).init(this.localeOptions, () => {
            console.log("Loaded locale");
            setTimeout(() => {
                this.setState({
                    isLoading: false,
                });
            }, 2500);
        });

        this.state = {
            isLoading: true,
        };
    }

    render() {
        if (this.state.isLoading == true) {
            return (
                <div style={{height: "100%", width: "100%", backgroundColor: "#b29066"}}>
                    <img id="loadingIcon"
                         className="centerVertically"
                         src="https://i.pinimg.com/originals/b4/77/23/b47723ba1c35943da71c3f657c614c46.png"/>
                </div>
            );
        }

        return (
            <div id="mainRoot">
                <Menu attached="top" inverted style={{borderRadius: 0}}>
                    <RouterMenuItem to="/weapons">Weapons</RouterMenuItem>
                </Menu>

                <div id="contentWrapper">
                    <Switch>
                        <Route path="/weapons" render={props => <Weapons {...props}/>}/>

                        <Redirect to="/weapons"/>
                    </Switch>
                </div>
            </div>
        );
    }
}

class MainRouter extends React.Component<any, any> {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route component={Main}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

ReactDom.render(
    <MainRouter/>,
    document.getElementById("content"),
);
