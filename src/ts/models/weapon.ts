import {ParseResult, ParseUtils} from 'bryx-cereal';

export enum WeaponType {
    "great-sword", "long-sword", "sword-and-shield", "dual-blades", hammer, "hunting-horn", lance,
    gunlance, "switch-axe", "charge-blade", "insect-glaive", "light-bowgun", "heavy-bowgun", bow,
}

export class Weapon {
    private constructor(
        public id: number,
        public slug: string,
        public name: string,
        public type: string,
        public rarity: number,
        public attributes: any,
    ) {}

    static parse(o: any): ParseResult<Weapon> {
        try {
            return ParseUtils.parseSuccess(new Weapon(
                ParseUtils.getNumber(o, "id"),
                ParseUtils.getString(o, "slug"),
                ParseUtils.getString(o, "name"),
                ParseUtils.getEnum(o, "type", WeaponType),
                ParseUtils.getNumber(o, "rarity"),
                o["attributes"],
            ));
        } catch (e) {
            return ParseUtils.parseFailure<Weapon>(`Invalid Weapon: ${e.message}`);
        }
    }
}
