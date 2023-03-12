'use client'; // Temporary

import styled from '@emotion/styled';
import Head from 'next/head';
import { CSS_TYPE, color, RadiusButton, ImageElement, shaking } from '@styles/styles';

const Home = () => {

  // TODO 조직 혹은 사용자명 추출하여 표출

  return (
    <PageContainer>
      <DashboardWrapper>
        <TitleWraaper>
          <DashboardTitle>
            회원님 스튜디오에 오신 걸 환영해요!
            <ImageElement
              src={'/icons/waving_hand.svg'}
              css={shaking}
              width={28}
              height={28}
              alt={'waving_hand'}
              style={{
                margin: '0 0 0 8px',
              }}
            />
          </DashboardTitle>
          <DashboardSubTitle>음성 녹음과 영상 촬영을 통해서 나만의 가상인간을 만들어 볼 수 있어요.</DashboardSubTitle>
        </TitleWraaper>
        <ServicePreviewContainer>
          <ServicePreview
            backgroundColor={'#85736d'}
          >
            <ServiceName>가상 인간&#40;Virtual Human&#41;</ServiceName>
            <ServiceDescription>
              실제 사람의 얼굴과 음성을 가지고 디지털 버전의 사람을 만드는 것, 그렇게 만들어 진 결과물을 가상 인간&#40;Virtual Human&#41;이라고 합니다.<br />
              이러한 가상 인간은 엔터테인먼트, 교육 및 연구와 같은 다양한 목적으로 사용할 수 있습니다.<br />
              가상 인간&#40;Virtual Human&#41;의 궁극적인 목표는 실제 사람과 디지털 버전의 사람의 외모와 행동 모두에서 구별할 수 없을 정도의
              사실적인 가상 인간&#40;Virtual Human&#41;를 만드는 것입니다.
            </ServiceDescription>
            <RadiusBtn
              position={'absolute'}
              display={'flex'}
              alignItems={'center'}
              margin={'0 32px 32px 0'}
              bottom={'0'}
              right={'0'}
            >
              아바타 생성하기
              <ImageElement
                src="/icons/arrow/single_arrow_right.svg"
                width={20}
                height={20}
                alt="arrow_right"
              />
            </RadiusBtn>
          </ServicePreview>
          <ServicePreview
            backgroundColor={'#4c4e51'}
          >
            <ServiceName>프로젝트&#40;Project&#41;</ServiceName>
            <ServiceDescription>
              생성된 Avatar를 이용하여, 자신만의 Virtual Human Project를 생성할 수 있습니다.
            </ServiceDescription>
            <RadiusBtn
              position={'absolute'}
              display={'flex'}
              alignItems={'center'}
              margin={'0 32px 32px 0'}
              bottom={'0'}
              right={'0'}
            >
              프로젝트 생성하기
              <ImageElement
                src="/icons/arrow/single_arrow_right.svg"
                width={20}
                height={20}
                alt="arrow_right"
              />
            </RadiusBtn>
          </ServicePreview>
        </ServicePreviewContainer>
      </DashboardWrapper>
    </PageContainer>
  )
}

const PageContainer = styled.div({
  width: '100%',
  height: '100%',
  position: 'relative',
})
const DashboardWrapper = styled.div({
  height: '100%',
  position: 'relative'
})
const TitleWraaper = styled.div({
  height: '10%',
})
const DashboardTitle = styled.div({
  fontSize: '2rem',
  fontWeight: '700',
  padding: '16px 0 4px 0',
  color: color.BasicColor,

  '@media screen and (max-width: 1440px)': {
    fontSize: '1.9rem',
  },

  '@media screen and (max-width: 1023px)': {
    fontSize: '1.75rem',
  },

  '@media screen and (max-width: 960px)': {
    fontSize: '1.6rem',
  }
})
const DashboardSubTitle = styled.div({
  fontSize: '1.05rem',
  fontWeight: '400',
  padding: '4px 0',
  color: color.DeActiveColor,

  '@media screen and (max-width: 1440px)': {
    fontSize: '0.9rem',
  },

  '@media screen and (max-width: 1023px)': {
    fontSize: '0.8rem',
  },

  '@media screen and (max-width: 960px)': {
    fontSize: '0.7rem',
  }
})
const ServicePreviewContainer = styled.div({
  position: 'relative',
  width: '100%',
  height: '88%',
  margin: '1% 0 1% 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
})
const ServicePreview = styled.div<CSS_TYPE>(
  {
    width: 'calc(50% - 12px)',
    height: 'calc(100% - 12px)',
    borderRadius: '16px',
    padding: '32px',
    position: 'relative'
  },
  props => ({
    backgroundColor: props.backgroundColor,
    margin: props.margin
  })
)
const ServiceName = styled.div({
  color: color.White,
  fontSize: '2rem',
  fontWeight: '700',
  margin: '0 0 12px 0',

  '@media screen and (max-width: 1440px)': {
    fontSize: '1.8rem',
  },

  '@media screen and (max-width: 1023px)': {
    fontSize: '1.65rem',
  },

  '@media screen and (max-width: 960px)': {
    fontSize: '1.5rem',
  }
})
const ServiceDescription = styled.div({
  fontSize: '1rem',
  lineHeight: '28px',
  color: color.ThumbnailColor,

  '@media screen and (max-width: 1440px)': {
    fontSize: '0.9rem',
  },

  '@media screen and (max-width: 1023px)': {
    fontSize: '0.85rem',
  },

  '@media screen and (max-width: 960px)': {
    fontSize: '0.8rem',
  }
})

const RadiusBtn = styled(RadiusButton)<CSS_TYPE>(
  {

  },
  props => ({
    alignItems: props.alignItems,
    position: props.position,
    display: props.display,
    bottom: props.bottom,
    right: props.right,

    '@media screen and (max-width: 1440px)': {
      fontSize: '0.9rem',
      margin: '0 12px 12px 0',
      padding: '8px 20px'
    },

    '@media screen and (max-width: 1023px)': {
      fontSize: '0.8rem',
    },

    '@media screen and (max-width: 960px)': {
      fontSize: '0.85rem',
      margin: '0 8px 8px 0',
      padding: '6px 16px'
    }
  })
)

export default Home;