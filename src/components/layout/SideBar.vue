<template>
  <div class="sidebar"></div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';

@Component({
  name: 'SideBar',
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
  }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
@import '~@/assets/css/index.scss';
.sidebar {
  width: 150px;
  height: calc(100vh - 145px);
  flex: 0 0 150px;
  // float: left;
  border-right: 1px solid $border-color;
}
</style>
