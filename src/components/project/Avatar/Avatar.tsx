import styled from '@emotion/styled';
import { CSS_TYPE, color, ImageElement, ImageWrap } from '@/src/styles/styles';
import { useState } from 'react';
import AvatarOption from './Option/Avatar';
import BackgroundOption from './Option/Background';
import VoiceOption from './Option/Voice';

const Avatar = () => {

  // Hooks
  const [showOption, setShowOption] = useState('avatar'); // 현재 선택 된 아바타 옵션

  return (
    <AvatarWrapper>
      <ImageWrapper>
        <ImageWrap
          position={'absolute'}
          width={'100%'}
          height={'90%'}
          bottom={'0'}
        >
          <ImageElement
            src="/images/human_figure.svg"
            fill
            style={{
              inset: 'auto',
              objectFit: 'contain'
            }}
            alt="human figure"
          />
        </ImageWrap>
      </ImageWrapper>
      <AvatarDataWrapper>
        <AvatarData>아바타 선택</AvatarData>
        <AvatarData>배경 미선택</AvatarData>
        <AvatarData>목소리 미선택</AvatarData>
      </AvatarDataWrapper>
      <AvatarDecorateWrapper>
        <OptionWrapper>
          <OptionLists>
            <OptionList
              background={showOption === 'avatar' ? color.AliceBlue : ''}
              onClick={() => setShowOption('avatar')}
            >
              <ImageWrap
                position={'relative'}
                width={'100%'}
                height={'100%'}
                textAlign={'center'}
              >
                <ImageElement
                  src="/images/default_human.svg"
                  width={24}
                  height={24}
                  style={{
                    width: '70%',
                    height: '70%',
                    margin: '4px auto'
                  }}
                  alt="default human"
                />
              </ImageWrap>
              <OptionName fontWeight={showOption === 'avatar' ? '700' : ''}>
                아바타 선택
              </OptionName>
            </OptionList>
            <OptionList
              background={showOption === 'background' ? color.AliceBlue : ''}
              onClick={() => setShowOption('background')}
            >
              <ImageWrap
                position={'relative'}
                width={'100%'}
                height={'100%'}
                textAlign={'center'}
              >
                <ImageElement
                  src="/images/default_human.svg"
                  width={24}
                  height={24}
                  style={{
                    width: '70%',
                    height: '70%',
                    margin: '4px auto'
                  }}
                  alt="default human"
                />
              </ImageWrap>
              <OptionName fontWeight={showOption === 'background' ? '700' : ''}>
                배경 선택
              </OptionName>
            </OptionList>
            <OptionList
              background={showOption === 'voice' ? color.AliceBlue : ''}
              onClick={() => setShowOption('voice')}
            >
              <ImageWrap
                position={'relative'}
                width={'100%'}
                height={'100%'}
                textAlign={'center'}
              >
                <ImageElement
                  src="/images/default_human.svg"
                  width={24}
                  height={24}
                  style={{
                    width: '70%',
                    height: '70%',
                    margin: '4px auto'
                  }}
                  alt="default human"
                />
              </ImageWrap>
              <OptionName fontWeight={showOption === 'voice' ? '700' : ''}>
                목소리 선택
              </OptionName>
            </OptionList>
          </OptionLists>
          <OptionItemWrapper>

            {/* 아바타 선택 */}
            {showOption === 'avatar' ? <AvatarOption /> : ''}

            {/* 배경 선택 */}
            {showOption === 'background' ? <BackgroundOption /> : ''}

            {/* 목소리 선택 */}
            {showOption === 'voice' ? <VoiceOption /> : ''}

          </OptionItemWrapper>
        </OptionWrapper>
      </AvatarDecorateWrapper>
    </AvatarWrapper>
  )
}
const AvatarWrapper = styled.div({
  width: 'calc(38% - 16px)',
  height: '100%',
  backgroundColor: color.White,
  margin: '0 24px',
  borderRadius: '16px'
})
const ImageWrapper = styled.div({
  width: '100%',
  height: '42.5%',
  position: 'relative',
  backgroundImage: `url('/images/tile_background.svg')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px'
})
const AvatarDecorateWrapper = styled.div({
  height: 'calc(57.5% - 45px)',
  position: 'relative'
})
const AvatarDataWrapper = styled.div({
  position: 'relative',
  display: 'flex',
  borderBottom: `1px solid ${color.ModernGrey}`,
  padding: '8px 24px',
})
const AvatarData = styled.div<CSS_TYPE>(
  {
    height: '28px',
    lineHeight: '18px',
    padding: '4px 16px',
    margin: '0 12px 0 0',
    borderRadius: '50px',
    fontSize: '0.95rem'
  },
  props => ({
    color: props.color ? props.color : color.ThumbnailColor,
    border: props.border ? props.border : `1px solid ${color.ModernGrey}`
  })
)
const OptionWrapper = styled.div({
  display: 'flex',
  position: 'relative',
  width: '100%',
  height: '100%'
})
const OptionLists = styled.ul({
  width: '12%'
})
const OptionList = styled.li<CSS_TYPE>(
  {
    padding: '8px',
    cursor: 'pointer',

    '@media screen and (max-width: 1440px)': {
      padding: '7px',
    },

    '@media screen and (max-width: 1023px)': {
      padding: '6px',
    },

    '@media screen and (max-width: 960px)': {
      padding: '5px',
    }
  },
  props => ({
    background: props.background
  })
)
const OptionName = styled.div<CSS_TYPE>(
  {
    position: 'relative',
    height: '10%',
    textAlign: 'center',
    color: color.BasicBlack,
    fontSize: '0.8rem',

    '@media screen and (max-width: 1440px)': {
      height: '9%',
      fontSize: '0.6rem',
    },

    '@media screen and (max-width: 1023px)': {
      height: '8%',
      fontSize: '0.5rem',
    },

    '@media screen and (max-width: 960px)': {
      height: '7%',
      fontSize: '0.4rem',
    }
  },
  props => ({
    fontWeight: props.fontWeight
  })
)
const OptionItemWrapper = styled.div({
  width: '88%',
  height: '100%',
  overflowY: 'scroll',
  backgroundColor: color.AliceBlue,
  borderBottomRightRadius: '16px',
  padding: '20px 28px',

  '::-webkit-scrollbar': {
    scrollBehavior: 'smooth',
    display: 'none'
  }
})

export default Avatar;