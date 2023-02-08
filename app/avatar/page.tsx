'use client';

import styled from "@emotion/styled";
import { useState } from 'react';
import Filter from "@/src/components/Filter";
import PageTitle from "@/src/components/layout/PageTitle";
import Search from "@/src/components/Search";
import { CSS_TYPE, color } from "@/src/styles/styles";
import Portal from '@/src/components/Portal';
import Modal from '@/src/components/Modal';
import ModalContent from '@/src/components/avatar/ModalContent';

const Avatar = () => {

  // Hooks
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [avatarType, setAvatarType] = useState<string>('voice');

  // Modal에 전달할 Avatar Generate Modal Content
  const avatarChildren =
    <ModalContent
      avatarType={avatarType}
      setAvatarType={setAvatarType}
    />;

  return (
    <MainComponent>
      <PageTitle
        title={'아바타'}
        registerBtn={true}
        btn={'생성하기'}
        event={'onClick'}
        func={() => { setShowModal(true) }}
      />
      <Filter />
      <Search />
      <AvatarWrapper>
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
                }) : <EmptyList>생성된 아바타가 존재하지 않습니다.</EmptyList>
            }
          </ProjectLists>
        </ListWrapper>
      </AvatarWrapper>
      {
        showModal &&
        <Portal>
          <Modal
            title={'아바타 생성하기'}
            modal={showModal}
            setModal={setShowModal}
            children={avatarChildren}
          />
        </Portal>
      }
    </MainComponent>
  )
}

const MainComponent = styled.div({

})
const AvatarWrapper = styled.div({
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

export default Avatar;