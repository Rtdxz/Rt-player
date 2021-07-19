<template>
  <div class="">
    <router-view />
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';

import { search } from '@/services';

@Component({
  name: 'Default',
})
export default class Default extends Vue {
  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  @Prop({ default: 'default value' })
  propA!: string;

  created() {
    console.log('created');
  }

  mounted() {
    console.log('mounted');
    search('海阔天空').then((res) => console.log(res));
  }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
</style>
