import vscode from 'vscode';
import { GitExtension } from '../types/git';

export const getGitExtension = () => {
  const vscodeGit = vscode.extensions.getExtension<GitExtension>('vscode.git');
  return vscodeGit?.exports?.getAPI(1);
};
