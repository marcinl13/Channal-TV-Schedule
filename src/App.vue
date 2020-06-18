<template>
  <div id="app">
    <Loading v-if="err" />
    <Home
      v-if="stateAtHome && !err"
      :channelList="channelList"
      :sendChoosenOne="sendChoosen"
      :setAtHome="setStateHome"
    />

    <Details
      v-if="!stateAtHome && !err"
      v-bind:choosenChannal="choosenChannel"
      :ChannalScheduleData="getSchedule"
      :setAtHome="setStateHome"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Home from "./pages/Home.vue";
import Details from "./pages/Details.vue";

import Loading from "./components/Loader.vue";

import ScheduleTVService from "../src/ts/ScheduleTVService";
import Ichannals from "@/interfaces/Ichannals";



@Component({
  components: {
    Home,
    Details,
    Loading
  }
})
export default class App extends Vue {
  scheduleTV: Ichannals[] = [];
  channelList: string[] = [];
  choosenChannel = "";
  stateAtHome = true;
  err = "";

  created() {
    ScheduleTVService.getFullSchedule()
      .then(res => {
        const responseData = res.data;
        const chNames = this.getChannalsName(responseData);

        this.scheduleTV = responseData;
        this.channelList = chNames;
        this.choosenChannel = chNames[0];
      })
      .catch(error => (this.err = error));
  }

  getChannalsName(data: Ichannals[]) {
    return data.map(m => m.channalName);
  }

  sendChoosen(item: string): string {
    if (typeof item != "string") {
      this.choosenChannel = this.channelList[0];
    }

    this.choosenChannel = item;

    return this.choosenChannel;
  }

  setStateHome(status: boolean): void {
    this.stateAtHome = status;
  }

  get getSchedule(): Ichannals {
    const choosenChannalName = this.sendChoosen(this.choosenChannel);

    const findChannalSchedule = this.scheduleTV.find(
      ch => ch.channalName === choosenChannalName
    );

    return findChannalSchedule as Ichannals;
  }
}
</script>

<style>
:root {
  --bg-color: #1c313a;

  --group1-color: #1c313a;
  --group2-color: #718792;
  --group3-color: #4d636e /*#455a64*/;
  --group4-color: #abf8ff;
  --group5-color: white;
  --group6-color: #ffd700;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: var(--group1-color);
}
</style>
