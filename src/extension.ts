import vscode from 'vscode';
import { INSERT_COMMAND } from './constants';
import { safeInit } from './core';

export function activate(context: vscode.ExtensionContext) {
  
  const insert = vscode.commands.registerCommand(INSERT_COMMAND, (source) => {
    safeInit(source, context);
  });

  context.subscriptions.push(insert);
}

export function deactivate() {}
