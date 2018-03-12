import * as i18n from 'i18next';
import * as XHR from "i18next-xhr-backend";
import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Loader, Message} from "semantic-ui-react";
import {Weapon, WeaponType} from "./models/weapon";
import {MHWApi} from "./utils/mhwApi";
import Options = i18n.InitOptions;

interface MainState {
    status: { key: "ready" } | { key: "error", message: string } | { key: "loading" };
    weapons: {
        greatSword: Weapon[],
        longSword: Weapon[],
        swordAndShield: Weapon[],
        dualBlades: Weapon[],
        hammer: Weapon[],
        huntingHorn: Weapon[],
        lance: Weapon[],
        gunlance: Weapon[],
        switchAxe: Weapon[],
        chargeBlade: Weapon[],
        insectGlaive: Weapon[],
        lightBowgun: Weapon[],
        heavyBowgun: Weapon[],
        bow: Weapon[],
    };
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
            weapons: {
                greatSword: [],
                longSword: [],
                swordAndShield: [],
                dualBlades: [],
                hammer: [],
                huntingHorn: [],
                lance: [],
                gunlance: [],
                switchAxe: [],
                chargeBlade: [],
                insectGlaive: [],
                lightBowgun: [],
                heavyBowgun: [],
                bow: [],
            },
        };
    }

    private loadWeapons() {
        this.setState({
            status: { key: "loading" },
        });

        MHWApi.getWeapons(null, result => {
            if (result.success == true) {
                this.setState({
                    status: { key: "ready" },
                    weapons: {
                        greatSword: result.value.filter(w => WeaponType[w.type] == "great-sword"),
                        longSword: [],
                        swordAndShield: [],
                        dualBlades: [],
                        hammer: [],
                        huntingHorn: [],
                        lance: [],
                        gunlance: [],
                        switchAxe: [],
                        chargeBlade: [],
                        insectGlaive: [],
                        lightBowgun: [],
                        heavyBowgun: [],
                        bow: [],
                    },
                });
            } else {
                console.log("Failed to grab weapons");
            }
        });
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
            <div id="mainRoot">
                {weapons.map(w => (
                    <div>
                        {w.name}
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
