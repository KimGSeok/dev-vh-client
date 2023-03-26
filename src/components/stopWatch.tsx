import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from '@emotion/styled';

interface StopWatchProps{
  timer: string;
  setTimer: Dispatch<SetStateAction<string>>;
  duration?: number;
  setDuration?: Dispatch<SetStateAction<number>>;
}

let time = 0;

const StopWatch = ({ timer, setDuration }: StopWatchProps) =>{
  
  let hour, min, sec;
  const [timerId, setTimerId] = useState<any>();

  useEffect(() => {

    if(timer === 'start'){

      const id = setInterval(() => {
        time++;

        min = Math.floor(time/60);
        hour = Math.floor(min/60);
        sec = time%60;
        min = min%60;

        let th: any = hour;
        let tm: any = min;
        let ts: any = sec;

        if(th < 10)
          th = "0" + hour;
        if(tm < 10)
          tm = "0" + min;
        if(ts < 10)
          ts = "0" + sec;

        document.getElementById('stopwatch')!.innerHTML = th + ":" + tm + ":" + ts;
      }, 1000)

      setTimerId(id);
    }
    else if(timer === 'stop'){
      setDuration && setDuration(time);
      clearInterval(timerId);
    }
    else if(timer === 'reset' || timer === 'ready' || timer === 'init'){
      time = 0;
      setDuration && setDuration(time);
      clearInterval(timerId);
    }
  }, [timer])

  useEffect(() => {
    document.getElementById('stopwatch')!.innerHTML = '00:00:00';
  }, [])

  return (
    <StopWatchContainer id="stopwatch" />
  )
}

const StopWatchContainer = styled.div({
  fontSize: '1rem',
  margin: '0 0 12px 0'
})

export default StopWatch;