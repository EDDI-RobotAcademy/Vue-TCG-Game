import { createRouter, createWebHistory } from 'vue-router';

import HomeRoutes from "@/home/router/HomeRoutes";
import EddiTcgGameMainLobbyRoutes from "@/eddi_tcg_game_main_lobby/router/EddiTcgGameMainLobbyRoutes";
import EddiTcgGameBattleFieldRoutes from "@/eddi_tcg_game_battle_field/router/EddiTcgGameBattleFieldRoutes";

const routes = [
    ...HomeRoutes,
    ...EddiTcgGameMainLobbyRoutes,
    ...EddiTcgGameBattleFieldRoutes,
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    base: process.env.BASE_URL
});

export default router