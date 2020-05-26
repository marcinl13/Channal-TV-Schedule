<template>
  <div>
    <!-- <button class="button1 btn-center" v-on:click="backToHome()">Wstecz</button> -->

    <div class="display-container">
      <div class="left-box">
        <ScheduleDisplay :stationsData="ChannalScheduleData" :channalName="choosenChannal" />
      </div>

      <div class="right-box">
        <ChannalLogo class="logo" v-bind:channalName="choosenChannal" />
        <NowPlaying class="now-playing" :stationsData="ChannalScheduleData" />
      </div>
    </div>
    <a href="#" class="button1 btn-center" v-on:click="backToHome()">Wstecz</a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Ichannals from "@/interfaces/Ichannals";

import ScheduleDisplay from "../components/scheduleDisplay.vue";
import ChannalLogo from "../components/ChannalLogo.vue";
import NowPlaying from "../components/NowPlaying.vue";

@Component({
  components: {
    ScheduleDisplay,
    ChannalLogo,
    NowPlaying
  }
})
export default class Details extends Vue {
  @Prop({ type: Object, required: true }) ChannalScheduleData!: Ichannals[];
  @Prop({ type: String, required: true }) choosenChannal!: string;
  @Prop({ type: Function, required: true }) setAtHome!: Function;

  backToHome(): void {
    this.setAtHome(true);
  }
}
</script>

<style scoped>
* {
  --right-box-width: 30vw;
  --right-box-height: 500px;

  --cut: 30px;
  --mask-color: var(--group1-color);
}

@media only screen and (max-width: 600px) {
  .display-container {
    display: flex !important;
    flex-direction: column !important;
  }
  .right-box {
    display: flex !important;
    justify-content: center !important;
    flex-direction: unset !important;
    width: 100% !important;
    height: 4rem !important;
    position: absolute !important;
    left: 0 !important;
    bottom: 0 !important;
  }
  .left-box {
    /* display: none !important; */
    width: 90vw !important;
    margin: 0 auto;
  }
  .right-box::before,
  .right-box::after {
    float: unset;
    border: 0px solid !important;
  }

  .logo {
    display: inline-flex;
    width: 120px !important;
    height: 4rem;
    float: left;
    left: 0px;
    margin: auto;
    margin-left: 5px;
    z-index: 2;
    position: absolute !important;
  }

  .now-playing {
    margin: none;
  }
}

.display-container {
  display: flex;
  width: 100vw;
  height: 70vh;
  justify-content: center;
}

.left-box {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  width: 70vw;
}

.right-box {
  text-align: center;
  width: 30vw;
  height: var(--right-box-height);
  background-color: var(--group3-color);
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}
.right-box::before {
  position: absolute;
  content: "";
  border-left: var(--cut) solid var(--mask-color);
  border-top: var(--right-box-height) solid transparent;
  top: 0px;
  left: 0px;
}
.right-box::after {
  position: absolute;
  content: "";
  border-bottom: var(--cut) solid var(--mask-color);
  border-right: var(--right-box-width) solid transparent;
  bottom: 0px;
  right: 0px;
}

.now-playing {
  /* display: inline-flex;
  margin-left: 35px;
  margin-right: 35px;
  width: 80%; */
}

.logo {
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 1rem;
}

.btn-center {
  justify-content: center;
}

.button1 {
  content: "Wstecz";
  /* display: flex; */
  width: 200px;
  padding: 0.35em 1.2em;
  border: 0.1em solid #ffffff;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  color: #ffffff;
  text-align: center;
  transition: all 0.2s;
}

.button1:hover {
  color: #000000;
  background-color: #ffffff;
}
</style>