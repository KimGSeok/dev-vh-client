import styled from "@emotion/styled";
import { CSS_TYPE, color } from "@styles/styles";
import Filter from "@components/Filter";
import PageTitle from "@components/layout/PageTitle";
import Search from "@components/Search";
import { useRouter } from "next/navigation";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { dehydrate, QueryClient } from "react-query";
import { prefetchUsersLists, useUsersLists } from "@hooks/queries/users";
import Portal from '@components/Portal';
import Modal from '@components/Modal';
import ModalContent from '@components/users/ModalContent';
import { useState, useEffect } from "react";

const Users = () => {

  const router = useRouter();
  const [isTab, setIsTab] = useState<string>('all');
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data, refetch } = useUsersLists(isTab);

  const children = <ModalContent />;

  let sequence = data && data.userList.length;

  useEffect(() => {
    refetch();
  }, [isTab])

  return (
    <Container>
      <PageTitle
        title={'사용자'}
        registerBtn={true}
        btn={'추가하기'}
        event={'onClick'}
        func={() => {
          setShowModal(true);
        }}
      />
      <Filter />
      <Search />
      <ListsContainer>
        <TabLists>
          <TabList
            borderBottom={isTab === 'all' ? `1px solid ${color.BasicBlack}` : `1px solid ${color.White}`}
            opacity={isTab === 'all' ? '1' : '0.3'}
            onClick={() => setIsTab('all')}
          >
            <TabName>전체&#40;{data && data.totalCount}&#41;</TabName>
          </TabList>
          {
            data && data.allOrganizationList.map((item: any) => {
              return (
                <TabList
                  key={item.uuid}
                  borderBottom={isTab === item.id ? `1px solid ${color.BasicBlack}` : `1px solid ${color.White}`}
                  opacity={isTab === item.id ? '1' : '0.3'}
                  onClick={() => setIsTab(item.id)}
                >
                  <TabName>{item.name}&#40;{item.count}&#41;</TabName>
                </TabList>
              )
            })
          }
        </TabLists>
        <UsersContainer>
          <HeaderContainer>
            <Lists>
              <List
                width={'5%'}
              >순번</List>
              <List
                width={'25%'}
              >계정명</List>
              <List
                width={'10%'}
              >성명</List>
              <List
                width={'13%'}
              >연락처</List>
              <List
                width={'10%'}
              >소속</List>
              <List
                width={'7%'}
              >권한</List>
              <List
                width={'10%'}
              >상태</List>
              <List
                width={'15%'}
              >생성일자</List>
              <List
                width={'15%'}
              >수정일자</List>
            </Lists>
          </HeaderContainer>
          <BodyContainer>
            {
              data && data.userList.map((item: any,) => {
                return (
                  <Lists
                    key={item.uuid}
                    backgroundColor={color.AliceBlue}
                    cursor={'pointer'}
                    onClick={() => router.push(`users/${item.id}`)}
                  >
                    <List
                      width={'5%'}
                    >{sequence--}</List>
                    <List
                      width={'25%'}
                    >{item.account}</List>
                    <List
                      width={'10%'}
                    >{item.name}</List>
                    <List
                      width={'13%'}
                    >{item.phone}</List>
                    <List
                      width={'10%'}
                    >{item.organization_name}</List>
                    <List
                      width={'7%'}
                    >{item.role}</List>
                    <List
                      width={'10%'}
                    >정상</List>
                    <List
                      width={'15%'}
                    >{item.created_at}</List>
                    <List
                      width={'15%'}
                    >{item.updated_at}</List>
                  </Lists>
                )
              })
            }
          </BodyContainer>
        </UsersContainer>
      </ListsContainer>
      {
        showModal &&
        <Portal
          id={'#portal'}
        >
          <Modal
            title={'사용자 생성하기'}
            modal={showModal}
            setModal={setShowModal}
            children={children}
          />
        </Portal>
      }
    </Container>
  )
}

const Container = styled.div({})
const ListsContainer = styled.div({

})
const TabLists = styled.ul({
  display: 'flex',
  alignItems: 'center',
})
const TabList = styled.li<CSS_TYPE>(
  {
    fontSize: '0.95rem',
    padding: '8px 16px',
    cursor: 'pointer',
    transition: 'all 0.15s'
  },
  props => ({
    borderBottom: props.borderBottom,
    opacity: props.opacity
  })
)
const TabName = styled.div({

})
const UsersContainer = styled.div({
  fontSize: '1rem',
})
const HeaderContainer = styled.div({
  position: 'relative',
  width: '100%',
  borderTop: `1px solid ${color.ModernGrey}`,
  borderBottom: `1px solid ${color.ModernGrey}`,
})
const BodyContainer = styled.div({})
const Lists = styled.ul<CSS_TYPE>(
  {
    position: 'relative',
    width: '100%',
    display: 'flex',
    padding: '12px 16px',
    alignItems: 'center',
    textAlign: 'center'
  },
  props => ({
    cursor: props.cursor,

    ":hover": {
      backgroundColor: props.backgroundColor
    },
  })
)
const List = styled.li<CSS_TYPE>(
  {
    textAlign: 'center',
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

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

  let queryClient = new QueryClient();

  try {
    let cookie: any = context.req.headers.cookie; // Session Cookie
    cookie = cookie ? cookie.split("=")[1] : '';

    queryClient = await prefetchUsersLists(cookie, 'all');

    return {
      props: {
        dehydrateState: dehydrate(queryClient),
      }
    }
  } catch (error) {
    return {
      notFound: true,
    }
  } finally {
    queryClient.clear()
  }
}

export default Users;