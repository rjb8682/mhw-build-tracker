import {ParseResult, ParseUtils} from "bryx-cereal";

export class Decoration {
    private constructor(
        public id: number,
        public slug: string,
        public name: string,
        public rarity: number,
        public slot: number,
        public skill: number,
    ) {}

    static parse(o: any): ParseResult<Decoration> {
        try {
            return ParseUtils.parseSuccess(new Decoration(
                ParseUtils.getNumber(o, "id"),
                ParseUtils.getString(o, "slug"),
                ParseUtils.getString(o, "name"),
                ParseUtils.getNumber(o, "rarity"),
                ParseUtils.getNumber(o, "slot"),
                ParseUtils.getNumber(o, "skill"),
            ));
        } catch (e) {
            return ParseUtils.parseFailure<Decoration>(`Invalid Decoration: ${e.message}`);
        }
    }
}
