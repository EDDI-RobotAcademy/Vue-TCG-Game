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

export function calculateCardPosition(cardWidthRatio, cardHeightRatio, aspect) {
    const cardX = (-0.433982683982684 + cardWidthRatio / 2.0) * aspect;
    const cardY = ((-0.9421487603305785 + cardHeightRatio) / 2.0) * aspect

    return { x: cardX, y: cardY };
}

export function createMesh(texture, scene, cardWidthRatio, cardHeightRatio, aspect) {
    // console.log('cardWidthRatio: ', cardWidthRatio, 'cardHeightRatio: ', cardHeightRatio)
    const boneDragonMaterial = new THREE.MeshBasicMaterial({
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

    const boneDragonGeometry = new THREE.PlaneGeometry(cardWidth, cardHeight);
    const boneDragonMesh = new THREE.Mesh(boneDragonGeometry, boneDragonMaterial);

    // console.log('createMesh: ', boneDragonMaterial, aspect, boneDragonGeometry, boneDragonMesh)

    boneDragonMesh.position.x += cardPosition.x;
    boneDragonMesh.position.y += cardPosition.y;

    boneDragonMesh.userData.isAreaRectangle = false;

    scene.add(boneDragonMesh);
}
