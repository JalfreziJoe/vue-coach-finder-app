<template>
    <span class="badge" :class="type">{{ text }}</span>
</template>

<script>
export default {
    props: ['title', 'type'],
    computed: {
        text() {
            return this.title.toUpperCase();
        },
    },
};
</script>

<style scoped>
.badge {
    background-color: #ccc;
    color: #252525;
    border-radius: 30px;
    padding: 0.5rem 1.5rem;
    display: inline-block;
    margin-right: 0.5rem;
}

.lightsabre {
    background-color: #15f2fd;
    color: #5f5b5b;
}

.darkside {
    background-color: #ff0000;
    color: #000;
}

.forceghost {
    background-color: #bae1ff;
    color: #000;
}

.lightside {
    background-color: #7ddc1f;
    color: white;
}

.fear {
    background-color: #311212;
    color: white;
}
</style>
