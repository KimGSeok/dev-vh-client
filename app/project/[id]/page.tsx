'use client';

import styled from '@emotion/styled';
import { CSS_TYPE, color } from '@/src/styles/styles';
import SlideWrapper from '@/src/components/Project/Slide';
import AvatarWrapper from '@/src/components/Project/Avatar';
import ScriptWrapper from '@/src/components/Project/Script';

const ProjectDetail = () => {
  return (
    <MainComponent>
      <SlideWrapper
      />
      <AvatarWrapper
      />
      <ScriptWrapper
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