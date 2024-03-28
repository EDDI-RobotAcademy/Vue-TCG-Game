import { createRouter, createWebHistory } from 'vue-router';

import HomeRoutes from "@/home/router/HomeRoutes";

const routes = [
    ...HomeRoutes,
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    base: process.env.BASE_URL
});

export default router