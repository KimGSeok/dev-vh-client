'use client';

import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useSearchParams } from 'next/navigation';
import { ProjectSlideInterfaceProps } from '@/src/modules/type';
import SlideWrapper from '@/src/components/project/slide/Slide';
import AvatarWrapper from '@/src/components/project/avatar/Avatar';
import ScriptWrapper from '@/src/components/project/script/Script';

let tempSlideList = [
  {
    id: '1',
    sequence: 1,
    name: 'slide1',
    avatar: '',
    background: '',
    voice: '',
    thumbnail: null,
    createdAt: null
  },
  {
    id: '2',
    sequence: 2,
    name: 'slide2',
    avatar: '',
    background: '',
    voice: '',
    thumbnail: null,
    createdAt: null
  },
  {
    id: '3',
    sequence: 3,
    name: 'slide3',
    avatar: '',
    background: '',
    voice: '',
    thumbnail: null,
    createdAt: null
  },
  {
    id: '4',
    sequence: 4,
    name: 'slide4',
    avatar: '',
    background: '',
    voice: '',
    thumbnail: null,
    createdAt: null
  },
  {
    id: '5',
    sequence: 5,
    name: 'slide5',
    avatar: '',
    background: '',
    voice: '',
    thumbnail: null,
    createdAt: null
  },
]

const ProjectDetail = () => {

  // Hooks
  const [activeSlide, setActiveSlide] = useState<ProjectSlideInterfaceProps>(tempSlideList[0]);
  const [slideList, setSlideList] = useState<object[]>(tempSlideList);

  // Parameter
  const name: string = useSearchParams().get('name')!; // non-null assertion

  // TODO 새로고침 및 페이지 이동 시 Alert 후 페이지 이동 막기

  return (
    <MainComponent>
      <SlideWrapper
        slideList={slideList}
        setSlideList={setSlideList}
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
      />
      <AvatarWrapper
      />
      <ScriptWrapper
        name={name}
      />
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