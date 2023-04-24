'use client';

import styled from '@emotion/styled';
import { color, RadiusButton } from '@styles/styles';
import { KeyValueProps } from "@modules/interface";
import { MouseEvent, useRef, useState } from 'react';
import PositionModal from '@components/PositionModal';
import Portal from '@components/Portal';
import { onClickBlobDownload } from '@modules/onClickBlobDownload';
import { getToday, getTodayTime } from '@modules/date';
import { get } from '@hooks/asyncHooks';

interface contentProps {
  contents: KeyValueProps;
  contentsType: string;
}

const DownloadModalContent = ({ contents, contentsType }: contentProps) => {

  const audioRef = useRef<any>(null);
  const audioDownloadUrl = contents.audio_download_url;
  const videoDownloadUrl = contents.video_download_url;
  const [audio, setAudio] = useState<number>(0);
  const [modalPosition, setModalPosition] = useState({
    active: false,
    xPosition: 0,
    yPosition: 0,
  });

  const getDownload = async(url: string, extension: string) =>{
    const response = await get(`file/buffer?url=${url}`, 'no-cache', '');

    // Parameter
    const fileName = `${getToday()} ${getTodayTime()} ${contents.name}`;
    onClickBlobDownload(response.arrayBuffer, fileName, extension, response.type);
  }

  const handleClickDownload = (e: MouseEvent<HTMLDivElement>, type: string) =>{
    e.stopPropagation();

    if (type === 'audio' && audioDownloadUrl !== '') {
      getDownload(audioDownloadUrl, 'wav');
    }
    else if(type === 'video' && videoDownloadUrl !== ''){
      getDownload(videoDownloadUrl, 'mp4');
    }
  }

  const handleClickPlay = (e: MouseEvent<HTMLDivElement>, type: string) =>{

    e.stopPropagation();

    if (type === 'audio' && audioDownloadUrl !== '') {
      audioRef.current && audioRef.current.play();

      const duration = parseFloat(audioRef.current.duration);

      setAudio(duration);

      setTimeout(() => {
        setAudio(0);
      }, duration * 990)
    }
    else if(type === 'video' && videoDownloadUrl !== ''){
      setModalPosition({
        active: true,
        xPosition: e.clientX,
        yPosition: e.clientY,
      })

      const video: any = document.getElementById('video');
      video.src = contents.video_download_url;
    }
  }

  return (
    <MainContainer>
      <ButtonContainer>
        <audio ref={audioRef}><source src={audioDownloadUrl} type={'audio/wav'} /></audio>
        {/* 다운로드 */
          contentsType === 'download' &&
          <>
            <Button
              width={'100%'}
              textAlign={'center'}
              border={'0'}
              margin={'12px 0 16px 0'}
              backgroundColor={color.BasicBlue}
              opacity={audioDownloadUrl ? 1 : 0.2}
              color={color.White}
              animationDuration={0}
              cursor={audioDownloadUrl ? 'pointer' : 'default'}
              onClick={(e) => handleClickDownload(e, 'audio')}
            ><div>음성 컨텐츠 다운로드</div>
            </Button>
            <Button
              width={'100%'}
              textAlign={'center'}
              border={'0'}
              backgroundColor={color.BasicColor}
              opacity={videoDownloadUrl ? 1 : 0.2}
              color={color.White}
              animationDuration={0}
              cursor={videoDownloadUrl ? 'pointer' : 'default'}
              onClick={(e) => handleClickDownload(e, 'video')}
            ><div>영상 컨텐츠 다운로드</div>
            </Button>
          </>
        }
        {/* 재생하기 */
          contentsType === 'play' &&
          <>
            <Button
              width={'100%'}
              textAlign={'center'}
              border={'0'}
              margin={'12px 0 16px 0'}
              backgroundColor={color.BasicBlue}
              opacity={audioDownloadUrl ? 1 : 0.2}
              color={color.White}
              animationDuration={audio}
              cursor={audioDownloadUrl ? 'pointer' : 'default'}
              onClick={(e) => handleClickPlay(e, 'audio')}
            ><div>음성 컨텐츠 재생하기</div>
            </Button>
            <Button
              width={'100%'}
              textAlign={'center'}
              border={'0'}
              backgroundColor={color.BasicColor}
              opacity={videoDownloadUrl ? 1 : 0.2}
              color={color.White}
              animationDuration={0}
              cursor={videoDownloadUrl ? 'pointer' : 'default'}
              onClick={(e) => handleClickPlay(e, 'video')}
            ><div>영상 컨텐츠 재생하기</div>
            </Button>
          </>
        }
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