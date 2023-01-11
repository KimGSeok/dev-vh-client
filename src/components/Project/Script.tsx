import styled from '@emotion/styled';
import { CSS_TYPE, color } from '@/src/styles/styles';

const Script = () => {
  return (
    <ScriptWrapper>
      스크립트
    </ScriptWrapper>
  )
}
const ScriptWrapper = styled.div({
  width: 'calc(50% - 16px)',
  backgroundColor: color.White,
  borderRadius: '16px'
})

export default Script;