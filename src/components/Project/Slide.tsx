import styled from '@emotion/styled';
import { CSS_TYPE, color } from '@/src/styles/styles';

const Slide = () => {
  return (
    <SlideWrapper>
      슬라이드
    </SlideWrapper>
  )
}
const SlideWrapper = styled.div({
  width: 'calc(15% - 16px)',
  backgroundColor: color.White
})

export default Slide;