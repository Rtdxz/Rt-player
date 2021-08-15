export interface State {
  cookie: string;
  currentMusicId: string;
  currentMusic: any;
  currentMusicUrl: string;
  isLoggin: boolean;
  isPlaying: boolean;
  playList: any[];
  remainPlayList: any[];
  playDur: number[];
  slider: any;
}

export const state: State = {
  cookie: '',
  currentMusicId: '',
  currentMusic: {
    dt: 0,
  },
  currentMusicUrl: '',
  isLoggin: false,
  isPlaying: false,
  playList: [],
  remainPlayList: [],
  playDur: [0, 0],
  slider: {},
};
