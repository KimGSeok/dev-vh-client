'use client'

import styled from "@emotion/styled";
import { CSS_TYPE, color } from "@/src/styles/styles";

const VideoGenerate = () => {

  const onClickRecordHandler = () => {

    // TODO 카메라 위치
  }

  return (
    <VideoGenerateWrapper>
      <Title>아래 문장을 대화를 하듯 말하며 최소 3분 이상 녹화해주세요.</Title>
      <ScriptWrapper>
        <Script>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
          software like Aldus PageMaker including versions of Lorem Ipsum.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
          software like Aldus PageMaker including versions of Lorem Ipsum.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
          software like Aldus PageMaker including versions of Lorem Ipsum.
        </Script>
      </ScriptWrapper>
      <VideoCameraWrapper>
        얼굴 쁘이
      </VideoCameraWrapper>
    </VideoGenerateWrapper>
  )
}

const VideoGenerateWrapper = styled.div({
  position: 'relative',
  height: '100%',
})
const Title = styled.div({
  padding: '12px 0 16px 0',
  fontSize: '1.2rem',
  fontWeight: '500',
  textAlign: 'center'
})
const ScriptWrapper = styled.div({
  height: 'calc(35% - 16px)',
  backgroundColor: color.DarkWhite,
  borderRadius: '16px',
  border: `1px solid ${color.ModernGrey}`,
  padding: '16px',
})
const Script = styled.div({
  height: '100%',
  padding: '0 0 8px 0',
  fontSize: '1rem',
  lineHeight: '24px',
  wordBreak: 'keep-all',
  overflowY: 'scroll'
})
const VideoCameraWrapper = styled.div({
  height: '60%',
})

export default VideoGenerate;