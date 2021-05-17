import {
  EConfigPosition,
  ConfigRandomEmoji,
  ConfigSpecifiedNormalizeEmoji,
} from '../constants/config';
import { showScm, random, warnMsg, infoMsgWithConfirm, EMsgConfirm } from '../utils';
import { SourceControl, ExtensionContext } from 'vscode';
import type { API as GitApi, Repository } from '../types/git';
import { STORE_PRE_VALUE } from '../constants/store';

export type RewriteRandomMode = {
  mode: 'random'
  config: ConfigRandomEmoji
};

export type RewriteSpecifiedMode = {
  mode: 'specified'
  config: ConfigSpecifiedNormalizeEmoji[]
};

export type RewriteMode = RewriteRandomMode | RewriteSpecifiedMode;

export type RewriteParams = {
  pos: EConfigPosition
  source: SourceControl // current select repo info
  git: GitApi // all repo info
  context: ExtensionContext
} & RewriteMode;

export const rewrite = ({ mode, pos, source, config, git, context }: RewriteParams) => {
  // show git workspace
  showScm();

  // patch process
  const patchInputText = (repository: Repository) => {
    const currentText = repository.inputBox.value;

    // replace commit message input text func
    const setValue = (newValue: string) => {

      const confirm = () => {
        // set value
        repository.inputBox.value = newValue;
        // refocus
        setTimeout(() => {
          ;(source.inputBox as any)?.focus();
        }, 0);
        // update global state
        context.globalState.update(STORE_PRE_VALUE, newValue);
      };

      const prevValue = context.globalState.get(STORE_PRE_VALUE);

      if (currentText === prevValue) {
        infoMsgWithConfirm('are you sure add emoji again ?', (select) => {
          if (select === EMsgConfirm.yes) {
            confirm();
          }
        });
        return;
      }

      confirm();
    };

    // segmentation
    let commitTypeAndScope = '';
    let tailMsg = '';
    const firstColonIdx = currentText.indexOf(':');
    // : not exist
    if (!~firstColonIdx) {
      tailMsg = currentText;
    } else {
      commitTypeAndScope = currentText.slice(0, firstColonIdx);
      tailMsg = currentText.slice(firstColonIdx);
    }

    let emoji = null;

    if (mode === 'random') {
      // random emoji
      emoji = random(config as ConfigRandomEmoji) as string;
    }

    if (mode === 'specified') {
      ;(config as ConfigSpecifiedNormalizeEmoji[]).some((emojiConfig) => {
        const [type, emojis] = emojiConfig;
        // if commit type and scope msg match this type
        if (commitTypeAndScope.includes(type)) {
          // random
          emoji = random(emojis) as string;
          return true;
        }
        return false;
      });
    }

    // if all config type not match current input text
    if (!emoji) {
      warnMsg('current input commit message not match any config type');
      return;
    }

    // insert end
    if (pos === EConfigPosition.end) {
      setValue(`${currentText.trimEnd()} ${emoji}`);
    }
    // insert start, if : exist insert to : before
    if (pos === EConfigPosition.start) {
      if (!~firstColonIdx) {
        setValue(`${emoji} ${currentText.trimStart()}`);
        return;
      }
      setValue(`${commitTypeAndScope.trimEnd()} ${emoji}${tailMsg}`);
    }
  };

  // has focus single repo
  if (source) {
    const currentRepo = git.repositories.find((repository) => {
      return repository.rootUri.path === source.rootUri?.path;
    });
    currentRepo && patchInputText(currentRepo);
    return;
  }
  // all repo
  git.repositories.forEach((repo) => {
    patchInputText(repo);
  });
};
