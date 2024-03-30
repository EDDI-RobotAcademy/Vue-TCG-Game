import UnitCard from "@/components/battle_field_unit/unit_card";

const CardCreationController = {
    cardTypeTable: {
        // UNIT
        1: 'unitCardInitShapes',
        ITEM: 'itemCardInitShapes',
        TRAP: 'trapCardInitShapes',
        SUPPORT: 'supportCardInitShapes',
        TOOL: 'toolCardInitShapes',
        ENERGY: 'energyCardInitShapes',
        ENVIRONMENT: 'environmentCardInitShapes',
        TOKEN: 'tokenCardInitShapes'
    },
    getCardTypeTable(cardType) {
        if (this.cardTypeTable[cardType]) {
            return this.cardTypeTable[cardType];
        } else {
            console.error(`No handler function found for card type: ${cardType}`);
            return null;
        }
    },
    unitCardInitShapes(localTranslation, cardNumber, cardWidthRatio, cardHeightRatio, aspect) {
        console.log('unitCardInitShapes()')
        const circleRadiusRatio = 0.01082251082 // 20 / 1848
        const unitCard = new UnitCard(localTranslation);
        unitCard.init_your_hand_shapes(circleRadiusRatio, cardNumber, cardWidthRatio, cardHeightRatio, aspect);
        console.log('unitCardInitShapes() -> unitCard.get_shapes(): ', unitCard.get_shapes())
        return unitCard.get_shapes();
    },
    getInstance() {
        return CardCreationController;
    }
}

export default CardCreationController