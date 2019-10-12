<template>

    <tr>
        <td>{{user.id}}</td>
        <td>{{user.first_name}}</td>
        <td>{{user.second_name}}</td>
        <td>{{user.email}}</td>
        <td>
            <b-button variant="success" id="show-user-info-btn" @click="getUserInfo">info</b-button>
            <b-button variant="primary" id="show-user-edit-modal" @click="onEditModal">edit</b-button>
            <b-button variant="danger" id="delete-user-btn" @click="onDelModal">del</b-button>
        </td>

    </tr>
</template>

<script>
    export default {
        name: "UserTable",
        props: ['user'],
        methods: {
            getUserInfo() {
                this.$emit('info', this.user);
            },
            onDelModal() {
                this.$emit('delete', this.user);
            },
            onEditModal() {
                this.$emit('edit',this.user);
            }
        }
    }
</script>

<style scoped>

</style>
