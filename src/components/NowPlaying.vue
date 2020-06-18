<template>
  <div>
    <h2>Teraz grane</h2>
    <h3>{{ gTitle() }} {{ getNowPlaying() }}</h3>
  </div>
</template>

<script  lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Ichannals from "@/interfaces/Ichannals";
import Ischedule from "@/interfaces/Ischedule";

import findCurrentPlaying from "@/ts/findCurrentPlaying";

@Component
export default class NowPlaying extends Vue {
  @Prop({ type: Object, required: true }) stationsData!: Ichannals;

  gTitle(): void {
    setInterval(() => {
      const currentPlaying = this.getNowPlaying() as string;

      this.$el.children[1].textContent = `${currentPlaying}`;
    }, 60 * 1000); //every 1 minute
  }

  getNowPlaying(): string {
    const data = this.stationsData as Ichannals;
    const res = findCurrentPlaying(data) as Ischedule;

    return res.title;
  }
}
</script>

<style scoped>
div {
  flex-direction: column;
  display: inline-flex;
  margin-left: 35px;
  margin-right: 35px;
  width: 80%;
}
h2,
h3 {
  color: var(--group5-color);
  word-wrap: break-word;
  /* width: 80vw; */
  text-align: center;
  margin: 10px auto;
  font-weight: bolder;
  font-size: x-large;
}

h3 {
  color: var(--group6-color);
}

@media only screen and (max-width: 600px) {
  h2 {
    display: none;
  }
  h3 {
    text-align: center;
    vertical-align: middle;
    animation: 8s slide-right infinite;
    margin: auto;
    display: flex;
    justify-items: center;
  }
  div {
    width: 100vw;
    overflow: hidden;
    bottom: 0;
    left: 0;
    margin: 0;
    vertical-align: middle;
  }

  @keyframes slide-right {
    from {
      margin-left: 100%;
      width: 300%;
    }
    to {
      margin-left: 0%;
      width: 100%;
    }
  }
  @keyframes slide-left {
    from {
      margin-left: -200%;
      width: 200%;
    }
    to {
      margin-left: -300%;
      width: 300%;
    }
  }
}
</style>