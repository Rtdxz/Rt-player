import { State } from './state';

export const mutations = {
  changeCurrentMusicInfo(state: State, musicInfo: any) {
    if (musicInfo.freeTrialInfo) {
      // Message('该曲目为vip才能完整听，只有试听片段');
      state.slider = {};
      state.slider[musicInfo.freeTrialInfo.start] = '';
      state.slider[musicInfo.freeTrialInfo.end] = '';
      state.playDur = [
        musicInfo.freeTrialInfo.start,
        musicInfo.freeTrialInfo.end,
      ];
    } else {
      state.slider = {};
      state.playDur = [0, 0];
    }
    state.currentMusicUrl = musicInfo.url;
    console.log(state.slider);
  },
  changeCurrentMusicId(state: State, id: string) {
    state.currentMusicId = id;
  },
  changeCurrentMusic(state: State, musicDetail: any) {
    state.currentMusic = musicDetail;
    console.log(state.currentMusic);
  },
  changeCurrentTime(state: State, currentTime: any) {
    state.currentTime = currentTime;
    // console.log(state.currentTime);
  },
  changePlayStatus(state: State, status: boolean) {
    state.isPlaying = status;
  },
  addMusicToList(state: State, musicDetail: any) {
    // 判断列表有无重复歌曲
    if (state.playList.every((ele) => ele.id !== musicDetail.id)) {
      state.playList.push(musicDetail);
      console.log(state.playList);
    }
  },
  addMusicToRemainList(state: State, musicDetail: any) {
    // 判断列表有无重复歌曲
    if (state.remainPlayList.every((ele) => ele.id !== musicDetail.id)) {
      state.remainPlayList.push(musicDetail);
      console.log(state.playList);
    }
  },
  resetRemainPlayList(state: State) {
    state.remainPlayList = state.playList.slice();
  },
  addAllMusicToList(state: State, musicList: any[]) {
    state.playList = musicList;
  },
  clearPlayList(state: State) {
    state.playList = [];
    state.remainPlayList = [];
    state.currentMusicUrl = '';
    state.isPlaying = false;
    state.currentMusic = { dt: 0 };
    state.currentMusicId = '';
  },
  login(state: State, res: any) {
    state.isLogin = true;
    state.cookie = res.cookie;
    state.userInfo = res.profile;
    state.userId = res.account.id;
    // state.userInfo = userInfo;

    sessionStorage.setItem('cookie', res.cookie);
    console.log(state.userInfo);
  },
  logout(state: State) {
    state.isLogin = false;
  },
  showPlayListTable(state: State, isShowPlayListTable: boolean) {
    state.isShowPlayListTable = isShowPlayListTable;
  },
  saveUserPlayList(state: State, userPlayList: any[]) {
    console.log('save');
    state.userPlayList = userPlayList;
  },
  saveSearchKeywords(state: State, keywords: string) {
    state.searchKeywords = keywords;
  },
};
