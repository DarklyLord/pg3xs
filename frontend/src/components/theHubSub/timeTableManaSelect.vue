<template>
  <div id="app">
    <div class="button-row">
      <button v-for="(month, index) in months" :key="index" @click="selectMonth(index)">
        {{ month }}
      </button>
    </div>
    <div class="days-grid" v-if="selectedMonth !== null">
      <div v-for="(day, dayIndex) in daysInMonth(selectedMonth)" :key="dayIndex" class="day-item">
        <span class="day-text">{{ formatDate(selectedMonth, day) }}</span>
        <select v-model="selectedChoices[dayIndex].choice">
          <option v-for="choice in choices" :key="choice" :value="choice">
            {{ choice }}
          </option>
        </select>
      </div>
    </div>
    <button class="bottom-right-button" @click="submitAvailabilities">Submit Choices</button>
  </div>
</template>

<script>
import axios from "@/services/axios";
import {mapState} from 'pinia';
import {useUserStore} from '@/stores/userStore';

export default {
  data() {
    return {
      months: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      selectedMonth: null,
      choices: [ 'Morning', 'Afternoon', 'Evening',''],
      selectedChoices: [] // Will store objects like { date: 'yyyy-mm-dd', choice: 1 }
    };
  },
  computed: {
    ...mapState(useUserStore, {
      userId: 'getUserId',
    })
  },
  mounted() {
  },
  methods: {
    selectMonth(index) {
      this.selectedMonth = index;
      const daysCount = this.daysInMonth(index);
      this.selectedChoices = Array.from({length: daysCount + 1}, (_, dayIndex) => ({
        Date: this.formatDateISO(index, dayIndex + 1), // ISO format date
        choice: null // initialize choice to null
      }));
      this.selectedChoices.splice(0, 1)
    },
    daysInMonth(monthIndex) {
      const year = 2024;
      return new Date(year, monthIndex + 1, 0).getDate();
    },
    formatDate(monthIndex, day) {
      const year = 2024;
      const date = new Date(year, monthIndex, day);
      const weekdayOptions = {weekday: 'long'};
      const dayOptions = {day: 'numeric'};
      const monthOptions = {month: 'numeric'};
      const formattedDate = date.toLocaleDateString('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit'});
      return formattedDate;
    },
    formatDateISO(monthIndex, day) {
      const year = 2024;
      const date = new Date(year, monthIndex, day);
      return date.toISOString().split('T')[0]; // Format as yyyy-mm-dd
    },
    showSelectedChoices() {
      console.log(this.selectedChoices);
      // Perform actions with selected choices, such as sending data to backend or displaying in UI
    },
    async submitAvailabilities() {
      const availabilities = [];

      // Prepare availabilities based on selectedChoices
      this.selectedChoices.forEach(({ Date, choice }) => {
        if ([1, 2, 3].includes(choice)) {
          let availability = { Date, EmployeeID: this.userId, Morning: 0, Afternoon: 0, Evening: 0 };
          if (choice === 'Morning') availability.Morning = 1;
          if (choice === 'Afternoon') availability.Afternoon = 1;
          if (choice === 'Evening') availability.Evening = 1;
          availabilities.push(availability);
        }
      });

      // Check if there are availabilities to submit
      if (availabilities.length === 0) {
        console.log('No valid availabilities to submit.');
        return;
      }
      console.log(availabilities)
      console.log(availabilities[0])

      try {
        for (let i = 0; i < availabilities.length; i++) {
          const response = await axios.post('/availabilities', availabilities[i]);
          console.log('Success:', response.data);
        }

      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
}
</script>

<style scoped>
#app {
  position: relative;
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

.button-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  background-color: white;
  padding: 10px 0;
}

.days-grid {
  margin-top: 70px; /* Adjust based on the height of your button row */
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 columns */
  gap: 10px;
  justify-items: center;
}

.day-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 180px; /* Adjust width to accommodate weekday and date */
}

.day-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

select {
  margin-left: 10px;
  color: black; /* Black font color */
  border: 1px solid #ccc; /* Border */
  padding: 5px;
  font-size: 14px;
  border-radius: 4px;
  position: relative; /* Reset to default position */
  top: 0; /* Reset to default position */
}

.bottom-right-button {
  position: fixed;
  bottom: 10%; /* Position 10% from the bottom */
  right: 10px; /* Position 10px from the right */
}
</style>
