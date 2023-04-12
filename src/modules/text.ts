/* 첫 글자 대문자 변환 */
export const changeFirstTextToUpperHandler = (text: string | undefined) => {
  if (text) {
    const firstChar = text.charAt(0);
    const othersChar = text.slice(1);
    return firstChar.toUpperCase() + othersChar;
  } else {
    return '';
  }
}