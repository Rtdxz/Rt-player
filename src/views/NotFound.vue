<template>
  <div class="NotFound">
    <h1 @click="$router.push('find')">
      当前页面未开发或者跳转到了错误位置,点击返回
    </h1>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';

@Component({
  name: 'NotFound',
})
export default class Default extends Vue {
  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  @Prop({ default: 'default value' })
  propA!: string;
  // created() { }
  // mounted() { }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
h1 {
  cursor: pointer;
  // margin-top: 200px;
  margin: 300px 400px;
  font-size: 30px;
}
</style>
