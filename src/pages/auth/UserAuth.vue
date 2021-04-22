<template>
    <div>
        <base-dialog :show="!!error" title="Error" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-dialog fixed :show="isLoading" :title="loadingCaption">
            <base-spinner></base-spinner>
        </base-dialog>
        <base-card>
            <form @submit.prevent="submitForm">
                <div class="form-control">
                    <label for="email">Email</label>
                    <input type="text" id="email" v-model.trim="email" />
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password" />
                </div>
                <p v-if="!formIsValid">Please enter a valid username and password</p>
                <base-button>{{ loginCaption }}</base-button>
                <base-button type="button" mode="flat" @click="switchAuthMode">{{
                    switchCaption
                }}</base-button>
            </form>
        </base-card>
    </div>
</template>

<script>
import BaseDialog from '../../components/ui/BaseDialog.vue';
export default {
    components: { BaseDialog },
    data() {
        return {
            email: '',
            password: '',
            formIsValid: true,
            mode: 'login',
            isLoading: false,
            error: null,
        };
    },
    computed: {
        loadingCaption() {
            if (this.mode === 'login') {
                return 'Logging in...';
            } else {
                return 'Signing up....';
            }
        },
        loginCaption() {
            if (this.mode === 'login') {
                return 'Login';
            } else {
                return 'Sign Up';
            }
        },
        switchCaption() {
            if (this.mode === 'login') {
                return 'Switch to Sign Up';
            } else {
                return 'Switch to Login';
            }
        },
    },
    methods: {
        async submitForm() {
            this.formIsValid = true;
            if (this.email === '' || !this.email.includes('@') || this.password.length < 6) {
                this.formIsValid = false;
                return;
            }
            this.isLoading = true;
            // send http to login or signup
            const payload = {
                email: this.email,
                password: this.password,
            };
            try {
                await this.$store.dispatch('auth', {
                    ...payload,
                    mode: this.mode,
                });

                const redirectUrl = '/' + (this.$route.query.re || 'coaches');
                this.$router.replace(redirectUrl);
            } catch (error) {
                this.error = error.message || 'An error occured, please try again.';
            }
            this.isLoading = false;
        },
        handleError() {
            this.error = null;
        },
        switchAuthMode() {
            if (this.mode === 'login') {
                this.mode = 'signup';
            } else {
                this.mode = 'login';
            }
        },
    },
};
</script>

<style scoped>
.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
    font-weight: normal;
    display: inline;
    margin: 0 0 0 0.5rem;
}

input,
textarea {
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    font: inherit;
}

input:focus,
textarea:focus {
    background-color: #f0e6fd;
    outline: none;
    border-color: #3d008d;
}

input[type='checkbox'] {
    display: inline;
    width: auto;
    border: none;
}

input[type='checkbox']:focus {
    outline: #3d008d solid 1px;
}

h3 {
    margin: 0.5rem 0;
    font-size: 1rem;
}

.invalid label {
    color: red;
}

.invalid input,
.invalid textarea {
    border: 1px solid red;
}
</style>
