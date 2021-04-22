<template>
    <the-header></the-header>
    <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
            <component :is="slotProps.Component"></component>
        </transition>
    </router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
export default {
    components: {
        TheHeader,
    },
    computed: {
        didAutoLogout() {
            return this.$store.getters.didAutoLogout;
        },
    },
    watch: {
        didAutoLogout(curVal, oldVal) {
            console.log('watch didAutoLogout: ', curVal, oldVal);
            if (curVal && curVal !== oldVal) {
                this.$router.replace('/coaches');
            }
        },
    },
    created() {
        this.$store.dispatch('checkLogin');
    },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Mukta&display=swap');

* {
    box-sizing: border-box;
}

html {
    font-family: 'Roboto', sans-serif;
}

body {
    margin: 0;
}

.route-enter-from,
.route-leave-to {
    opacity: 0;
}
.route-enter-to,
.route-leave-from {
    opacity: 1;
}
.route-enter-active,
.route-leave-active {
    transition: opacity 0.2s ease;
}
</style>
