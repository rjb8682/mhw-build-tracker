import {ParseResult, ParseUtils} from 'bryx-cereal';
import {MaterialCost} from "./item";
import {WeaponAttributes} from "./attributes";
import {Colors, RarityColors} from "../utils/colors";

export enum WeaponTypeEnum {
    "great-sword", "long-sword", "sword-and-shield", "dual-blades", hammer, "hunting-horn", lance,
    gunlance, "switch-axe", "charge-blade", "insect-glaive", "light-bowgun", "heavy-bowgun", bow,
}

export class Crafting {
    private constructor(
        public craftable: boolean,
        public previous: number | null,
        public branches: number[],
        public craftingMaterials: MaterialCost[],
        public upgradeMaterials: MaterialCost[],
    ) {}

    static parse(o: any): ParseResult<Crafting> {
        try {
            return ParseUtils.parseSuccess(new Crafting(
                ParseUtils.getBoolean(o, "craftable"),
                ParseUtils.getNumberOrNull(o, "previous"),
                ParseUtils.getArray(o, "branches"),
                ParseUtils.getArrayOfSubobjects(o, "craftingMaterials", MaterialCost.parse, "warn"),
                ParseUtils.getArrayOfSubobjects(o, "upgradeMaterials", MaterialCost.parse, "warn"),
            ));
        } catch (e) {
            return ParseUtils.parseFailure<Crafting>(`Invalid Crafting: ${e.message}`);
        }
    }
}

export class Weapon {
    private constructor(
        public id: number,
        public slug: string,
        public name: string,
        public type: WeaponTypeEnum,
        public rarity: number,
        public attributes: WeaponAttributes,
        public crafting: Crafting,
    ) {}

    static parse(o: any): ParseResult<Weapon> {
        try {
            return ParseUtils.parseSuccess(new Weapon(
                ParseUtils.getNumber(o, "id"),
                ParseUtils.getString(o, "slug"),
                ParseUtils.getString(o, "name"),
                ParseUtils.getEnum(o, "type", WeaponTypeEnum),
                ParseUtils.getNumber(o, "rarity"),
                ParseUtils.getSubobject(o, "attributes", WeaponAttributes.parse),
                ParseUtils.getSubobject(o, "crafting", Crafting.parse),
            ));
        } catch (e) {
            return ParseUtils.parseFailure<Weapon>(`Invalid Weapon: ${e.message}`);
        }
    }

    static getRarityColor(rarity: number): string {
        switch (rarity) {
            case 1: return RarityColors.rarity1;
            case 2: return RarityColors.rarity2;
            case 3: return RarityColors.rarity3;
            case 4: return RarityColors.rarity4;
            case 5: return RarityColors.rarity5;
            case 6: return RarityColors.rarity6;
            case 7: return RarityColors.rarity7;
            case 8: return RarityColors.rarity8;
            default: return Colors.black;
       }
    }

    static weaponEnumToName(wEnum: WeaponTypeEnum) {
        return WeaponTypeEnum[wEnum].split("-").map(s => s == "and" ? s : s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
    }

    weaponToRarityImage(): string {
        let weaponType = WeaponTypeEnum[this.type].toLowerCase();
        if (this.type == WeaponTypeEnum["sword-and-shield"]) {
            weaponType = "sword-shield";
        } else if (this.type == WeaponTypeEnum["great-sword"]) {
            weaponType = "greatsword";
        } else if (this.type == WeaponTypeEnum["long-sword"]) {
            weaponType = "longsword";
        }

        const baseUrl = "https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/";

        return `${baseUrl}rare-${this.rarity}-${weaponType}-mhw_tree${weaponType == "insect-glaive" ? "_tree" : ""}.png`;
    }
}

export interface WeaponType {
    key: WeaponTypeEnum;
    weapons: Weapon[];
}
