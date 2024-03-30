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
import BoneDragonImage from '@/assets/eddi_tcg_game/images/battle_field_card/134.png';

export default {
    data() {
        return {
            src: battleFieldBackgoundImage,
        };
    },
    setup () {

    },
    mounted() {
        // this.$refs.audioPlayer.play();
        // Canvas 요소 가져오기
        const canvas = this.$refs.canvas;

        // Three.js Scene 생성
        const scene = new THREE.Scene();

        // Three.js Camera 생성
        // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        // const aspect = window.innerWidth / window.innerHeight;
        // const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 1, 1000);
        const camera = new THREE.OrthographicCamera(0, window.innerWidth, window.innerHeight, 0, -1, 1000);
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

        const imageBitmapLoader = new THREE.ImageBitmapLoader();
        imageBitmapLoader.setOptions({ imageOrientation: 'flipY' });
        console.log('BoneDragonImage: ', BoneDragonImage)
        imageBitmapLoader.load(
            BoneDragonImage,
            (imageBitmap) => {
                const texture = new THREE.CanvasTexture(imageBitmap);
                const boneDragonMaterial = new THREE.MeshBasicMaterial({ map: texture });

                const card_width = 140.0
                const golden_ratio = 1.618
                const boneDragonGeometry = new   THREE.PlaneGeometry(card_width, card_width * golden_ratio);
                const boneDragonMesh = new THREE.Mesh(boneDragonGeometry, boneDragonMaterial);

                // self.applyLocalTranslation(boneDragonMesh, -100, -100, 0);
                // self.moveCardTo(boneDragonMesh, 50, 50);
                boneDragonMesh.position.x += 580
                boneDragonMesh.position.y += 140
                scene.add(boneDragonMesh);
            },
            undefined,
            (err) => {
                console.error('An error happened', err);
            }
        );

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
    },
    beforeUnmount() {
        // this.$refs.audioPlayer.pause();
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
