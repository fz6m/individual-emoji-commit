export interface IConfigBase {
  enable: boolean
}

export type ConfigRandomEmoji = string[];

export interface IConfigRandom extends IConfigBase {
  list: ConfigRandomEmoji
}

export type Nil = undefined | null;

export type ConfigSpecifiedEmoji = [string, string | string[] | Nil];
export type ConfigSpecifiedNormalizeEmoji = [string, string[]];

export interface IConfigSpecified extends IConfigBase {
  typeConfig: ConfigSpecifiedEmoji[]
}

export enum EConfigPosition {
  start = 'start',
  end = 'end',
}

export interface IConfig {
  random: IConfigRandom
  specified: IConfigSpecified
  pos: EConfigPosition
}

export const DEFAULT_CONFIG: IConfig = {
  random: {
    enable: false,
    list: ['🍓', '🍉', '🍇', '🍒', '🍡', '🍥', '🍩', '🍰', '🍭', '🌸', '🌈'],
  },
  specified: {
    enable: true,
    // https://gitmoji.dev/
    typeConfig: [
      ['feat', ['✨']],
      ['chore', ['🔥']],
      ['fix', ['🐛']],
      ['style', ['🎨']],
      ['pref', ['⚡️']],
      ['docs', ['📝']],
      ['build', ['🚀']],
      ['test', ['✅']],
      ['release', ['🔖']],
      ['wip', ['🚧']],
      ['revert', ['⏪️']],
      ['refactor', ['♻️']],
      ['merge', ['🔀']]
    ],
  },
  pos: EConfigPosition.start,
};

export const CONFIG_PREFIX = 'individualEmoji';

export const CONFIG_PATH = {
  random: {
    enable: `${CONFIG_PREFIX}.random.enable`,
    list: `${CONFIG_PREFIX}.random.list`,
  },
  specified: {
    enable: `${CONFIG_PREFIX}.specified.enable`,
    typeConfig: `${CONFIG_PREFIX}.specified.typeConfig`,
  },
  pos: `${CONFIG_PREFIX}.pos`,
};
