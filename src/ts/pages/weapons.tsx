import * as React from 'react';
import * as i18n from 'i18next';
import {Route, RouteComponentProps, Switch} from "react-router";
import {Weapon} from "../models/weapon";
import {Card, Header, Label, Menu} from "semantic-ui-react";
import {RouterMenuItem} from "../components/routedItems";
import {GreatSwordTab} from "./greatSwordTab";

interface WeaponsState {
    status: { key: "ready" } | { key: "loading" } | { key: "error", message: string };
}

export class Weapons extends React.Component<RouteComponentProps<any>, WeaponsState> {
    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            status: { key: "ready" },
        };
    }

    static weaponToCard(w: Weapon): JSX.Element {
        return (
            <Card key={w.id}>
                <Card.Content>
                    <Card.Header style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <span>{w.name}</span>
                        <img src={w.weaponToRarityImage()} style={{width: "28px", height: "28px"}}/>
                    </Card.Header>
                    <Card.Meta>
                        <Label style={{backgroundColor: Weapon.getRarityColor(w.rarity), color: "white"}}
                               content={`Rarity ${w.rarity}`}/>
                    </Card.Meta>
                </Card.Content>
            </Card>
        );
    }

    render() {
        return (
            <div style={{padding: "60px"}}>
                <Header as="h1" style={{marginBottom: "40px"}}>{i18n.t("weapons.header")}</Header>

                <Menu tabular>
                    <RouterMenuItem to="/weapons/great-sword">{i18n.t("weapons.menu.greatSword")}</RouterMenuItem>
                </Menu>

                <Switch>
                    <Route exact path="/weapons/great-sword" render={props => <GreatSwordTab {...props}/>}/>

                </Switch>
            </div>
        );
    }
}
