import { createRouter, createWebHistory } from 'vue-router';

import HomeRoutes from "@/home/router/HomeRoutes";
import EddiTcgGameRoutes from "@/eddi_tcg_game/router/EddiTcgGameRoutes";

const routes = [
    ...HomeRoutes,
    ...EddiTcgGameRoutes,
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    base: process.env.BASE_URL
});

export default router