import request from 'xhr-axios';

export const search = (data: string) => request({
  method: 'get',
  url: '/search',
  params: {
    keywords: data,
  },
});

export const getBanner = (type = 0) => request({
  method: 'get',
  url: '/banner',
  params: {
    type,
  },
});

export const getPrivateContent = () => request({
  method: 'get',
  url: '/personalized/privatecontent',
});

export const getNewestSong = () => request({
  method: 'get',
  url: '/personalized/newsong',
  params: {
    limit: 12,
  },
});

export const getRecommandMV = () => request({
  method: 'get',
  url: '/personalized/mv',
});

const cookie = sessionStorage.getItem('cookie');
export const getRecommandSongSheet = () => request({
  method: 'get',
  url: `/recommend/resource?cookie=${cookie}`,
});

export const login = (params: any) => request({
  method: 'post',
  url: '/login/cellphone',
  params,
});
