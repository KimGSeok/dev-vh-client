import styled from '@emotion/styled';
import { CSS_TYPE, color, ImageElement, ImageWrap, RadiusButton } from '@/src/styles/styles';

const ControlPanel = () => {
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
            height: '100%'
          }}
          alt="play button"
        />
      </ImageWrap>
      <ProgressWrapper>
        <OverAllProgress />
        <ProgressStatus />
      </ProgressWrapper>
      <ProjectLengthWrapper>
        <PlayTime>01:24</PlayTime>/<ProjectLength>05:36</ProjectLength>
      </ProjectLengthWrapper>
      <RadiusBtn
        display={'flex'}
        alignItems={'center'}
        color={color.White}
        backgroundColor={color.Purple}
        borderColor={color.Purple}
        padding={'4px 20px'}
        margin={'0 16px 0 0'}
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
        color={color.White}
        backgroundColor={color.BasicOrange}
        borderColor={color.BasicOrange}
        padding={'4px 20px'}
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
  width: '40%',
  margin: '0 24px',

  '@media screen and (max-width: 1440px)': {
    width: '35%',
    margin: '0 20px',
  },

  '@media screen and (max-width: 1023px)': {
    width: '30%',
    margin: '0 18px',
  },

  '@media screen and (max-width: 960px)': {
    width: '25%',
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
      fontSize: '0.7rem',
      padding: '4px 16px',
    },

    '@media screen and (max-width: 1023px)': {
      fontSize: '0.65rem',
      padding: '4px 14px',
    },

    '@media screen and (max-width: 960px)': {
      fontSize: '0.6rem',
      padding: '4px 12px',
    }
  }
)

export default ControlPanel;