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
  async getWatchValue(newVal: string, oldVal: string) {
    if (newVal === '') return;
    await this.getData(1);
    this.$emit('changeContentCount', this.content.userprofileCount);
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
}
