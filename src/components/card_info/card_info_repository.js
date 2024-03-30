import cardData from '@/useful_tool/python/every_card_info.js';

class CardInfoRepository {
    static instance = null;

    constructor() {
        if (CardInfoRepository.instance) {
            return CardInfoRepository.instance;
        }
        this.cardData = cardData;
        CardInfoRepository.instance = this;
    }

    static getInstance() {
        if (!CardInfoRepository.instance) {
            CardInfoRepository.instance = new CardInfoRepository();
        }
        return CardInfoRepository.instance;
    }

    findRaceInfoByCardNumber(cardNumber) {
        const card = this.cardData.find(card => card['카드번호'] === cardNumber);
        if (card) {
            return card['종족'];
        } else {
            return '카드를 찾을 수 없습니다.';
        }
    }

    findCardTypeByCardNumber(cardNumber) {
        const card = this.cardData.find(card => card['카드번호'] === cardNumber);
        if (card) {
            return card['종류'];
        } else {
            return '카드를 찾을 수 없습니다.';
        }
    }
}

export default CardInfoRepository;