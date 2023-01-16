import styled from '@emotion/styled';
import { CSS_TYPE, color, RadiusButton, ImageWrap, ImageElement } from '@/src/styles/styles';
import { Dispatch, SetStateAction } from 'react';

interface ScriptProps {
  setIsShowBottomSheet: Dispatch<SetStateAction<boolean>>;
  setBottomSheetTitle: Dispatch<SetStateAction<string>>;
}

const ScriptItem = ({ setIsShowBottomSheet, setBottomSheetTitle }: ScriptProps) =>{

  /* TODO */
  // 슬라이드 텍스트 MaxLength 설정
  // +,- 버튼 인덱스에 따른 구분

  const onClickScriptSpeedHandler = () =>{

    setIsShowBottomSheet(true);
    setBottomSheetTitle('음성 빠르기 선택');
  }

  const onClickWaitTimeHandler = () =>{

    setIsShowBottomSheet(true);
    setBottomSheetTitle('음성 대기시간 선택');
  }

  return(
    <ItemWrapper>
      <ImageWrap
        position={'relative'}
        height={'100%'}
        padding={'2px 0'}
        cursor={'pointer'}
      >
        <ImageElement
          src="/icons/play.svg"
          width={28}
          height={28}
          style={{
            width: '100%',
            height: '100%'
          }}
          alt="play button"
        />
      </ImageWrap>
      <Script
        contentEditable={true}
        placeholder={'슬라이드 텍스트를 입력해주세요.'}
      />
      <RadiusButton
        backgroundColor={color.BasicColor}
        borderColor={color.BasicColor}
        color={color.White}
        padding={'8px 16px'}
        margin={'0 12px 0 0'}
        fontSize={'0.85rem'}
        onClick={() => onClickScriptSpeedHandler()}
      >빠르기 선택</RadiusButton>
      <RadiusButton
        backgroundColor={color.DarkGrey}
        borderColor={color.DarkGrey}
        color={color.White}
        padding={'8px 16px'}
        margin={'0 12px 0 0'}
        fontSize={'0.85rem'}
        onClick={() => onClickWaitTimeHandler()}
      >대기시간 선택</RadiusButton>
      <ImageWrap
        position={'relative'}
        height={'100%'}
        padding={'2px 0'}
        margin={'0 6px'}
        cursor={'pointer'}
      >
        <ImageElement
          src="/icons/add_circle_black.svg"
          width={28}
          height={28}
          style={{
            width: '100%',
            height: '100%'
          }}
          alt="play button"
        />
      </ImageWrap>
      <ImageWrap
        position={'relative'}
        height={'100%'}
        padding={'2px 0'}
        margin={'0 6px'}
        cursor={'pointer'}
      >
        <ImageElement
          src="/icons/remove_black.svg"
          width={28}
          height={28}
          style={{
            width: '100%',
            height: '100%'
          }}
          alt="play button"
        />
      </ImageWrap>
    </ItemWrapper>
  )
}
const ItemWrapper = styled.div({
  display: 'flex',
  position: 'relative',
  margin: '0 0 8px 0',
  alignItems: 'start'
})
const Script = styled.div(
  {
    width: '60%',
    border: `1px solid ${color.ThumbnailColor}`,
    borderRadius: '8px',
    padding: '8px 10px',
    fontSize: '0.9rem',
    margin: '0 12px'
  }
)

export default ScriptItem;