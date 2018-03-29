import {ParseResult, ParseUtils} from 'bryx-cereal';

export enum WeaponTypeEnum {
    "great-sword", "long-sword", "sword-and-shield", "dual-blades", hammer, "hunting-horn", lance,
    gunlance, "switch-axe", "charge-blade", "insect-glaive", "light-bowgun", "heavy-bowgun", bow,
}

export class Weapon {
    private constructor(
        public id: number,
        public slug: string,
        public name: string,
        public type: WeaponTypeEnum,
        public rarity: number,
        public attributes: any,
    ) {}

    static parse(o: any): ParseResult<Weapon> {
        try {
            return ParseUtils.parseSuccess(new Weapon(
                ParseUtils.getNumber(o, "id"),
                ParseUtils.getString(o, "slug"),
                ParseUtils.getString(o, "name"),
                ParseUtils.getEnum(o, "type", WeaponTypeEnum),
                ParseUtils.getNumber(o, "rarity"),
                o["attributes"],
            ));
        } catch (e) {
            return ParseUtils.parseFailure<Weapon>(`Invalid Weapon: ${e.message}`);
        }
    }

    static getRarityColor(rarity: number): string {
        switch (rarity) {
            case 1: return "#b8b8b8";
            case 2: return "#b8b8b8";
            case 3: return "#a9bc5a";
            case 4: return "#66a253";
            case 5: return "#7eb0b9";
            case 6: return "#6063c8";
            case 7: return "#8365d6";
            case 8: return "#b87d62";
       }
    }

    static weaponEnumToName(wEnum: WeaponTypeEnum) {
        return WeaponTypeEnum[wEnum].split("-").map(s => s == "and" ? s : s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
    }
}

export interface WeaponType {
    key: WeaponTypeEnum;
    weapons: Weapon[];
}
