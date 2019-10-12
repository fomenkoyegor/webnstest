<template>
    <div id="app">
        <b-modal v-model="modalCreaate" hide-footer>
            <template v-slot:modal-title>
                user create
            </template>
            <div class="d-block text-center">

                <FormCreate @create="onSubmit"/>


            </div>
            <b-button class="mt-3" block @click="modalCreaate=false">cancel</b-button>
        </b-modal>


        <b-modal v-model="modalEdit" hide-footer>
            <template v-slot:modal-title>
                user update
            </template>
            <div class="d-block text-center">

                <UserEdit :user="userEdit" @edit="onUserEdit"/>


            </div>
            <b-button class="mt-3" block @click="modalEdit=false">cancel</b-button>
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
                <UserTable
                        v-for="user in users"
                        :user="user"
                        :key="user.id"
                        @info="getUserInfo"
                        @delete="onDelModal"
                        @edit="onEditModal"
                />
                </tbody>

                <tbody v-if="!loadUsers">
                <tr>
                    <td style="text-align: center" colspan="5">loading....</td>
                </tr>
                </tbody>

            </table>
        </div>
    </div>
</template>


<script>
    import {usersService} from './service';
    import FormCreate from "./components/FormCreate";
    import UserTable from "./components/UserTable";
    import UserEdit from "./components/UserEdit";

    export default {
        name: 'app',
        components: {UserEdit, UserTable, FormCreate},
        data: () => ({
            loadUsers: false,
            users: [],
            modalShow: false,
            modalCreaate: false,
            modalDelete: false,
            modalEdit: false,
            userEdit: null,
            userModal: {
                first_name: '',
                second_name: '',
                email: '',
                id: '',
                created_at: '',
                updated_at: ''
            },
            show: true,
        }),
        methods: {
            getUsers() {
                this.loadUsers = false;
                usersService.getAll().then(users => {
                    this.users = users;
                    this.loadUsers = true;
                });

            },
            updateUser(updatedUser) {
                usersService.update(updatedUser).then(user => {
                    this.users = this.users.map(u => u.id === user.id ? user : u);
                    this.modalEdit = false;
                });
            },
            onUserEdit(user) {
                this.updateUser(user);
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
            onEditModal(user) {
                this.modalEdit = true;
                this.userEdit = user;
            },
            onCreateUser(newUser) {
                usersService.create(newUser).then(user => {
                    this.users.unshift(user);
                    this.modalCreaate = false;
                })
            },
            onSubmit(user) {
                this.onCreateUser(user);
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



</style>
