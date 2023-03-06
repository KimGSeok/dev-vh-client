'use client';

import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { CSS_TYPE, color } from '@styles/styles';

interface SpeedProps {
  scriptUUID: string
  scriptList: any;
  setScriptList: Dispatch<SetStateAction<any>>;
  setIsShowBottomSheet: Dispatch<SetStateAction<boolean>>
}

const PauseSecond = ({ scriptUUID, scriptList, setScriptList, setIsShowBottomSheet }: SpeedProps) => {

  const onClickScriptSpeedHandler = (speed: number) => {

    let prevList = [...scriptList];
    scriptList.forEach((el: any, index: number) => {
      if (el.uuid === scriptUUID) {
        prevList[index].speed = speed;
        setScriptList(prevList);
      }
    });
    setIsShowBottomSheet(false);
  }

  return (
    <PauseSecondWrapper>
      <RecordScriptLists>
        <RecordScriptList
          borderTop={`1px solid ${color.ModernGrey}`}
          value={0.8}
          onClick={() => onClickScriptSpeedHandler(0.8)}
        >느리게</RecordScriptList>
        <RecordScriptList
          value={1.0}
          onClick={() => onClickScriptSpeedHandler(1)}
        >보통</RecordScriptList>
        <RecordScriptList
          value={1.2}
          onClick={() => onClickScriptSpeedHandler(1.2)}
        >빠르게</RecordScriptList>
      </RecordScriptLists>
    </PauseSecondWrapper>
  )
}

const PauseSecondWrapper = styled.div({
  position: 'relative',
  height: '100%'
})
const RecordScriptLists = styled.ul({
  height: '100%',
  position: 'relative'
})
const RecordScriptList = styled.li<CSS_TYPE>(
  {
    height: 'calc(100% / 3)',
    borderBottom: `1px solid ${color.ModernGrey}`,
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '1rem',
    fontWeight: '400',

    ':nth-of-type(2n)': {
      backgroundColor: color.DarkWhite
    },

    ':hover': {
      backgroundColor: color.AliceBlue,
      cursor: 'pointer'
    },
  },
  props => ({
    borderTop: props.borderTop
  })
)

export default PauseSecond;