'use client';

import Filter from "@/src/components/Filter";
import PageTitle from "@/src/components/layout/PageTitle";
import Search from "@/src/components/Search";
import styled from "@emotion/styled";

const Project = () => {
  return (
    <MainComponent>
      <PageTitle
        title={'프로젝트'}
        registerBtn={true}
        btn={'생성하기'}
        link={'/project/detail'}
      />
      <Filter />
      <Search />
      Project 페이지
    </MainComponent>
  )
}

const MainComponent = styled.div({

})

export default Project;