import {SkillRank} from "./skill";
import {ParseResult, ParseUtils} from "bryx-cereal";

export class Charm {
    private constructor(
        public id: number,
        public slug: string,
        public name: string,
        public skills: SkillRank[],
    ) {}

    static parse(o: any): ParseResult<Charm> {
        try {
            return ParseUtils.parseSuccess(new Charm(
                ParseUtils.getNumber(o, "id"),
                ParseUtils.getString(o, "slug"),
                ParseUtils.getString(o, "name"),
                ParseUtils.getArrayOfSubobjects(o, "skills", SkillRank.parse, "warn"),
            ));
        } catch (e) {
            return ParseUtils.parseFailure<Charm>(`Invalid Charm: ${e.message}`);
        }
    }
}
