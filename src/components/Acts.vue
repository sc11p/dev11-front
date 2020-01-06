<template>
    <div>
        <div v-for="act in acts" v-bind:key="act.id">
            <p>{{ act.id }}</p>
            <p>{{ act.date }}</p>
        </div>
    </div>
</template>

<script>
    import apiRoutes from "../plugins/apiRoutes";
    export default {
        name: "Acts",
        data() {
            return {
                acts: ''
            }
        },
        beforeCreate() {
            this.$axios.get(apiRoutes.acts).then(response => this.acts = response.data);
        }
    }
</script>

<style scoped>
</style>