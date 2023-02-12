import styled from '@emotion/styled';
import { CSS_TYPE, color, ImageElement, ImageWrap } from '@/src/styles/styles';
import { Dispatch, SetStateAction } from 'react';
import { checkEmptyObject } from '@/src/modules/validation';

interface AvatarProps {
  slideList: any;
  setSlideList: Dispatch<SetStateAction<any>>;
  activeSlideIndex: number;
}

const AvatarOption = ({ slideList, setSlideList, activeSlideIndex }: AvatarProps) => {

  // Parameter
  const avatar = slideList[activeSlideIndex].avatar;

  const onClickChangeAvatarInfoHandler = (avatar: object) =>{
    
    let prevState = [...slideList];
    prevState[activeSlideIndex].avatar = avatar;
    setSlideList(prevState);
  }
  
  return (
    <OptionWrapper>
      <ItemLists>
        <ItemList onClick={() => onClickChangeAvatarInfoHandler({})} >
          <ImageWrapper
            opacity={checkEmptyObject(avatar) ? 1 : 0}
            backgroundImage={"url('/images/avatar/unchecked_avatar.svg')"}
            backgroundRepeat={'no-repeat'}
            backgroundSize={'cover'}
          />
          <ItemName>
            선택없음
          </ItemName>
        </ItemList>
        <ItemList
          onClick={() =>
            onClickChangeAvatarInfoHandler({
              name: 'Kevin',
              type: 'avatar',
              avatarModel: '01831218-c70d-78ee-9cba-03532fabd6f6', // TODO Lipsync 모델
              imageFileUrl: '/images/avatar/kevin.jpeg'
            })}
        >
          <ImageWrapper
            opacity={avatar.name === 'Kevin' ? 1 : 0} // TODO avatar.name ==> avatar.id && avatar.uuid
            backgroundImage={"url('/images/avatar/kevin.jpeg')"}
            backgroundRepeat={'no-repeat'}
            backgroundSize={'cover'}
          />
          <ItemName>
            Kevin
          </ItemName>
        </ItemList>
        <ItemList
          onClick={() =>
            onClickChangeAvatarInfoHandler({
              name: 'Beryl',
              type: 'avatar',
              avatarModel: '018334a3-693b-76b1-902b-39d4595403a8', // TODO Lipsync 모델
              imageFileUrl: '/images/avatar/beryl.svg'
            })}
        >
          <ImageWrapper
            opacity={avatar.name === 'Beryl' ? 1 : 0} // TODO avatar.name ==> avatar.id && avatar.uuid
            backgroundImage={"url('/images/avatar/beryl.svg')"}
            backgroundRepeat={'no-repeat'}
            backgroundSize={'cover'}
          />
          <ItemName>
            Beryl
          </ItemName>
        </ItemList>
      </ItemLists>
    </OptionWrapper>
  )
}

const OptionWrapper = styled.div({
  position: 'relative',
  height: '100%'
})
const ItemLists = styled.ul({
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignContent: 'baseline',
  columnGap: '5%'
})
const ItemList = styled.li<CSS_TYPE>(
  {
    width: '30%',
    height: '30%',
    display: 'inline-block',
    margin: '0 0 12px 0',
    cursor: 'pointer'
  },
  props => ({})
)
const ImageWrapper = styled.div<CSS_TYPE>(
  {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'block',
    margin: '0 0 8px 0',
    borderRadius: '8px',
    border: `1px solid ${color.ModernGrey}`
  },
  props => ({
    opacity: props.opacity ? props.opacity : '0.35',
    backgroundImage: props.backgroundImage,
    backgroundRepeat: props.backgroundRepeat,
    backgroundSize: props.backgroundSize
  })
)
const ItemName = styled.div<CSS_TYPE>(
  {
    textAlign: 'center',
    fontSize: '0.85rem',
    margin: '2px 0'
  },
  props => ({
    color: props.color ? props.color : color.DeActiveColor,
    fontWeight: props.fontWeight ? props.fontWeight : '500'
  })
)

export default AvatarOption;