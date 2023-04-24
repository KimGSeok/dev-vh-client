import styled from '@emotion/styled';
import { CSS_TYPE, color, ImageElement, ImageWrap, RadiusButton } from '@styles/styles';
import { onClickBlobDownload } from '@modules/onClickBlobDownload';
import { getToday, getTodayTime } from '@modules/date';
import { useState, useEffect } from 'react';
import { checkEmptyObject } from '@modules/validation';
import { get } from '@hooks/asyncHooks';

interface ControlProps {
  name: string;
  avatarType: string;
  transferResult: any;
  audioDownloadUrl: string;
  videoDownloadUrl: string;
}

const ControlPanel = ({ name, avatarType, transferResult, audioDownloadUrl, videoDownloadUrl }: ControlProps) => {

  // Hooks
  const [type, setType] = useState(avatarType);
  const [audioURL, ] = useState<string>(audioDownloadUrl);
  const [videoURL, ] = useState<string>(videoDownloadUrl);

  const getDownload = async(url: string, extension: string) =>{
    const response = await get(`file/buffer?url=${url}`, 'no-cache', '');

    // Parameter
    const fileName = `${getToday()} ${getTodayTime()} ${name}`;
    onClickBlobDownload(response.arrayBuffer, fileName, extension, response.type);
  }

  const onClickDownloadFile = (type: string) => {
    if(checkEmptyObject(transferResult)){

      if(audioURL !== '' && type === 'audio'){
        getDownload(audioDownloadUrl, 'wav');
      }
      else if(videoURL !== '' && type === 'video'){
        getDownload(videoDownloadUrl, 'mp4');
      }
      else
        return false;
    }else{

      // Parameter
      const fileName = `${getToday()} ${getTodayTime()} ${name}`;
      const extension = avatarType === 'audio' ? 'wav' : 'mp4';
      onClickBlobDownload(transferResult.arrayBuffer, fileName, extension, transferResult.type);
    }
  }

  useEffect(() => {
    if(audioDownloadUrl !== ''){
      setType('audio');
    }
    else if(videoDownloadUrl !== ''){
      setType('video');
    }
  }, [])

  useEffect(() => {
    setType(avatarType);
  }, [avatarType])

  return (
    <PanelWrapper>
      <ImageWrap
        position={'relative'}
        height={'50%'}
        padding={'2px 0'}
        cursor={'pointer'}
      >
        <ImageElement
          src="/icons/play.svg"
          width={28}
          height={28}
          style={{
            width: '100%',
            height: '100%',
            opacity: 0.4
          }}
          alt="play button"
        />
      </ImageWrap>
      <ProgressWrapper>
        <OverAllProgress />
        <ProgressStatus />
      </ProgressWrapper>
      <ProjectLengthWrapper>
        <PlayTime>00:00</PlayTime>/<ProjectLength>00:00</ProjectLength>
      </ProjectLengthWrapper>
      <RadiusBtn
        display={'flex'}
        alignItems={'center'}
        minWidth={'155px'}
        color={color.White}
        backgroundColor={color.Purple}
        borderColor={color.Purple}
        padding={'4px 20px'}
        margin={'0 16px 0 0'}
        opacity={audioURL === undefined || audioURL === '' ? 0.4 : 1}
        cursor={audioURL === undefined || audioURL === '' ? 'auto' : 'pointer'}
        onClick={() => onClickDownloadFile('audio')}
      >
        <ImageWrap
          position={'relative'}
          height={'100%'}
          padding={'2px 8px 2px 0'}
          cursor={'pointer'}
        >
          <ImageElement
            src="/icons/cloud_download.svg"
            width={28}
            height={28}
            style={{
              width: '100%',
              height: '100%'
            }}
            alt="play button"
          />
        </ImageWrap>
        음성 다운로드
      </RadiusBtn>
      <RadiusBtn
        display={'flex'}
        alignItems={'center'}
        minWidth={'155px'}
        color={color.White}
        backgroundColor={color.BasicOrange}
        borderColor={color.BasicOrange}
        padding={'4px 20px'}
        opacity={videoURL === undefined || videoURL === '' ? 0.4 : 1}
        cursor={videoURL === undefined || videoURL === '' ? 'auto' : 'pointer'}
        onClick={() => onClickDownloadFile('video')}
      >
        <ImageWrap
          position={'relative'}
          height={'100%'}
          padding={'2px 8px 2px 0'}
          cursor={'pointer'}
        >
          <ImageElement
            src="/icons/cloud_download.svg"
            width={28}
            height={28}
            style={{
              width: '100%',
              height: '100%'
            }}
            alt="play button"
          />
        </ImageWrap>
        영상 다운로드
      </RadiusBtn>
    </PanelWrapper>
  )
}

const PanelWrapper = styled.div({
  height: '8%',
  position: 'relative',
  borderTop: `1px solid ${color.ModernGrey}`,
  padding: '0 24px',
  display: 'flex',
  alignItems: 'center'
})
const ProgressWrapper = styled.div({
  position: 'relative',
  width: '60%',
  margin: '0 24px',

  '@media screen and (max-width: 1440px)': {
    width: '50%',
    margin: '0 20px',
  },

  '@media screen and (max-width: 1023px)': {
    width: '45%',
    margin: '0 18px',
  },

  '@media screen and (max-width: 960px)': {
    width: '40%',
    margin: '0 16px',
  }
})
const OverAllProgress = styled.div({
  width: '100%',
  height: '8px',
  backgroundColor: color.OverallProgressColor,
  borderRadius: '50px',
})
const ProgressStatus = styled.div({

})
const ProjectLengthWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.85rem',
})
const PlayTime = styled.div({
  color: color.Purple,
  fontWeight: '500',
  margin: '0 4px 0 0'
})
const ProjectLength = styled.div({
  fontWeight: '500',
  margin: '0 16px 0 4px'
})
const RadiusBtn = styled(RadiusButton)<CSS_TYPE>(
  {
    '@media screen and (max-width: 1440px)': {
      fontSize: '0.85rem',
      padding: '4px 24px',
    },

    '@media screen and (max-width: 1023px)': {
      fontSize: '0.65rem',
      padding: '4px 14px',
    },

    '@media screen and (max-width: 960px)': {
      fontSize: '0.6rem',
      padding: '4px 12px',
    }
  },
  props => ({
    minWidth: props.minWidth,
    opacity: props.opacity,
    cursor: props.cursor
  })
)

export default ControlPanel;