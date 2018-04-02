import {ArmorAttributes} from "./attributes";
import {ParseResult, ParseUtils} from "bryx-cereal";
import {SkillRank} from "./skill";

export enum ArmorType {
    head, chest, gloves, waist, legs,
}

export enum ArmorRank {
    low, high,
}

export class Armor {
    private constructor(
        public id: number,
        public slug: string,
        public name: string,
        public type: ArmorType,
        public rank: ArmorRank,
        public attributes: ArmorAttributes,
        public skills: SkillRank[],
    ) {}

    static parse(o: any): ParseResult<Armor> {
        try {
            return ParseUtils.parseSuccess(new Armor(
                ParseUtils.getNumber(o, "id"),
                ParseUtils.getString(o, "slug"),
                ParseUtils.getString(o, "name"),
                ParseUtils.getEnum(o, "type", ArmorType),
                ParseUtils.getEnum(o, "rank", ArmorRank),
                ParseUtils.getSubobject(o, "attributes", ArmorAttributes.parse),
                ParseUtils.getArrayOfSubobjects(o, "skills", SkillRank.parse, "warn"),
            ));
        } catch (e) {
            return ParseUtils.parseFailure<Armor>(`Invalid Armor: ${e.message}`);
        }
    }
}
