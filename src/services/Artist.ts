import request from 'xhr-axios';

export const getArtistList = (params: any) => request({
  method: 'get',
  url: '/artist/list',
  params,
});
