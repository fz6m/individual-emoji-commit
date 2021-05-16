import { getGitExtension } from '../utils/git';
import { getConfig } from '../utils/config';
import { isArray } from '../utils/type';
import { DEFAULT_CONFIG, ConfigSpecifiedNormalizeEmoji } from '../constants/config';
import { errorMsg } from '../utils';
import { typeConfigValidator, randomListValidator } from './validator';
import { rewrite } from './rewrite';
import { SourceControl, ExtensionContext } from 'vscode';

export type InitProcess = (source: SourceControl, context: ExtensionContext) => void;

export const init: InitProcess = (source, context) => {
  // check git availability
  const git = getGitExtension();
  if (!git) {
    errorMsg('Load git extension failed');
    return;
  }

  // load config
  const config = getConfig();

  // check user ramdom emoji list
  const randomList = config.random.list;
  const userRamdomEmojis = randomList?.length ? randomList : DEFAULT_CONFIG.random.list;
  if (randomList?.length) {
    randomListValidator(userRamdomEmojis);
  }

  // 1. specifi`ed enable
  if (config.specified.enable) {
    const defaultConfig = DEFAULT_CONFIG.specified.typeConfig;
    // if exist user config
    if (isArray(config.specified.typeConfig) && config.specified.typeConfig?.length) {
      // get user config
      const { typeConfig } = config.specified;
      // check user config
      typeConfigValidator(typeConfig);
      // assign config
      typeConfig.forEach(item => {
        const [type, emojis] = item;
        const notNilEmojis = (isArray(emojis) && emojis.length) ? emojis : userRamdomEmojis;
        const normalizeItem = [type, notNilEmojis] as ConfigSpecifiedNormalizeEmoji;
        const equalTypeConfigIndex = defaultConfig.findIndex(([t, es]) => t === type);
        // if not exist, push
        if (!~equalTypeConfigIndex) {
          defaultConfig.push(normalizeItem);
          return;
        }
        // otherwise, override
        defaultConfig.splice(equalTypeConfigIndex, 1, normalizeItem);
      });
    }
    // rewrite
    rewrite({
      pos: config.pos,
      git,
      source,
      mode: 'specified',
      config: defaultConfig as ConfigSpecifiedNormalizeEmoji[],
      context
    });
    return;
  }

  // 2. if not enable specified, run random emoji
  if (config.random.enable) {
    const defaultConfig = userRamdomEmojis;
    rewrite({
      pos: config.pos,
      git,
      source,
      mode: 'random',
      config: defaultConfig,
      context
    });
  }
};

export const safeInit: InitProcess = (...args: any[]) => {
  try {
    init(...args as Parameters<InitProcess>);
  } catch {}
};