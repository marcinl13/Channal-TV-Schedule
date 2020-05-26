<template>
  <div class="container">
    <img :src="imgSrc()" @click="onChangePosition( scrollTypeTop )" />

    <div :id="id" class="channalSchedule">
      <ul>
        <li v-for="(schedule, index) in scheduleData" v-bind:key="index" style="margin-bottom:16px">
          <div class="time">
            <p>{{ schedule.timeFrom }} - {{ schedule.timeTo }}</p>
          </div>
          <div class="content">
            <p>{{ schedule.title }}</p>
          </div>
        </li>
        {{ selectCurrentPlaying() }}
        {{ refreshInterval() }}
      </ul>
    </div>

    <img class="rotate" :src="imgSrc()" @click="onChangePosition( scrollTypeBottom )" />
  </div>
</template>


<script  lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Ichannals from "@/interfaces/Ichannals";
import Ischedule from "@/interfaces/Ischedule";

import findCurrentPlaying from "@/ts/findCurrentPlaying";
import eArrowControls from "../ts/eArrowControl";

@Component({
  components: {}
})
export default class ScheduleDisplay extends Vue {
  @Prop({ type: Object, required: true }) stationsData!: Ichannals;
  @Prop({ type: String, required: true }) channalName!: string;

  id = this.getCustomId();

  scrollTypeTop = eArrowControls.TOP;
  scrollTypeBottom = eArrowControls.BOTTOM;

  imgSrc = () => {
    return require("@/assets/iconfinder_arrow-up.png");
  };

  get scheduleData() {
    return this.stationsData.schedule;
  }

  getNowPlaying(): string {
    const data = this.stationsData as Ichannals;
    const res = findCurrentPlaying(data) as Ischedule;

    return res.title;
  }

  private refactorChannalName(channalName: string): string {
    return String(channalName)
      .toLowerCase()
      .replace(/ +/g, "");
  }

  private getDivChannalSchedule() {
    const el = this.$el.children as HTMLCollection;

    return el[1];
  }

  private getCustomId(): string {
    const refactored = this.refactorChannalName(this.channalName);
    return `channal_${refactored}`;
  }

  onChangePosition(type: eArrowControls) {
    const target = this.getDivChannalSchedule();

    if (type === eArrowControls.TOP) {
      target.scrollTop -= 80;
    }
    if (type === eArrowControls.BOTTOM) {
      target.scrollTop += 80;
    }
  }

  selectCurrentPlaying() {
    this.$nextTick(async () => {
      const nowPlaying = await findCurrentPlaying(this.stationsData).title;

      const divChannalSchedule = this.getDivChannalSchedule();
      const ulList = divChannalSchedule.childNodes[0] as any; //divChannalSchedule.firstChild
      const elements = ulList.children as any;

      //get throw all elements
      elements.forEach((e: any, i: number) => {
        const textContent = e.lastChild.textContent;
        const elementHeight = e.clientHeight;

        if (textContent === nowPlaying) {
          //change style
          e.firstChild.style =
            "background-color: var(--group6-color) !important;";
          e.lastChild.style = "color: var(--group6-color)  !important;";

          const margin = parseInt(e.style["margin-bottom"].replace("px", ""));
          const sumSoFarMargins = margin * (i - 1);
          const sumSoFarElements = elementHeight * i;

          //move to the element of list
          divChannalSchedule.scrollTop = sumSoFarElements + sumSoFarMargins;

          return;
        }
      });
    });
  }

  refreshInterval() {
    setInterval(() => {
      this.selectCurrentPlaying();
    }, 60 * 1000);
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  --angle-diagonally: 20deg;
  --list-element-height: 5rem;
  --list-element-amount: 3;
  --list-elements-space: 16px;
  --container-width: 600px;
  --width-time: 160px;
}

.container {
  display: flex;
  flex-direction: column;
}

.channalSchedule {
  display: inline-block;
  min-height: calc(
    var(--list-element-height) * var(--list-element-amount) +
      var(--list-elements-space) * var(--list-element-amount)
  );
  width: calc(var(--container-width) + var(--list-element-height));
  max-height: 100px;
  margin: 0px auto;
  padding: 0 calc(var(--list-element-height) / 2);
  transform: skew(var(--angle-diagonally));
  transform-origin: center;
  overflow: hidden;
}

.channalSchedule ul {
  list-style: none;
  margin-top: calc(var(--list-elements-space) / 2);
}

.channalSchedule li {
  width: var(--container-width);
  height: var(--list-element-height);
  text-align: center;
  transform: skew(calc(-1 * var(--angle-diagonally)));
  /*transition: all .1s ease-in-out; */
}

.channalSchedule .time {
  display: flex;
  justify-content: center;
  width: var(--width-time);
  height: 100%;
  float: left;
  margin: 0px;
  color: var(--group1-color);
  background-color: var(--group4-color);
}

.time p {
  font-size: 18px;
  font-weight: bold;
  margin: auto;
}
.content p {
  font-size: larger;
  margin: auto;
}

.channalSchedule .content p {
  padding: 0 7px;
}

.channalSchedule .content {
  display: flex;
  width: calc(var(--container-width) - var(--width-time));
  height: 100%;
  justify-content: center;
  float: left;
  color: var(--group5-color);
  background-color: var(--group3-color);
}

.module {
  scroll-behavior: smooth;
}

img {
  cursor: pointer;
  display: inline-block;
  width: 46px;
  height: 46px;
  margin: 1rem auto;
  background-color: var(--group4-color);
  border-radius: 25px;
}
img.rotate {
  transform: rotate(180deg);
}
img:hover {
  background-color: var(--group6-color);
}

@media only screen and (max-width: 600px) {
  .channalSchedule {
    width: 90vw !important;
    transform: none;
    padding: 0;
  }

  .channalSchedule li {
    width: 100% !important;
    height: 3rem !important;
    transform: none !important;
  }

  .content {
    width: 80% !important;
  }
  .time {
    width: 20% !important;
  }

  .time p {
    font-size: 12px;
    font-weight: bold;
    margin: auto;
  }
  .content p {
    font-size: 16px;
    font-weight: bold;
    margin: auto;
  }

  img {
    width: 46px !important;
    height: 46px !important;
  }
}
</style>