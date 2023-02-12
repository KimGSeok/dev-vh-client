import styled from '@emotion/styled';
import { CSS_TYPE, color, RadiusButton, ImageWrap, ImageElement } from '@/src/styles/styles';
import { v4 as uuidV4 } from 'uuid';
import { Dispatch, ChangeEvent, SetStateAction, useState, useEffect, useRef } from 'react';

interface ScriptProps {
  indexKey: number;
  scriptInfo: any;
  scriptList: any;
  setScriptUUID: Dispatch<SetStateAction<string>>;
  setScriptList: Dispatch<SetStateAction<any>>;
  setIsShowBottomSheet: Dispatch<SetStateAction<boolean>>;
  setBottomSheetTitle: Dispatch<SetStateAction<string>>;
  setBottomSheetType: Dispatch<SetStateAction<string>>;
}

const ScriptItem = ({ indexKey, scriptInfo, scriptList, setScriptUUID, setScriptList, setIsShowBottomSheet, setBottomSheetTitle, setBottomSheetType }: ScriptProps) => {
  
  // Hooks
  const scriptRef = useRef<any>(null);
  const [mount, setMount] = useState<boolean>(false);
  const [value, setValue] = useState(scriptInfo.text);

  const onClickScriptSpeedHandler = () => {

    setIsShowBottomSheet(true);
    setBottomSheetTitle('음성 빠르기 선택');
    setBottomSheetType('speed');
    setScriptUUID(scriptInfo.uuid);
  }

  const onClickPauseSecondHandler = () => {

    // TODO
    // setIsShowBottomSheet(true);
    // setBottomSheetTitle('음성 대기시간 선택');
    // setBottomSheetType('pauseSecond')
    // setScriptUUID(scriptInfo.uuid);
  }

  const onClickAppendScriptHandler = () =>{
    setScriptList((prev: any) => [...prev, { uuid: uuidV4(), text: '', speed: 1.0, pauseSecond: 0.5 }]);
  }

  const onClickRemoveScriptHandler = (args: any) =>{
    if(scriptList.length > 1)
      setScriptList(scriptList.filter((el: any) => (el.uuid !== args.uuid)));
  }

  const onInputScriptHandler = (e: ChangeEvent<HTMLInputElement>) =>{

    let prevList = [...scriptList];
    const script = e.target.value;

    scriptList.forEach((el: any, index: number) => {
      if(el.uuid === scriptInfo.uuid){
        prevList[index].text = script;
        setScriptList(prevList);
      }
    });

    setValue(e.target.value);
  }

  useEffect(() => {

    setMount(true);
    return () => setMount(false);
  }, [])

  return (
    mount ? <ItemWrapper>
      <ImageWrap
        position={'relative'}
        height={'100%'}
        padding={'2px 0'}
        cursor={'pointer'}
      >
        <ImageElement
          src="/icons/play.svg"
          width={28}
          height={28}
          style={{
            width: '100%',
            height: '100%'
          }}
          alt="play button"
        />
      </ImageWrap>
      <Script
        ref={scriptRef}
        type={'text'}
        placeholder={'슬라이드 텍스트를 입력해주세요.'}
        onChange={(e) => onInputScriptHandler(e)}
        defaultValue={value}
      />
      <RadiusBtn
        backgroundColor={color.BasicColor}
        borderColor={color.BasicColor}
        color={color.White}
        padding={'8px 16px'}
        margin={'0 12px 0 0'}
        fontSize={'0.85rem'}
        onClick={onClickScriptSpeedHandler}
      >{scriptInfo.speed === '' ? '1.0 배속' : `${scriptInfo.speed} 배속`}</RadiusBtn>
      <RadiusBtn
        backgroundColor={color.DarkGrey}
        borderColor={color.DarkGrey}
        color={color.White}
        padding={'8px 24px'}
        margin={'0 12px 0 0'}
        fontSize={'0.85rem'}
        onClick={onClickPauseSecondHandler}
      >0.5 초</RadiusBtn>
      <ImageWrap
        position={'relative'}
        height={'100%'}
        padding={'2px 0'}
        margin={'0 6px'}
        cursor={'pointer'}
        onClick={onClickAppendScriptHandler}
      >
        <ImageElement
          src="/icons/add_circle_black.svg"
          width={28}
          height={28}
          style={{
            width: '100%',
            height: '100%'
          }}
          alt="add button"
        />
      </ImageWrap>
      {
        indexKey !== 0 && scriptList.length > 1 ?
        <ImageWrap
          position={'relative'}
          height={'100%'}
          padding={'2px 0'}
          margin={'0 6px'}
          cursor={'pointer'}
          onClick={() => onClickRemoveScriptHandler(scriptInfo)}
        >
          <ImageElement
            src="/icons/remove_black.svg"
            width={28}
            height={28}
            style={{
              width: '100%',
              height: '100%'
            }}
            alt="remove button"
          />
      </ImageWrap> : ''
      }
    </ItemWrapper> : <></>
  )
}
const ItemWrapper = styled.div({
  display: 'flex',
  position: 'relative',
  margin: '0 0 8px 0',
  alignItems: 'start'
})
const Script = styled.input(
  {
    width: '60%',
    border: `1px solid ${color.ThumbnailColor}`,
    borderRadius: '8px',
    padding: '8px 10px',
    fontSize: '0.9rem',
    margin: '0 12px',

    '@media screen and (max-width: 1440px)': {
      width: '50%',
      padding: '7px 10px',
      margin: '0 10px',
    },

    '@media screen and (max-width: 1023px)': {
      width: '45%',
      padding: '6px 10px',
      margin: '0 8px',
    },

    '@media screen and (max-width: 960px)': {
      width: '40%',
      padding: '6px 10px',
      margin: '0 6px',
    }
  }
)
const RadiusBtn = styled(RadiusButton)<CSS_TYPE>(
  {
    minWidth: '84px',
    textAlign: 'center',

    '@media screen and (max-width: 1440px)': {
      minWidth: '76px',
      fontSize: '0.7rem',
      padding: '8px 12px'
    },

    '@media screen and (max-width: 1023px)': {
      minWidth: '68px',
      fontSize: '0.65rem',
      padding: '8px 10px'
    },

    '@media screen and (max-width: 960px)': {
      minWidth: '60px',
      fontSize: '0.6rem',
    }
  }
)

export default ScriptItem;