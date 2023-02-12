'use client';

import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useSearchParams } from 'next/navigation';
import { v4 as uuidV4 } from 'uuid';
import SlideWrapper from '@/src/components/project/slide/Slide';
import AvatarWrapper from '@/src/components/project/avatar/Avatar';
import ScriptWrapper from '@/src/components/project/script/Script';

const ProjectGenerate = () => {

  // Parameter
  const name: string = useSearchParams().get('name')!; // non-null assertion

  // Hooks
  const [pageMount, setPageMount] = useState<boolean>(false);
  const [slideList, setSlideList] = useState<object[]>([
    {
      id: '1',
      projectName: name,
      projectId: useSearchParams().get('projectId')!,
      uuid: uuidV4(),
      sequence: 1,
      name: '슬라이드1',
      avatar: {},
      voice: {},
      scriptList : [
        { uuid: uuidV4(), text: '', speed: 1.0, pauseSecond: 0.5 }
      ],
      thumbnail: null,
    }
  ]);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  useEffect(() => {

    setPageMount(true);
    return () => setPageMount(false);
  }, [])

  return (
    pageMount ? <MainComponent>
      <SlideWrapper
        slideList={slideList}
        setSlideList={setSlideList}
        activeSlideIndex={activeSlideIndex}
        setActiveSlideIndex={setActiveSlideIndex}
      />
      <AvatarWrapper
        slideList={slideList}
        setSlideList={setSlideList}
        activeSlideIndex={activeSlideIndex}
      />
      <ScriptWrapper
        name={name}
        slideList={slideList}
        setSlideList={setSlideList}
        currentSlide={slideList[activeSlideIndex]}
      />
    </MainComponent> : <></>
  )
}

const MainComponent = styled.div({
  display: 'flex',
  width: '100%',
  height: 'calc(100vh - 48px)',
  position: 'relative'
})

export default ProjectGenerate;