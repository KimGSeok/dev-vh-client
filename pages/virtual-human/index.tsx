import styled from "@emotion/styled";
import { MouseEvent, useState } from 'react';
import { dehydrate, QueryClient } from "react-query";
import Filter from "@components/Filter";
import PageTitle from "@components/layout/PageTitle";
import Search from "@components/Search";
import { CSS_TYPE, color } from "@styles/styles";
import Portal from '@components/Portal';
import Modal from '@components/Modal';
import ModalContent from '@components/virtual-human/ModalContent';
import { prefetchVirtualHumanLists, useVirtualHumanLists } from "@hooks/queries/virtual-human";
import { getVirtualHumanStatusToKorean } from "@modules/virtual-human/virtualHumanStatus";
import { handleDelete } from '@hooks/asyncHooks';
import RightSide from "@components/RightSide";
import { getUserInfo } from "@lib/auth/cookie";
import MasterAuthRightSideComponent from "@components/virtual-human/MasterAuthRightSideComponent";
import { KeyValueProps } from "@modules/interface";
import PageLoading from "@components/loading/PageLoading";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const VirtualHuman = () => {

  const { isLoading, data, refetch } = useVirtualHumanLists();

  // Hooks
  const [showGenerateModal, setShowGenerateModal] = useState<boolean>(false);
  const [showPlayMediaModal, setPlayMediaModal] = useState<boolean>(false);
  const [virtualHumanInfo, setVirtualHumanInfo] = useState<KeyValueProps>({});
  const [showMasterAuthSideContainer, setShowMasterAuthSideContainer] = useState<boolean>(false);
  const [virtualHumanType, setVirtualHumanType] = useState<string>('voice');

  const virtualHumanChildren =
    <ModalContent
      avatarType={virtualHumanType}
      setAvatarType={setVirtualHumanType}
    />;

  const sideContainerChildren =
    <MasterAuthRightSideComponent
      virtualHumanInfo={virtualHumanInfo}
      setShowComponent={setShowMasterAuthSideContainer}
    />;

  const onClickLearningCompleteVhHandler = (item: KeyValueProps) => {

    setVirtualHumanInfo(item)
    if (item.status === 'complete') {

      const userRole = getUserInfo('organization_role');
      if (userRole === 'master')
        setShowMasterAuthSideContainer(true);
    }
  }

  const onClickDeleteVirtualHumanHandler = async (e: MouseEvent, item: any) => {
    e.stopPropagation();

    if (item.id) {
      const result = confirm(item.name + '을\n삭제하시겠어요?');
      if (result) {
        const { data } = await handleDelete('virtual-human', item.id);

        if (data.affectedRows > 0) {
          alert('삭제되었어요.');
          refetch();
        }
        else {
          alert('삭제중에 에러가 발생했어요.\n관리자에게 문의해주세요.');
        }
      }
    }
  }

  return (
    <>
      {isLoading && <PageLoading />}
      <MainComponent>
        <PageTitle
          title={'가상인간'}
          registerBtn={true}
          btn={'생성하기'}
          event={'onClick'}
          func={() => { setShowGenerateModal(true) }}
        />
        <Filter />
        <Search />
        <Container>
          <VirtualHumanLists>
            {
              data && data.length > 0 ?
                data.map((item: any, index: any) => {
                  return (
                    <VirtualHumanList
                      key={item.uuid}
                      background={item.type === 'voice' ? 'linear-gradient(135deg, #FFF0D2, rgba(255, 240, 210, 0.4), #ffffff)' : 'linear-gradient(135deg, #EBEBEB, rgba(235, 235, 235, 0.4), #ffffff)'}
                      cursor={item.status === 'complete' ? 'pointer' : ''}
                      onClick={() => onClickLearningCompleteVhHandler(item)}
                    >
                      <VirtualHumanItem>
                        <ItemHeader>
                          <div>{item.type === 'voice' ? '목소리' : '아바타'}</div>
                          <div>{item.created_date_at}</div>
                        </ItemHeader>
                        <ItemContent>{item.name}</ItemContent>
                        <StatusContainer>
                          <ItemStatus
                            color={getVirtualHumanStatusToKorean('color', item.status)}
                          >{getVirtualHumanStatusToKorean('string', item.status)}
                          </ItemStatus>
                          <DeleteBtn
                            onClick={(e) => onClickDeleteVirtualHumanHandler(e, item)}
                          >삭제하기</DeleteBtn>
                        </StatusContainer>
                      </VirtualHumanItem>
                    </VirtualHumanList>
                  )
                })
                : <EmptyList>생성된 가상인간이 없어요.</EmptyList>
            }
          </VirtualHumanLists>
        </Container>
        {
          showGenerateModal &&
          <Portal
            id={'#portal'}
          >
            <Modal
              title={'가상인간 생성하기'}
              modal={showGenerateModal}
              setModal={setShowGenerateModal}
              children={virtualHumanChildren}
            />
          </Portal>
        }
        {
          showMasterAuthSideContainer &&
          <Portal
            id={'#portal'}
          >
            <RightSide
              children={sideContainerChildren}
              showRightSide={showMasterAuthSideContainer}
              setShowRightSide={setShowMasterAuthSideContainer}
            />
          </Portal>
        }
      </MainComponent>
    </>
  )
}

const MainComponent = styled.div({});
const Container = styled.div({
  position: 'relative',
  margin: '16px 0 0 0',
  textAlign: 'center',
  borderTop: `1px solid ${color.ModernGrey}`
})
const VirtualHumanLists = styled.ul({
  width: '100%',
  display: 'flex',
  position: 'relative',
  flexWrap: 'wrap',
  padding: '20px 8px'
})
const VirtualHumanList = styled.li<CSS_TYPE>(
  {
    position: 'relative',
    width: 'calc((100% / 8) - 24px)',
    borderRadius: '16px',
    textAlign: 'start',
    margin: '0 12px 20px 12px',
    filter: 'drop-shadow(16px 8px 25px rgba(132, 132, 132, 0.2))',
    transition: 'all 0.3s',

    ':after': {
      display: 'block',
      content: '" "',
      padding: '0 0 100% 0'
    },

    ':hover': {
      transform: 'translate(0, -8px)'
    }
  },
  props => ({
    background: props.background,
    cursor: props.cursor
  })
)
const VirtualHumanItem = styled.div({
  position: 'absolute',
  width: '100%',
  height: '100%',
  padding: '10%'
})
const ItemHeader = styled.div({
  height: '10%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '0.9rem',
  color: color.DeActiveColor,

  '@media screen and (max-width: 1600px)': {
    fontSize: '0.8rem',
  },

  '@media screen and (max-width: 1440px)': {
    fontSize: '0.7rem',
  },

  '@media screen and (max-width: 1023px)': {
    fontSize: '0.6rem',
  },

  '@media screen and (max-width: 960px)': {
    fontSize: '0.55rem',
  }
})
const ItemContent = styled.div({
  minHeight: '75%',
  fontSize: '1rem',
  fontWeight: '600',
  padding: '10% 0',

  '@media screen and (max-width: 1600px)': {
    fontSize: '0.9rem',
  },

  '@media screen and (max-width: 1440px)': {
    fontSize: '0.8rem',
  },

  '@media screen and (max-width: 1023px)': {
    fontSize: '0.7rem',
  },

  '@media screen and (max-width: 960px)': {
    fontSize: '0.6rem',
  }
})
const StatusContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '@media screen and (max-width: 1600px)': {
    fontSize: '0.8rem',
  },

  '@media screen and (max-width: 1440px)': {
    fontSize: '0.7rem',
  },

  '@media screen and (max-width: 1023px)': {
    fontSize: '0.6rem',
  },

  '@media screen and (max-width: 960px)': {
    fontSize: '0.55rem',
  }
})
const DeleteBtn = styled.div({
  color: color.Red,
  fontSize: '0.85rem',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.15s',
  padding: '0 1px',

  ":hover": {
    transform: 'scale(1.1)',
    fontWeight: '800',
  },

  '@media screen and (max-width: 1600px)': {
    fontSize: '0.8rem',
  },

  '@media screen and (max-width: 1440px)': {
    fontSize: '0.7rem',
  },

  '@media screen and (max-width: 1023px)': {
    fontSize: '0.6rem',
  },

  '@media screen and (max-width: 960px)': {
    fontSize: '0.55rem',
  }
})
const ItemStatus = styled.div<CSS_TYPE>(
  {
    fontSize: '0.85rem',
    fontWeight: '500',

    '@media screen and (max-width: 1600px)': {
      fontSize: '0.8rem',
    },

    '@media screen and (max-width: 1440px)': {
      fontSize: '0.7rem',
    },

    '@media screen and (max-width: 1023px)': {
      fontSize: '0.6rem',
    },

    '@media screen and (max-width: 960px)': {
      fontSize: '0.55rem',
    }
  },
  props => ({
    color: props.color ? props.color : color.BasicBlue
  })
)
const EmptyList = styled.div({
  height: '10%',
  fontSize: '1rem',
  fontWeight: '300',
  color: color.DeActiveColor,
  margin: '0 auto'
})

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  let queryClient = new QueryClient();

  try {
    let cookie: any = context.req.headers.cookie; // Session Cookie
    cookie = cookie ? cookie.split("=")[1] : '';

    queryClient = await prefetchVirtualHumanLists(cookie);

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

export default VirtualHuman;