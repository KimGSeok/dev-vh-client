'use client';

import { useRouter } from 'next/navigation';
import styled from "@emotion/styled";
import Filter from "@/src/components/Filter";
import PageTitle from "@/src/components/layout/PageTitle";
import Search from "@/src/components/Search";

const Avatar = () => {

  // Hooks
  const router = useRouter();

  return (
    <MainComponent>
      <PageTitle
        title={'아바타'}
        registerBtn={true}
        btn={'생성하기'}
        event={'onClick'}
        func={() => { router.push('/avatar/detail') }}
      />
      <Filter />
      <Search />
      <AvatarWrapper>

      </AvatarWrapper>
    </MainComponent>
  )
}

const MainComponent = styled.div({

})
const AvatarWrapper = styled.div({

})

export default Avatar;