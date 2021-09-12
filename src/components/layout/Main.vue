<template>
  <div class="main" :class="{ big: isWithoutSide }">
    <router-view />
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';

// import { search } from '@services';

@Component({
  name: 'Main',
})
export default class Default extends Vue {
  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  @Prop({ default: false })
  isWithoutSide!: boolean;

  // created() {
  //   console.log('created');
  // }

  // mounted() {
  //   console.log('mounted');
  //   search('海阔天空').then((res) => console.log(res));
  // }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
.main {
  height: calc(100vh - 135px);
  width: calc(100vw - 200px);
  min-width: 1100px;
}
.big {
  height: calc(100vh - 60px);
  width: 100vw;
}
</style>
