<template>
    <form @submit.prevent="submitForm">
        <div class="form-control" :class="{ invalid: !firstName.isValid }">
            <label for="firstname">First name</label>
            <input
                type="text"
                id="firstname"
                v-model.trim="firstName.val"
                @blur="clearInvalidity('firstName')"
            />
            <p class="invalid" v-if="!firstName.isValid">Required</p>
        </div>
        <div class="form-control" :class="{ invalid: !lastName.isValid }">
            <label for="lastname">Last name</label>
            <input
                type="text"
                id="lastname"
                v-model.trim="lastName.val"
                @blur="clearInvalidity('lastName')"
            />
            <p class="invalid" v-if="!lastName.isValid">Required</p>
        </div>
        <div class="form-control" :class="{ invalid: !desc.isValid }">
            <label for="desc">Description</label>
            <textarea
                id="desc"
                rows="3"
                v-model.trim="desc.val"
                @blur="clearInvalidity('desc')"
            ></textarea>
            <p class="invalid" v-if="!desc.isValid">Required</p>
        </div>
        <div class="form-control" :class="{ invalid: !hourlyRate.isValid }">
            <label for="rate">Hourly rate</label>
            <input
                type="number"
                id="rate"
                v-model.number="hourlyRate.val"
                @blur="clearInvalidity('hourlyRate')"
            />
            <p class="invalid" v-if="!hourlyRate.isValid">Required</p>
        </div>
        <div class="form-control" :class="{ invalid: !expertise.isValid }">
            <h3>Expertise</h3>
            <div>
                <input
                    type="checkbox"
                    id="lightside"
                    value="lightside"
                    v-model="expertise.val"
                    @focus="clearInvalidity('expertise')"
                />
                <label for="lightside">Lightside</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="darkside"
                    value="darkside"
                    v-model="expertise.val"
                    @focus="clearInvalidity('expertise')"
                />
                <label for="darkside">Darkside</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="lightsabre"
                    value="lightsabre"
                    v-model="expertise.val"
                    @focus="clearInvalidity('expertise')"
                />
                <label for="lightsabre">Lightsabre skills</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="forceghost"
                    value="forceghost"
                    v-model="expertise.val"
                    @focus="clearInvalidity('expertise')"
                />
                <label for="forceghost">A force ghost</label>
            </div>
            <p class="invalid" v-if="!expertise.isValid">Required</p>
        </div>
        <p v-if="!formIsValid" class="invalid">
            Error in form submission, please check and try again
        </p>
        <base-button>Register</base-button>
    </form>
</template>

<script>
export default {
    emits: ['save-data'],
    data() {
        return {
            firstName: {
                val: '',
                isValid: true,
            },
            lastName: {
                val: '',
                isValid: true,
            },
            desc: {
                val: '',
                isValid: true,
            },
            hourlyRate: {
                val: null,
                isValid: true,
            },
            expertise: {
                val: [],
                isValid: true,
            },
            formIsValid: true,
        };
    },
    methods: {
        clearInvalidity(input) {
            this[input].isValid = true;
        },
        validateForm() {
            this.formIsValid = true;
            if (this.firstName.val === '') {
                this.firstName.isValid = false;
                this.formIsValid = false;
            }
            if (this.lastName.val === '') {
                this.lastName.isValid = false;
                this.formIsValid = false;
            }
            if (this.desc.val === '') {
                this.desc.isValid = false;
                this.formIsValid = false;
            }
            if (!this.hourlyRate.val || this.hourlyRate.val < 0) {
                this.hourlyRate.isValid = false;
                this.formIsValid = false;
            }
            if (this.expertise.val.length === 0) {
                this.expertise.isValid = false;
                this.formIsValid = false;
            }
        },
        submitForm() {
            this.validateForm();
            if (!this.formIsValid) {
                return;
            }
            const formData = {
                first: this.firstName.val,
                last: this.lastName.val,
                desc: this.desc.val,
                rate: this.hourlyRate.val,
                expertise: this.expertise.val,
            };
            console.log(formData);
            this.$emit('save-data', formData);
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
