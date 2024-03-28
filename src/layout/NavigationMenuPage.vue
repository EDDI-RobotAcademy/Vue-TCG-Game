<template>
  <v-app-bar color="primary" app dark height="64">
    <!-- <v-app-bar-nav-icon @click="navigation_drawer = !navigation_drawer"/> -->
    <v-btn @click="gotoHome">
      <v-toolbar-title class="text-uppercase text--darken-4">
        <span>EDDI</span>
      </v-toolbar-title>
    </v-btn>
    <v-spacer></v-spacer>

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn color="white" v-bind="props">
          <b>Activator Slot</b>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items"
                     :key="index" :value="index" @click="item.action">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn text @click="callVuetifyBoard">
      <span>Vuetify 게시판</span>
      <v-icon right>mdi-hand-back-left-outline</v-icon>
    </v-btn>
    <v-btn v-if="isLogin" text @click="myPage">
      <span>마이페이지</span>
      <v-icon right>mdi-account-plus-outline</v-icon>
    </v-btn>
    <v-btn v-if="!isLogin" text @click="signIn">
      <span>로그인</span>
      <v-icon right>mdi-login</v-icon>
    </v-btn>
    <v-btn v-if="isLogin" text @click="signOut">
      <span>로그아웃</span>
      <v-icon right>mdi-exit-to-app</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'
import 'vuetify/styles'
// import {
//     GITHUB_LOGIN_COMPLETE,
// } from '@/store/authentication/mutation-types'
//
// import router from '@/router'
// import { mapState, mapMutations } from 'vuex'
//
// const authenticationModule = 'authenticationModule'

export default {
    data () {
        return {
            navigation_drawer: false,
            links: [
                { icon: 'mdi-home', text: 'Home', route: '/' }
            ],
            userToken: null
        }
    },
    computed: {
        // ...mapState(authenticationModule, ['isAuthenticated'])
    },
    methods: {
        // ...mapMutations(authenticationModule, ['GITHUB_LOGIN_COMPLETE']),
        clickToggle () {
            alert('토글')
        },
        signUp () {
            // router.push('/problem-page5')
        },
        signIn () {
            // router.push('/problem-page5')
        },
        signOut () {
            localStorage.removeItem("userToken")
            // this[GITHUB_LOGIN_COMPLETE](false)
        },
        goToHome () {
            // router.push('/')
        }
    },
    mounted () {
        this.userToken = localStorage.getItem("userToken")

        // if (this.userToken == null) {
        //     this[GITHUB_LOGIN_COMPLETE](false)
        // } else {
        //     this[GITHUB_LOGIN_COMPLETE](true)
        // }
    }
}
</script>

<style lang="">

</style>