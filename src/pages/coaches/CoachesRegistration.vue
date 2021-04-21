<template>
    <base-card>
        <h2>Coaches registration</h2>
        <coach-form @save-data="saveData"></coach-form>
    </base-card>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
export default {
    components: {
        CoachForm,
    },
    methods: {
        saveData(formData) {
            console.log(formData);
            this.$store.dispatch('coaches/addCoach', formData);
            this.$router.replace('/coaches');
        },
    },
};
</script>
