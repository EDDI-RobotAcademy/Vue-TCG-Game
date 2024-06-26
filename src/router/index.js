import { createRouter, createWebHistory } from 'vue-router';

import HomeRoutes from "@/home/router/HomeRoutes";
import EddiTcgGameMainLobbyRoutes from "@/eddi_tcg_game_main_lobby/router/EddiTcgGameMainLobbyRoutes";
import EddiTcgGameBattleFieldRoutes from "@/eddi_tcg_game_battle_field/router/EddiTcgGameBattleFieldRoutes";
import EddiTcgGameCardShopRoutes from "@/eddi_tcg_game_card_shop/router/EddiTcgGameCardShopRoutes";
import EddiTcgGameMyCardRoutes from "@/eddi_tcg_game_my_card/router/EddiTcgGameMyCardRoutes";

const routes = [
    ...HomeRoutes,
    ...EddiTcgGameMainLobbyRoutes,
    ...EddiTcgGameBattleFieldRoutes,
    ...EddiTcgGameCardShopRoutes,
    ...EddiTcgGameMyCardRoutes,
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    base: process.env.BASE_URL
});

export default router