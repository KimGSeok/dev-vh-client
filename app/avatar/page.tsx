'use client';

import { useRouter } from 'next/navigation';
import styled from "@emotion/styled";
import Filter from "@/src/components/Filter";
import PageTitle from "@/src/components/layout/PageTitle";
import Search from "@/src/components/Search";
import { useState } from 'react';
import Portal from '@/src/components/Portal';
import Modal from '@/src/components/Modal';
import ModalContent from '@/src/components/avatar/ModalContent';

const Avatar = () => {

  // Hooks
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [avatarType, setAvatarType] = useState<string>('voice');
  const [avatarName, setAvatarName] = useState<string>('');

  // Modal에 전달할 Avatar Generate Modal Content
  const AvatarChildren =
    <ModalContent
      avatarType={avatarType}
      setAvatarType={setAvatarType}
      avatarName={avatarName}
      setAvatarName={setAvatarName}
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
        {
          showModal &&
          <Portal>
            <Modal
              title={'아바타 생성하기'}
              modal={showModal}
              setModal={setShowModal}
              children={AvatarChildren}
            />
          </Portal>
        }
      </AvatarWrapper>
    </MainComponent>
  )
}

const MainComponent = styled.div({

})
const AvatarWrapper = styled.div({

})

export default Avatar;