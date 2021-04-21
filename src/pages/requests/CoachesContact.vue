<template>
    <div>
        <base-dialog title="Error" :show="!!error" @close="handleError">{{ error }}</base-dialog>
        <form @submit.prevent="submitForm" v-if="!isLoading">
            <div class="form-control">
                <label for="email">Your email</label>
                <input type="text" name="email" id="email" v-model="email" />
            </div>
            <div class="form-control">
                <label for="message">Message</label>
                <textarea name="message" id="message" rows="5" v-model="message"></textarea>
            </div>
            <p v-if="!formIsValid" class="errors">Please enter a valid email address and message</p>
            <div class="actions">
                <base-button>Send message</base-button>
            </div>
        </form>
        <div v-else>
            <base-spinner></base-spinner>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            message: '',
            formIsValid: true,
            isLoading: false,
            error: null,
        };
    },
    methods: {
        async submitForm() {
            this.formIsValid = true;
            if (this.email === '' || !this.email.includes('@') || this.message === '') {
                this.formIsValid = false;
                return;
            }
            this.isLoading = true;
            try {
                await this.$store.dispatch('requests/contactCoach', {
                    email: this.email,
                    message: this.message,
                    coachId: this.$route.params.id,
                });
                this.isLoading = false;
                this.$router.replace('/coaches/' + this.$route.params.id);
            } catch (err) {
                this.isLoading = false;
                this.error = err.message || 'Whoops something went wrong. Please try again';
            }
        },
        handleError() {
            this.error = null;
        },
    },
};
</script>

<style scoped>
form {
    margin: 1rem;
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 1rem;
}

.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
}

input,
textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
}

input:focus,
textarea:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
}

.errors {
    font-weight: bold;
    color: red;
}

.actions {
    text-align: center;
}
</style>
