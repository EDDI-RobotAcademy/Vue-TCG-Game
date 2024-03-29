<template>
    <div ref="rendererContainer"></div>
</template>

<script>
import * as THREE from 'three';

export default {
    mounted() {
        // 캔버스 엘리먼트 생성
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.$refs.rendererContainer.appendChild(this.renderer.domElement);

        // 씬 생성
        this.scene = new THREE.Scene();

        // 카메라 생성
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        // 박스 생성
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        // 애니메이션 함수 호출
        this.animate();
    },
    methods: {
        animate() {
            // 큐브 회전
            this.cube.rotation.x += 0.01;
            this.cube.rotation.y += 0.01;

            // 씬과 카메라를 렌더러에 렌더링
            this.renderer.render(this.scene, this.camera);

            // 다음 프레임 요청
            requestAnimationFrame(this.animate);
        }
    }
};
</script>

<style>
#rendererContainer {
    width: 100%;
    height: 100%;
}
</style>
