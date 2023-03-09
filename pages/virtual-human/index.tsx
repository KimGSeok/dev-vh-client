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

const VirtualHuman = () => {

  // Hooks
  const [list, setList] = useState([]);
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
            <VirtualHumanList
              background={'linear-gradient(135deg, #FFF0D2, rgba(255, 240, 210, 0.4), #ffffff)'}
            >
              <VirtualHumanItem>
                <ItemHeader>
                  <div>목소리</div>
                  <div>2023.02.24</div>
                </ItemHeader>
                <ItemContent>DRX Beryl</ItemContent>
                <ItemStatus>학습완료</ItemStatus>
              </VirtualHumanItem>
            </VirtualHumanList>
            <VirtualHumanList
              background={'linear-gradient(135deg, #EBEBEB, rgba(235, 235, 235, 0.4), #ffffff)'}
            >
              <VirtualHumanItem>
                <ItemHeader>
                  <div>목소리</div>
                  <div>2023.02.24</div>
                </ItemHeader>
                <ItemContent>DRX Beryl</ItemContent>
                <ItemStatus>학습중</ItemStatus>
              </VirtualHumanItem>
            </VirtualHumanList>
            <VirtualHumanList
              background={'linear-gradient(135deg, #EBEBEB, rgba(235, 235, 235, 0.4), #ffffff)'}
            >
              <VirtualHumanItem>
                <ItemHeader>
                  <div>목소리</div>
                  <div>2023.02.24</div>
                </ItemHeader>
                <ItemContent>DRX Beryl</ItemContent>
                <ItemStatus>학습중</ItemStatus>
              </VirtualHumanItem>
            </VirtualHumanList>
            <VirtualHumanList
              background={'linear-gradient(135deg, #EBEBEB, rgba(235, 235, 235, 0.4), #ffffff)'}
            >
              <VirtualHumanItem>
                <ItemHeader>
                  <div>목소리</div>
                  <div>2023.02.24</div>
                </ItemHeader>
                <ItemContent>DRX Beryl</ItemContent>
                <ItemStatus>학습중</ItemStatus>
              </VirtualHumanItem>
            </VirtualHumanList>
            <VirtualHumanList
              background={'linear-gradient(135deg, #FFF0D2, rgba(255, 240, 210, 0.4), #ffffff)'}
            >
              <VirtualHumanItem>
                <ItemHeader>
                  <div>목소리</div>
                  <div>2023.02.24</div>
                </ItemHeader>
                <ItemContent>DRX Beryl</ItemContent>
                <ItemStatus color={color.WaringRed}>학습실패</ItemStatus>
              </VirtualHumanItem>
            </VirtualHumanList>
            <VirtualHumanList
              background={'linear-gradient(135deg, #EBEBEB, rgba(235, 235, 235, 0.4), #ffffff)'}
            >
              <VirtualHumanItem>
                <ItemHeader>
                  <div>목소리</div>
                  <div>2023.02.24</div>
                </ItemHeader>
                <ItemContent>DRX Beryl</ItemContent>
                <ItemStatus>학습중</ItemStatus>
              </VirtualHumanItem>
            </VirtualHumanList>
            <VirtualHumanList
              background={'linear-gradient(135deg, #FFF0D2, rgba(255, 240, 210, 0.4), #ffffff)'}
            >
              <VirtualHumanItem>
                <ItemHeader>
                  <div>목소리</div>
                  <div>2023.02.24</div>
                </ItemHeader>
                <ItemContent>DRX Beryl</ItemContent>
                <ItemStatus>학습중</ItemStatus>
              </VirtualHumanItem>
            </VirtualHumanList>
            <VirtualHumanList
              background={'linear-gradient(135deg, #EBEBEB, rgba(235, 235, 235, 0.4), #ffffff)'}
            >
              <VirtualHumanItem>
                <ItemHeader>
                  <div>목소리</div>
                  <div>2023.02.24</div>
                </ItemHeader>
                <ItemContent>DRX Beryl</ItemContent>
                <ItemStatus>학습중</ItemStatus>
              </VirtualHumanItem>
            </VirtualHumanList>
            <VirtualHumanList
              background={'linear-gradient(135deg, #FFF0D2, rgba(255, 240, 210, 0.4), #ffffff)'}
            >
              <VirtualHumanItem>
                <ItemHeader>
                  <div>목소리</div>
                  <div>2023.02.24</div>
                </ItemHeader>
                <ItemContent>DRX Beryl</ItemContent>
                <ItemStatus>학습중</ItemStatus>
              </VirtualHumanItem>
            </VirtualHumanList>
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
  position: 'relative',
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  padding: '20px 8px'
})
const VirtualHumanList = styled.li<CSS_TYPE>(
  {
    position: 'relative',
    width: 'calc((100% / 8) - 12px)',
    borderRadius: '16px',
    textAlign: 'start',
    margin: '0 0 20px 0',
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
  color: color.DeActiveColor
})
const ItemContent = styled.div({
  height: '80%',
  fontSize: '1.1rem',
  fontWeight: '600',
  padding: '10% 0'
})
const ItemStatus = styled.div<CSS_TYPE>(
  {
    fontSize: '0.9rem',
    fontWeight: '500'
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

export default VirtualHuman;