<template>
  <img v-if="channalName" :src="getChannalLogo()" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ChannalLogo extends Vue {
  @Prop({ type: String, required: true }) channalName!: string;

  private refactorChannalName(channalName: string) {
    return String(channalName)
      .toLowerCase()
      .replace(/ +/g, "");
  }

  getChannalLogo() {
    const refactoredChannalName = this.refactorChannalName(this.channalName);

    return require(`../assets/channals/${refactoredChannalName}.png`);
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  --increase: 2;
}
img {
  width: calc(var(--increase) * 50px);
  height: calc(var(--increase) * 19px);
  image-rendering: optimizequality;
  object-fit: contain;
  
}
</style>