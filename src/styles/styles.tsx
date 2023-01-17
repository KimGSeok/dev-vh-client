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
  border?: string;
  borderColor?: string;
  borderTop?: string;
  borderBottom?: string;
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
  cursor?: string;
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
    transform: props.transform,
    cursor: props.cursor,

    ':hover': {
      color: props.hovercolor,
      opacity: props.hoveropacity
    }
  })
)

/* Color */
export const color = {
  BasicColor: '#1D3763',
  BasicBlack: '#181818',
  BasicOrange: '#FF5029',
  White: '#FFFFFF',
  Black: '#000000',
  ThumbnailColor: '#CDCDCD',
  ModernGrey: '#e6e6e6',
  DarkGrey: '#444444',
  DeActiveColor: '#888888',
  BrightBlue: '#0075FF',
  AliceBlue: '#F2F7FF',
  Purple: '#640EDC',
  OverallProgressColor: '#F1E3FF'
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
    justifyContent: props.justifyContent,
    fontSize: props.fontSize ? props.fontSize : '1rem',
    fontWeight: props.fontWeight ? props.fontWeight : '500',
    margin: props.margin,
    position: props.position,
    top: props.top,
    bottom: props.bottom,
    left: props.left,
    right: props.right
  })
)

/* Shape */
export const VerticalBar = styled.div<CSS_TYPE>(
  {

  },
  props => ({
    width: props.width ? props.width : '4px',
    height: props.height ? props.height : '20px',
    backgroundColor: props.backgroundColor ? props.backgroundColor : color.BasicBlack,
    borderRadius: props.borderRadius
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