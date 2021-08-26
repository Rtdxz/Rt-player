export interface State {
  userInfo: any;
  userId: string;
  cookie: string;
  currentMusicId: string;
  currentMusic: any;
  currentMusicUrl: string;
  isLogin: boolean;
  isPlaying: boolean;
  playList: any[];
  remainPlayList: any[];
  playDur: number[];
  slider: any;
}

export const state: State = {
  userInfo: {},
  userId: '',
  cookie: '',
  currentMusicId: '',
  currentMusic: {
    dt: 0,
  },
  currentMusicUrl: '',
  isLogin: false,
  isPlaying: false,
  playList: [],
  remainPlayList: [],
  playDur: [0, 0],
  slider: {},
};
