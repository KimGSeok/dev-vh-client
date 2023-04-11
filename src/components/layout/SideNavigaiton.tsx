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
        <Link href="/" passHref>
          <GNBList color={firstPathName === '' ? color.White : ''}>
            Home
          </GNBList>
        </Link>
        <Link href="/project" passHref>
          <GNBList color={firstPathName === 'project' ? color.White : ''}>
            Project
          </GNBList>
        </Link>
        <Link href="/virtual-human" passHref>
          <GNBList color={firstPathName === 'virtual-human' ? color.White : ''}>
            Virtual Human
          </GNBList>
        </Link>
        <Link href="/users" passHref>
          <GNBList color={firstPathName === 'users' ? color.White : ''}>
            Users
          </GNBList>
        </Link>
        {/* 마스터 계정 한정 */}
        {/* <Link href="/" passHref>
          <GNBList color={firstPathName === 'Organizations' ? color.White : ''}>
            Organizations
          </GNBList>
        </Link>
        <Link href="/" passHref>
          <GNBList color={firstPathName === 'mypage' ? color.White : ''}>
            Mypage
          </GNBList>
        </Link> */}
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