'use client'; // Temporary

import styled from '@emotion/styled';
import { CSS_TYPE, color, RadiusButton } from '@/src/styles/styles';

const Home = () => {
  return (
    <Page>
      <DashboardWrap>
        대시보드
      </DashboardWrap>
      <ServicePreviewWrap>
        <ServicePreviewEl
          backgroundColor={'#524946'}
          margin={'0 0 24px 0'}
        >
          <ServiceName>아바타</ServiceName>
          <ServiceDescription>
            실제 사람의 얼굴과 음성을 가지고 디지털 버전의 사람을 만드는 것, 그렇게 만들어 진 결과물을 아바타&#40;avatar&#41;라고 합니다.<br />
            이러한 아바타는 엔터테인먼트, 교육 및 연구와 같은 다양한 목적으로 사용할 수 있습니다.<br />
            아바타&#40;avatar&#41;의 궁극적인 목표는 실제 사람과 디지털 버전의 사람의 외모와 행동 모두에서 구별할 수 없을 정도의
            사실적인 아바타&#40;avatar&#41;를 만드는 것입니다.
          </ServiceDescription>
          <RadiusButton

          >
            아바타 생성하기
          </RadiusButton>
        </ServicePreviewEl>
        <ServicePreviewEl
          backgroundColor={'#4c4e51'}
        >
          <ServiceName>프로젝트</ServiceName>
          <ServiceDescription>
            생성된 Avatar를 이용하여, 자신만의 Virtual Human Project를 생성할 수 있습니다.
          </ServiceDescription>
          <RadiusButton>
            프로젝트 생성하기
          </RadiusButton>
        </ServicePreviewEl>
      </ServicePreviewWrap>
    </Page>
  )
}

const Page = styled.div({
  display: 'flex',
  width: '100%',
  height: '100%',
  position: 'relative'
})
const DashboardWrap = styled.div({
  width: '55%'
})
const ServicePreviewWrap = styled.div({
  width: '45%'
})
const ServicePreviewEl = styled.div<CSS_TYPE>(
  {
    height: 'calc(50% - 12px)',
    borderRadius: '16px',
    padding: '32px'
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
  margin: '0 0 12px 0'
})
const ServiceDescription = styled.div({
  fontSize: '0.95rem',
  lineHeight: '24px',
  color: color.ThumbnailColor,
})

export default Home;