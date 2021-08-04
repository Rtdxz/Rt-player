<template>
  <component :is="currentComponent" class="svg-icon-controller" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import SvgIconControllerPlay from './SvgIconControllerPlay.vue';
import SvgIconControllerPre from './SvgIconControllerPre.vue';
import SvgIconControllerBeckoning from './SvgIconControllerBeckoning.vue';
import SvgIconControllerNext from './SvgIconControllerNext.vue';
import SvgIconControllerOrderPlay from './SvgIconControllerOrderPlay.vue';
import SvgIconControllerRandomPlay from './SvgIconControllerRandomPlay.vue';
import SvgIconControllerSingleLoop from './SvgIconControllerSingleLoop.vue';
import SvgIconControllerVolume from './SvgIconControllerVolume.vue';
import SvgIconControllerWord from './SvgIconControllerWord.vue';

@Component({
  components: {
    SvgIconControllerPlay,
    SvgIconControllerPre,
    SvgIconControllerBeckoning,
    SvgIconControllerNext,
    SvgIconControllerOrderPlay,
    SvgIconControllerRandomPlay,
    SvgIconControllerSingleLoop,
    SvgIconControllerVolume,
    SvgIconControllerWord,
  },
})
export default class SvgIcon extends Vue {
  @Prop({ default: '' })
  type!: string;

  get currentComponent() {
    return `svg-icon-controller-${this.type}`;
  }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
.svg-icon-controller {
  fill: currentColor;
}
</style>
