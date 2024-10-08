'use client';

import { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import { useSearchParams } from 'next/navigation';
import VoiceGenerate from "@components/virtual-human/generate/Voice";
const VideoGenerate = dynamic(() => import('@components/virtual-human/generate/Video'), { ssr: false });

const AvatarGenerate = () => {

  // Hooks
  const [mounted, setMounted] = useState<boolean>(false);
  const type: string = useSearchParams().get('type')!; // non-null assertion
  const virtualHumanName: string = useSearchParams().get('name')!;

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, [])

  return (
    mounted ?
      <MainComponent>
        {type === 'voice' && <VoiceGenerate type={type} virtualHumanName={virtualHumanName} />}
        {type === 'video' && <VideoGenerate type={type} virtualHumanName={virtualHumanName} />}
      </MainComponent> : <></>
  )
}

const MainComponent = styled.div({
  position: 'relative',
  height: '100%'
})

export default AvatarGenerate;