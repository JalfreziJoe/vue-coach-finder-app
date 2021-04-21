<template>
    <li>
        <h3>{{ fullname }}</h3>
        <h4>£{{ rate }} per hour</h4>
        <div>
            <base-badge
                v-for="expert in expertise"
                :key="expert"
                :type="expert"
                :title="expert"
            ></base-badge>
        </div>
        <div class="actions">
            <base-button link :to="contactLink">Contact</base-button>
            <base-button link :to="detailsLink">View details</base-button>
        </div>
    </li>
</template>

<script>
import BaseBadge from '../ui/BaseBadge.vue';
import BaseButton from '../ui/BaseButton.vue';
export default {
    components: { BaseButton, BaseBadge },
    props: ['id', 'firstName', 'lastName', 'rate', 'expertise'],
    computed: {
        fullname() {
            return `${this.firstName} ${this.lastName}`;
        },
        contactLink() {
            return `${this.$route.path}/${this.id}/contact`; // /coaches/c1/contact
        },
        detailsLink() {
            return `${this.$route.path}/${this.id}`; // /coaches/c1
        },
    },
};
</script>

<style scoped>
li {
    margin: 1rem 0;
    border: 1px solid #424242;
    border-radius: 12px;
    padding: 1rem;
}

h3 {
    font-size: 1.5rem;
}

h3,
h4 {
    margin: 0.5rem 0;
}

div {
    margin: 0.5rem 0;
}

.actions {
    display: flex;
    justify-content: flex-end;
}
</style>
