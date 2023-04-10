import { useState, MouseEvent } from "react";
import Filter from "@components/Filter";
import PageTitle from "@components/layout/PageTitle";
import Search from "@components/Search";
import { CSS_TYPE, color, ImageWrap, ImageElement } from "@styles/styles";
import styled from "@emotion/styled";
import Portal from '@components/Portal';
import Modal from '@components/Modal';
import ModalContent from '@components/project/ModalContent';
import { getProjectList } from "@hooks/queries/project";
import { useQuery } from "react-query";
import PageLoading from "@components/loading/PageLoading";
import { useRouter } from 'next/navigation';
import DownloadModalContent from "@components/project/DownloadModalContent";
import { KeyValueProps } from "@modules/interface";
import { handleDelete } from "@hooks/asyncHooks";

const Project = () => {

  const { isLoading, data, refetch } = useQuery(['project'], getProjectList, { staleTime: 10 * 1000 });

  // Hooks
  const router = useRouter();
  const [modalCategory, setModalCatergory] = useState<string>('');
  const [contents, setContents] = useState<KeyValueProps>({});
  const [contentsType, setContentsType] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  // Modal에 전달할 Avatar Generate Modal Content
  const projectChildren = <ModalContent />;
  const contentsChildren = <DownloadModalContent contents={contents} contentsType={contentsType} />;

  const handleClickDeleteProject = async (e: MouseEvent<HTMLImageElement>, item: KeyValueProps) => {
    e.stopPropagation();

    const result = await handleDelete('project', item.id);
    if (result.data.affectedRows > 0) {
      alert('프로젝트가 삭제되었습니다.');
      refetch();
    } else {
      alert('프로젝트에 실패했습니다.\n관리자에게 문의해주세요.');
    }
  }

  const handleClickContentsActionHandler = (e: MouseEvent<HTMLImageElement>, isContents: boolean, title: string, type: string, item: KeyValueProps) => {

    if (!isContents)
      return false;

    e.stopPropagation();
    setModalTitle(title);
    setModalCatergory('contents');
    setShowModal(true);
    setContents(item);
    setContentsType(type);
  }

  return (
    <>
      {isLoading && <PageLoading />}
      <MainComponent>
        <PageTitle
          title={'프로젝트'}
          registerBtn={true}
          btn={'생성하기'}
          event={'onClick'}
          func={() => {
            setModalTitle('프로젝트 생성하기');
            setShowModal(true);
            setModalCatergory('generate');
          }}
        />
        <Filter />
        <Search />
        <ProjectContainer>
          <HeaderWrapper>
            <ProjectLists>
              <ProjectList
                fontSize={'1rem'}
                borderTop={`1px solid ${color.ModernGrey}`}
                borderBottom={`1px solid ${color.ModernGrey}`}
              >
                <ListInfo
                  width={'10%'}
                ></ListInfo>
                <ListInfo
                  width={'15%'}
                >프로젝트명</ListInfo>
                <ListInfo
                  width={'12%'}
                >상태</ListInfo>
                <ListInfo
                  width={'12%'}
                >프로젝트 길이</ListInfo>
                <ListInfo
                  width={'15%'}
                >생성날짜</ListInfo>
                <ListInfo
                  width={'15%'}
                >최근 수정날짜</ListInfo>
                <ListInfo
                  width={'21%'}
                ></ListInfo>
              </ProjectList>
            </ProjectLists>
          </HeaderWrapper>
          <ListContainer>
            <ProjectLists>
              {
                data && data.length > 0 ?
                  data.map((item: any, index: any) => {

                    const isAudio = item.audio_download_url ? true : false;
                    const isVideo = item.video_download_url ? true : false;

                    return (
                      <ProjectList
                        id={item.uuid}
                        key={index}
                        fontSize={'0.95rem'}
                        cursor={'pointer'}
                        backgroundColor={color.AliceBlue}
                        onClick={() => router.push(`/project/generate?projectId=${item.id}`)}
                      >
                        <ListInfo
                          width={'10%'}
                          color={''}
                          fontSize={''}
                          fontWeight={''}
                        >
                          <ImageWrap
                            position={'relative'}
                            width={'35%'}
                            height={'35%'}
                            textAlign={'center'}
                            margin={'0 auto'}
                            top={'2px'}
                          >
                            <ImageElement
                              src="/images/avatar/default_human.svg"
                              width={24}
                              height={24}
                              style={{
                                width: '70%',
                                height: '70%',
                                margin: '4px auto',
                              }}
                              alt="default human"
                            />
                          </ImageWrap>
                        </ListInfo>
                        <ListInfo
                          width={'15%'}
                          color={''}
                          fontSize={''}
                          fontWeight={''}
                        >{item.name}
                        </ListInfo>
                        <ListInfo
                          width={'12%'}
                          color={''}
                          fontSize={''}
                          fontWeight={''}
                        >{item.status === 'active' ? '활성화' : '-'}</ListInfo>
                        <ListInfo
                          width={'12%'}
                          color={''}
                          fontSize={''}
                          fontWeight={''}
                        >-</ListInfo>
                        <ListInfo
                          width={'15%'}
                          color={''}
                          fontSize={''}
                          fontWeight={''}
                        >{item.created_at}
                        </ListInfo>
                        <ListInfo
                          width={'15%'}
                          color={''}
                          fontSize={''}
                          fontWeight={''}
                        >{item.updated_at}
                        </ListInfo>
                        <ListInfo
                          width={'21%'}
                          color={''}
                          fontSize={''}
                          fontWeight={''}
                        >
                          <ImageElement
                            src="/icons/copy.svg"
                            width={28}
                            height={28}
                            hoverbackground={color.SkyBlue}
                            style={{
                              position: 'relative',
                              margin: 'auto 4px',
                              padding: '4px',
                              borderRadius: '8px',
                              top: '2px'
                            }}
                            alt="copy"
                          />
                          <ImageElement
                            src="/icons/delete.svg"
                            width={28}
                            height={28}
                            hoverbackground={color.SkyBlue}
                            style={{
                              position: 'relative',
                              margin: 'auto 4px',
                              padding: '4px',
                              borderRadius: '8px',
                              top: '2px'
                            }}
                            onClick={(e) => handleClickDeleteProject(e, item)}
                            alt="delete"
                          />
                          <ImageElement
                            src="/icons/download.svg"
                            width={28}
                            height={28}
                            hoverbackground={(isAudio || isVideo) ? color.SkyBlue : ''}
                            style={{
                              position: 'relative',
                              margin: 'auto 4px',
                              padding: '4px',
                              borderRadius: '8px',
                              top: '2px',
                              opacity: (isAudio || isVideo) ? 1 : 0.3,
                              cursor: (isAudio || isVideo) ? 'pointer' : 'default'
                            }}
                            onClick={(e) => { handleClickContentsActionHandler(e, isAudio || isVideo, '컨텐츠 다운로드하기', 'download', item) }}
                            alt="download"
                          />
                          <ImageElement
                            src="/icons/play.svg"
                            width={28}
                            height={28}
                            hoverbackground={(isAudio || isVideo) ? color.SkyBlue : ''}
                            style={{
                              position: 'relative',
                              margin: 'auto 4px',
                              padding: '4px',
                              borderRadius: '8px',
                              top: '2px',
                              opacity: (isAudio || isVideo) ? 1 : 0.3,
                              cursor: (isAudio || isVideo) ? 'pointer' : 'default'
                            }}
                            alt="play"
                            onClick={(e) => { handleClickContentsActionHandler(e, isAudio || isVideo, '컨텐츠 재생하기', 'play', item) }}
                          />
                        </ListInfo>
                      </ProjectList>
                    )
                  }) : <EmptyList>프로젝트 목록이 없어요.</EmptyList>
              }
            </ProjectLists>
          </ListContainer>
        </ProjectContainer>
        {
          showModal &&
          <Portal>
            <Modal
              title={modalTitle}
              modal={showModal}
              setModal={setShowModal}
              children={modalCategory === 'contents' ? contentsChildren : projectChildren}
            />
          </Portal>
        }
      </MainComponent>
    </>
  )
}

const MainComponent = styled.div({
  position: 'relative',
  height: '100%'
})
const ProjectContainer = styled.div({
  margin: '16px 0 0 0',
  textAlign: 'center',
  position: 'relative',
  height: '80%'
})
const HeaderWrapper = styled.div({})
const ListContainer = styled.div({
  position: 'relative',
  height: '90%',
  overflowY: 'scroll',

  '::-webkit-scrollbar': {
    scrollBehavior: 'smooth',
    display: 'none'
  }
})
const ProjectLists = styled.ul<CSS_TYPE>({})
const ProjectList = styled.li<CSS_TYPE>(
  {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 0',

  },
  props => ({
    borderTop: props.borderTop,
    borderBottom: props.borderBottom,
    fontSize: props.fontSize,
    color: props.color ? props.color : color.BasicBlack,
    cursor: props.cursor,

    ":hover": {
      backgroundColor: props.backgroundColor
    }
  })
)
const ListInfo = styled.div<CSS_TYPE>(
  {

  },
  props => ({
    width: props.width
  })
)
const EmptyList = styled.div({
  fontSize: '1rem',
  fontWeight: '300',
  color: color.DeActiveColor,
  padding: '24px 0'
})

// export const getServerSideProps: GetServerSideProps = async () => {

//   // TODO Server Side에서 Cookie값을 못 읽는 듯
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery(['project'], getProjectList);

//   return {
//     props: {
//       dehydrateProps: dehydrate(queryClient),
//     }
//   }
// }

export default Project;