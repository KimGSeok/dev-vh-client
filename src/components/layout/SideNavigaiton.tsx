import { CSS_TYPE, color } from '@styles/styles';
import styled from '@emotion/styled';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const SideNavigation = () => {

  // Hooks
  const pathName = usePathname();
  const firstPathName = pathName?.split('/')[1];

  return (
    <SideNav>
      <GNBLists>
        <GNBList color={firstPathName === '' ? color.White : ''}>
          <Link href="/" passHref>Home</Link>
        </GNBList>
        <GNBList color={firstPathName === 'project' ? color.White : ''}>
          <Link href="/project" passHref>Project</Link>
        </GNBList>
        <GNBList color={firstPathName === 'virtual-human' ? color.White : ''}>
          <Link href="/virtual-human" passHref>Virtual Human</Link>
        </GNBList>
        {/* 마스터 계정 한정 */}
        <GNBList color={firstPathName === 'Organizations' ? color.White : ''}>
          <Link href="/" passHref>Organizations</Link>
        </GNBList>
        <GNBList color={firstPathName === 'users' ? color.White : ''}>
          <Link href="/" passHref>Users</Link>
        </GNBList>
        <GNBList color={firstPathName === 'mypage' ? color.White : ''}>
          <Link href="/" passHref>Mypage</Link>
        </GNBList>
      </GNBLists>
    </SideNav>
  )
}

const SideNav = styled.nav({
  width: '15%',
  color: color.White
})
const GNBLists = styled.ul({
  color: color.DeActiveColor
})
const GNBList = styled.li<CSS_TYPE>(
  {
    padding: '4px 0',
    margin: '20px 16px',
    fontSize: '1.2rem',
    cursor: 'pointer',

    ':hover': {
      fontWeight: '500',
      color: color.White
    }
  },
  props => ({
    color: props.color
  })
)

export default SideNavigation;