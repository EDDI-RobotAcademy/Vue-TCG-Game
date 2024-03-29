<template>
    <div class="container">
        <!-- 캔버스 컨테이너 -->
        <div ref="rendererContainer" class="canvas-container"></div>

        <!-- 배경 이미지 -->
        <div class="background-image"></div>

        <!-- 추가 이미지 -->
        <div class="image-grid">
            <button class="image-button" v-for="(image, index) in images" :key="index" @click="handleButtonClick(image)">
                <img :src="image.src" alt="image">
            </button>
        </div>
    </div>
</template>

<script>
import * as THREE from 'three';
import mainLobbyBackgroundImage from '@/assets/eddi_tcg_game/mainLobbyBackgroundImage.png';
import entranceBattleFieldButton from '@/assets/eddi_tcg_game/entranceBattleFieldButton.png';

export default {
    data() {
        return {
            images: [
                { src: entranceBattleFieldButton },
            ]
        };
    },
    mounted() {
        const navbarHeight = document.querySelector('.v-app-bar').clientHeight;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight - navbarHeight);
        this.$refs.rendererContainer.appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        const textureLoader = new THREE.TextureLoader();
        const backgroundTexture = textureLoader.load(mainLobbyBackgroundImage);
        this.scene.background = backgroundTexture;

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        this.animate();
    },
    methods: {
        animate() {
            this.cube.rotation.x += 0.01;
            this.cube.rotation.y += 0.01;

            this.renderer.render(this.scene, this.camera);
            requestAnimationFrame(this.animate);
        }
    }
};
</script>

<style lang="postcss" scoped>
#rendererContainer {
    width: 100%;
    height: calc(100vh - 64px);
}

.container {
    position: relative;
}

.canvas-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
}

.background-image {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('@/assets/eddi_tcg_game/mainLobbyBackgroundImage.png');
    background-size: cover;
    z-index: -1;
}

.image-grid {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transform: translateX(-20%) translateY(200%);
}


.image-item {
    margin-bottom: 20px;
}

.image-item img {
    max-width: 100px;
    height: auto;
}

.image-button {
    margin-bottom: 20px;
    background: none;
    border: none;
    cursor: pointer;
}

.image-button img {
    max-width: 40%;
    height: auto;
}
</style>
