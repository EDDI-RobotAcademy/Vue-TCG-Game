import * as THREE from 'three';

export function loadImageTexture(imagePath, onSuccess, onError) {
    const imageBitmapLoader = new THREE.ImageBitmapLoader();
    imageBitmapLoader.setOptions({ imageOrientation: 'flipY' });
    imageBitmapLoader.load(
        imagePath,
        onSuccess,
        undefined,
        onError
    );
}

// export function loadNonBackgroundImageTexture(imagePath, onSuccess, onError) {
//     const imageBitmapLoader = new THREE.ImageBitmapLoader();
//     imageBitmapLoader.setOptions({ imageOrientation: 'flipY' });
//     imageBitmapLoader.load(
//         imagePath,
//         (imageBitmap) => {
//             const texture = new THREE.CanvasTexture(imageBitmap);
//             texture.premultiplyAlpha = true; // 알파 채널 사전 처리 비활성화
//             onSuccess(texture);
//         },
//         undefined,
//         onError
//     );
// }

export function calculateCardPosition(cardWidthRatio, cardHeightRatio, aspect) {
    const cardX = (-0.433982683982684 + cardWidthRatio / 2.0) * aspect;
    const cardY = ((-0.9421487603305785 + cardHeightRatio) / 2.0) * aspect

    return { x: cardX, y: cardY };
}

export function createMesh(texture, scene, cardWidthRatio, cardHeightRatio, aspect) {
    // console.log('cardWidthRatio: ', cardWidthRatio, 'cardHeightRatio: ', cardHeightRatio)
    const battleFieldCardMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: texture,
    });

    // const cardWidthRatio = 0.0667567568;
    const cardWidth = cardWidthRatio * 2 * aspect;
    const goldenRatio = 1.618;
    const cardHeight = cardWidth * goldenRatio;
    // const cardHeightRatio = 0.17561983471
    // console.log('cardwidth: ', cardWidth, 'cardHeight: ', cardHeight)

    const cardPosition = calculateCardPosition(cardWidthRatio, cardHeightRatio, aspect);

    const battleFieldCardGeometry = new THREE.PlaneGeometry(cardWidth, cardHeight);
    const battleFieldCardMesh = new THREE.Mesh(battleFieldCardGeometry, battleFieldCardMaterial);

    // console.log('createMesh: ', boneDragonMaterial, aspect, boneDragonGeometry, boneDragonMesh)

    battleFieldCardMesh.position.x += cardPosition.x;
    battleFieldCardMesh.position.y += cardPosition.y;

    battleFieldCardMesh.userData.isAreaRectangle = false;

    scene.add(battleFieldCardMesh);
}

export function createBattleFieldCardMesh(texture, cardWidthRatio, cardHeightRatio, aspect) {
    const battleFieldCardMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: texture,
    });

    const cardWidth = cardWidthRatio * 2 * aspect;
    const goldenRatio = 1.618;
    const cardHeight = cardWidth * goldenRatio;

    const cardPosition = calculateCardPosition(cardWidthRatio, cardHeightRatio, aspect);

    const battleFieldCardGeometry = new THREE.PlaneGeometry(cardWidth, cardHeight);
    const battleFieldCardMesh = new THREE.Mesh(battleFieldCardGeometry, battleFieldCardMaterial);

    battleFieldCardMesh.position.x += cardPosition.x;
    battleFieldCardMesh.position.y += cardPosition.y;
    console.log('battleFieldCardMesh.position: ', battleFieldCardMesh.position)

    battleFieldCardMesh.userData.isAreaRectangle = false;

    console.log('createBattleFieldCardMesh() -> battleFieldCardMesh: ', battleFieldCardMesh)
    return battleFieldCardMesh
}

export function createCardRaceMesh(texture, cardWidthRatio, cardHeightRatio, aspect) {
    console.log('createCardRaceMesh()')
    const cardRaceMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: texture,
        transparent: true
    });

    const cardWidth = cardWidthRatio * 2 * aspect;
    const cardHeight = cardHeightRatio * 2 * aspect;

    // const cardPosition = calculateCardPosition(cardWidthRatio, cardHeightRatio, aspect);

    const cardRaceMeshGeometry = new THREE.PlaneGeometry(cardWidth, cardHeight);
    const cardRaceMesh = new THREE.Mesh(cardRaceMeshGeometry, cardRaceMaterial);

    // cardRaceMesh.position.x += cardPosition.x;
    // cardRaceMesh.position.y += cardPosition.y;

    cardRaceMesh.userData.isAreaRectangle = false;

    return cardRaceMesh
}
