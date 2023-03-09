'use client';

import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useMutation } from 'react-query';
import { color, RadiusButton } from '@styles/styles';
import ScriptItem from './Item';
import ControlPanel from './ControlPanel';
import BottomSheet from '@components/BottomSheet';
import Speed from './bottomSheet/Speed';
import PauseSecond from './bottomSheet/PauseSecond';
import { post } from 'src/hooks/asyncHooks';
import PageLoading from '../../loading/PageLoading';
import { ProjectProps } from '@modules/interface';

interface SlideProps {
  name: string;
  project: ProjectProps;
  setProject: Dispatch<SetStateAction<ProjectProps>>
  isTransform: boolean;
  setIsTransform: Dispatch<SetStateAction<boolean>>
}

const Script = ({ name, project, setProject, isTransform, setIsTransform }: SlideProps) => {

  // Hooks
  const [bottomSheetTitle, setBottomSheetTitle] = useState<string>('');
  const [bottomSheetType, setBottomSheetType] = useState<string>(''); // 음성 빠르기, 대기시간
  const [isShowBottomSheet, setIsShowBottomSheet] = useState<boolean>(false);
  const [scriptList, setScriptList] = useState(project.scriptList);
  const [scriptUUID, setScriptUUID] = useState<string>('');
  const [speedChildren, setSpeedChildren] = useState(<></>); // React Node
  const [pauseSecondChildren, setPauseSecondChildren] = useState(<></>); // React Node
  const [avatarType, setAvatarType] = useState(''); // TTS, Lipsync
  const [transferResult, setTransferResult] = useState({});

  const onGenerateAvatarHandler = () => { return () => post('project/avatar', project, {})}

  const slideMutation = useMutation('slideList', onGenerateAvatarHandler(), {
    onSuccess: (response) => {

      const { data } = response;
      setIsTransform(false);

      if(data.result === 'success'){
        if (project.avatar.name === '') // TTS
          setAvatarType('audio');
        else // Lip-sync
          setAvatarType('video');

        alert('아바타가 생성되었어요.\n아래 활성화된 다운로드 버튼을 통해 확인해보세요!');
        setTransferResult(response.data);
      }
      else{
        alert('아바타 생성중에 에러가 발생했어요.\n관리자에게 문의해주세요.');
        console.log(response);
      }
    },
    onError: (data) => {
      alert('아바타 생성중에 에러가 발생했어요.\n관리자에게 문의해주세요.');
      console.error(data);
      setIsTransform(false);
    }
  });

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
    let prevState = { ...project };
    prevState.scriptList = scriptList;
    setProject(prevState);
  }, [scriptList])

  useEffect(() => {
    if(isTransform)
      slideMutation.mutate()
  }, [isTransform])

  return (
    <ScriptWrapper>
      {slideMutation.isLoading && <PageLoading />}
      <ScriptArea>
        <TitleWrapper>
          <Title>스크립트 영역</Title>
        </TitleWrapper>
        <ScriptItemWrapper>
          {
            scriptList && scriptList.map((item: any, index: number) => {
              return (
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
  width: 'calc(65% - 8px)',
  height: '100%',
  position: 'relative',
})
const ScriptArea = styled.div({
  width: '100%',
  height: '100%',
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