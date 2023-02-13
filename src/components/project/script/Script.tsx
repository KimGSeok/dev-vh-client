'use client';

import { Dispatch, SetStateAction, useState, useEffect, use } from 'react';
import styled from '@emotion/styled';
import { CSS_TYPE, color, RadiusButton } from '@/src/styles/styles';
import ScriptItem from './Item';
import ControlPanel from './ControlPanel';
import BottomSheet from '@/src/components/BottomSheet';
import Speed from './bottomSheet/Speed';
import PauseSecond from './bottomSheet/PauseSecond';
import { post } from 'src/hooks/asyncHooks';
import { checkEmptyObject } from '@/src/modules/validation';
import { useSetRecoilState } from 'recoil';
import { PageLoadingAtom } from 'src/recoil/atom';

interface SlideProps {
  name: string
  slideList: any;
  setSlideList: Dispatch<SetStateAction<object[]>>;
  currentSlide: any;
}

const Script = ({ name, slideList, setSlideList, currentSlide }: SlideProps) => {

  // Hooks
  const [bottomSheetTitle, setBottomSheetTitle] = useState<string>('');
  const [bottomSheetType, setBottomSheetType] = useState<string>(''); // 음성 빠르기, 대기시간
  const [isShowBottomSheet, setIsShowBottomSheet] = useState<boolean>(false);
  const [scriptList, setScriptList] = useState(currentSlide.scriptList);
  const [scriptUUID, setScriptUUID] = useState<string>('');
  const [transfer, setTransfer] = useState<boolean>(false); // 슬라이드 변환여부
  const [speedChildren, setSpeedChildren] = useState(<></>); // React Node
  const [pauseSecondChildren, setPauseSecondChildren] = useState(<></>); // React Node
  const [avatarType, setAvatarType] = useState(''); // TTS, Lipsync
  const [transferResult, setTransferResult] = useState({});

  // Recoil
  const setLoading = useSetRecoilState(PageLoadingAtom);
  
  /* 슬라이드 변환하기 */
  const onClickTransformHandler = () => {

    let prevList = [...slideList];
    prevList.forEach((el: any, index: number) => {
      if(el.uuid === currentSlide.uuid){
        prevList[index].scriptList = scriptList;
        setSlideList(prevList);
        setTransfer(true);
      }
    });
  }

  useEffect(() => {
    setSpeedChildren(
      <Speed
        scriptUUID={scriptUUID}
        scriptList={scriptList}
        setScriptList={setScriptList}
        setIsShowBottomSheet={setIsShowBottomSheet}
      />
    )
    setPauseSecondChildren(
      <PauseSecond
        scriptUUID={scriptUUID}
        scriptList={scriptList}
        setScriptList={setScriptList}
        setIsShowBottomSheet={setIsShowBottomSheet}
      />
    )
  }, [scriptUUID])

  useEffect(() => {
    if(transfer){

      const onCreateProject = async() =>{

        setLoading(true);

        const url = 'project/avatar';
        const option = {};
        const { status, data } = await post(url, slideList, option);

        if(status === 201 && data.result !== 'failed'){
          alert('아바타가 생성되었어요.\n아래 활성화된 다운로드 버튼을 통해 확인해보세요!');

          // TTS
          if(checkEmptyObject(currentSlide.avatar)){
            setAvatarType('audio');
          }
          // Lipsync
          else{
            setAvatarType('video');
          }
          setTransferResult(data);

          setLoading(false);
        }
        else{
          alert('아바타 생성중에 에러가 발생했어요.\n관리자에게 문의해주세요.');
        }
      }
      onCreateProject();
      return () => setTransfer(false);
    }
  }, [slideList, transfer])

  return (
    <ScriptWrapper>
      <HeaderWrapper>
        <ProjectName>프로젝트 명: {name}</ProjectName>
        <AllTransBtn
          padding={'8px 24px'}
          color={color.BasicColor}
          borderColor={color.BasicColor}
          fontWeight={'500'}
        >프로젝트 변환하기</AllTransBtn>
      </HeaderWrapper>
      <ScriptArea>
        <TitleWrapper>
          <Title>스크립트 영역</Title>
          <RadiusButton
            backgroundColor={color.BasicColor}
            borderColor={color.BasicColor}
            color={color.White}
            padding={'8px 24px'}
            onClick={() => onClickTransformHandler()}
          >
            슬라이드 변환하기
          </RadiusButton>
        </TitleWrapper>
        <ScriptItemWrapper>
          {
            scriptList && scriptList.map((item: any, index: number) => {
              return(
                <ScriptItem
                  key={item.uuid}
                  indexKey={index}
                  scriptInfo={item}
                  scriptList={scriptList}
                  setScriptUUID={setScriptUUID}
                  setScriptList={setScriptList}
                  setIsShowBottomSheet={setIsShowBottomSheet}
                  setBottomSheetTitle={setBottomSheetTitle}
                  setBottomSheetType={setBottomSheetType}
                />
              )
            })
          }
        </ScriptItemWrapper>
        <ControlPanel
          name={name}
          avatarType={avatarType}
          transferResult={transferResult}
        />
      </ScriptArea>

      {/* Web Bottom Sheet */}
      <BottomSheet
        isShowBottomSheet={isShowBottomSheet}
        setIsShowBottomSheet={setIsShowBottomSheet}
        title={bottomSheetTitle}
        children={bottomSheetType === 'speed' ? speedChildren : pauseSecondChildren}
      /> : ''
    </ScriptWrapper>
  )
}
const ScriptWrapper = styled.div({
  width: 'calc(50% - 16px)',
  height: '100%',
  position: 'relative',
})
const HeaderWrapper = styled.div({
  width: '100%',
  height: 'calc(7% - 12px)',
  margin: '0 0 12px 0',
  padding: '8px 24px',
  position: 'relative',
  backgroundColor: color.White,
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  zIndex: '1'
})
const ProjectName = styled.div({
  color: color.BasicColor,
  fontSize: '1.1rem',
  fontWeight: '700'
})
const AllTransBtn = styled(RadiusButton)({

})
const ScriptArea = styled.div({
  width: '100%',
  height: '93%',
  position: 'relative',
  backgroundColor: color.White,
  borderRadius: '16px',
  padding: '24px 0 0 0',
})
const TitleWrapper = styled.div({
  height: '5%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '0 24px'
})
const Title = styled.div({
  fontSize: '1.25rem',
  fontWeight: '800',

  '@media screen and (max-width: 1440px)': {
    fontSize: '1.2rem',
  },

  '@media screen and (max-width: 1023px)': {
    fontSize: '1.15rem',
  },

  '@media screen and (max-width: 960px)': {
    fontSize: '1.05rem',
  }
})
const ScriptItemWrapper = styled.div({
  position: 'relative',
  height: '87%',
  padding: '16px 24px 0 24px',
  overflowY: 'scroll',

  '::-webkit-scrollbar': {
    scrollBehavior: 'smooth',
    display: 'none'
  }
})

export default Script;