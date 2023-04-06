import Image from 'next/image';
import styled from '@emotion/styled';
import { css, Global, keyframes } from '@emotion/react';

export type CSS_TYPE = {
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  height?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;
  textAlign?: any;
  fontSize?: string;
  fontWeight?: string;
  position?: any;
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
  padding?: string | number;
  margin?: string | number;
  display?: string;
  alignItems?: string;
  justifyContent?: string;
  backgroundColor?: string;
  background?: string;
  backgroundImage?: string;
  backgroundRepeat?: string;
  backgroundSize?: string;
  border?: string;
  borderColor?: string;
  borderTop?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderRight?: string;
  borderRadius?: string;
  borderTopLeftRadius?: string | number;
  borderTopRightRadius?: string | number;
  borderBottomLeftRadius?: string | number;
  borderBottomRightRadius?: string | number;
  transition?: string;
  transform?: string;
  opacity?: string | number;
  hovercolor?: string;
  hoveropacity?: string | number;
  hoverbackground?: string;
  cursor?: string;
  zIndex?: string | number;
  animation?: string;
  animationDelay?: string;

  /* Etc */
  isActive?: boolean;
  RadioChecked?: boolean;
}

export const globalStyles = (
  <Global
    styles={css`

      @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

      *, *:after, *:before{
        box-sizing: border-box;
        font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
          'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR',
          'Malgun Gothic', sans-serif;
        font-size: 95%;
        font-weight: 300;
      }

      :is(html,body){
        width: 100%;
        height: auto;
        margin: 0;
        padding: 0;
        letter-spacing: 0.1px;
        -ms-overflow-style: none;
        
        ::-webkit-scrollbar {
          scroll-behavior: smooth;
          display: none;
        }
      }

      :is(ul, li){
        list-style: none;
        margin: 0;
        padding: 0;
      }

      select{
        outline: 0;
        appearance: none;
        background: url('/icons/arrow/arrow_drop_down.svg') no-repeat right 9px center;
      }

      a{
        text-decoration: none;
        color: inherit;
      }

      input{
        margin: 0;

        :focus{
          border-color:#1D3763;
          outline: none;
        }
      }

      [contenteditable] {
        outline: 0px solid transparent;
      }
      [contenteditable]:hover {
        cursor: text;
      }
      [contenteditable]:focus {
        border: 1px solid #1D3763;
      }
      [contenteditable="true"]:empty:before {
        content: attr(placeholder);
      }
    `}
  />
)

/* Image */
export const ImageWrap = styled.div<CSS_TYPE>(
  props => ({
    width: props.width ? props.width : '',
    minWidth: props.minWidth ? props.minWidth : '',
    maxWidth: props.maxWidth ? props.maxWidth : '',
    height: props.height ? props.height : '',
    minHeight: props.minHeight ? props.minHeight : '',
    maxHeight: props.maxHeight ? props.maxHeight : '',
    textAlign: props.textAlign ? props.textAlign : '',
    position: props.position ? props.position : '',
    top: props.top ? props.top : '',
    bottom: props.bottom ? props.bottom : '',
    left: props.left ? props.left : '',
    right: props.right ? props.right : '',
    padding: props.padding ? props.padding : '',
    margin: props.margin ? props.margin : '',
    display: props.display ? props.display : '',
    border: props.border ? props.border : '',
    borderRadius: props.borderRadius ? props.borderRadius : '',
    transition: props.transition ? props.transition : '',
    transform: props.transform ? props.transform : '',
    cursor: props.cursor ? props.cursor : ''
  })
)
export const ImageElement = styled(Image)<CSS_TYPE>(
  {

  },
  props => ({
    position: props.position,
    top: props.top,
    left: props.left,
    right: props.right,
    bottom: props.bottom,
    opacity: props.opacity,
    animation: props.animation,
    transform: props.transform,
    cursor: props.cursor,

    ':hover': {
      backgroundColor: props.hoverbackground,
      color: props.hovercolor,
      opacity: props.hoveropacity
    }
  })
)

/* Color */
export const color = {

  // Basic
  BasicColor: '#1D3763',
  BasicBlack: '#181818',
  BasicOrange: '#FF5029',
  BasicBlue: '#379FFF',

  // Origin
  Purple: '#640EDC',
  White: '#FFFFFF',
  Black: '#000000',
  Red: '#FF0000',

  // Similar Grey
  ThumbnailColor: '#CDCDCD',
  ModernGrey: '#e6e6e6',
  DarkGrey: '#444444',
  DeActiveColor: '#888888',
  BrightGrey: '#E8EAF0',

  // Similar Blue
  BrightBlue: '#0075FF',
  SkyBlue: '#3498db',
  AliceBlue: '#F2F7FF',

  // Similar White
  DarkWhite: '#FAFAFA',
  ModernWhite: '#FEFEFE',
  LightWhite: '#F9F9F9',

  OverallProgressColor: '#F1E3FF',

  // Action
  WaringRed: '#bf1650'
}

/* Button */
export const RadiusButton = styled.div<CSS_TYPE>(
  {
    borderRadius: '24px',
    cursor: 'pointer'
  },
  props => ({
    width: props.width,
    backgroundColor: props.backgroundColor ? props.backgroundColor : color.White,
    border: props.border ? props.border : `1px solid ${color.ModernGrey}`,
    borderColor: props.borderColor,
    color: props.color ? props.color : color.BasicBlack,
    padding: props.padding ? props.padding : '12px 28px',
    display: props.display ? props.display : 'inline-block',
    alignItems: props.alignItems,
    textAlign: props.textAlign,
    justifyContent: props.justifyContent,
    fontSize: props.fontSize ? props.fontSize : '1rem',
    fontWeight: props.fontWeight ? props.fontWeight : '500',
    margin: props.margin,
    opacity: props.opacity,
    position: props.position,
    top: props.top,
    bottom: props.bottom,
    left: props.left,
    right: props.right,
    cursor: props.cursor,
    zIndex: props.zIndex ? props.zIndex : 1
  })
)

/* Shape */
export const VerticalBar = styled.div<CSS_TYPE>(
  {

  },
  props => ({
    width: props.width ? props.width : '4px',
    height: props.height ? props.height : '20px',
    margin: props.margin,
    backgroundColor: props.backgroundColor ? props.backgroundColor : color.BasicBlack,
    borderRadius: props.borderRadius
  })
)

export const LineBreak = styled.div<CSS_TYPE>(
  {},
  props => ({
    width: props.width,
    height: props.height
  })
)

/* Select */
export const SelectBox = styled.select<CSS_TYPE>(
  {

  },
  props => ({
    width: props.width ? props.width : '',
    minWidth: props.minWidth ? props.minWidth : '120px',
    height: props.height ? props.height : '',
    padding: props.padding ? props.padding : '',
    margin: props.margin ? props.margin : '',
    fontSize: props.fontSize ? props.fontSize : '0.9rem',
    border: props.border ? props.border : '',
    borderColor: props.borderColor ? props.borderColor : '',
    borderRadius: props.borderRadius ? props.borderRadius : '8px'
  })
)

/* Validation */
export const Warning = styled.div<CSS_TYPE>(
  {
    color: color.Red,

    '::before': {
      content: '"*"',
      position: 'relative',
      top: '1px',
      margin: '0 4px 0 0'
    }
  },
  props => ({
    margin: props.margin,
    padding: props.padding,
    fontSize: props.fontSize,
    fontWeight: props.fontWeight
  })
)

/* Animation */
const fadeUpKeyframes = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(calc(-50% + 50px));
  }

  to {
    opacity: 1;
    transform: translateX(-50%) translateY(-50%);
  }
`

export const fadeUp = css`
  animation-duration: 0.65s;
  animation-name: ${fadeUpKeyframes};
  animation-timing-function: ease;
`

const fadeRightKeyframes = keyframes`
  from {
    transform: translateX(100%)
  }

  to {
    transform: translateX(0)
  }
`

export const fadeRight = css`
  animation-duration: 0.65s;
  animation-name: ${fadeRightKeyframes};
  animation-timing-function: ease;
`

const fadeOutRightKeyframes = keyframes`
  from {
    transform: translateX(0)
  }

  to {
    transform: translateX(100%)
  }
`

export const fadeOutRight = css`
  animation-duration: 0.65s;
  animation-name: ${fadeOutRightKeyframes};
  animation-timing-function: ease;
`

export const pulseKeyFrames = keyframes`
	0% {
		transform: scaleY(1);
		transform-origin: 50% 50%;
	}
	
	50% {
		transform: scaleY(.7);
		transform-origin: 50% 50%;
	}
	
	100% {
		transform: scaleY(1);
		transform-origin: 50% 50%;
	}
`

const shakingKeyframes = keyframes`
  0% { transform: rotate(0deg); }
  10% { transform: rotate(10deg); }
  20% { transform: rotate(15deg); }
  30% { transform: rotate(20deg); }
  40% { transform: rotate(12deg); }
  50% { transform: rotate(0deg); }
  60% { transform: rotate(-10deg); }
  70% { transform: rotate(-15deg); }
  80% { transform: rotate(-20deg); }
  90% { transform: rotate(-12deg); }
  100% { transform: rotate(0deg); }
`

export const shaking = css`
  animation-duration: 1s;
  animation-name: ${shakingKeyframes};
  animation-timing-function: ease;
  animation-iteration-count: infinite;
`

const spinKeyframes = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const spin = css`
  /* animation: spin 1s linear infinite; */
  animation-name: ${spinKeyframes};
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`
