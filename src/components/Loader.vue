<template>
  <section>
    <div class="loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </section>
</template>

<script  lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Loading extends Vue {}
</script>


<style scoped>
*{
  --border-length: 100px;
  --animation-speed: 1s;
  --animation-rotate-speed: 2s;
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}


.loader {
  position: relative;
  width: 205px;
  height: 205px;
  transform: rotate(45deg);
  animation: explode var(--animation-speed) linear infinite;
}

.loader div {
  position: absolute;
  width: var(--border-length);
  height: var(--border-length);
  border-radius: 20px;
  animation: rotate var(--animation-rotate-speed) linear infinite;
}

.loader div:nth-child(1) {
  top: 0;
  left: 0;
  background-color: #E7942B;
}

.loader div:nth-child(2) {
  top: 0;
  right:  0;
  background-color: #009345;
}

.loader div:nth-child(3) {
  bottom: 0;
  left: 0;
  background-color: #8A282E;
}

.loader div:nth-child(4) {
  bottom: 0;
  right:  0;
  background-color: #29BC2F;
}

@keyframes explode {
  50% {
    width: 300px;
    height: 300px;
  }
}

@keyframes rotate {
  50% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>