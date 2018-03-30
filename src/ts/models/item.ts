import {ParseResult, ParseUtils} from "bryx-cereal";

export class Item {
    private constructor(
        public id: number,
        public name: string,
        public description: string,
        public rarity: number,
        public sellPrice: number,
        public buyPrice: number,
        public carryLimit: number,
    ) {}

    static parse(o: any): ParseResult<Item> {
        try {
            return ParseUtils.parseSuccess(new Item(
                ParseUtils.getNumber(o, "id"),
                ParseUtils.getString(o, "name"),
                ParseUtils.getString(o, "description"),
                ParseUtils.getNumber(o, "rarity"),
                ParseUtils.getNumber(o, "sellPrice"),
                ParseUtils.getNumber(o, "buyPrice"),
                ParseUtils.getNumber(o, "carryLimit"),
            ));
        } catch (e) {
            return ParseUtils.parseFailure<Item>(`Invalid Item: ${e.message}`);
        }
    }
}

export class MaterialCost {
    private constructor(
        public quantity: number,
        public item: Item,
    ) {}

    static parse(o: any): ParseResult<MaterialCost> {
        try {
            return ParseUtils.parseSuccess(new MaterialCost(
                ParseUtils.getNumber(o, "quantity"),
                ParseUtils.getSubobject(o, "item", Item.parse),
            ));
        } catch (e) {
            return ParseUtils.parseFailure<MaterialCost>(`Invalid MaterialCost: ${e.message}`);
        }
    }
}
