import { resolve } from '../tools/resolve';

const sfw = {
  neko: function (): Promise<string> {
    return resolve('neko');
  },
  wallpapers: function (): Promise<string> {
    return resolve('wallpapers');
  },
  mobileWallpapers: function (): Promise<string> {
    return resolve('mobileWallpapers');
  },
  foxgirl: function (): Promise<string> {
    return resolve('sfwfoxes');
  },
  lewdNeko: function (): Promise<string> {
    return resolve('lewdneko');
  },
};

const nsfw = {
  ass: function (): Promise<string> {
    return resolve('ass');
  },
  bdsm: function (): Promise<string> {
    return resolve('bdsm');
  },
  cum: function (): Promise<string> {
    return resolve('cum');
  },
  doujin: function (): Promise<string> {
    return resolve('doujin');
  },
  femdom: function (): Promise<string> {
    return resolve('femdom');
  },
  hentai: function (): Promise<string> {
    return resolve('hentai');
  },
  maid: function (): Promise<string> {
    return resolve('maid');
  },
  maids: function (): Promise<string> {
    return resolve('maids');
  },
  orgy: function (): Promise<string> {
    return resolve('orgy');
  },
  panties: function (): Promise<string> {
    return resolve('panties');
  },
  wallpapers: function (): Promise<string> {
    return resolve('nsfwwallpapers');
  },
  mobileWallpapers: function (): Promise<string> {
    return resolve('nsfwmobilewallpapers');
  },
  cuckold: function (): Promise<string> {
    return resolve('netorare');
  },
  netorare: function (): Promise<string> {
    return resolve('netorare');
  },
  gifs: function (): Promise<string> {
    return resolve('gif');
  },
  gif: function (): Promise<string> {
    return resolve('gif');
  },
  blowjob: function (): Promise<string> {
    return resolve('blowjob');
  },
  feet: function (): Promise<string> {
    return resolve('feet');
  },
  pussy: function (): Promise<string> {
    return resolve('pussy');
  },
  uglyBastard: function (): Promise<string> {
    return resolve('uglybastard');
  },
  uniform: function (): Promise<string> {
    return resolve('uniform');
  },
  gangbang: function (): Promise<string> {
    return resolve('gangbang');
  },
  foxgirl: function (): Promise<string> {
    return resolve('foxgirl');
  },
  cumslut: function (): Promise<string> {
    return resolve('cumslut');
  },
  glasses: function (): Promise<string> {
    return resolve('glasses');
  },
  thighs: function (): Promise<string> {
    return resolve('thighs');
  },
  tentacles: function (): Promise<string> {
    return resolve('tentacles');
  },
  masturbation: function (): Promise<string> {
    return resolve('masturbation');
  },
  school: function (): Promise<string> {
    return resolve('school');
  },
  yuri: function (): Promise<string> {
    return resolve('yuri');
  },
  zettaiRyouiki: function (): Promise<string> {
    return resolve('zettai-ryouiki');
  },
  succubus: function (): Promise<string> {
    return resolve('succubus');
  },
  yaoi: function (): Promise<string> {
    return resolve('yaoi');
  },
};

export { nsfw, sfw };