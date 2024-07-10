<template>
  <div v-if="checkAccess()" :key="componentKey">
    <v-row>
      <v-col cols="3">
        <v-list class="custom-list">
          <v-list-item v-for="user in responseData"
                       :key="user.id"
                       class="custom-list-item"
                       @click="selectUser(user)">
            <v-list-item-title class="custom-list-item-title">
              <v-icon>mdi-menu-right</v-icon>
              {{ user.EmailAddress }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item class="custom-list-item">
            <v-list-item-title
              @click="selectUser(blankNewUser)"
              class="custom-list-item-title">
              <v-icon>mdi-menu-right</v-icon>
              Create New User
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="2" v-if="selectedUser">
        <v-card class="v-card-user1 mx-auto my-8" variant="flat" color="primary">
          <v-card-item>
            <label class="co-label">Email</label>
            <v-text-field
              variant="outlined"
              :rules="[v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'Email must be valid']"
              type="email"
              v-model="this.selectedUser.EmailAddress"></v-text-field>
            <label class="co-label">AccessLevelID</label>
            <v-text-field filled
                          variant="outlined"
                          :rules="[v => !!v || 'Number is required', v => Number(v) >= 1 && Number(v) <= 3 || 'Enter a number between 1 and 3']"
                          type="number"
                          v-model="this.selectedUser.AccessLevelID"></v-text-field>
            <label class="co-label">Firstname</label>
            <v-text-field
              variant="outlined"
              :rules="[rules.required]"
              type="text"
              v-model="this.selectedUser.FirstName"></v-text-field>
            <label class="co-label">Last Name</label>
            <v-text-field filled
                          variant="outlined"
                          :rules="[rules.required]"
                          type="text"
                          v-model="this.selectedUser.LastName"></v-text-field>
            <label class="co-label">Password</label>
            <v-text-field filled
                          variant="outlined"
                          :rules="[rules.required]"
                          type="text"
                          v-model="this.selectedUser.Password"></v-text-field>
          </v-card-item>
          <v-card-actions>
            <!--      && this.selectedUser.EmailAddress!=='blank.blanky@example.com'       -->
            <button v-if="!deleteSure"
                    class="button-delete" @click="deleteSure=true">Delete Entry
            </button>
            <button v-if="deleteSure" class="button-delete" @click="deleteUser">Really Delete?</button>
            <button v-if="this.selectedUser.EmailAddress==='blank.blanky@example.com'" class="button-test"
                    @click="updateUser">Create User
            </button>
            <button v-else class="button-test" @click="updateUser">Save changes</button>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>

</template>

<script>
import {mapState} from "pinia";
import {useUserStore} from "@/stores/userStore";
import axios from "@/services/axios";

export default {
  data() {
    return {
      componentKey: 0,
      deleteSure: false,
      rules: {
        required: value => !!value || 'Field is required',

      },
      responseData: null,
      editableEmail: '',
      editableFirstName: '',
      editableLastName: '',
      editablePassword: '',
      checkIfBlank: false,
      selectedUser: null,
      blankNewUser: {
        UserID: 99999999,
        EmailAddress: 'blank.blanky@example.com',
        AccessLevelID: 1,
        FirstName: 'Blank',
        LastName: 'Blanky',
        Password: 'blank',
      }
    }
  },
  computed: {
    ...mapState(useUserStore, {
      userId: 'getUserId',
      userLevel: 'getUserLevel',
    })
  },
  methods: {
    validateNoEmailDuplicate() {
      if(this.selectedUser.EmailAddress==='blank.blanky@example.com'){
        alert('Please Choose another email')
        return false
      }
      for (const user of this.responseData) {
        if (this.selectedUser.EmailAddress === user.EmailAddress) {
          alert('Email is already in Use')
          return false
        }
      }
      return true
    },
    selectUser(user) {
      this.deleteSure = false
      this.selectedUser = user;
    },
    forceRemount() {
      this.componentKey += 1;
    },
    validateData() {
      if (this.selectedUser.FirstName !== '') {
        if (this.selectedUser.LastName !== '') {
          if (this.selectedUser.Password !== '') {
            if (this.selectedUser.EmailAddress !== '' && /.+@.+\..+/.test(this.selectedUser.EmailAddress)) {
              if (this.selectedUser.AccessLevelID < 4 && this.selectedUser.AccessLevelID > 0) {
                return true
              }
            } else return false
          } else return false
        } else return false
      } else return false

    },
    async deleteUser() {
      this.deleteSure = false
      const toDeleteUserID = this.selectedUser.ID
      try {
        await axios.delete('/employees/' + this.selectedUser.ID);
        const idToRemove = toDeleteUserID
        const index = this.responseData.findIndex(item => item.ID === idToRemove);
        if (index > -1) {
          this.responseData.splice(index, 1);
        }
      } catch (error) {
        console.error('Failed to delete user:', error);
      }

    },
    async updateUser() {

      try {
        if (this.validateNoEmailDuplicate()) {
          if (this.validateData()) {

            const updatedUserData = {
              ID: this.selectedUser.ID,
              FirstName: this.selectedUser.FirstName,
              LastName: this.selectedUser.LastName,
              Password: this.selectedUser.Password,
              EmailAddress: this.selectedUser.EmailAddress,
              AccessLevelID: this.selectedUser.AccessLevelID,
            };
            if (this.selectedUser.UserID === 99999999) {
              const createUserData = {
                FirstName: this.selectedUser.FirstName,
                LastName: this.selectedUser.LastName,
                Password: this.selectedUser.Password,
                EmailAddress: this.selectedUser.EmailAddress,
                AccessLevelID: this.selectedUser.AccessLevelID,
              };
              await axios.post('/employees', createUserData);
              await this.delay(10)
              const responseData2 = await axios.post('/employees/login', {
                  EmailAddress: this.selectedUser.EmailAddress,
                  Password: this.selectedUser.Password,
                },
              )
              console.log('User Fetched:', parseInt(responseData2.data.userId))
              const newUser = {
                ID: parseInt(responseData2.data.userId),
                FirstName: this.selectedUser.FirstName,
                LastName: this.selectedUser.LastName,
                Password: this.selectedUser.Password,
                EmailAddress: this.selectedUser.EmailAddress,
                AccessLevelID: this.selectedUser.AccessLevelID,
              }
              this.responseData.push(newUser)
            } else {
              await axios.put('/employees/' + this.selectedUser.ID, updatedUserData);
            }
            console.log('User updated:', this.editableEmail);
          }
        }
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    },
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async fetchAllData() {
      try {
        const response = await axios.get('/employees', {},
        );
        this.responseData = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    checkAccess() {
      if (this.userLevel === 1 || this.userLevel === 2) {
        return true

      }
    },
  },
  mounted() {
    this.fetchAllData()
  }
}
</script>

<style scoped>
.custom-list {
  background-color: rgba(255, 255, 255, 0.0); /* Slightly transparent white background */
  width: 80%; /* Full width of the column */
}

.custom-list-item {
  color: black;
  user-select: none;
  font-size: 25px;
  margin-bottom: 5px; /* Add space between items */
}

.custom-list-item:hover {
  max-width: 100%;
  background-color: rgba(96, 92, 92, 0.1);
  cursor: pointer;
}

.custom-list-item-title {
  color: black;
  font-size: 20px;
}

.co-label {
  margin-top: 10px;
}

.v-card-user1 {
  margin-left: 10%;
  justify-content: center;
  max-width: 800px;
}

.button-delete {
  display: flex;
  border: none;
  border-radius: 5px;
  background-color: #ff0000;
  color: #ffffff;
  cursor: pointer;
  font-size: 20px;
}

.button-test {
  margin-left: 48%;
  margin-right: 3%;
  display: flex;
  border: none;
  border-radius: 5px;
  background-color: #5a5a5a;
  color: #ffffff;
  cursor: pointer;
  font-size: 20px;
}

.input-fields {
  padding-left: 10px;
  margin-bottom: 5px;
  font-size: 20px;
  display: flex;
  border-radius: 5px;
  border: none;
  outline: none;
  color: black;
  background-color: rgba(255, 255, 255, 0.7)
}

.custom-text-field {
  background-color: rgba(255, 255, 255, 0.9) !important; /* White background */
  color: #000000 !important; /* Black text color */
  width: 100%; /* Full width */
  margin-bottom: 10px;
}
</style>
