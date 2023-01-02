import styled from '@emotion/styled';
import { color } from '@/src/styles/styles';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const HeaderComponent = () =>{

  // Hooks
  const router = useRouter();

  return(
    <Header>
      <HeaderWrap>
        <LogoWrap>
          로고
        </LogoWrap>
        <GNBLists>
          <GNBList onClick={() => router.push('/')}>홈</GNBList>
          <GNBList onClick={() => router.push('/audio')}>음성 프로젝트</GNBList>
          <GNBList onClick={() => router.push('/video')}>영상 프로젝트</GNBList>
          <GNBList onClick={() => router.push('/twin')}>트윈 관리</GNBList>
        </GNBLists>
        <ProfileWrap>
          와핑 스튜디오님
        </ProfileWrap>
      </HeaderWrap>
    </Header>
  )
}

const Header = styled.header({
  width: '100%',
  height: '72px',
  position: 'fixed',
  backgroundColor: color.BasicColor,
  color: color.White,
})
const HeaderWrap = styled.div({
  width: '100%',
  height: '100%',
  padding: '0 48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
})
const LogoWrap = styled.div({

})
const GNBLists = styled.ul({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})
const GNBList = styled.li({
  fontSize: '1rem',
  padding: '8px 16px',
  margin: '0 24px',
  cursor: 'pointer'
})
const ProfileWrap = styled.div({
  fontSize: '1rem',
  textAlign: 'right'
})

export default HeaderComponent;