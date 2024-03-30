<template>
    <div>
        <!-- 음악 파일을 숨겨진 audio 요소로 추가 -->
        <audio ref="audioPlayer" :src="require('@/assets/eddi_tcg_game/music/battle_field/battle-field.mp3')" autoplay loop style="display: none;"></audio>
    </div>
    <div class="container">
        <!-- Three.js 캔버스를 Vue.js DOM에 추가 -->
        <canvas ref="canvas" class="canvas-container"></canvas>
    </div>
</template>

<script>
import * as THREE from 'three';
import battleFieldBackgoundImage from '@/assets/eddi_tcg_game/images/battle_field/battleFieldBackgoundImage.png';
// import BoneDragonImage from '@/assets/eddi_tcg_game/images/battle_field_card/134.png';
// import NetherBladeImage from '@/assets/eddi_tcg_game/images/battle_field_card/19.png';
// import KnightOfLightEsterosImage from '@/assets/eddi_tcg_game/images/battle_field_card/23.png';
// import GatesOfHellImage from '@/assets/eddi_tcg_game/images/battle_field_card/45.png';
// import SecondComingOfJudgementImage from '@/assets/eddi_tcg_game/images/battle_field_card/108.png';
// import PhoenixImage from '@/assets/eddi_tcg_game/images/battle_field_card/128.png';
// import WarlordLeonidasImage from '@/assets/eddi_tcg_game/images/battle_field_card/133.png';
// import NecromancerOublyLvMaxImage from '@/assets/eddi_tcg_game/images/battle_field_card/176.png';

import UndeadRaceImage from '@/assets/eddi_tcg_game/images/card_race/2.png'

import {loadImageTexture, createCardRaceMesh} from '@/components/webgl/image_texture_control.js';
import { createRectangle } from '@/components/webgl/shape_control.js';

import { PickableCardControl } from '@/components/your_hand_pickable_card/pickable_card_control.js'
import ImageTextureKinds from "@/components/image_texture/image_texture_kinds";

export default {
    data() {
        return {
            src: battleFieldBackgoundImage,

            // 이동 중인 객체
            activeObject: null,
            // 이동 시작 위치
            startPosition: { x: 0, y: 0 },
            // 마우스 클릭 여부
            isMouseDown: false,

            ppickableCardControl: null
        };
    },
    mounted() {
        this.initPickableCardControl();
        // Canvas 요소 가져오기
        const canvas = this.$refs.canvas;

        // Three.js Scene 생성
        const scene = new THREE.Scene();

        // Three.js Camera 생성
        const aspect = window.innerWidth / window.innerHeight;
        const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 1, 1000);
        // const camera = new THREE.OrthographicCamera(0, window.innerWidth, window.innerHeight, 0, -1, 1000);
        camera.position.z = 5;

        // Three.js Renderer 생성 및 Canvas에 추가
        const renderer = new THREE.WebGLRenderer({canvas});
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xcccccc, 0.0)

        // // 배경 이미지를 Three.js로 그리기
        // const textureLoader = new THREE.TextureLoader();
        // const backgroundTexture = textureLoader.load(battleFieldBackgoundImage);
        // const aspectRatio = window.innerWidth / window.innerHeight;
        // const backgroundGeometry = new THREE.PlaneGeometry(aspectRatio * 2, 2, 0);
        // const backgroundMaterial = new THREE.MeshBasicMaterial({map: backgroundTexture});
        // const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
        // scene.add(backgroundMesh);

        // 큐브를 추가하여 Three.js의 렌더링 적용
        // const cubeGeometry = new THREE.BoxGeometry();
        // const cubeMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
        // const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        // scene.add(cube);

        const yourFieldAreaRectangle = createRectangle(scene, 2.8, 0.4, 0.0, new THREE.Vector3(0, -0.20867768595041314, 0));
        scene.add(yourFieldAreaRectangle);

        const opponentFieldAreaRectangle = createRectangle(scene, 2.8, 0.4, 0.0, new THREE.Vector3(0, 0.20867768595041314, 0));
        scene.add(opponentFieldAreaRectangle);

        const yourHandAreaRectangle = createRectangle(scene, 2.0, 0.45, 0.0, new THREE.Vector3(0, -0.72867768595041314, 0));
        scene.add(yourHandAreaRectangle);

        this.placeCards(134, scene)

        loadImageTexture(UndeadRaceImage, (imageBitmap) => {
            const texture = new THREE.CanvasTexture(imageBitmap);
            texture.colorSpace = THREE.SRGBColorSpace;
            // texture.alpha = THREE.AlphaFormat;
            texture.transparent = true;
            console.log('texture: ', texture)

            // 캔버스 크기에 따라 카드 크기 계산
            const cardWidthRatio = 0.0667567568;
            const cardHeightRatio = 0.17561983471;

            // Mesh 생성
            const cardRaceMesh = createCardRaceMesh(texture, scene, cardWidthRatio, cardHeightRatio, aspect);
            cardRaceMesh.userData.imageTextureKinds = ImageTextureKinds.FRAME
            scene.add(cardRaceMesh)
        }, (err) => {
            console.error('An error happened', err);
        });

        // loadImageTexture(BoneDragonImage, (imageBitmap) => {
        //     const texture = new THREE.CanvasTexture(imageBitmap);
        //     texture.colorSpace = THREE.SRGBColorSpace;
        //
        //     // 캔버스 크기에 따라 카드 크기 계산
        //     const cardWidthRatio = 0.0667567568;
        //     const cardHeightRatio = 0.17561983471;
        //
        //     // Mesh 생성
        //     createMesh(texture, scene, cardWidthRatio, cardHeightRatio, aspect);
        // }, (err) => {
        //     console.error('An error happened', err);
        // });

        // loadImageTexture(NetherBladeImage, (imageBitmap) => {
        //     const texture = new THREE.CanvasTexture(imageBitmap);
        //     texture.colorSpace = THREE.SRGBColorSpace;
        //
        //     // 캔버스 크기에 따라 카드 크기 계산
        //     const cardWidthRatio = 0.0667567568;
        //     const cardHeightRatio = 0.17561983471;
        //
        //     // Mesh 생성
        //     createMesh(texture, scene, cardWidthRatio, cardHeightRatio, aspect);
        // }, (err) => {
        //     console.error('An error happened', err);
        // });
        //
        // loadImageTexture(KnightOfLightEsterosImage, (imageBitmap) => {
        //     const texture = new THREE.CanvasTexture(imageBitmap);
        //     texture.colorSpace = THREE.SRGBColorSpace;
        //
        //     // 캔버스 크기에 따라 카드 크기 계산
        //     const cardWidthRatio = 0.0667567568;
        //     const cardHeightRatio = 0.17561983471;
        //
        //     // Mesh 생성
        //     createMesh(texture, scene, cardWidthRatio, cardHeightRatio, aspect);
        // }, (err) => {
        //     console.error('An error happened', err);
        // });
        //
        // loadImageTexture(WarlordLeonidasImage, (imageBitmap) => {
        //     const texture = new THREE.CanvasTexture(imageBitmap);
        //     texture.colorSpace = THREE.SRGBColorSpace;
        //
        //     // 캔버스 크기에 따라 카드 크기 계산
        //     const cardWidthRatio = 0.0667567568;
        //     const cardHeightRatio = 0.17561983471;
        //
        //     // Mesh 생성
        //     createMesh(texture, scene, cardWidthRatio, cardHeightRatio, aspect);
        // }, (err) => {
        //     console.error('An error happened', err);
        // });
        //
        // loadImageTexture(NecromancerOublyLvMaxImage, (imageBitmap) => {
        //     const texture = new THREE.CanvasTexture(imageBitmap);
        //     texture.colorSpace = THREE.SRGBColorSpace;
        //
        //     // 캔버스 크기에 따라 카드 크기 계산
        //     const cardWidthRatio = 0.0667567568;
        //     const cardHeightRatio = 0.17561983471;
        //
        //     // Mesh 생성
        //     createMesh(texture, scene, cardWidthRatio, cardHeightRatio, aspect);
        // }, (err) => {
        //     console.error('An error happened', err);
        // });
        //
        // loadImageTexture(GatesOfHellImage, (imageBitmap) => {
        //     const texture = new THREE.CanvasTexture(imageBitmap);
        //     texture.colorSpace = THREE.SRGBColorSpace;
        //
        //     // 캔버스 크기에 따라 카드 크기 계산
        //     const cardWidthRatio = 0.0667567568;
        //     const cardHeightRatio = 0.17561983471;
        //
        //     // Mesh 생성
        //     createMesh(texture, scene, cardWidthRatio, cardHeightRatio, aspect);
        // }, (err) => {
        //     console.error('An error happened', err);
        // });
        //
        // loadImageTexture(SecondComingOfJudgementImage, (imageBitmap) => {
        //     const texture = new THREE.CanvasTexture(imageBitmap);
        //     texture.colorSpace = THREE.SRGBColorSpace;
        //
        //     // 캔버스 크기에 따라 카드 크기 계산
        //     const cardWidthRatio = 0.0667567568;
        //     const cardHeightRatio = 0.17561983471;
        //
        //     // Mesh 생성
        //     createMesh(texture, scene, cardWidthRatio, cardHeightRatio, aspect);
        // }, (err) => {
        //     console.error('An error happened', err);
        // });
        //
        // loadImageTexture(PhoenixImage, (imageBitmap) => {
        //     const texture = new THREE.CanvasTexture(imageBitmap);
        //     texture.colorSpace = THREE.SRGBColorSpace;
        //
        //     // 캔버스 크기에 따라 카드 크기 계산
        //     const cardWidthRatio = 0.0667567568;
        //     const cardHeightRatio = 0.17561983471;
        //
        //     // Mesh 생성
        //     createMesh(texture, scene, cardWidthRatio, cardHeightRatio, aspect);
        // }, (err) => {
        //     console.error('An error happened', err);
        // });

        // 마우스 클릭 이벤트 리스너 등록
        canvas.addEventListener('mousedown', (event) => this.onMouseDown(event, camera, scene), false);
        canvas.addEventListener('mousemove', (event) => this.onMouseMove(event), false);
        canvas.addEventListener('mouseup', (event) => this.onMouseUp(event), false);

        // 애니메이션 함수 정의
        const animate = () => {
            requestAnimationFrame(animate);
            // 큐브 회전
            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.01;
            // Three.js Scene 렌더링
            renderer.render(scene, camera);
        };

        // 애니메이션 시작
        animate();
    },
    methods: {
        applyLocalTranslation (mesh, x, y, z) {
            mesh.position.x += x;
            mesh.position.y += y;
            mesh.position.z += z;
        },
        // moveCardTo(mesh, x, y) {
        //     const cardWidth = mesh.geometry.parameters.width; // 카드의 너비
        //     const cardHeight = mesh.geometry.parameters.height; // 카드의 높이
        //
        //     // 카드의 좌측 하단 모서리를 설정
        //     mesh.position.x = x - (window.innerWidth / 2) + (cardWidth / 2);
        //     mesh.position.y = (window.innerHeight / 2) - y - cardHeight; // y값은 반대로 계산해야 함
        // }
        onMouseDown(event, camera, scene) {
            if (!this.$refs.canvas) return;

            const canvasBounds = this.$refs.canvas.getBoundingClientRect();
            const mouse = {
                x: ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1,
                y: -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1,
            };

            console.log('Clicked at (x, y):', mouse.x, ',', mouse.y);

            // 카메라를 통해 마우스 좌표로 레이 생성
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);

            // 레이와 교차하는 객체들을 찾음
            const intersects = raycaster.intersectObjects(scene.children, true);

            for (const intersect of intersects) {
                const intersectedObject = intersect.object;

                if (intersectedObject.userData.isAreaRectangle === false) {
                    console.log('Clicked Card');

                    // 이동 중인 객체로 설정
                    this.activeObject = intersectedObject;
                    // 마우스 클릭 상태로 설정
                    this.isMouseDown = true;
                    this.startPosition = { x: event.clientX, y: event.clientY }
                }
            }
        },
        onMouseMove(event) {
            if (!this.isMouseDown || !this.activeObject) return;

            // Canvas 내의 마우스 위치 계산
            const mouseX = event.clientX - this.startPosition.x;
            const mouseY = event.clientY - this.startPosition.y
            console.log('mouseX: ', mouseX, 'mouseY: ', mouseY)
            console.log('this.startPosition.x: ', this.startPosition.x, 'this.startPosition.y: ', this.startPosition.y)
            console.log('window.innerWidth: ', window.innerWidth, 'window.innerHeight: ', window.innerHeight)

            const aspect = window.innerWidth / window.innerHeight;
            console.log('aspect: ', aspect)

            // 마우스 이동량 계산
            const deltaX = 2 * aspect * mouseX / window.innerWidth
            const deltaY = aspect * mouseY / window.innerHeight
            console.log('deltaX: ', deltaX, 'deltaY: ', deltaY)

            // 이동 시작 위치 업데이트
            this.activeObject.position.x += deltaX
            this.activeObject.position.y -= deltaY

            this.startPosition = { x: event.clientX, y: event.clientY }
        },
        // eslint-disable-next-line no-unused-vars
        onMouseUp(event) {
            // 마우스 클릭 상태 해제
            this.isMouseDown = false;
            // 이동 중인 객체 초기화
            this.activeObject = null;
        },
        initPickableCardControl() {
            this.pickableCardControl = new PickableCardControl();
        },
        placeCards(cardNumber, scene) {
            const aspect = window.innerWidth / window.innerHeight;
            this.pickableCardControl.setAspect(aspect)
            this.pickableCardControl.initBattleFieldHandCard(cardNumber, scene);
        }
    },
    beforeUnmount() {
        // this.$refs.audioPlayer.pause();
        const canvas = this.$refs.canvas;
        canvas.removeEventListener('click', this.onMouseDown, false);
        canvas.removeEventListener('mousemove', this.onMouseMove, false);
        canvas.removeEventListener('mouseup', this.onMouseUp, false);
    }
};
</script>

<style scoped>
.container {
    position: relative;
    width: 100vw; /* 화면 너비에 맞추기 */
    height: 100vh; /* 화면 높이에 맞추기 */
    background-image: url(@/assets/eddi_tcg_game/images/battle_field/battleFieldBackgoundImage.png);
    background-size: 100% 100%;
    /*background-position: center; !* 배경 이미지를 중앙에 정렬하기 *!*/
    /*background-repeat: no-repeat; !* 배경 이미지 반복 제거 *!*/
}

.canvas-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
}
</style>
