import {ParseResult, ParseUtils} from "bryx-cereal";

export class Attributes {
    public constructor(
        public health: number | null,
        public stamina: number | null,
    ) {}

    static parse(o: any): ParseResult<Attributes> {
        try {
            return ParseUtils.parseSuccess(new Attributes(
                ParseUtils.getNumberOrNull(o, "health"),
                ParseUtils.getNumberOrNull(o, "stamina"),
            ));
        } catch (e) {
            return ParseUtils.parseFailure<Attributes>(`Invalid Attributes: ${e.message}`);
        }
    }
}

export enum DamageType {
    blunt, piercing, slashing,
}

export enum ElementType {
    Fire, Water, Ice, Thunder, Dragon, Poison, Paralysis, Sleep, Blast,
}

export enum BoostType {
    "Sever Boost", "Speed Boost", "Element Boost", "Health Boost", "Stamina Boost", "Blunt Boost",
}

export enum ShellingType {
    "Normal Lv1", "Normal Lv2", "Normal Lv3", "Long Lv1", "Long Lv2", "Long Lv3", "Wide Lv1", "Wide Lv2", "Wide Lv3",
}

export enum CoatingType {
    "Close Range", Paralysis, Poison, Sleep, Blast, Power,
}

export enum Deviation {
    None, Low, Average, High,
}

export enum SpecialAmmoType {
    Wyvernblast, Wyvernheart, Wyvernsnipe,
}

export interface PhialType {
    type: string;
    value: number | null;
}

export class AmmoCapacities {
    private constructor(
        public normal: number[] | null,
        public pierce: number[] | null,
        public spread: number[] | null,
        public sticky: number[] | null,
        public cluster: number[] | null,
        public recover: number[] | null,
        public paralysis: number[] | null,
        public sleep: number[] | null,
        public exhaust: number[] | null,
        public flaming: number[] | null,
        public water: number[] | null,
        public freeze: number[] | null,
        public thunder: number[] | null,
        public dragon: number[] | null,
        public slicing: number[] | null,
        public wyvern: number[] | null,
        public demon: number[] | null,
        public armor: number[] | null,
        public tranq: number[] | null,
    ) {}

    static parse(o: any): ParseResult<AmmoCapacities> {
        try {
            return ParseUtils.parseSuccess(new AmmoCapacities(
                ParseUtils.getArray(o, "normal"),
                ParseUtils.getArray(o, "pierce"),
                ParseUtils.getArray(o, "spread"),
                ParseUtils.getArray(o, "sticky"),
                ParseUtils.getArray(o, "cluster"),
                ParseUtils.getArray(o, "recover"),
                ParseUtils.getArray(o, "paralysis"),
                ParseUtils.getArray(o, "sleep"),
                ParseUtils.getArray(o, "exhaust"),
                ParseUtils.getArray(o, "flaming"),
                ParseUtils.getArray(o, "water"),
                ParseUtils.getArray(o, "freeze"),
                ParseUtils.getArray(o, "thunder"),
                ParseUtils.getArray(o, "dragon"),
                ParseUtils.getArray(o, "slicing"),
                ParseUtils.getArray(o, "wyvern"),
                ParseUtils.getArray(o, "demon"),
                ParseUtils.getArray(o, "armor"),
                ParseUtils.getArray(o, "tranq"),
            ));
        } catch (e) {
            return ParseUtils.parseFailure<AmmoCapacities>(`Invalid AmmoCapacities: ${e.message}`);
        }
    }
}

export class WeaponAttributes {
    private constructor(
        public health: number | null,
        public stamina: number | null,
        public slotsRank1: number | null,
        public slotsRank2: number | null,
        public slotsRank3: number | null,
        public damage: number | null,
        public attack: number | null,
        public affinity: number | null,
        public damageType: DamageType | null,
        public elementType: ElementType | null,
        public elementDamage: number | null,
        public elementHidden: boolean | null,
        public sharpnessRed: number | null,
        public sharpnessOrange: number | null,
        public sharpnessYellow: number | null,
        public sharpnessGreen: number | null,
        public sharpnessBlue: number | null,
        public sharpnessWhite: number | null,
        public boostType: BoostType | null,
        public shellingType: ShellingType | null,
        public phialType: PhialType | null,
        public coatings: CoatingType[] | null,
        public ammoCapacities: AmmoCapacities | null,
        public deviation: Deviation | null,
        public specialAmmo: SpecialAmmoType | null,
    ) {}

    static parse(o: any): ParseResult<WeaponAttributes> {
        try {
            const attributeParse = Attributes.parse(o);
            if (attributeParse.success == false) {
                return ParseUtils.parseFailure<WeaponAttributes>(`Invalid WeaponAttributes: ${attributeParse.justification}`);
            }

            const phialTypeString = ParseUtils.getStringOrNull(o, "phialType");
            let phialType = null;
            if (phialTypeString != null) {
                const splitPhialType = phialTypeString.split(" ");
                phialType = {
                    type: splitPhialType.slice(0, 1).join(" "),
                    value: splitPhialType.length > 2 ? parseInt(splitPhialType[2], 10) : null,
                };
            }

            return ParseUtils.parseSuccess(new WeaponAttributes(
                attributeParse.value.health,
                attributeParse.value.stamina,
                ParseUtils.getNumberOrNull(o, "slotsRank1"),
                ParseUtils.getNumberOrNull(o, "slotsRank2"),
                ParseUtils.getNumberOrNull(o, "slotsRank3"),
                ParseUtils.getNumberOrNull(o, "damage"),
                ParseUtils.getNumberOrNull(o, "attack"),
                ParseUtils.getNumberOrNull(o, "affinity"),
                ParseUtils.getEnumOrNull(o, "damageType", DamageType),
                ParseUtils.getEnumOrNull(o, "elementType", ElementType),
                ParseUtils.getNumberOrNull(o, "elementDamage"),
                ParseUtils.getBooleanOrNull(o, "elementHidden"),
                ParseUtils.getNumberOrNull(o, "sharpnessRed"),
                ParseUtils.getNumberOrNull(o, "sharpnessOrange"),
                ParseUtils.getNumberOrNull(o, "sharpnessYellow"),
                ParseUtils.getNumberOrNull(o, "sharpnessGreen"),
                ParseUtils.getNumberOrNull(o, "sharpnessBlue"),
                ParseUtils.getNumberOrNull(o, "sharpnessWhite"),
                ParseUtils.getEnumOrNull(o, "boostType", BoostType),
                ParseUtils.getEnumOrNull(o, "shellingType", ShellingType),
                phialType,
                ParseUtils.getArrayOrNull(o, "coatings"),
                ParseUtils.getSubobjectOrNull(o, "ammoCapacities", AmmoCapacities.parse),
                ParseUtils.getEnumOrNull(o, "deviation", Deviation),
                ParseUtils.getEnumOrNull(o, "specialAmmo", SpecialAmmoType),
            ));
        } catch (e) {
            return ParseUtils.parseFailure<WeaponAttributes>(`Invalid WeaponAttributes: ${e.message}`);
        }
    }
}

export class ArmorAttributes {
    private constructor(
        public health: number | null,
        public stamina: number | null,
        public slotsRank1: number | null,
        public slotsRank2: number | null,
        public slotsRank3: number | null,
        public requiredGender: string | null,
        public defense: number | null,
        public resistFire: number | null,
        public resistWater: number | null,
        public resistIce: number | null,
        public resistThunder: number | null,
        public resistDragon: number | null,
    ) {}

    static parse(o: any): ParseResult<ArmorAttributes> {
        try {
            const attributeParse = Attributes.parse(o);
            if (attributeParse.success == false) {
                return ParseUtils.parseFailure<ArmorAttributes>(`Invalid ArmorAttributes: ${attributeParse.justification}`);
            }

            return ParseUtils.parseSuccess(new ArmorAttributes(
                attributeParse.value.health,
                attributeParse.value.stamina,
                ParseUtils.getNumberOrNull(o, "slotsRank1"),
                ParseUtils.getNumberOrNull(o, "slotsRank2"),
                ParseUtils.getNumberOrNull(o, "slotsRank3"),
                ParseUtils.getStringOrNull(o, "requiredGender"),
                ParseUtils.getNumberOrNull(o, "defense"),
                ParseUtils.getNumberOrNull(o, "resistFire"),
                ParseUtils.getNumberOrNull(o, "resistWater"),
                ParseUtils.getNumberOrNull(o, "resistIce"),
                ParseUtils.getNumberOrNull(o, "resistThunder"),
                ParseUtils.getNumberOrNull(o, "resistDragon"),
            ));
        } catch (e) {
            return ParseUtils.parseFailure<ArmorAttributes>(`Invalid ArmorAttributes: ${e.message}`);
        }
    }
}

export class SkillAttributes {
    private constructor(
        public health: number | null,
        public stamina: number | null,
        public sharpnessBonus: number | null,
        public damage: number | null,
        public damageFire: number | null,
        public damageWater: number | null,
        public damageIce: number | null,
        public damageThunder: number | null,
        public damageDragon: number | null,
    ) {}

    static parse(o: any): ParseResult<SkillAttributes> {
        try {
            const attributeParse = Attributes.parse(o);
            if (attributeParse.success == false) {
                return ParseUtils.parseFailure<SkillAttributes>(`Invalid SkillAttributes: ${attributeParse.justification}`);
            }

            return ParseUtils.parseSuccess(new SkillAttributes(
                attributeParse.value.health,
                attributeParse.value.stamina,
                ParseUtils.getNumberOrNull(o, "sharpnessBonus"),
                ParseUtils.getNumberOrNull(o, "damage"),
                ParseUtils.getNumberOrNull(o, "damageFire"),
                ParseUtils.getNumberOrNull(o, "damageWater"),
                ParseUtils.getNumberOrNull(o, "damageIce"),
                ParseUtils.getNumberOrNull(o, "damageThunder"),
                ParseUtils.getNumberOrNull(o, "damageDragon"),
            ));
        } catch (e) {
            return ParseUtils.parseFailure<SkillAttributes>(`Invalid SkillAttributes: ${e.message}`);
        }
    }
}
