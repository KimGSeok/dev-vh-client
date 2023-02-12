'use client';

import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useSearchParams } from 'next/navigation';
import { ProjectSlideInterfaceProps } from '@/src/modules/type';
import SlideWrapper from '@/src/components/project/slide/Slide';
import AvatarWrapper from '@/src/components/project/avatar/Avatar';
import ScriptWrapper from '@/src/components/project/script/Script';

const ProjectDetail = () => {

  // Hooks
  const [activeSlide, setActiveSlide] = useState<ProjectSlideInterfaceProps>({
    id: '1',
    sequence: 1,
    name: '슬라이드1',
    avatar: '',
    background: '',
    voice: '',
    thumbnail: null,
    createdAt: null
  });
  const [slideList, setSlideList] = useState<object[]>([
    {
      id: '1',
      sequence: 1,
      name: '슬라이드1',
      avatar: '',
      background: '',
      voice: '',
      thumbnail: null,
      createdAt: null
    }
  ]);
  const [avatar, setAvatar] = useState<object>({});
  const [voice, setVoice] = useState<object>({});

  // Parameter
  const name: string = useSearchParams().get('name')!; // non-null assertion

  // TODO 새로고침 및 페이지 이동 시 Alert 후 페이지 이동 막기

  return (
    <MainComponent>
    </MainComponent>
  )
}

const MainComponent = styled.div({
  display: 'flex',
  width: '100%',
  height: 'calc(100vh - 48px)',
  position: 'relative'
})

export default ProjectDetail;