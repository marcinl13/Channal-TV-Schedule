<template>
  <div>
    <ChannalListDisplay :channelsArray="channelList" :sendChoosen="sendChoosen" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ChannalListDisplay from "../components/ChannalListDisplay.vue";

@Component({
  components: {
    ChannalListDisplay
  }
})
export default class Home extends Vue {
  @Prop({ type: Array, required: true }) channelList!: Array<any>;
  @Prop({ type: Function, required: true }) sendChoosenOne!: Function;
  @Prop({ type: Function, required: true }) setAtHome!: Function;

  sendChoosen(channalName: string): void {
    this.sendChoosenOne(channalName);
    this.setAtHome(false);
  }
}
</script>