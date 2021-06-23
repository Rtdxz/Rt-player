<template>
  <div class="footer"></div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';

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
  }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
@import '~@/assets/css/index.scss';
.footer {
  height: 75px;
  width: 100%;
  background-color: #fff;
  border: 1px solid $border-color;
  box-sizing: border-box;
}
</style>
