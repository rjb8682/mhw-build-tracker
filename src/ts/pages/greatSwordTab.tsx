import * as React from 'react';
import {RouteComponentProps} from "react-router";
import {Weapon, WeaponTypeEnum} from "../models/weapon";
import {MHWApi} from "../utils/mhwApi";
import {Card, Loader, Message} from "semantic-ui-react";
import {Weapons} from "./weapons";

interface GreatSwordTabState {
    status: { key: "ready", weapons: Weapon[] } | { key: "loading" } | { key: "error", message: string };
}

export class GreatSwordTab extends React.Component<RouteComponentProps<any>, GreatSwordTabState> {
    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            status: { key: "loading" },
        };
    }

    componentDidMount() {
        this.loadGreatSwords();
    }

    private loadGreatSwords() {
        this.setState({
            status: { key: "loading" },
        });

        MHWApi.getWeapons(null, WeaponTypeEnum["great-sword"], result => {
            if (result.success == true) {
                this.setState({
                    status: { key: "ready", weapons: result.value },
                });
            } else {
                console.log("Failed to grab weapons");
                this.setState({
                    status: { key: "error", message: result.message },
                });
            }
        });
    }

    render() {
        const {status} = this.state;

        if (status.key == "loading") {
            return (
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Loader active/>
                </div>
            );
        }

        if (status.key == "error") {
            return (
                <Message error content={status.message}/>
            );
        }

        return (
            <div style={{padding: "30px"}}>
                <Card.Group>
                    {status.weapons.map(Weapons.weaponToCard)}
                </Card.Group>
            </div>
        );
    }
}
