import styled from '@emotion/styled';
import { CSS_TYPE, color } from '@/src/styles/styles';

const Avatar = () => {
  return (
    <AvatarWrapper>
      아바타
    </AvatarWrapper>
  )
}
const AvatarWrapper = styled.div({
  width: 'calc(35% - 16px)',
  height: '100%',
  backgroundColor: color.White,
  margin: '0 24px',
  borderRadius: '16px'
})

export default Avatar;