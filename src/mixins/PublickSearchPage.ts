import { Vue, Component, Watch } from 'vue-property-decorator';
import { Search } from '@services/Search';
import { mapState } from 'vuex';

@Component({
  name: 'PublicSearchPage',
  computed: {
    ...mapState(['searchKeywords']),
  },
})
export class PublicSearchPage extends Vue {
  isLoading = true;

  searchKeywords!: string;

  type!: number;

  content: any = {};

  limit!: number;

  @Watch('searchKeywords')
  async getWatchValue(newVal: string) {
    if (newVal === '') return;
    await this.getData(1);
    this.$emit(
      'changeContentCount',
      this.content.userprofileCount
        || this.content.songCount
        || this.content.albumCount
        || this.content.playlistCount
        || this.content.artistCount
        || this.content.videoCount,
    );
  }

  async getData(page: number) {
    console.log(this, page);
    const params: any = {
      keywords: this.$store.state.searchKeywords,
      offset: (page - 1) * this.limit,
      limit: this.limit,
      type: this.type,
    };
    this.content = {};
    const container: any = document.querySelector('.searchPageContainer');
    // this.$emit('changeContentCount');
    container.scrollTop = 0;
    this.isLoading = true;
    const res = await Search(params);

    console.log(res.data.result);
    this.content = res.data.result;
    this.isLoading = false;
  }

  brightKeyword(val: any) {
    const keyword = this.searchKeywords; // 获取输入框输入的内容
    if (val.indexOf(keyword) !== -1) {
      // 判断这个字段中是否包含keyword
      // 如果包含的话，就把这个字段中的那一部分进行替换成html字符
      return val.replace(
        keyword,
        `<span class="highlights-text">${keyword}</span>`,
      );
    }
    return val;
  }
}
