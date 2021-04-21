<template>
    <div>
        <section>
            <base-card>
                <h3>{{ fullname }}</h3>
                <h4>£{{ rate }} per hour</h4>
            </base-card>
        </section>
        <section>
            <base-card>
                <header>
                    <h2>Want this coach?</h2>
                    <base-button link :to="contactLink">Contact now</base-button>
                </header>
                <router-view></router-view>
            </base-card>
        </section>
        <section>
            <base-card>
                <base-badge
                    v-for="expert in expertise"
                    :key="expert"
                    :type="expert"
                    :title="expert"
                ></base-badge>
                <p>{{ desc }}</p>
            </base-card>
        </section>
    </div>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return {
            selectedCoach: null,
        };
    },
    computed: {
        fullname() {
            return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`;
        },
        rate() {
            return this.selectedCoach.hourlyRate;
        },
        expertise() {
            return this.selectedCoach.expertise;
        },
        desc() {
            return this.selectedCoach.desc;
        },
        contactLink() {
            return `${this.$route.path}/contact`; // /coaches/c1/contact
        },
    },
    created() {
        this.selectedCoach = this.$store.getters['coaches/coaches'].find(
            coach => coach.id === this.id
        );
    },
};
</script>
