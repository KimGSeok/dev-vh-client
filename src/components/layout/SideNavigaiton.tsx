import { CSS_TYPE, color } from '@/src/styles/styles';
import styled from '@emotion/styled';
import { useRouter, usePathname } from 'next/navigation';

const SideNavigation = () => {

  // Hooks
  const router = useRouter();
  const pathName = usePathname();
  const firstPathName = pathName?.split('/')[1];

  return (
    <SideNav>
      <GNBLists>
        <GNBList
          color={firstPathName === '' ? color.White : ''}
          onClick={() => router.push('/')}
        >Home</GNBList>
        <GNBList
          color={firstPathName === 'project' ? color.White : ''}
          onClick={() => router.push('/project')}
        >Project</GNBList>
        <GNBList
          color={firstPathName === 'avatar' ? color.White : ''}
          onClick={() => router.push('/avatar')}
        >Avatar</GNBList>
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