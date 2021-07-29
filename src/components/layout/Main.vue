<template>
  <div class="main">
    <router-view />
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';

import { search } from '@services';

@Component({
  name: 'Main',
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
.main {
  width: calc(100vw - 150px);
  min-width: 1100px;
}
</style>
