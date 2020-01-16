<template>
  <div>
    <template>
      <v-data-table
        :headers="headers"
        :items="acts"
        :search="search"
        sort-by="last_name"
        class="elevation-1"
        dark
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>acts</v-toolbar-title>
            <v-spacer />
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            />
            <v-spacer />
            <v-dialog v-model="dialog" max-width="700px" persistent>
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">New ACT</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.id" label="First Name" />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.last_name" label="Last Name" />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.nickname" label="Nickname" />
                      </v-col>
                      <v-col cols="12" sm="6" md="8">
                        <v-text-field v-model="editedItem.email" label="Email" />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.phone" label="Phone" />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-switch v-model="editedItem.is_active" label="Active?" />
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-switch v-model="editedItem.is_board_member" label="Board Member?" />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer />
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-3" @click="editItem(item)">fa-pen</v-icon>
          <v-icon small @click="openDeleteDialog(item)">fa-trash</v-icon>
        </template>
        <template v-slot:item.is_active="{ item }">
          <v-icon small>{{ item.is_active ? "fa-check" : "" }}</v-icon>
        </template>
        <template v-slot:item.is_registered="{ item }">
          <v-icon small>{{ item.is_registered ? "fa-check" : "" }}</v-icon>
        </template>
        <template v-slot:item.is_board_member="{ item }">
          <v-icon small>{{ item.is_board_member ? "fa-check" : "" }}</v-icon>
        </template>
      </v-data-table>
    </template>
    <v-dialog v-model="dialogDelete" max-width="350px">
      <v-card>
        <v-card-title class="headline">Delete this act?</v-card-title>

        <v-card-actions>
          <v-spacer />

          <v-btn text @click="close">Cancel</v-btn>

          <v-btn color="error" text @click="deleteAct">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import apiRoutes from "../plugins/apiRoutes";
import notifier from "../shared/notifier";
export default {
  name: "acts",
  data() {
    return {
      acts: [],
      dialog: false,
      dialogDelete: false,
      search: "",
      headers: [
        { text: "#", value: "id" },
        { text: "Экспертиза", value: "nexp" },
        { text: "Акт", value: "nact" },
        { text: "Специалист", value: "specialist.name" },
        { text: "Эксперт", value: "expert.name" },
        { text: "Дата акта", value: "date" },
        { text: "Отделение", value: "city.name" },
        { text: "ТС", value: "ts_mark" },
        { text: "ТС", value: "ts_model" },
        { text: "ТС", value: "ts_number" },
        { text: "Заказчик", value: "customer.name" },
        { text: "Actions", value: "action", sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        id: 0,
        first_name: "",
        last_name: "",
        nickname: "",
        email: "",
        phone: "",
        is_active: 0,
        is_board_member: 0
      },
      defaultItem: {
        first_name: "",
        last_name: "",
        nickname: "",
        email: "",
        phone: "",
        is_active: 1,
        is_board_member: 0
      }
    };
  },
  methods: {
    editItem(act) {
      this.editedIndex = this.acts.indexOf(act);
      this.editedItem = Object.assign({}, act);
      this.dialog = true;
    },
    openDeleteDialog(act) {
      this.editedIndex = this.acts.indexOf(act);
      this.editedItem = Object.assign({}, act);
      this.dialogDelete = true;
    },
    close() {
      this.dialog = false;
      this.dialogDelete = false;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },
    save() {
      this.editedIndex === -1 ? this.createAct() : this.updateAct();
    },
    createAct() {
      this.$axios
        .post(apiRoutes.acts, {
          first_name: this.editedItem.first_name,
          last_name: this.editedItem.last_name,
          nickname: this.editedItem.nickname,
          email: this.editedItem.email,
          phone: this.editedItem.phone,
          is_active: this.editedItem.is_active,
          is_board_member: this.editedItem.is_board_member
        })
        .then(response => {
          this.editedItem.id = response.data.id;
          this.acts.push(this.editedItem);
          this.close();
          notifier.success("Act created successfully");
        })
        .catch(() => {
          notifier.error("Error occurred while creating act");
        });
    },
    updateAct() {
      this.$axios
        .put(apiRoutes.acts + `/${this.editedItem.id}`, {
          first_name: this.editedItem.first_name,
          last_name: this.editedItem.last_name,
          nickname: this.editedItem.nickname,
          email: this.editedItem.email,
          phone: this.editedItem.phone,
          is_active: this.editedItem.is_active,
          is_board_member: this.editedItem.is_board_member
        })
        .then(() => {
          Object.assign(this.acts[this.editedIndex], this.editedItem);
          this.close();
          notifier.success("Act updated successfully");
        })
        .catch(() => {
          notifier.error("Error occurred while updating act");
        });
    },
    deleteAct() {
      this.$axios
        .delete(apiRoutes.acts + `/${this.editedItem.id}`)
        .then(() => {
          this.acts.splice(this.editedIndex, 1);
          notifier.success("Act deleted successfully");
        })
        .catch(() => {
          notifier.error("Error occurred while deleting act");
        });
      this.dialogDelete = false;
      this.close();
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Act" : "Edit Act";
    }
  },
  beforeCreate() {
    this.$axios
      .get(apiRoutes.acts+ '?page=2')
      .then(response => (this.acts = response.data));
  }
};
</script>

<style scoped>
.fa-trash {
  color: red;
  background-color: unset;
}
</style>
