<template>
  <div id="employee-schedule-view">
    <h2>Employee Schedules</h2>
    <table class="schedule-table">
      <thead>
      <tr>
        <th>Date</th>
        <th>Morning</th>
        <th>Afternoon</th>
        <th>Evening</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(schedule, index) in schedules" :key="index">
        <td>{{ schedule.Date }}</td>
        <td v-if="schedule.AssignedShift === 1">{{ getEmailById(schedule.EmployeeID)}}</td>
        <td v-else></td>
        <td v-if="schedule.AssignedShift === 2"> {{getEmailById(schedule.EmployeeID)}}</td>
        <td v-else></td>
        <td v-if="schedule.AssignedShift === 3">{{ getEmailById(schedule.EmployeeID)}}</td>
        <td v-else></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "@/services/axios";

export default {
  name: 'EmployeeScheduleView',
  data() {
    return {
      schedules: [],
      employeeEmails: []// Store emails with EmployeeID as keys
    };
  },
  methods: {
    async fetchSchedules() {
      try {
        const response = await axios.get('/employee_scheduales');
        if (Array.isArray(response.data)) {
          this.schedules = response.data;
          // Fetch employee emails based on the EmployeeID in schedules
        } else {
          console.error('Fetched data is not an array');
        }
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
      console.log(this.schedules[0].EmployeeID)
    },
    getEmployeeEmail(){

    },
    async fetchEmployeeEmail() {
      try{
        const response = await axios.get('/employees');

        this.employeeEmails = response.data
        console.log(this.employeeEmails)
      }catch (error) {
        console.error('Error fetching schedules:', error);
      }
    },
    getEmailById(id) {
      // Loop through the array of objects
      for (let i = 0; i < this.employeeEmails.length; i++) {
        // Check if the current object's ID matches the desired ID
        if (this.employeeEmails[i].ID === id) {
          // Return the email address if found
          return this.employeeEmails[i].EmailAddress;
        }
      }
      // Return null or handle the case where ID is not found
      return null; // Or throw an error, or return a default value as per your requirement
    }
  },
  mounted() {
    this.fetchEmployeeEmail()
    this.fetchSchedules();
  }
};
</script>

<style scoped>
#employee-schedule-view {
  margin: 20px;
}

h2 {
  color: black;
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
}

.schedule-table th,
.schedule-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.schedule-table th {
  background-color: #f0f0f0;
  color: black;
}

.schedule-table td {
  color: black;
}
</style>
