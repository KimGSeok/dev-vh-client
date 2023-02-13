import { useEffect, useRef } from 'react';

export const useInterval = (callback: () => void, delay: number | undefined) => {

  console.log(delay);

  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    console.log(44);

    const tick = () => {
      savedCallback.current();
    }

    if (delay !== null) {
      console.log(11);
      let id = setInterval(tick, delay);
      console.log(id);
      return () => clearInterval(id);
    }
    else{
      console.log(22);
      return () => clearInterval(undefined);
    }
  }, []);
}