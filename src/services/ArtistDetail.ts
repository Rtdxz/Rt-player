import request from 'xhr-axios';

export const getArtistDetail = (id: string) => request({
  method: 'get',
  url: '/artist/detail',
  params: {
    id,
  },
});

export const getArtistAlbum = (id: string) => request({
  method: 'get',
  url: '/artist/album',
  params: {
    id,
    limit: 100,
  },
});

export const getArtistMV = (id: string) => request({
  method: 'get',
  url: '/artist/mv',
  params: {
    id,
    limit: 100,
  },
});

export const getArtistDescription = (id: string) => request({
  method: 'get',
  url: '/artist/desc',
  params: {
    id,
  },
});

export const getSimilarArtist = (id: string) => request({
  method: 'get',
  url: '/simi/artist',
  params: {
    id,
  },
});
