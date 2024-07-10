<template>
  <div id="availability-view">
    <div class="button-row">
      <button v-for="(month, index) in months" :key="index" @click="selectMonth(index)" class="month-button">
        {{ month }}
      </button>
    </div>
    <div class="days-grid" v-if="selectedMonth !== null">
      <div v-for="(dayData, dayIndex) in filteredData" :key="dayData.Date" class="day-item">
        <div class="day-text">{{ dayData.Date }}</div>
        <div class="slot" v-if="dayData.Morning === 1">
          <span>Morning:</span>
          <select v-model="dayData.selectedMorning" class="dropdown">
            <option v-for="email in getFilteredEmails(dayData, 'Morning')" :key="email" :value="email">{{ email }}</option>
          </select>
          <button v-if="dayData.selectedMorning" @click="submitShift(dayData.EmployeeID, dayData.Date, 1)">Submit Morning</button>
        </div>
        <div class="slot" v-if="dayData.Afternoon === 1">
          <span>Afternoon:</span>
          <select v-model="dayData.selectedAfternoon" class="dropdown">
            <option v-for="email in getFilteredEmails(dayData, 'Afternoon')" :key="email" :value="email">{{ email }}</option>
          </select>
          <button v-if="dayData.selectedAfternoon" @click="submitShift(dayData.EmployeeID, dayData.Date, 2)">Submit Afternoon</button>
        </div>
        <div class="slot" v-if="dayData.Evening === 1">
          <span>Evening:</span>
          <select v-model="dayData.selectedEvening" class="dropdown">
            <option v-for="email in getFilteredEmails(dayData, 'Evening')" :key="email" :value="email">{{ email }}</option>
          </select>
          <button v-if="dayData.selectedEvening" @click="submitShift(dayData.EmployeeID, dayData.Date, 3)">Submit Evening</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/services/axios";

export default {
  name: 'AvailabilityView',
  data() {
    return {
      months: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      selectedMonth: null,
      data: [], // Initialize as an empty array
    };
  },
  computed: {
    filteredData() {
      if (this.selectedMonth === null || !Array.isArray(this.data)) return [];
      const year = 2024; // Set the year to filter
      const month = this.selectedMonth + 1; // Months are 0-indexed in JS Date
      return this.data.filter(item => {
        const date = new Date(item.Date);
        return date.getFullYear() === year && date.getMonth() + 1 === month;
      });
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('/availabilities/availabilities-with-emails');
        if (Array.isArray(response.data)) {
          this.data = response.data;
        } else {
          console.error('Fetched data is not an array');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    selectMonth(index) {
      this.selectedMonth = index;
    },
    getFilteredEmails(dayData, timeSlot) {
      return dayData.employee.EmailAddress ? [dayData.employee.EmailAddress] : [];
    },
    async submitShift(employeeID, date, assignedShift) {
      try {
        const response = await axios.post('/employee_scheduales', {
          EmployeeID: employeeID,
          Date: date,
          AssignedShift: assignedShift
        });
        console.log('Shift submitted successfully:', response.data);
        // Optionally, update UI or show success message
      } catch (error) {
        console.error('Error submitting shift:', error);
        alert('Shift already in use')
        // Handle error, show error message, etc.
      }
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
.button-row {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.month-button {
  color: black;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px 20px;
  cursor: pointer;
}

.month-button:hover {
  background-color: #f0f0f0;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.day-item {
  background: #f0f0f0;
  padding: 10px;
  border: 1px solid #ccc;
  color: black; /* Set text color to black */
}

.slot {
  display: flex;
  justify-content: space-between;
}

.day-text {
  font-weight: bold;
  margin-bottom: 10px;
}

select {
  color: black; /* Set text color to black */
  border: 1px solid black; /* Set border to black */
  padding: 5px;
  font-size: 14px;
  border-radius: 4px;
  width: 150px; /* Adjust width as needed */
}

select option {
  color: black; /* Set text color of options to black */
}

select:focus {
  outline: none; /* Remove outline on focus (optional) */
}

button {
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
