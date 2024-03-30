import CardInfoRepository from "@/components/card_info/card_info_repository";

// import CardRaceUndeadImage from '@/assets/eddi_tcg_game/images/card_race/2.png'
// import {
//     createCardRaceMesh,
//     loadImageTexture
// } from "@/components/webgl/image_texture_control";
// import BoneDragonImage from "@/assets/eddi_tcg_game/images/battle_field_card/134.png";
// import * as THREE from "three";
// import ImageTextureKinds from "@/components/image_texture/image_texture_kinds";

export default class UnitCard {
    static cardInfo = CardInfoRepository.getInstance();

    constructor(local_translation = [0, 0]) {
        this.shapes = [];
        this.local_translation = local_translation;
    }

    change_local_translation(_translation) {
        this.local_translation = _translation;
    }

    get_shapes() {
        return this.shapes;
    }

    add_shape(shape) {
        // shape.local_translate(this.local_translation);
        this.shapes.push(shape);
    }

    // create_non_background_unit_energy(image_data, energy_number, center, radius) {
    //     // 이미지 생성 코드 생략
    // }

    // create_non_background_unit_race(cardRaceImage, center, radiusRatio, aspect) {
    //     console.log('create_non_background_unit_race()')
    //     const start_x = center[0] - radiusRatio * 1.2;
    //     const end_x = center[0] + radiusRatio * 1.2;
    //     const start_y = center[1] - radiusRatio * 1.2;
    //     const end_y = center[1] + radiusRatio * 1.2;
    //
    //     // const vertices = [
    //     //     [start_x, start_y],
    //     //     [end_x, start_y],
    //     //     [end_x, end_y],
    //     //     [start_x, end_y],
    //     // ];
    //
    //     loadImageTexture(BoneDragonImage, (imageBitmap) => {
    //         const texture = new THREE.CanvasTexture(imageBitmap);
    //         texture.colorSpace = THREE.SRGBColorSpace;
    //
    //         // Mesh 생성
    //         const cardRaceMesh = createCardRaceMesh(texture, end_x - start_x, end_y - start_y, aspect);
    //         cardRaceMesh.userData.imageTextureKinds = ImageTextureKinds.RACE
    //
    //         this.add_shape(cardRaceMesh);
    //     }, (err) => {
    //         console.error('An error happened', err);
    //     });
    //
    //     // const unitRaceImage =
    //     // unitRaceImage
    //     // this.add_shape(unit_race_image);
    // }

    // create_non_background_unit_attack(image_data, attack_number, center, radius) {
    //     // 이미지 생성 코드 생략
    // }
    //
    // create_non_background_unit_attack_wizard(image_data, attack_number, center, radius) {
    //     // 이미지 생성 코드 생략
    // }
    //
    // create_non_background_unit_hp(image_data, hp_number, center, radius) {
    //     // 이미지 생성 코드 생략
    // }

    init_your_hand_shapes(circleRadiusRatio, cardNumber, cardWidthRatio, cardHeightRatio, aspect) {
        console.log('init_your_hand_shapes()')
        const cardRace = UnitCard.cardInfo.findRaceInfoByCardNumber(cardNumber)
        console.log('cardRace: ', cardRace)
        console.log('cardHeightRatio: ', cardHeightRatio)
        console.log('aspect: ', aspect)

        // this.create_non_background_unit_race(
        //     CardRaceUndeadImage,
        //     [cardWidthRatio, 0],
        //     circleRadiusRatio,
        //     aspect)
    }
}