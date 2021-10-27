<template>
  <div id="app">
    <div class="search mt-4">
      <div class="search-container">
        <div class="input-container">
          <input placeholder="Symbol Lookup" v-model="searchtext" />
        </div>
        <div @click="searchQuote(searchtext)" class="button-container">
          Search
          <!-- <i style="color:red" class="fas fa-search"></i> -->
        </div>
      </div>
    </div>
    <div class="dash"></div>
    <div class="ml-4 mb-2">
      <div v-if="result">
        <div class="name-symbol">
          <div class="name mr-1">{{ result.Name.toUpperCase() }}</div>
          <div class="symbol">({{ result.Symbol }})</div>
        </div>
        <v-row class="prices">
          <v-col class="last-price ml-2">
            {{ result.LastPrice.toFixed(2) }}
          </v-col>
          <v-col v-if="result.Change > 0" class="change ml-2">
            +{{ result.Change.toFixed(2) }}
          </v-col>
          <v-col v-else class="change ml-2">
            {{ result.Change.toFixed(2) }}
          </v-col>
          <v-col v-if="result.ChangePercent > 0" class="change-percent">
            (+{{ result.ChangePercent.toFixed(2) }}%)
          </v-col>
          <v-col v-else class="change-percent">
            ({{ result.ChangePercent.toFixed(2) }}%)
          </v-col>
        </v-row>

        <div class="timestamp">
          As of {{ convertDateTime(result.Timestamp) }} ET
        </div>
        <div style="max-width: 500px;">
          <div class="dash-two">
          </div>
          <div v-for="(i, j) in staticTextArr" :key="j">
            <div style="display: flex;">
              <div class="constants">
                {{ i }}
              </div>
              <div v-if="j == 0" class="values">
                {{ result.Low }} - {{ result.High }}
              </div>
              <div v-else-if="j == 1" class="values">
                {{ result.Open }}
              </div>
              <div v-else-if="j == 2" class="values">
                {{ computeNumToStr(result.Volume) }}
              </div>
              <div v-else-if="j == 3" class="values">
                {{ computeNumToStr(result.MarketCap) }}
              </div>
            </div>
            <div class="dash-two">
            </div>
          </div>
        </div>
      </div>
      <div class="text-danger" v-else-if="errortext.length > 0">
        {{ errortext }}
      </div>
    </div>
  </div>
</template>

<script>

import {getQuote} from '../api/quote.js'

export default {
  name: 'StockBoard',
  el: '#app',
  data: function() {
    return {
      searchtext: "", // Binds the search symbol
      errortext: "", // Binds errortext
      result: null, // Binds info returned
      staticTextArr: ["Range", "Open", "Volume", "Market Cap"]
    }
  },
  methods: {
    // Calls the API to render details on input symbol
    searchQuote(x) {
      if (x !== "") {
        getQuote(x)
          .then((res) => {
            if (res.Status === "SUCCESS") {
              this.result = res.data;
            }
          })
          .catch((err) => {
            this.errortext = err.Message;
          });
      } else {
        this.result = null;
        this.errortext = "Please provide a Symbol";
      }
    },

    // Compute volume and market cap to string
    computeNumToStr(labelValue) {
      // Nine Zeroes for Billions
      return Math.abs(Number(labelValue)) >= 1.0e9
        ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(1) + "B"
        : // Six Zeroes for Millions
        Math.abs(Number(labelValue)) >= 1.0e6
        ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(1) + "M"
        : // Three Zeroes for Thousands
        Math.abs(Number(labelValue)) >= 1.0e3
        ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(1) + "K"
        : Math.abs(Number(labelValue));
    },

    // Convert the timestamp from date time to time in AM and PM
    convertDateTime(x) {
      let dateTime = new Date(x);
      let getHours = dateTime.getHours();
      let getMins =
        dateTime.getMinutes() < 10
          ? "0" + dateTime.getMinutes()
          : dateTime.getMinutes();
      let getSecs =
        dateTime.getSeconds() < 10
          ? "0" + dateTime.getSeconds()
          : dateTime.getSeconds();

      let time = getHours + ":" + getMins + ":" + getSecs;

      let newtime = time
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (newtime.length > 1) {
        // If time format correct
        newtime = newtime.slice(1); // Remove full string match value
        newtime[5] = +newtime[0] < 12 ? "AM" : "PM"; // Set AM/PM
        newtime[0] = +newtime[0] % 12 || 12; // Adjust hours
      }

      return newtime.join("");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  font-family: "Merriweather Sans", sans-serif;
  margin: 0;
}

* {
  box-sizing: border-box;
}

.search {
  width: 100%;
  max-width: 400px;
  padding: 0 25px;
}

.search-container {
  height: 33px;
  border-radius: 10px;
  border: 2px solid #f0f0f0;
  display: flex;
  overflow: hidden;
}

.input-container {
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.input-container input {
  flex-grow: 1;
  background: transparent;
  border: none;
  outline: none;
  color: gray;
  font-size: 18px;
  margin-left: 10px;
}

.input-container i {
  font-size: 15px;
  margin-left: 35px;
}

input::placeholder {
  color: gray;
  font-weight: 330;
  font-size: 17px;
}

.button-container {
  background-color: #f0f0f0;
  width: 60px;
  display: flex;
  display: -webkit-flex;
    /* justify-content: center; */
  -webkit-justify-content: center;
    /* align-items: center; */
  -webkit-align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 2px solid #dcdcdc;
  font-size: 1.1rem;
}

/* .button-container:hover {
  background-color: #5a81ff;
} */

.dash {
  display: block;
  height: 0px;
  border: 0;
  border-top: 2px solid #a0a0a0;
  margin: 1em 0;
  padding: 0;
  width: 500px;
  margin: 12px 25px;
}

.dash-two {
  display: block;
  height: 0px;
  border: 0;
  border-top: 1px solid #e0e0e0;
  margin: 0.5em 0;
  padding: 0;
  width: 500px;
  /*   margin: 12px 25px; */
}

.name {
  font-size: 20px;
  color: gray;
}

.symbol {
  font-size: 20px;
  color: gray;
}

.name-symbol {
  display: flex;
  align-items: center;
}

.last-price {
  font-size: 30px;
  color: black;
}

.change {
  font-size: 20px;
  color: green;
}

.change-percent {
  font-size: 20px;
  color: green;
}

.timestamp {
  color: #a0a0a0;
  font-style: "Roboto";
  font-size: 12px;
}

.values {
  width: 300px;
  font-weight: bold;
  display: flex;
  justify-content: end;
}

.constants {
  width: 300px;
  color: #a0a0a0;
  font-style: "Roboto";
  font-size: 14px;
}
</style>
