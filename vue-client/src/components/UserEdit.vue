<template>
    <form @submit.prevent="submitForm" >
        <div class="form-group">
            <label for="first_name">
                first name: {{user.first_name}}
            </label>
            <input
                    type="text"
                    class="form-control"
                    id="first_name"
                    placeholder="Enter first name"
                    v-model.trim="$v.first_name.$model"
                    :class="{
                    'is-invalid':$v.first_name.$error,
                    'is-valid':!$v.first_name.$invalid
                    }"
            >
            <div class="valid-feedback">first name is valid</div>
            <div class="invalid-feedback">
                <span v-if="!$v.first_name.required">first name is required</span>
                <span v-if="!$v.first_name.minLength">
                    first name is min length
                    {{$v.first_name.$params.minLength.min}}
                </span>
                <span v-if="!$v.first_name.maxLength">
                    first name must have at
                    {{$v.first_name.$params.maxLength.max}}
                </span>
            </div>
        </div>


        <div class="form-group">
            <label for="second_name">
                second name: {{user.second_name}}
            </label>
            <input
                    type="text"
                    class="form-control"
                    id="second_name"
                    placeholder="Enter second name"
                    v-model.trim="$v.second_name.$model"
                    :class="{
                    'is-invalid':$v.second_name.$error,
                    'is-valid':!$v.second_name.$invalid
                    }"
            >
            <div class="valid-feedback">first name is valid</div>
            <div class="invalid-feedback">
                <span v-if="!$v.second_name.required">second name is required</span>
                <span v-if="!$v.second_name.minLength">
                    second name is min length
                    {{$v.second_name.$params.minLength.min}}
                </span>
                <span v-if="!$v.first_name.maxLength">
                    second name must have at
                    {{$v.second_name.$params.maxLength.max}}
                </span>
            </div>
        </div>


        <div class="form-group">
            <label for="email">
                email: {{user.email}}
            </label>
            <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="Enter email"
                    v-model.trim="$v.email.$model"
                    :class="{
                    'is-invalid':$v.email.$error,
                    'is-valid':!$v.email.$invalid
                    }"
            >
            <div class="valid-feedback">email is valid</div>
            <div class="invalid-feedback">
                <span v-if="!$v.email.required">email is required</span>
                <span v-if="!$v.email.isUnique">email is required</span>

            </div>
        </div>

        <button type="submit" class="btn btn-primary">Edit</button>
    </form>
</template>

<script>
    import {required, maxLength, minLength, email} from 'vuelidate/lib/validators';

    export default {
        name: "UserEdit",
        props:['user'],
        mounted(){
            this.first_name = this.user.first_name;
            this.second_name = this.user.second_name;
            this.email = this.user.email;
        },
        data: () => ({
            first_name: '',
            second_name: '',
            email: '',
        }),
        methods: {
            submitForm() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    const user = {
                        first_name: this.first_name,
                        second_name: this.second_name,
                        email: this.email
                    };
                    this.$emit('edit',{...user,id:this.user.id});
                }
            }
        },
        validations: {
            first_name: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(12),
            },
            second_name: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(12),
            },
            email: {
                required,
                email,
                isUnique(value) {
                    if (value === '') return true;

                    // eslint-disable-next-line
                    const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;

                    return new Promise(resolve => {
                        setTimeout(_ => {
                            resolve(email_regex.test(value))
                        }, 0)
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
