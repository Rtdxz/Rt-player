import request from 'xhr-axios';

export const getUserDetail = (uid: string) => request({
  method: 'get',
  url: '/user/detail',
  params: {
    uid,
  },
});

export const getUserPlayList = (uid: string) => request({
  method: 'get',
  url: '/user/playlist',
  params: {
    uid,
    cookie: sessionStorage.getItem('cookie'),
    limit: 100,
  },
});
