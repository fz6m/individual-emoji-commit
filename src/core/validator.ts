import { ConfigSpecifiedEmoji } from '../constants/config';
import { isString, isArray } from '../utils/type';
import { errorMsg } from '../utils';

export const typeConfigValidator = (typeConfig: ConfigSpecifiedEmoji[]) => {
  typeConfig.forEach((item, index) => {
    const [type, emojis] = item;
    // check type
    if (!isString(type)) {
      errorMsg(
        `Load config failed. specified.typeConfig.[${index}].[0] must be string`
      );
      throw new Error();
    }
    // check type length
    if (!type?.length) {
      errorMsg(
        `specified.typeConfig.[${index}].[0] must be not empty string`
      );
      throw new Error();
    }
    // check emojis
    if (isString(emojis)) {
      item[1] = [emojis];
      return;
    }
    if (isArray(emojis)) {
      emojis.forEach((emoji, emojiIndex) => {
        if (!isString(emoji)) {
          errorMsg(
            `Load config failed. specified.typeConfig.[${index}].[1].[${emojiIndex}] must be string ( error in type: ${type} )`
          );
          throw new Error();
        }
      });
    }
  });
};

export const randomListValidator = (list: any) => {
  if (!isArray(list)) {
    errorMsg('random.list must be string[]');
    throw new Error();
  }
  list.forEach((item, index) => {
    if (!isString(item)) {
      errorMsg(`random.list.[${index}] must be string`);
      throw new Error();
    }
    if (!item?.length) {
      errorMsg(`random.list.[${index}] must be not empty string`);
      throw new Error();
    }
  });
};
