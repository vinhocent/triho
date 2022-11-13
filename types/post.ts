export interface IPost {
  slug: string;
  date: string;
  title: string;
  description: string;
}

export type NowPlayingSong = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};
export type PlayState = {
  isPlaying: boolean;
};
