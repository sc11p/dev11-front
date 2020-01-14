<template>
 <v-data-table
      :headers="headers"
      :items="listItems"
      class="elevation-1"
      no-data-text="No data to display"
    >
       <template slot="items" slot-scope="props">
        <td class="text-xs-right">{{ props.item.id }}</td>
        <td class="text-xs-right">{{ props.item.id }}</td>
      </template>
    </v-data-table>
</template>

<script>
  import apiRoutes from "../plugins/apiRoutes";
  export default {
    data () {
      return {
        headers: [
            { text: 'ids' },
            { text: 'date' },
            ],
            listItems: []
    }},
    mounted() {
      this.$axios.get(apiRoutes.acts).then(response => {
        this.listItems = response.data;
      })
      .catch(error => {
        console.log(error.response)
      })
    }}

</script>

<style scoped>
</style>