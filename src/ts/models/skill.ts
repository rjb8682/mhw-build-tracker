import {SkillAttributes} from "./attributes";
import {ParseResult, ParseUtils} from "bryx-cereal";

export class SkillRank {
    private constructor(
        public id: number,
        public slug: string,
        public level: number,
        public description: string,
        public modifiers: SkillAttributes[],
        public skill: number,
    ) {}

    static parse(o: any): ParseResult<SkillRank> {
        try {
            return ParseUtils.parseSuccess(new SkillRank(
                ParseUtils.getNumber(o, "id"),
                ParseUtils.getString(o, "slug"),
                ParseUtils.getNumber(o, "level"),
                ParseUtils.getString(o, "description"),
                ParseUtils.getArrayOfSubobjects(o, "modifiers", SkillAttributes.parse, "warn"),
                ParseUtils.getNumber(o, "skill"),
            ));
        } catch (e) {
            return ParseUtils.parseFailure<SkillRank>(`Invalid SkillRank: ${e.message}`);
        }
    }
}

export class Skill {
    private constructor(
        public id: number,
        public slug: string,
        public name: string,
        public description: string,
        public ranks: SkillRank[],
    ) {}

    static parse(o: any): ParseResult<Skill> {
        try {
            return ParseUtils.parseSuccess(new Skill(
                ParseUtils.getNumber(o, "id"),
                ParseUtils.getString(o, "slug"),
                ParseUtils.getString(o, "name"),
                ParseUtils.getString(o, "description"),
                ParseUtils.getArrayOfSubobjects(o, "ranks", SkillRank.parse, "warn"),
            ));
        } catch (e) {
            return ParseUtils.parseFailure<Skill>(`Invalid Skill: ${e.message}`);
        }
    }
}
