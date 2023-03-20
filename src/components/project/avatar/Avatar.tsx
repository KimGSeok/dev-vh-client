import styled from '@emotion/styled';
import { CSS_TYPE, color, ImageElement, ImageWrap } from '@styles/styles';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import AvatarOption from './option/Avatar';
import VoiceOption from './option/Voice';
import { AvatarProps, ProjectProps, VoiceProps } from '@modules/interface';
import { getUserInfo } from '@lib/auth/cookie';
import { get } from '@hooks/asyncHooks';

interface ProjectAvatarProps {
  project: ProjectProps;
  setProject: Dispatch<SetStateAction<ProjectProps>>;
}

const Avatar = ({ project, setProject }: ProjectAvatarProps) => {

  // Hooks
  const [virtualHumanList, setVirtualHumanList] = useState();
  const [showOption, setShowOption] = useState('avatar'); // 현재 가상인간의 옵션
  const avatar: AvatarProps = project.avatar;
  const voice: VoiceProps = project.voice;

  useEffect(() => {
    const getAvatarList = async () =>{

      const userId = getUserInfo('id');
      const response = await get(`virtual-human/${userId}`,'no-cache');

      console.log(response);
    }

    getAvatarList();
  }, [])

  return (
    <AvatarWrapper>
      <ImageWrapper>
        <ImageWrap
          position={'absolute'}
          width={avatar.name === '' ? '100%' : '70%'}
          height={avatar.name === '' ? '90%' : '100%'}
          margin={avatar.name === '' ? '0' : '0 15%'}
          bottom={avatar.name === '' ? '0' : '1px'}
        >
          <ImageElement
            src={avatar.name === '' ? '/images/avatar/human_figure.svg' : avatar.imageFileUrl}
            fill
            style={{
              inset: 'auto',
              objectFit: `${avatar.name === '' ? 'contain' : 'cover'}`, // contain
              borderTopRightRadius: '16px',
              borderTopLeftRadius: '16px',
            }}
            alt={avatar.name === '' ? 'human figure' : avatar.name}
          />
        </ImageWrap>
      </ImageWrapper>
      <AvatarDataWrapper>
        <AvatarData
          isActive={avatar.name === '' ? true : false}
        >{avatar.name === '' ? '아바타 미선택' : '아바타: ' + avatar.name}</AvatarData>
        <AvatarData
          isActive={voice.name === '' ? true : false}
        >{voice.name === '' ? '목소리 미선택' : '목소리: ' + voice.name}</AvatarData>
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
                  src="/images/avatar/default_human.svg"
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
                  src="/images/avatar/default_human.svg"
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
            {showOption === 'avatar' ? <AvatarOption avatar={avatar} project={project} setProject={setProject} /> : ''}

            {/* 목소리 선택 */}
            {showOption === 'voice' ? <VoiceOption voice={voice} project={project} setProject={setProject} /> : ''}
          </OptionItemWrapper>
        </OptionWrapper>
      </AvatarDecorateWrapper>
    </AvatarWrapper>
  )
}
const AvatarWrapper = styled.div({
  width: 'calc(35% - 8px)',
  height: '100%',
  backgroundColor: color.White,
  margin: '0 24px 0 0',
  borderRadius: '16px'
})
const ImageWrapper = styled.div({
  width: '100%',
  height: '42.5%',
  position: 'relative',
  backgroundImage: `url('/images/avatar/tile_background.svg')`,
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
    color: props.isActive ? color.ThumbnailColor : color.BasicColor,
    border: props.isActive ? `1px solid ${color.ModernGrey}` : `1px solid ${color.BasicColor}`
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
  },

  '@media screen and (max-width: 1440px)': {
    padding: '16px 24px',
  },

  '@media screen and (max-width: 1023px)': {
    padding: '14px 22px',
  },

  '@media screen and (max-width: 960px)': {
    padding: '12px 20px',
  }
})

export default Avatar;