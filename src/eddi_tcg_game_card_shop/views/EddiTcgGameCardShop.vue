<template>
    <div>
        <!-- 음악 파일을 숨겨진 audio 요소로 추가 -->
        <audio ref="audioPlayer" :src="require('@/assets/eddi_tcg_game/music/card_shop/card-shop.mp3')" autoplay loop style="display: none;"></audio>
    </div>
    <div class="container">
        <!-- Three.js 캔버스를 Vue.js DOM에 추가 -->
        <canvas ref="canvas" class="canvas-container"></canvas>
    </div>
</template>

<script>
import * as THREE from 'three';
import cardShopBackgoundImage from '@/assets/eddi_tcg_game/images/card_shop/cardShopBackgroundImage.png';

export default {
    data() {
        return {
            src: cardShopBackgoundImage,
        };
    },
    mounted() {
        const navbarHeight = document.querySelector('.v-app-bar').clientHeight;
        // this.$refs.audioPlayer.play();
        // Canvas 요소 가져오기
        const canvas = this.$refs.canvas;

        // Three.js Scene 생성
        const scene = new THREE.Scene();

        // Three.js Camera 생성
        const aspectRatio = window.innerWidth / window.innerHeight;
        const camera = new THREE.OrthographicCamera(-aspectRatio, aspectRatio, 1, -1, 0.1, 1000);
        camera.position.z = 5;

        // Three.js Renderer 생성 및 Canvas에 추가
        const renderer = new THREE.WebGLRenderer({canvas});
        renderer.setSize(window.innerWidth, window.innerHeight - navbarHeight);
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
        const cubeGeometry = new THREE.BoxGeometry();
        const cubeMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        scene.add(cube);

        // 애니메이션 함수 정의
        const animate = () => {
            requestAnimationFrame(animate);
            // 큐브 회전
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            // Three.js Scene 렌더링
            renderer.render(scene, camera);
        };

        // 애니메이션 시작
        animate();
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
    height: calc(100vh - 64px);
    background-image: url(@/assets/eddi_tcg_game/images/card_shop/cardShopBackgroundImage.png);
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
