import request from 'xhr-axios';

export const getArtistList = (data?: any) => request({
  method: 'get',
  url: '/artist/list',
  params: {
    limit: 10,
  },
});
