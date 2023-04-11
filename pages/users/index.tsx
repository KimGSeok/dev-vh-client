import { useState, MouseEvent } from "react";
import Filter from "@components/Filter";
import PageTitle from "@components/layout/PageTitle";
import Search from "@components/Search";
import { CSS_TYPE, color, ImageWrap, ImageElement } from "@styles/styles";
import styled from "@emotion/styled";

const Users = () =>{
  return(
    <UsersContainer>
      <PageTitle
        title={'사용자'}
        registerBtn={true}
        btn={'생성하기'}
        event={'onClick'}
        func={() => {}}
      />
      <Filter />
      <Search />
    </UsersContainer>
  )
}

const UsersContainer = styled.div({

})

export default Users;