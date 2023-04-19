'use client';

import styled from '@emotion/styled';
import { color, RadiusButton } from '@styles/styles';
import { KeyValueProps } from "@modules/interface";
import { MouseEvent, useEffect, useRef, useState } from 'react';
import PositionModal from '@components/PositionModal';
import Portal from '@components/Portal';

interface contentProps {
  contents: KeyValueProps;
  contentsType: string;
}

const DownloadModalContent = ({ contents, contentsType }: contentProps) => {

  const audioRef = useRef<any>(null);
  const videoRef = useRef<any>(null);
  const [audio, setAudio] = useState<number>(0);
  const [modalPosition, setModalPosition] = useState({
    active: false,
    xPosition: 0,
    yPosition: 0,
  });

  const handleClickButton = (e: MouseEvent<HTMLDivElement>, type: string) => {

    console.log(contents);

    const downloadUrl = contents.audio_download_url;

    // 다운로드
    if (contentsType === 'download') {

      // 음성
      if (type === 'audio') {


      }
      // 영상
      else {

      }
    }
    // 재생하기
    else {
      // 음성
      if (type === 'audio') {
        audioRef.current && audioRef.current.play();

        const duration = parseFloat(audioRef.current.duration);

        setAudio(duration);

        setTimeout(() => {
          setAudio(0);
        }, duration * 990)
      }
      // 영상
      else {
        setModalPosition({
          active: true,
          xPosition: e.clientX,
          yPosition: e.clientY,
        })

        const video: any = document.getElementById('video');
        video.src = contents.video_download_url;
      }
    }
  }

  useEffect(() => {
    console.log(audio);
  }, [audio])

  return (
    <MainContainer>
      <ButtonContainer>
        <audio ref={audioRef}><source src={contents.audio_download_url} type={'audio/wav'} /></audio>
        <Button
          // css={resizeWidth(audio)}
          width={'100%'}
          textAlign={'center'}
          border={'0'}
          margin={'12px 0 16px 0'}
          backgroundColor={color.BasicBlue}
          opacity={contents.audio_download_url ? 1 : 0.2}
          color={color.White}
          animationDuration={audio}
          onClick={(e) => handleClickButton(e, 'audio')}
        ><div>{contentsType === 'download' ? '음성 컨텐츠 다운로드' : '음성 컨텐츠 재생하기'}</div></Button>
        <Button
          width={'100%'}
          textAlign={'center'}
          border={'0'}
          backgroundColor={color.BasicColor}
          opacity={contents.video_download_url ? 1 : 0.2}
          color={color.White}
          animationDuration={0}
          cursor={contents.video_download_url ? 'pointer' : 'default'}
          onClick={(e) => handleClickButton(e, 'video')}
        ><div>{contentsType === 'download' ? '영상 컨텐츠 다운로드' : '영상 컨텐츠 재생하기'}</div>
        </Button>
      </ButtonContainer>
      <Portal
        id={'#subPortal'}
      >
        <PositionModal
          title={'비디오 재생'}
          active={modalPosition.active}
          xPosition={modalPosition.xPosition}
          yPosition={modalPosition.yPosition}
          setModal={setModalPosition}
          children={
            <Video id={'video'} controls />
          }
        />
      </Portal>
    </MainContainer>
  )
}

const MainContainer = styled.div({})
const ButtonContainer = styled.div({})
const Button = styled(RadiusButton)(
  {
    position: 'relative',

    'div': {
      position: 'relative',
      zIndex: '3'
    },

    ':after': {
      content: "''",
      width: '0',
      height: '100%',
      position: 'absolute',
      borderRadius: '24px',
      top: '0',
      left: '0',
      opacity: '1'
    },
  },
  props => ({
    ':after': {
      width: props.animationDuration === 0 ? '0' : '100%',
      backgroundColor: props.animationDuration === 0 ? props.backgroundColor : color.BasicOrange,
      transition: `width ${props.animationDuration}s ease`,
    },
  })
)
const Video = styled.video({
  position: 'relative',
  width: '100%',
  height: '100%',
  borderRadius: '12px'
})

export default DownloadModalContent;