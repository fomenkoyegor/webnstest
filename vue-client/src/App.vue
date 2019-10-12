<template>
    <div id="app">
        <b-modal v-model="modalCreaate" hide-footer>
            <template v-slot:modal-title>
                user create
            </template>
            <div class="d-block text-center">

                <b-form @submit="onSubmit" @reset="onReset" v-if="show">

                    <b-form-group id="input-group-2" label="first name:" label-for="first_name">
                        <b-form-input
                                id="first_name"
                                v-model="form.first_name"
                                required
                                placeholder="Enter first name"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-3" label="second name:" label-for="second_name">
                        <b-form-input
                                id="second_name"
                                v-model="form.second_name"
                                required
                                placeholder="Enter second name"
                        ></b-form-input>
                    </b-form-group>


                    <b-form-group
                            id="input-group-1"
                            label="Email address:"
                            label-for="input-1"
                            description="We'll never share your email with anyone else."
                    >
                        <b-form-input
                                id="input-1"
                                v-model="form.email"
                                type="email"
                                required
                                placeholder="Enter email"
                        ></b-form-input>
                    </b-form-group>


                    <b-button type="submit" variant="primary">Submit</b-button>
                    <b-button type="reset" variant="danger">Reset</b-button>
                </b-form>


            </div>
            <b-button class="mt-3" block @click="modalCreaate=false">cancel</b-button>
        </b-modal>


        <b-modal v-model="modalDelete" hide-footer>
            <template v-slot:modal-title>
                delete user {{userModal.id}}?
            </template>
            <div class="d-block text-center">
                <b-card-text>
                    <h2>
                        <b-badge>first:</b-badge>
                        {{userModal.first_name}}
                    </h2>
                    <h2>
                        <b-badge>second:</b-badge>
                        {{userModal.second_name}}
                    </h2>
                    <h4>
                        <b-badge>email:</b-badge>
                        {{userModal.email}}
                    </h4>
                    <hr>
                    <p>
                        <b-badge>save:</b-badge>
                        {{userModal.created_at}}
                    </p>
                    <p>
                        <b-badge>update:</b-badge>
                        {{userModal.updated_at}}
                    </p>
                </b-card-text>
                <b-button variant="primary" @click="deleteUser(userModal)">Submit</b-button>
                <b-button variant="secondary" @click="modalDelete=false">cancel</b-button>
            </div>

        </b-modal>


        <b-modal v-model="modalShow" hide-footer>

            <div class="d-block text-center">
                <b-card bg-variant="dark" header="user info" text-variant="white" class="text-center">
                    <b-card-text>
                        <h2>
                            <b-badge>first:</b-badge>
                            {{userModal.first_name}}
                        </h2>
                        <h2>
                            <b-badge>second:</b-badge>
                            {{userModal.second_name}}
                        </h2>
                        <h4>
                            <b-badge>email:</b-badge>
                            {{userModal.email}}
                        </h4>
                        <hr>
                        <p>
                            <b-badge>save:</b-badge>
                            {{userModal.created_at}}
                        </p>
                        <p>
                            <b-badge>update:</b-badge>
                            {{userModal.updated_at}}
                        </p>
                    </b-card-text>
                </b-card>


            </div>

        </b-modal>


        <div class="table-responsive ">
            <table class="table table-hover table-dark">

                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">first_name</th>
                    <th scope="col">second_name</th>
                    <th scope="col">email</th>
                    <th scope="col">
                        <b-button id="show-btn" @click="modalCreaate=true">create</b-button>
                        <b-button variant="dark" id="update-users-btn" @click="getUsers">refresh</b-button>

                    </th>
                </tr>
                </thead>


                <tbody id="tbody-users" v-if="loadUsers">

                <tr v-for="user in users" :key="user.id">
                    <td>{{user.id}}</td>
                    <td>{{user.first_name}}</td>
                    <td>{{user.second_name}}</td>
                    <td>{{user.email}}</td>
                    <td>
                        <b-button variant="success" id="show-user-info-btn" @click="getUserInfo(user)">info</b-button>
                        <b-button variant="danger" id="delete-user-btn" @click="onDelModal(user)">del</b-button>
                    </td>

                </tr>

                </tbody>

                <tbody v-if="!loadUsers">
                <tr>
                    <td colspan="4">loading....</td>
                </tr>
                </tbody>

            </table>
        </div>
    </div>
</template>

<script>
    import {usersService} from './service';

    export default {
        name: 'app',
        components: {},
        data: () => ({
            loadUsers: false,
            users: [],
            modalShow: false,
            modalCreaate: false,
            modalDelete: false,
            userModal: {
                first_name: '',
                second_name: '',
                email: '',
                id: '',
                created_at: '',
                updated_at: ''
            },
            form: {
                first_name: '',
                second_name: '',
                email: '',
            },

            show: true
        }),
        methods: {
            getUsers() {
                this.loadUsers = false;
                usersService.getAll().then(users => {
                    this.users = users;
                    this.loadUsers = true;
                });

            },
            getUserInfo(user) {
                this.modalShow = !this.modalShow;
                this.userModal = user;
            },
            deleteUser(user) {
                usersService.delete(user.id).then(user => {
                    this.users = this.users.filter(u => u.id !== user.id);
                    this.modalDelete = false;
                    this.onResetUserModal();
                })
            },
            onResetUserModal() {
                this.userModal = {
                    first_name: '',
                    second_name: '',
                    email: '',
                    id: '',
                    created_at: '',
                    updated_at: ''
                }
            },
            onDelModal(user) {
                this.modalDelete = true;
                this.userModal = user;
            },
            onCreateUser(newUser) {
                usersService.create(newUser).then(user => {
                    this.users.unshift(user);
                    this.onReset();
                    this.modalCreaate = false;
                })
            },
            onSubmit(evt) {
                evt.preventDefault();
                this.onCreateUser(this.form);
            },
            onReset() {
                this.form.email = '';
                this.form.first_name = '';
                this.form.second_name = '';

                this.show = false;
                this.$nextTick(() => {
                    this.show = true
                })
            }
        },
        mounted() {
            this.getUsers()
        }
    }
</script>

<style>
    *, html, body {
        padding: 0;
        margin: 0;
        list-style: none;
        text-decoration: none;
        box-sizing: border-box;
    }

    body {
        width: 100%;
        height: 100vh;
    }

    html, * {
        scroll-behavior: smooth;
    }

    #app {

    }
</style>
