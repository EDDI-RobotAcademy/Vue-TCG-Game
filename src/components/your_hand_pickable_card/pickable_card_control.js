import {createBattleFieldCardMesh, loadImageTexture} from "@/components/webgl/image_texture_control";
import BoneDragonImage from "@/assets/eddi_tcg_game/images/battle_field_card/134.png";
import * as THREE from "three";
import CardCreationController from "@/components/card_creator/card_creation_control";
import CardInfoRepository from "@/components/card_info/card_info_repository"
import ImageTextureKinds from "@/components/image_texture/image_texture_kinds";

export class PickableCardControl {
    constructor(localTranslation = [0, 0], scale = 1) {
        this.__imagePath = null;
        this.toolCard = null;
        this.pickableCardBase = null;
        this.localTranslation = localTranslation;
        this.scale = scale;
        this.cardNumber = null;
        this.initialVertices = null;
        this.index = 0;
        this.cardInfo = CardInfoRepository.getInstance();
        this.cardController = CardCreationController.getInstance();

        this.aspect = null
        this.attached_shapes = [];
    }

    setAspect(aspect) {
        this.aspect = aspect
    }

    setAttachedShapes(shape) {
        this.attached_shapes.push(shape);
    }

    getAttachedShapes() {
        return this.attached_shapes
    }

    getCardNumber() {
        return this.cardNumber;
    }

    setCardNumber(cardNumber) {
        this.cardNumber = cardNumber;
    }

    getIndex() {
        return this.index;
    }

    setIndex(index) {
        this.index = index;
    }

    changeLocalTranslation(translation) {
        this.localTranslation = translation;
    }

    getPickableCardBase() {
        return this.pickableCardBase;
    }

    getToolCard() {
        return this.toolCard;
    }

    // createCardBasePickableRectangle(color, vertices, localTranslation) {
    //     const pickableCardBase = new PickableRectangle(color, localTranslation, vertices);
    //     pickableCardBase.setInitialVertices(vertices);
    //     return pickableCardBase;
    // }
    //
    // createCardFrame(imageData, vertices, localTranslation) {
    //     const cardFrame = new RectangleImage(imageData, localTranslation, vertices);
    //     cardFrame.setRectangleKinds(RectangleKinds.FRAME);
    //     cardFrame.setInitialVertices(vertices);
    //     return cardFrame;
    // }

    initBattleFieldHandCard(cardNumber, scene) {
        console.log('initBattleFieldHandCard() -> cardNumber: ', cardNumber)
        const cardWidthRatio = 0.0667567568;
        const cardHeightRatio = 0.17561983471;

        loadImageTexture(BoneDragonImage, (imageBitmap) => {
            const texture = new THREE.CanvasTexture(imageBitmap);
            texture.colorSpace = THREE.SRGBColorSpace;

            // Mesh 생성
            const battleFieldCardMesh = createBattleFieldCardMesh(texture, cardWidthRatio, cardHeightRatio, this.aspect);
            battleFieldCardMesh.userData.imageTextureKinds = ImageTextureKinds.FRAME
            scene.add(battleFieldCardMesh)
        }, (err) => {
            console.error('An error happened', err);
        });

        const functionName = this.cardController.getCardTypeTable(this.cardInfo.findCardTypeByCardNumber(cardNumber));
        console.log('functionName: ', functionName)
        const cardShapes = CardCreationController[functionName](this.localTranslation, cardNumber, cardWidthRatio, cardHeightRatio, this.aspect);
        for (const shape of cardShapes) {
            console.log('initBattleFieldHandCard() -> shape: ', shape)
            this.pickableCardBase.setAttachedShapes(shape);
            scene.add(shape)
        }
    }
}

// export function createRectangle(scene, card_number) {
//     loadImageTexture(BoneDragonImage, (imageBitmap) => {
//         const texture = new THREE.CanvasTexture(imageBitmap);
//         texture.colorSpace = THREE.SRGBColorSpace;
//
//         // 캔버스 크기에 따라 카드 크기 계산
//         const cardWidthRatio = 0.0667567568;
//         const cardHeightRatio = 0.17561983471;
//
//         // Mesh 생성
//         createMesh(texture, scene, cardWidthRatio, cardHeightRatio, aspect);
//     }, (err) => {
//         console.error('An error happened', err);
//     });
// }