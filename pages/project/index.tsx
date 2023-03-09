import { useState } from "react";
import Filter from "@components/Filter";
import PageTitle from "@components/layout/PageTitle";
import Search from "@components/Search";
import { CSS_TYPE, color } from "@styles/styles";
import styled from "@emotion/styled";
import Portal from '@components/Portal';
import Modal from '@components/Modal';
import ModalContent from '@components/project/ModalContent';

const Project = () => {

  // Hooks
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Modal에 전달할 Avatar Generate Modal Content
  const projectChildren = <ModalContent />;

  return (
    <MainComponent>
      <PageTitle
        title={'프로젝트'}
        registerBtn={true}
        btn={'생성하기'}
        event={'onClick'}
        func={() => { setShowModal(true) }}
      />
      <Filter />
      <Search />
      <ProjectWrapper>
        <HeaderWrapper>
          <ProjectLists>
            <ProjectList
              fontSize={'1rem'}
              borderTop={`1px solid ${color.ModernGrey}`}
              borderBottom={`1px solid ${color.ModernGrey}`}
            >
              <ListInfo
                width={'10%'}
              >이미지</ListInfo>
              <ListInfo
                width={'25%'}
              >프로젝트명</ListInfo>
              <ListInfo
                width={'15%'}
              >아바타 명</ListInfo>
              <ListInfo
                width={'15%'}
              >프로젝트 길이</ListInfo>
              <ListInfo
                width={'15%'}
              >최근 수정날짜</ListInfo>
              <ListInfo
                width={'15%'}
              >상태</ListInfo>
            </ProjectList>
          </ProjectLists>
        </HeaderWrapper>
        <ListWrapper>
          <ProjectLists>
            {
              list && list.length > 0 ?
                list.map((item: any, index: any) => {
                  return (
                    <ProjectList key={index}>
                      <ListInfo
                        width={'10%'}
                        color={''}
                        fontSize={''}
                        fontWeight={''}
                      >이미지
                      </ListInfo>
                      <ListInfo
                        width={'25%'}
                        color={''}
                        fontSize={''}
                        fontWeight={''}
                      >이미지
                      </ListInfo>
                      <ListInfo
                        width={'15%'}
                        color={''}
                        fontSize={''}
                        fontWeight={''}
                      >이미지
                      </ListInfo>
                      <ListInfo
                        width={'15%'}
                        color={''}
                        fontSize={''}
                        fontWeight={''}
                      >이미지
                      </ListInfo>
                      <ListInfo
                        width={'15%'}
                        color={''}
                        fontSize={''}
                        fontWeight={''}
                      >이미지
                      </ListInfo>
                      <ListInfo
                        width={'15%'}
                        color={''}
                        fontSize={''}
                        fontWeight={''}
                      >상태
                      </ListInfo>
                    </ProjectList>
                  )
                }) : <EmptyList>프로젝트 목록이 없습니다.</EmptyList>
            }
          </ProjectLists>
        </ListWrapper>
      </ProjectWrapper>
      {
        showModal &&
        <Portal>
          <Modal
            title={'프로젝트 생성하기'}
            modal={showModal}
            setModal={setShowModal}
            children={projectChildren}
          />
        </Portal>
      }
    </MainComponent>
  )
}

const MainComponent = styled.div({

})
const ProjectWrapper = styled.div({
  margin: '16px 0 0 0',
  textAlign: 'center'
})
const HeaderWrapper = styled.div({

})
const ListWrapper = styled.div({

})
const ProjectLists = styled.ul<CSS_TYPE>(
  {

  }
)
const ProjectList = styled.li<CSS_TYPE>(
  {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 0'
  },
  props => ({
    borderTop: props.borderTop,
    borderBottom: props.borderBottom,
    fontSize: props.fontSize,
    color: props.color ? props.color : color.BasicBlack
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

export default Project;