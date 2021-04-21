<template>
    <div>
        <base-dialog title="Error" :show="!!error" @close="handleError">{{ error }}</base-dialog>
        <section>
            <base-card v-if="!isLoading">
                <header>
                    <h2>Requests</h2>
                </header>
                <ul v-if="hasRequests">
                    <requests-item
                        v-for="req in getRequests"
                        :key="req.id"
                        :email="req.contactEmail"
                        :message="req.contactMessage"
                    ></requests-item>
                </ul>
                <h3 v-else>No requests yet</h3>
            </base-card>
            <div v-else>
                <base-spinner></base-spinner>
            </div>
        </section>
    </div>
</template>

<script>
import RequestsItem from '../../components/requests/RequestsItem.vue';
export default {
    components: {
        RequestsItem,
    },
    data() {
        return {
            isLoading: false,
            error: null,
        };
    },
    computed: {
        getRequests() {
            return this.$store.getters['requests/requests'];
        },
        hasRequests() {
            return this.$store.getters['requests/hasRequests'];
        },
    },
    methods: {
        async loadRequests() {
            this.isLoading = true;
            try {
                await this.$store.dispatch('requests/getRequests');
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                this.error = error.message || `Can't load requests at the moment`;
            }
        },
        handleError() {
            this.error = null;
        },
    },
    created() {
        this.loadRequests();
    },
};
</script>

<style scoped>
header {
    text-align: center;
}

ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
}

h3 {
    text-align: center;
}
</style>
