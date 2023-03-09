'use client';

import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useSearchParams } from 'next/navigation';
import { ProjectSlideInterfaceProps } from '@modules/interface';
import AvatarWrapper from '@components/project/avatar/Avatar';
import ScriptWrapper from '@components/project/script/Script';

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