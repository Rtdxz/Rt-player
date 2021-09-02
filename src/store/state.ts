export interface State {
  searchKeywords: string;
  userInfo: any;
  userId: string;
  userPlayList: any[];
  cookie: string;
  currentMusicId: string;
  currentMusic: any;
  currentMusicUrl: string;
  currentTime: number;
  isLogin: boolean;
  isPlaying: boolean;
  playList: any[];
  remainPlayList: any[];
  playDur: number[];
  slider: any;
  isShowPlayListTable: boolean;
}

export const state: State = {
  searchKeywords: '',
  userInfo: sessionStorage.getItem('userInfo')
    ? JSON.parse(sessionStorage.getItem('userInfo')!)
    : {},
  userId: sessionStorage.getItem('userId')
    ? JSON.parse(sessionStorage.getItem('userId')!)
    : '',
  userPlayList: sessionStorage.getItem('userPlayList')
    ? JSON.parse(sessionStorage.getItem('userPlayList')!)
    : [],
  cookie: '',
  currentMusicId: '',
  currentMusic: {
    dt: 0,
  },
  currentMusicUrl: '',
  currentTime: 0,
  isLogin: sessionStorage.getItem('isLogin')
    ? JSON.parse(sessionStorage.getItem('isLogin')!)
    : false,
  isPlaying: false,
  playList: [],
  remainPlayList: [],
  playDur: [0, 0],
  slider: {},
  isShowPlayListTable: false,
};
