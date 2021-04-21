<template>
    <div>
        <base-dialog title="Error" :show="!!error" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <coach-filter @change-filter="setFilters"></coach-filter>
        </section>
        <section>
            <base-card>
                <div class="controls">
                    <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
                    <base-button v-if="!isCoach && !isLoading" link to="/register"
                        >Register</base-button
                    >
                </div>
                <div v-if="isLoading">
                    <base-spinner></base-spinner>
                </div>
                <ul v-else-if="hasCoaches">
                    <coach-item
                        v-for="coach in filteredCoaches"
                        :key="coach.id"
                        :id="coach.id"
                        :first-name="coach.firstName"
                        :last-name="coach.lastName"
                        :rate="coach.hourlyRate"
                        :expertise="coach.expertise"
                    ></coach-item>
                </ul>
                <h3 v-else>No coaches at the moment....</h3>
            </base-card>
        </section>
    </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import BaseButton from '../../components/ui/BaseButton.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
    components: {
        CoachItem,
        BaseButton,
        CoachFilter,
    },
    data() {
        return {
            isLoading: false,
            error: null,
            activeFilters: {
                lightside: true,
                darkside: true,
                lightsabre: true,
                forceghost: true,
                fear: true,
            },
        };
    },
    computed: {
        isCoach() {
            return this.$store.getters['coaches/isCoach'];
        },
        filteredCoaches() {
            const coaches = this.$store.getters['coaches/coaches'];
            console.log(coaches);
            return coaches.filter(coach => {
                if (this.activeFilters.lightside && coach.expertise.includes('lightside')) {
                    return true;
                }
                if (this.activeFilters.darkside && coach.expertise.includes('darkside')) {
                    return true;
                }
                if (this.activeFilters.lightsabre && coach.expertise.includes('lightsabre')) {
                    return true;
                }
                if (this.activeFilters.forceghost && coach.expertise.includes('forceghost')) {
                    return true;
                }
                if (this.activeFilters.fear && coach.expertise.includes('fear')) {
                    return true;
                }
                return false;
            });
        },
        hasCoaches() {
            return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
        },
    },
    methods: {
        setFilters(updatedFilter) {
            console.log('setFilters', updatedFilter);
            this.activeFilters = updatedFilter;
        },
        async loadCoaches(force = false) {
            this.isLoading = true;
            try {
                await this.$store.dispatch('coaches/loadCoaches', { forceRefresh: force });
            } catch (error) {
                console.log('got an error in CoachesList');
                this.error = error.message || 'Something went wrong';
            }
            this.isLoading = false;
        },
        handleError() {
            this.error = null;
        },
    },
    created() {
        this.loadCoaches();
    },
};
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.controls {
    display: flex;
    justify-content: space-between;
}
</style>
