<template>
  <div>
    <div
      class="hexagon bouncy"
      v-for="(item, index) in channelsArray"
      :style="animDelay(index)"
      v-bind:key="item"
      :name="item"
      @click="onChannelClick(item)"
    >{{item}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ChannalListDisplay extends Vue {
  @Prop({ type: Array, required: true }) channelsArray!: Array<any>;
  @Prop({ type: Function, required: true }) sendChoosen!: Function;

  onChannelClick(target: string) {
    this.sendChoosen(target);
  }

  animDelay(index: number): string {
    const multiplayer = 0.07;
    const calculate = multiplayer * index;

    return `animation-delay: ${calculate}s`;
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  --hexagon-a: 90px;
  --hexagon-width: calc(var(--hexagon-a) * 1.73205080757);
  --hexagon-half-width: calc(var(--hexagon-width) / 2);
  --hexagon-color: var(--group4-color);
  --hexagon-hover-color: #4095c6;
}

@media only screen and (max-width: 600px) {
  * {
    --hexagon-a: 60px;
    --hexagon-color: var(--group6-color);
  }

  .hexagon{
    font-size: large !important;
    padding: 0 2px;
  }
}

.hexagon {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  height: var(--hexagon-a);
  width: var(--hexagon-width);
  margin-left: calc(var(--hexagon-a) / 2);
  margin-right: calc(var(--hexagon-a) / 2);
  margin-bottom: calc(var(--hexagon-half-width));
  margin-top: calc(var(--hexagon-a) / 2);
  cursor: pointer;
  background-color: var(--hexagon-color);
  text-align: center;
  vertical-align: middle;
  font-size: x-large;
  font-weight: bold;
  transition: all 0.2s;
}
.hexagon::after {
  position: absolute;
  content: "";
  left: 0px;
  bottom: var(--hexagon-a);
  border-left: var(--hexagon-half-width) solid transparent;
  border-right: var(--hexagon-half-width) solid transparent;
  border-bottom: calc(var(--hexagon-half-width) - calc(var(--hexagon-a) / 2))
    solid var(--hexagon-color);
}
.hexagon::before {
  position: absolute;
  left: 0px;
  top: var(--hexagon-a);
  content: "";
  border-left: var(--hexagon-half-width) solid transparent;
  border-right: var(--hexagon-half-width) solid transparent;
  border-top: calc(var(--hexagon-half-width) - calc(var(--hexagon-a) / 2)) solid
    var(--hexagon-color);
}

.hexagon:hover {
  background-color: var(--group6-color);
}
.hexagon:hover::after {
  position: absolute;
  content: "";
  left: 0px;
  bottom: var(--hexagon-a);
  border-left: var(--hexagon-half-width) solid transparent;
  border-right: var(--hexagon-half-width) solid transparent;
  border-bottom: calc(var(--hexagon-half-width) - calc(var(--hexagon-a) / 2))
    solid var(--group6-color);
}
.hexagon:hover::before {
  position: absolute;
  left: 0px;
  top: var(--hexagon-a);
  content: "";
  border-left: var(--hexagon-half-width) solid transparent;
  border-right: var(--hexagon-half-width) solid transparent;
  border-top: calc(var(--hexagon-half-width) - calc(var(--hexagon-a) / 2)) solid
    var(--group6-color);
}

.bouncy {
  animation: bouncy 5s infinite linear;
  position: relative;
}

@keyframes bouncy {
  0% {
    top: 0em;
  }

  40% {
    top: 0em;
  }

  43% {
    top: -0.9em;
  }

  46% {
    top: 0em;
  }

  48% {
    top: -0.4em;
  }

  50% {
    top: 0em;
  }

  100% {
    top: 0em;
  }
}
</style>