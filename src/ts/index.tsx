import * as i18n from 'i18next';
import * as XHR from "i18next-xhr-backend";
import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Card, Header, Label, Loader, Message} from "semantic-ui-react";
import {Weapon, WeaponType} from "./models/weapon";
import {MHWApi} from "./utils/mhwApi";
import Options = i18n.InitOptions;

interface MainState {
    status: { key: "ready" } | { key: "error", message: string } | { key: "loading" };
    weapons: WeaponType[];
}

class Main extends React.Component<{}, MainState> {
    private localeOptions: Options = {
        lng: "en-US",
        backend: {
            loadPath: "/resources/locales/{{lng}}.json",
        },
        fallbackLng: "en",
        interpolation: {escapeValue: false},
    };

    constructor(props: {}, context: any) {
        super(props, context);

        i18n.use(XHR).init(this.localeOptions, () => {
            console.log("Loaded locale");
            this.loadWeapons();
        });

        this.state = {
            status: { key: "ready" },
            weapons: [],
        };
    }

    private loadWeapons() {
        this.setState({
            status: { key: "loading" },
        });

        MHWApi.getWeapons(null, result => {
            if (result.success == true) {
                const weaponTypes: WeaponType[] = [];
                result.value.forEach(w => {
                    const type = w.type;
                    if (weaponTypes.filter(wt => wt.key == type).length > 0) {
                        // Key exists, add it to the list
                        weaponTypes.forEach(wt => {
                            if (wt.key == type) {
                                wt.weapons.push(w);
                            }
                        });
                    } else {
                        weaponTypes.push({
                            key: type,
                            weapons: [w],
                        });
                    }
                });

                this.setState({
                    status: { key: "ready" },
                    weapons: weaponTypes,
                });
            } else {
                console.log("Failed to grab weapons");
            }
        });
    }

    private weaponTypeToCardGroup(wt: WeaponType): JSX.Element {
        return (
            <Card.Group style={{marginBottom: "20px"}}>
                {wt.weapons.map(w => (
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
                ))}
            </Card.Group>
        );
    }

    render() {
        const {status, weapons} = this.state;

        if (status.key == "loading") {
            return (
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Loader active/>
                </div>
            );
        }

        if (status.key == "error") {
            return (
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Message error>
                        {i18n.t(status.message)}
                    </Message>
                </div>
            );
        }

        return (
            <div id="mainRoot" style={{padding: "20px"}}>
                {weapons.map(wt => (
                    <div key={wt.key}>
                        <Header as="h2" content={Weapon.weaponEnumToName(wt.key)}/>
                        {this.weaponTypeToCardGroup(wt)}
                    </div>
                ))}
            </div>
        );
    }
}

ReactDom.render(
    <Main/>,
    document.getElementById("content"),
);
