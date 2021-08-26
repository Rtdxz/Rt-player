import request from 'xhr-axios';

export const getUserPlayList = (uid?: string) => request({
  method: 'get',
  url: '/user/playlist',
  params: {
    uid,
    cookie: sessionStorage.getItem('cookie'),
  },
});
