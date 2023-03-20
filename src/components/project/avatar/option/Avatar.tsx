import styled from '@emotion/styled';
import { CSS_TYPE, color } from '@styles/styles';
import { Dispatch, SetStateAction } from 'react';
import { ProjectProps, AvatarProps } from '@modules/interface';

interface AvatarOptionProps {
  avatarList: object[];
  avatar: AvatarProps;
  project: ProjectProps;
  setProject: Dispatch<SetStateAction<ProjectProps>>;
}

const AvatarOption = ({ avatarList, avatar, project, setProject }: AvatarOptionProps) => {

  const onClickChangeAvatarInfoHandler = (param: AvatarProps) =>{
    
    let prevState = { ...project };
    prevState.avatar = param;
    setProject(prevState);
  }

  return (
    <OptionWrapper>
      <ItemLists>
        <ItemList onClick={() => onClickChangeAvatarInfoHandler({
          name :'',
          model: '',
          imageFileUrl: ''
        })} >
          <ImageWrapper
            opacity={avatar.name === '' ? 1 : 0}
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
              model: 'bc7b4f1b-0cc7-40c1-b831-3293c67e14b1',
              imageFileUrl: '/images/avatar/kevin.svg'
            })}
        >
          <ImageWrapper
            opacity={avatar.name === 'Kevin' ? 1 : 0} // TODO avatar.name ==> avatar.id && avatar.uuid
            backgroundImage={"url('/images/avatar/kevin.svg')"}
            backgroundRepeat={'no-repeat'}
            backgroundSize={'cover'}
          />
          <ItemName>Kevin</ItemName>
        </ItemList>
        <ItemList
          onClick={() =>
            onClickChangeAvatarInfoHandler({
              name: 'Beryl',
              model: '018334a3-693b-76b1-902b-39d4595403a8', // TODO Lipsync 모델
              imageFileUrl: '/images/avatar/beryl.svg'
            })}
        >
          <ImageWrapper
            opacity={avatar.name === 'Beryl' ? 1 : 0} // TODO avatar.name ==> avatar.id && avatar.uuid
            backgroundImage={"url('/images/avatar/beryl.svg')"}
            backgroundRepeat={'no-repeat'}
            backgroundSize={'cover'}
          />
          <ItemName>Beryl</ItemName>
        </ItemList>
        {
          avatarList && avatarList.length > 0 ?
          avatarList.map((item: any) => {
            return(
              <ItemList
                key={item.uuid}
                onClick={() =>
                  onClickChangeAvatarInfoHandler({
                    name: item.name,
                    model: item.uuid,
                    imageFileUrl: item.image_file_url ? item.image_file_url : ''
                  })}
              >
                <ImageWrapper
                  opacity={avatar.name === item.name ? 1 : 0}
                  backgroundImage={item.image_file_url ? item.image_file_url : "url('/images/avatar/default_virtual_human.svg')"}
                  backgroundRepeat={'no-repeat'}
                  backgroundSize={'cover'}
                />
                <ItemName>{item.name}</ItemName>
              </ItemList>
            )
          }) : <></>
        }
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
    margin: '0 0 24px 0',
    cursor: 'pointer'
  },
  props => ({})
)
const ImageWrapper = styled.div<CSS_TYPE>(
  {
    width: '100%',
    height: '90%',
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
    height: '10%',
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