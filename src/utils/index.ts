import vscode from 'vscode';
import { PLUGIN_NAME } from '../constants';

export const errorMsg = (msg: string) => {
  const selectText = 'Open settings.json';
  vscode.window
    .showErrorMessage(`[ ${PLUGIN_NAME} ]: ${msg}`, selectText)
    .then((select) => {
      if (select === selectText) {
        vscode.commands.executeCommand('workbench.action.openSettingsJson');
      }
    });
};

export const warnMsg = (msg: string) =>
  vscode.window.showWarningMessage(`[ ${PLUGIN_NAME} ]: ${msg}`);

export enum EMsgConfirm {
  yes = 'Yes',
  no = 'No',
}

export const infoMsgWithConfirm = (
  msg: string,
  callback?: (select: EMsgConfirm) => void
) => {
  vscode.window
    .showInformationMessage(
      `[ ${PLUGIN_NAME} ]: ${msg}`,
      EMsgConfirm.yes,
      EMsgConfirm.no
    )
    .then((select) => {
      if (select) {
        callback?.call(null, select as EMsgConfirm);
      }
    });
};

export const showScm = () =>
  vscode.commands.executeCommand('workbench.view.scm');

export const random = (arr: any[]) =>
  arr[Math.floor(Math.random() * arr.length)];
