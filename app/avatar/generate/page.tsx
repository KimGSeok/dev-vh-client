'use client';

import { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import { CSS_TYPE, color } from "@/src/styles/styles";
import { useSearchParams } from 'next/navigation';
import VoiceGenerate from "@/src/components/avatar/generate/Voice";
const VideoGenerate = dynamic(() => import('@/src/components/avatar/generate/Video'), {
  ssr: false
});

// const getScriptList = async (type: string | null) => {
//   const res = await fetch('', { cache: 'no-store' });
//   const scriptList = await res.json();

//   return scriptList;
// }

const AvatarGenerate = () => {

  // Hooks
  const [mounted, setMounted] = useState<boolean>(false);
  const type = useSearchParams().get('type');
  // const scriptLists = await getScriptList(type);

  // TODO 잘못된 접근 처리

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, [])

  return (
    mounted ?
      <MainComponent>
        {type === 'voice' && <VoiceGenerate type={type} />}
        {type === 'video' && <VideoGenerate type={type} />}
      </MainComponent> : <></>
  )
}

const MainComponent = styled.div({
  position: 'relative',
  height: '100%'
})

export default AvatarGenerate;