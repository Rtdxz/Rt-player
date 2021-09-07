import { Vue } from 'vue-property-decorator';

import { getMusicUrl } from '@services/PlayListDetail';
import { dateFormat, timeFormat, Rank } from '@utils';

export class PublicPlay extends Vue {
  dateFormat = dateFormat;

  timeFormat = timeFormat;

  Rank = Rank;

  playMusic(musicDetail: any) {
    console.log('play');
    if (this.$store.state.currentMusicId === musicDetail.id) return;
    getMusicUrl(musicDetail.id).then((res) => {
      const musicInfo = res.data.data[0];

      this.$store.commit('changeCurrentMusicId', musicDetail.id);
      this.$store.commit('changeCurrentMusic', musicDetail);
      this.$store.commit('changeCurrentMusicInfo', musicInfo);
      this.$store.commit('addMusicToRemainList', musicDetail);
      this.$store.commit('changePlayStatus', true);
      this.$store.commit('addMusicToList', musicDetail);
    });
  }
}
