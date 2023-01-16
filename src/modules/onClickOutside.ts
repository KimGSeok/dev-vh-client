import { Dispatch, SetStateAction, useEffect } from 'react';

/**
 * 2023.01.11
 * 외부영역 선택 시, 해당 Ref 이외 닫기 이벤트
*/
export const onClickOutsideHandler = (ref: any, exceptRef: any, setState: Dispatch<SetStateAction<any>>) => {

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent): void => {

      // Ref가 onClick Target을 포함하지 않으면, 예외 Ref는 제외
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        exceptRef.current && !exceptRef.current.contains(e.target as Node)
      ) {
        setState(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutSide);

    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    }
  }, [ref])

  return ref;
}