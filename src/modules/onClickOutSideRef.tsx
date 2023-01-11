import { Dispatch, SetStateAction, useEffect } from 'react';

export const onClickOutSideRef = (ref: any, exceptRef: any, setState: Dispatch<SetStateAction<any>>) => {

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