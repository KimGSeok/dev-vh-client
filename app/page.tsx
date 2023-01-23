'use client'; // Temporary

import styled from '@emotion/styled';
import { CSS_TYPE, color, RadiusButton, ImageElement, VerticalBar } from '@/src/styles/styles';
import { useRouter } from 'next/navigation';

const Home = () => {

  // Hooks
  const router = useRouter();

  return (
    <Page>
      <DashboardWrap>
        <DashboardTitle>Virtual Human Studio</DashboardTitle>
        <DashboardDescriptionWrap>
          <VerticalBar />
          <DescriptionTitle>높은 생산성과 편의성</DescriptionTitle>
          <DescriptionContent>
            <div>Virtual twin 제작에 필요한 자원과 비용을 월등히 줄임</div>
            <div>약 3시간의 스튜디오 작업을 통해 virtual twin 제작 가능</div>
            <div>&#8594; 말하는 영상 5분, 음성 녹음 100 문장</div>
          </DescriptionContent>
        </DashboardDescriptionWrap>
        <DashboardDescriptionWrap>
          <VerticalBar />
          <DescriptionTitle>낮은 가격</DescriptionTitle>
          <DescriptionContent>
            경쟁사 대비 virtual twin 제작 비용이 낮음
          </DescriptionContent>
        </DashboardDescriptionWrap>
        <DashboardDescriptionWrap>
          <VerticalBar />
          <DescriptionTitle>뛰어난 퀄리티</DescriptionTitle>
          <DescriptionContent>
            <div>VFX 못지않은 고화질의 자연스러운 합성 퀄리티</div>
            <div>하지만, 제작 비용은 월등히 낮음</div>
          </DescriptionContent>
        </DashboardDescriptionWrap>
        <DashboardDescriptionWrap>
          <VerticalBar />
          <DescriptionTitle>Cross-linual TTS</DescriptionTitle>
          <DescriptionContent>
            <div>같은 목소리로 다양한 언어&#40;한국어, 영어, 일본어 등&#41;을 합성 할 수 있음</div>
            <div>언어에 상관없이 입모양 합성이 가능함</div>
          </DescriptionContent>
        </DashboardDescriptionWrap>
      </DashboardWrap>
      <ServicePreviewWrap>
        <ServicePreviewEl
          backgroundColor={'#524946'}
          margin={'0 0 24px 0'}
        >
          <ServiceName>아바타&#40;Avatar&#41;</ServiceName>
          <ServiceDescription>
            실제 사람의 얼굴과 음성을 가지고 디지털 버전의 사람을 만드는 것, 그렇게 만들어 진 결과물을 아바타&#40;avatar&#41;라고 합니다.<br />
            이러한 아바타는 엔터테인먼트, 교육 및 연구와 같은 다양한 목적으로 사용할 수 있습니다.<br />
            아바타&#40;avatar&#41;의 궁극적인 목표는 실제 사람과 디지털 버전의 사람의 외모와 행동 모두에서 구별할 수 없을 정도의
            사실적인 아바타&#40;avatar&#41;를 만드는 것입니다.
          </ServiceDescription>
          <RadiusBtn
            position={'absolute'}
            display={'flex'}
            alignItems={'center'}
            margin={'0 32px 32px 0'}
            bottom={'0'}
            right={'0'}
            onClick={() => router.push('/avatar')}
          >
            아바타 생성하기
            <ImageElement
              src="/icons/arrow/single_arrow_right.svg"
              width={20}
              height={20}
              alt="arrow_right"
            />
          </RadiusBtn>
        </ServicePreviewEl>
        <ServicePreviewEl
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
            onClick={() => router.push('/project')}
          >
            프로젝트 생성하기
            <ImageElement
              src="/icons/arrow/single_arrow_right.svg"
              width={20}
              height={20}
              alt="arrow_right"
            />
          </RadiusBtn>
        </ServicePreviewEl>
      </ServicePreviewWrap>
    </Page>
  )
}

const Page = styled.div({
  display: 'flex',
  width: '100%',
  height: '100%',
  position: 'relative',
})
const DashboardWrap = styled.div({
  width: '55%'
})
const DashboardTitle = styled.div({
  fontSize: '2.2rem',
  fontWeight: '700',
  margin: '72px 0 32px 0',

  '@media screen and (max-width: 1440px)': {
    fontSize: '2.1rem',
  },

  '@media screen and (max-width: 1023px)': {
    fontSize: '1.9rem',
  },

  '@media screen and (max-width: 960px)': {
    fontSize: '1.8rem',
  }
})
const DashboardDescriptionWrap = styled.div({
  display: 'flex',
  margin: '0 0 24px 0'
})
const DescriptionTitle = styled.div({
  width: '20%',
  fontSize: '1.2rem',
  fontWeight: '500',
  margin: '0 8px',

  '@media screen and (max-width: 1440px)': {
    width: '25%',
    fontSize: '1.1rem',
  },

  '@media screen and (max-width: 1023px)': {
    width: '18%',
    fontSize: '1rem',
  },

  '@media screen and (max-width: 960px)': {
    width: '15%',
    fontSize: '0.9rem',
  }
})
const DescriptionContent = styled.div({
  fontSize: '1.3rem',
  fontWeight: '300',
  margin: '0 8px',

  '& > div': {
    margin: '0 0 4px 0'
  },

  '@media screen and (max-width: 1440px)': {
    fontSize: '1.1rem',
  },

  '@media screen and (max-width: 1023px)': {
    fontSize: '1rem',
  },

  '@media screen and (max-width: 960px)': {
    fontSize: '0.9rem',
  }
})
const ServicePreviewWrap = styled.div({
  width: '45%'
})
const ServicePreviewEl = styled.div<CSS_TYPE>(
  {
    height: 'calc(50% - 12px)',
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
  fontSize: '0.95rem',
  lineHeight: '24px',
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