import request from 'xhr-axios';

export const getMVDetail = (mvid: string) => request({
  method: 'get',
  url: '/mv/detail',
  params: {
    mvid,
  },
});

export const getMVUrl = (id: string) => request({
  method: 'get',
  url: '/mv/url',
  params: {
    id,
  },
});

export const getArtistDetail = (id: string) => request({
  method: 'get',
  url: '/artist/detail',
  params: {
    id,
  },
});

export const getMVComment = (params: any) => request({
  method: 'get',
  url: '/comment/mv',
  params,
});

export const getRelatedMV = (id: string) => request({
  method: 'get',
  url: '/related/allvideo',
  params: {
    id,
  },
});

export const getVideoDetail = (id: string) => request({
  method: 'get',
  url: '/video/detail',
  params: {
    id,
  },
});

export const getVideoUrl = (id: string) => request({
  method: 'get',
  url: '/video/url',
  params: {
    id,
  },
});

export const getVideoComment = (params: any) => request({
  method: 'get',
  url: '/comment/video',
  params,
});
