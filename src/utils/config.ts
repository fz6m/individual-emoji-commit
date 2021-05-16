import vscode from 'vscode';
import { IConfig, CONFIG_PATH } from '../constants/config';

export const getConfig = () => {
  const config = vscode.workspace.getConfiguration();
  const { get } = config;

  const userConfig = {
    random: {
      enable: get(CONFIG_PATH.random.enable),
      list: get(CONFIG_PATH.random.list),
    },
    specified: {
      enable: get(CONFIG_PATH.specified.enable),
      typeConfig: get(CONFIG_PATH.specified.typeConfig),
    },
    pos: get(CONFIG_PATH.pos),
  } as IConfig;

  return userConfig;
};
