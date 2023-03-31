import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styled from '@emotion/styled';
import { v4 as uuidV4 } from 'uuid';
import dynamic from "next/dynamic";
import { color, ImageElement, RadiusButton, VerticalBar } from '@styles/styles';
import PageLoading from "@components/loading/PageLoading";
const AvatarWrapper = dynamic(() => import('@components/project/avatar/Avatar'), { ssr: false });
const ScriptWrapper = dynamic(() => import('@components/project/script/Script'), { ssr: false });
import { ProjectProps } from '@modules/interface';
import useOnChangeRouterHandler from '@hooks/useOnChangeRouter';
import { getProjectDetailInfo } from '@hooks/queries/project';

const ProjectGenerate = () => {

  // Parameter
  const projectId: string = useSearchParams().get('projectId')!;
  const { isLoading, data } = useQuery(['project-detail', projectId], () => { return getProjectDetailInfo(projectId) }, { staleTime: 10 * 1000 });

  // Hooks
  const router = useRouter();
  const nameRef = useRef<any>(null);
  const [isTransform, setIsTransform] = useState<boolean>(false);
  const [pageMount, setPageMount] = useState<boolean>(false);
  const [project, setProject] = useState<ProjectProps>({
    projectName: data && data.name,
    projectId: useSearchParams().get('projectId')!,
    uuid: uuidV4(),
    avatar: {
      name: '',
      model: '',
      imageFileUrl: ''
    },
    voice: {
      name: '',
      model: '',
      imageFileUrl: ''
    },
    scriptList: [
      { uuid: uuidV4(), text: '', speed: 1.0, pauseSecond: 0.5 }
    ],
    thumbnail: null,
  });

  // onLeave Page Event
  useOnChangeRouterHandler();

  useEffect(() => {

    if (nameRef.current)
      nameRef.current.innerText = data.name;
  }, [data])

  return (
    isLoading ?
      <PageLoading />
      : <ProjectContainer>
        <HeaderContainer>
          <LeftContainer>
            <Link href={'/project'} passHref>
              <RadiusButton
                display={'flex'}
                alignItems={'center'}
                padding={'8px 28px 8px 20px'}
                fontWeight={'700'}
              >
                <ImageElement
                  src="/icons/arrow/single_arrow_left_black.svg"
                  width={20}
                  height={20}
                  alt="arrow_left"
                />
                목록으로 가기
              </RadiusButton>
            </Link>
            <TitleContainer>
              <VerticalBar
                backgroundColor={color.DarkWhite}
                borderRadius={'16px'}
              />
              <Title
                ref={nameRef}
                contentEditable={true}
                placeholder={'프로젝트 이름을 입력해주세요.'}
              />
            </TitleContainer>
          </LeftContainer>
          <RadiusButton
            display={'flex'}
            alignItems={'center'}
            padding={'8px 32px'}
            fontWeight={'700'}
            onClick={() => setIsTransform(true)}
          >변환하기</RadiusButton>
        </HeaderContainer>
        <MainComponent>
          <AvatarWrapper
            project={project}
            setProject={setProject}
          />
          <ScriptWrapper
            name={data.name}
            project={project}
            setProject={setProject}
            isTransform={isTransform}
            setIsTransform={setIsTransform}
          />
        </MainComponent>
      </ProjectContainer>
  )
}

const ProjectContainer = styled.div({
  position: 'relative',
  width: '100%',
})
const HeaderContainer = styled.div({
  position: 'relative',
  width: '100%',
  height: 'calc(5vh - 12px)',
  margin: '0 0 12px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
})
const LeftContainer = styled.div({
  display: 'flex',
  alignItems: 'center'
})
const TitleContainer = styled.div({
  color: color.ModernWhite,
  margin: '0 0 0 16px;',
  display: 'flex',
  alignItems: 'center'
})
const Title = styled.div({
  fontSize: '1.2rem',
  margin: '0 0 0 12px',
  minWidth: '160px'
})
const MainComponent = styled.div({
  display: 'flex',
  width: '100%',
  height: 'calc(95vh - 48px)',
  position: 'relative'
})

export default ProjectGenerate;