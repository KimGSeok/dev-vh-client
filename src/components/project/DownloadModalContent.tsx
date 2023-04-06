'use client';

import styled from '@emotion/styled';
import { color, RadiusButton } from '@styles/styles';
import { KeyValueProps } from "@modules/interface";

interface contentProps {
  contents: KeyValueProps;
  contentsType: string;
}

const DownloadModalContent = ({ contents, contentsType }: contentProps) => {

  // TODO

  const handleClickButton = (type: string) => {
    if (type === 'audio') {
      if (contentsType === 'download') {

        const downloadUrl = contents.audio_download_url;
        const link = document.createElement('a');

        // TODO

        console.log(contents);
        console.log(downloadUrl);

        return false;

        link.setAttribute('href', downloadUrl);
        // link.setAttribute('download', `${fileName}.${extension}`);

        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);

        window.URL.revokeObjectURL(downloadUrl);
      } else {

      }
    } else {
      if (contentsType === 'download') {

      } else {

      }
    }
  }

  return (
    <MainContainer>
      <ButtonContainer>
        <Button
          width={'100%'}
          textAlign={'center'}
          border={'0'}
          margin={'12px 0 16px 0'}
          backgroundColor={color.BasicBlue}
          opacity={contents.audio_download_url ? 1 : 0.2}
          color={color.White}
          onClick={() => handleClickButton('audio')}
        >{contentsType === 'download' ? '음성 컨텐츠 다운로드' : '음성 컨텐츠 재생하기'}</Button>
        <Button
          width={'100%'}
          textAlign={'center'}
          border={'0'}
          backgroundColor={color.BasicColor}
          opacity={contents.video_download_url ? 1 : 0.2}
          color={color.White}
          cursor={contents.video_download_url ? 'pointer' : 'default'}
          onClick={() => handleClickButton('video')}
        >{contentsType === 'download' ? '영상 컨텐츠 다운로드' : '영상 컨텐츠 재생하기'}
        </Button>
      </ButtonContainer>
    </MainContainer>
  )
}

const MainContainer = styled.div({})
const ButtonContainer = styled.div({})
const Button = styled(RadiusButton)({})

export default DownloadModalContent;