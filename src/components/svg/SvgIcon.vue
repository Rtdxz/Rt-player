<template>
  <component :is="currentComponent" class="svg-icon" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import SvgIconCloud from './SvgIconCloud.vue';
import SvgIconRightArrow from './SvgIconRightArrow.vue';

@Component({
  components: {
    SvgIconCloud,
    SvgIconRightArrow,
  },
})
export default class SvgIcon extends Vue {
  @Prop({ default: '' })
  type!: string;

  get currentComponent() {
    return `svg-icon-${this.type}`;
  }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
.svg-icon {
  fill: currentColor;
}
</style>
