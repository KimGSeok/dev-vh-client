'use client';

import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import { CSS_TYPE, color } from "@/src/styles/styles";
import { useSearchParams } from 'next/navigation';
import VoiceGenerate from "@/src/components/avatar/generate/Voice";
import VideoGenerate from "@/src/components/avatar/generate/Video";


// const getScriptList = async (type: string | null) => {
//   const res = await fetch('', { cache: 'no-store' });
//   const scriptList = await res.json();

//   return scriptList;
// }

const AvatarGenerate = () => {

  // Hooks
  const type = useSearchParams().get('type');
  // const scriptLists = await getScriptList(type);

  // TODO 잘못된 접근 처리

  return (
    <MainComponent>
      {
        type === 'voice' ?
          <VoiceGenerate />
          :
          <VideoGenerate />
      }
    </MainComponent>
  )
}

const MainComponent = styled.div({
  position: 'relative',
  height: '100%'
})

export default AvatarGenerate;