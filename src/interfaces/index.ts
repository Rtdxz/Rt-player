export interface Tab {
  title: string;
  path: string;
}

export interface Data {
  name: string;
  code: number;
  result: any[];
}

export interface PrivateContent {
  name: string;
  code: number;
  result: PrivateContentItem[];
}

export interface RecommandSongSheet {
  code: number;
  featureFirst: boolean;
  haveRcmdSongs: boolean;
  recommend: Recommand[];
}

interface Recommand {
  alg: string;
  copywriter: string;
  createTime: number;
  creator: any | null;
  id: number;
  name: string;
  picUrl: string;
  playcount: number;
  trackCount: number;
  type: number;
  userId: number;
}

interface PrivateContentItem {
  alg: string;
  copywriter: string;
  id: number;
  name: string;
  picUrl: string;
  sPicUrl: string;
  type: number;
  url: string | null;
}
