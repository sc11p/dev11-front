<template>
  <v-data-table
    :headers="headers"
    :items="content"
    :items-per-page="5"
    class="elevation-1"
  >
  <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-right">{{ props.item.id }}</td>
  </template>
  
  </v-data-table>
</template>

<script>
  import apiRoutes from "../plugins/apiRoutes";
  export default {
      name: "Acts",
      data() {
          return {
            headers: [
            { text: 'ids', value: 'name' },
            { text: 'data', value: 'name' },
            ],
            content: [],
            beforeCreate() {
                this.$axios.get(apiRoutes.acts).then(response => this.content = response.data);
            }
          }
      }
  }

</script>

<style scoped>
</style>