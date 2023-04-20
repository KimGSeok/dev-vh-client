import { Dispatch, ChangeEvent, FormEvent, SetStateAction, useState, useEffect, useRef, KeyboardEvent } from 'react';
import styled from '@emotion/styled';
import { CSS_TYPE, color, RadiusButton, ImageWrap, ImageElement } from '@styles/styles';
import { v4 as uuidV4 } from 'uuid';

interface ScriptProps {
  id: string;
  key: string;
  indexKey: number;
  scriptInfo: any;
  scriptList: any;
  setScriptUUID: Dispatch<SetStateAction<string>>;
  setScriptList: Dispatch<SetStateAction<any>>;
  setIsShowBottomSheet: Dispatch<SetStateAction<boolean>>;
  setBottomSheetTitle: Dispatch<SetStateAction<string>>;
  setBottomSheetType: Dispatch<SetStateAction<string>>;
}

const ScriptItem = ({ id, indexKey, scriptInfo, scriptList, setScriptUUID, setScriptList, setIsShowBottomSheet, setBottomSheetTitle, setBottomSheetType }: ScriptProps) => {

  // Hooks
  const scriptRef = useRef<any>(null);

  const onClickScriptSpeedHandler = () => {

    setIsShowBottomSheet(true);
    setBottomSheetTitle('음성 빠르기 선택');
    setBottomSheetType('speed');
    setScriptUUID(scriptInfo.uuid);
  }

  const onClickPauseSecondHandler = () => {

    // TODO
    setIsShowBottomSheet(true);
    setBottomSheetTitle('음성 대기시간 선택');
    setBottomSheetType('pauseSecond')
    setScriptUUID(scriptInfo.uuid);
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {

    if (e.key === 'Enter' && e.shiftKey) {
      return false;
    } else if (e.key === 'Enter') {

      e.preventDefault();
      onClickAppendScriptHandler()
    }
  }

  const onClickAppendScriptHandler = () => {

    const uuid = uuidV4();
    setScriptList((prev: any) => [...prev, { uuid: uuid, text: '', speed: 1.0, pauseSecond: 0.5 }]);
    setScriptUUID(uuid);
    window.setTimeout(function () {
      document.getElementById(uuid)?.focus();
    }, 10);
  }

  const onClickRemoveScriptHandler = (args: any) => {
    if (scriptList.length > 1)
      setScriptList(scriptList.filter((el: any) => (el.uuid !== args.uuid)));
  }
  const onInputScriptHandler = (e: FormEvent<HTMLDivElement>) => {

    let prevList = [...scriptList];
    const script = scriptRef.current.innerText;

    prevList.forEach((el: any, index: number) => {
      if(el.uuid && el.uuid === scriptInfo.uuid){
        prevList[index].text = script;
      }
      else if(el.id && el.id === scriptInfo.id){
        prevList[index].text = script;
      }
    });
    setScriptList(prevList);
  }

  useEffect(() => {
    if(scriptRef.current && scriptInfo.text){
      scriptRef.current.innerText = scriptInfo.text;
    }
  }, [])

  return (
    <ItemWrapper>
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
        id={id}
        ref={scriptRef}
        placeholder={'스크립트 텍스트를 입력해주세요.'}
        onInput={(e) => onInputScriptHandler(e)}
        onKeyDownCapture={(e) => onKeyDown(e)}
        contentEditable={true}
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
      >{scriptInfo.pauseSecond} 초</RadiusBtn>
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
          </ImageWrap>
          :
          <ImageWrap
            position={'relative'}
            height={'100%'}
            padding={'2px 0'}
            margin={'0 6px'}
            cursor={'pointer'}
          >
            <ImageElement
              src="/icons/remove_white.svg"
              width={28}
              height={28}
              style={{
                width: '100%',
                height: '100%'
              }}
              alt="empty"
            />
          </ImageWrap>
      }
    </ItemWrapper>
  )
}
const ItemWrapper = styled.div({
  display: 'flex',
  position: 'relative',
  margin: '0 0 8px 0',
  alignItems: 'center'
})
const Script = styled.div(
  {
    width: '80%',
    height: 'auto',
    border: `1px solid ${color.ThumbnailColor}`,
    borderRadius: '8px',
    padding: '8px 10px',
    fontSize: '0.9rem',
    margin: '0 12px',

    '@media screen and (max-width: 1440px)': {
      width: '70%',
      padding: '7px 10px',
      margin: '0 10px',
    },

    '@media screen and (max-width: 1023px)': {
      width: '60%',
      padding: '6px 10px',
      margin: '0 8px',
    },

    '@media screen and (max-width: 960px)': {
      width: '50%',
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