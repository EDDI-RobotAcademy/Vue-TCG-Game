<template>
    <v-app>
        <navigation-menu-page v-if="showNavBar"/>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>
import NavigationMenuPage from './layout/NavigationMenuPage.vue';

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'
import 'vuetify/styles'

export default {
    components: {
        NavigationMenuPage
    },
    data() {
        return {
            showNavBar: true // Navigation Bar 기본적으로 표시
        };
    },
    watch: {
        '$route'(to) {
            // 특정 URL에서 Navigation Bar를 숨김
            if (to.path === '/eddi-tcg-game-battle-field') {
                this.showNavBar = false;
            } else if (to.path === '/eddi-tcg-game-my-card') {
                this.showNavBar = false;
            } else {
                this.showNavBar = true;
            }
        }
    }
}
</script>

<style scoped>

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}

</style>