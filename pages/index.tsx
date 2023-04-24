'use client'; // Temporary

import styled from '@emotion/styled';
import Head from 'next/head';
import { CSS_TYPE, color, RadiusButton, ImageElement, shaking, LineBreak } from '@styles/styles';
import Link from 'next/link';
import customWindow from '@modules/customWindow';

const Home = () => {

  // TODO 조직 혹은 사용자명 추출하여 표출

  const testHandler = () => {
    console.log("커스텀 확인버튼 클릭");
    const test = customWindow.confirm('안녕하십니까?');
    console.log(test);
  }

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
        <div onClick={() => testHandler()}>안녕</div>
        <ServicePreviewContainer>
          <ServicePreview
            backgroundImage={"url('/images/main_virtualhuman.svg')"}
          >
            <ServiceContainer>
              <ServiceName>가상 인간&#40;Virtual Human&#41;</ServiceName>
              <ServiceDescription>
                실제 사람의 얼굴과 음성을 가지고 디지털 버전의 사람을 만드는 것, 그렇게 만들어 진 결과물을 가상 인간&#40;Virtual Human&#41;이라고 합니다.<br />
                <LineBreak height={'12px'} />
                이러한 가상 인간은 엔터테인먼트, 교육 및 연구와 같은 다양한 목적으로 사용할 수 있습니다.<br />
                <LineBreak height={'12px'} />
                두&#58;분 스튜디오에서는<br />
                음성 합성기술&#40;TTS, Text-to-Speech&#41;을 이용한 &#34;목소리&#34;<br />
                얼굴 영상 합성기술&#40;STF, Speech-to-Face&#41;을 이용한 &#34;아바타&#34;<br />
                를 제작하실 수 있어요.
                <LineBreak height={'12px'} />
                우리의 가상 인간&#40;Virtual Human&#41;의 궁극적인 목표는 실제 사람과 디지털 버전의 사람의 외모와 행동 모두에서 구별할 수 없을 정도의
                사실적인 가상 인간&#40;Virtual Human&#41;를 만드는 것입니다.
              </ServiceDescription>
            </ServiceContainer>
            <BtnWrapper>
              <RadiusBtn
                display={'flex'}
                width={'fit-content'}
                alignItems={'center'}
              >
                <Link href={'/virtual-human'} passHref>
                  가상인간 생성하기
                </Link>
                <ImageElement
                  src="/icons/arrow/single_arrow_right.svg"
                  width={20}
                  height={20}
                  alt="arrow_right"
                />
              </RadiusBtn>
            </BtnWrapper>
          </ServicePreview>
          <ServicePreview
            backgroundImage={"url('/images/main_project.svg')"}
          >
            <ServiceContainer>
              <ServiceName>프로젝트&#40;Project&#41;</ServiceName>
              <ServiceDescription>
                녹음한 음성을 이용하여 생성된 &#34;목소리&#34;, 영상 촬영을 통하여 생성된 &#34;아바타&#34;를<br />
                이용하여 자신만의 Virtual Human Project를 생성할 수 있어요.
                <LineBreak height={'12px'} />
                저희 두&#58;분 스튜디오의 프로젝트는<br />
                1. 입력된 스크립트<br />
                2. 음성 빠르기&#40;느리게, 보통, 빠르게&#41;<br />
                3. 음성 대기시간&#40;0.8초, 1초, 1.2초&#41;<br />
                를 이용하여 &#34;아바타&#34;와 &#34;목소리&#34;를 유동적으로 활용 하실 수 있어요.
                <LineBreak height={'12px'} />
                이렇게 생성된 가상인간은 음성 및 영상을 다운받아서 직접 사용하실 수 있어요.
                <LineBreak height={'12px'} />
                자신만의 가상인간을 만들어서 다양한 컨텐츠로 활용해보아요.
              </ServiceDescription>
            </ServiceContainer>
            <BtnWrapper>
              <RadiusBtn
                display={'flex'}
                width={'fit-content'}
                alignItems={'center'}
              >
                <Link href={'/project'} passHref>
                  프로젝트 생성하기
                </Link>
                <ImageElement
                  src="/icons/arrow/single_arrow_right.svg"
                  width={20}
                  height={20}
                  alt="arrow_right"
                />
              </RadiusBtn>
            </BtnWrapper>
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
    fontSize: '0.95rem',
  },

  '@media screen and (max-width: 1280px)': {
    fontSize: '0.9rem',
  },
})
const ServicePreviewContainer = styled.div({
  position: 'relative',
  width: '100%',
  height: '88%',
  margin: '1% 0 1% 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '@media screen and (max-width: 1440px)': {
    height: '86%',
    margin: '3% 0 1% 0',
  },

  '@media screen and (max-width: 1280px)': {
    height: '84%',
    margin: '5% 0 1% 0',
  },
})
const ServicePreview = styled.div<CSS_TYPE>(
  {
    width: 'calc(50% - 12px)',
    height: 'calc(100% - 12px)',
    borderRadius: '16px',
    padding: '40px',
    position: 'relative',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    '@media screen and (max-width: 1440px)': {
      padding: '32px',
    },

    '@media screen and (max-width: 1280px)': {
      padding: '28px',
    },
  },
  props => ({
    backgroundImage: props.backgroundImage,
    margin: props.margin
  })
)
const ServiceContainer = styled.div({

})
const ServiceName = styled.div({
  color: color.White,
  fontSize: '2rem',
  fontWeight: '700',
  margin: '0 0 20px 0',

  '@media screen and (max-width: 1440px)': {
    fontSize: '1.75rem',
    margin: '0 0 12px 0',
  },

  '@media screen and (max-width: 1280px)': {
    fontSize: '1.4rem',
  },
})
const ServiceDescription = styled.div({
  fontSize: '1rem',
  lineHeight: '24px',
  color: color.ThumbnailColor,
  wordBreak: 'keep-all',

  '@media screen and (max-width: 1440px)': {
    fontSize: '0.9rem',
  },

  '@media screen and (max-width: 1280px)': {
    fontSize: '0.8rem',
    lineHeight: '22px',
  },
})
const BtnWrapper = styled.div({
  position: 'relative',

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