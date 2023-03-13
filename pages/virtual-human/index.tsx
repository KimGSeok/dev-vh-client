import styled from "@emotion/styled";
import { useState } from 'react';
import { useQuery } from 'react-query';
import Filter from "@components/Filter";
import PageTitle from "@components/layout/PageTitle";
import Search from "@components/Search";
import { CSS_TYPE, color } from "@styles/styles";
import Portal from '@components/Portal';
import Modal from '@components/Modal';
import ModalContent from '@components/virtual-human/ModalContent';
import { getVirtualHumanList } from "@hooks/queries/virtual-human";
import { getVirtualHumanStatusToKorean } from "@modules/virtual-human/virtualHumanStatus";

const VirtualHuman = () => {

  const { data } = useQuery(['virtual-human'], getVirtualHumanList, { staleTime: 10 * 1000 });

  // Hooks
  const [showModal, setShowModal] = useState<boolean>(false);
  const [virtualHumanType, setVirtualHumanType] = useState<string>('voice');

  const virtualHumanChildren =
    <ModalContent
      avatarType={virtualHumanType}
      setAvatarType={setVirtualHumanType}
    />;

  return (
    <>
      <MainComponent>
        <PageTitle
          title={'가상인간'}
          registerBtn={true}
          btn={'생성하기'}
          event={'onClick'}
          func={() => { setShowModal(true) }}
        />
        <Filter />
        <Search />
        <Container>
          <VirtualHumanLists>
            {
              data && data.length > 0 ?
                data.map((item: any, index: any) => {
                  return(
                    <VirtualHumanList
                      key={item.uuid}
                      background={item.type === 'voice' ? 'linear-gradient(135deg, #FFF0D2, rgba(255, 240, 210, 0.4), #ffffff)': 'linear-gradient(135deg, #EBEBEB, rgba(235, 235, 235, 0.4), #ffffff)'}
                    >
                      <VirtualHumanItem>
                        <ItemHeader>
                          <div>{item.type === 'voice' ? '목소리' : '아바타'}</div>
                          <div>{item.created_date_at}</div>
                        </ItemHeader>
                        <ItemContent>{item.name}</ItemContent>
                        <ItemStatus
                          color={getVirtualHumanStatusToKorean('color', item.status)}
                        >{getVirtualHumanStatusToKorean('string', item.status)}</ItemStatus>
                      </VirtualHumanItem>
                    </VirtualHumanList>
                  )
                })
               : <EmptyList></EmptyList>
            }
          </VirtualHumanLists>
        </Container>
        {
          showModal &&
          <Portal>
            <Modal
              title={'가상인간 생성하기'}
              modal={showModal}
              setModal={setShowModal}
              children={virtualHumanChildren}
            />
          </Portal>
        }
      </MainComponent>
    </>
  )
}

const MainComponent = styled.div({

})
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
    cursor: 'pointer',

    ':after': {
      display: 'block',
      content: '" "',
      padding: '0 0 100% 0'
    },

    ':hover': {
      transform: 'translate(0, -12px)'
    }
  },
  props => ({
    background: props.background
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
  height: '80%',
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
const ItemStatus = styled.div<CSS_TYPE>(
  {
    fontSize: '0.9rem',
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
  padding: '24px 0'
})

// export const getServerSideProps: GetServerSideProps = async () => {

//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery('[virtualHuman]', getVirtualHumanList)

//   return{
//     props :{

//     }
//   }
// }

export default VirtualHuman;