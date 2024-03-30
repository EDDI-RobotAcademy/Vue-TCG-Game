import * as THREE from 'three';

export function createRectangle(scene, width, height, opacity, position) {
    // 투명한 재질 생성
    const material = new THREE.MeshBasicMaterial({ transparent: true, opacity: opacity });

    // 2D 사각형 생성
    const geometry = new THREE.PlaneGeometry(width, height);
    const rectangle = new THREE.Mesh(geometry, material);

    // 위치 설정
    if (position) {
        rectangle.position.copy(position);
    }

    rectangle.userData.isAreaRectangle = true;

    // Scene에 추가
    scene.add(rectangle);

    // 생성된 사각형 반환
    return rectangle;
}

// export function createScrollableRectangle