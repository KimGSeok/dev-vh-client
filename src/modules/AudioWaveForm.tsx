import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { color, CSS_TYPE, pulse } from "@/src/styles/styles";

const AudioWaveForm = () => {

  return (
    <LoaderWrapper>
      <Wave data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 38.05">
        <Path animationDelay={'1'} data-name="Line 1" d="M0.91,15L0.78,15A1,1,0,0,0,0,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H0.91Z" />
        <Path animationDelay={'2'} data-name="Line 2" d="M6.91,9L6.78,9A1,1,0,0,0,6,10V28a1,1,0,1,0,2,0s0,0,0,0V10A1,1,0,0,0,7,9H6.91Z" />
        <Path animationDelay={'3'} data-name="Line 3" d="M12.91,0L12.78,0A1,1,0,0,0,12,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H12.91Z" />
        <Path animationDelay={'4'} data-name="Line 4" d="M18.91,10l-0.12,0A1,1,0,0,0,18,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H18.91Z" />
        <Path animationDelay={'5'} data-name="Line 5" d="M24.91,15l-0.12,0A1,1,0,0,0,24,16v6a1,1,0,0,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H24.91Z" />
        <Path animationDelay={'6'} data-name="Line 6" d="M30.91,10l-0.12,0A1,1,0,0,0,30,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H30.91Z" />
        <Path animationDelay={'7'} data-name="Line 7" d="M36.91,0L36.78,0A1,1,0,0,0,36,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H36.91Z" />
        <Path animationDelay={'8'} data-name="Line 8" d="M42.91,9L42.78,9A1,1,0,0,0,42,10V28a1,1,0,1,0,2,0s0,0,0,0V10a1,1,0,0,0-1-1H42.91Z" />
        <Path animationDelay={'9'} data-name="Line 9" d="M48.91,15l-0.12,0A1,1,0,0,0,48,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H48.91Z" />
      </Wave>
    </LoaderWrapper>
  )
}

const LoaderWrapper = styled.div({
  height: '100%',
  position: 'relative',
  top: '2px',
  margin: '0 10px 0 0'
})
const Wave = styled.svg({
  height: '20px',
  fill: color.BasicColor,
})
const Path = styled.path<CSS_TYPE>(
  {},
  props => ({
    animation: `${pulse} 1s infinite`,
    animationDelay: `${props.animationDelay && parseInt(props.animationDelay) * 0.15}s`
  })
)

export default AudioWaveForm;