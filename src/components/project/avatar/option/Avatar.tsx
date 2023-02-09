import styled from '@emotion/styled';
import { CSS_TYPE, color, ImageElement, ImageWrap } from '@/src/styles/styles';

const AvatarOption = () => {
  return (
    <OptionWrapper>
      <ItemLists>
        <ItemList>
          <ImageWrapper
            opacity={1}
            backgroundImage={"url('/images/avatar/unsplash_1.jpg')"}
            backgroundRepeat={'no-repeat'}
            backgroundSize={'cover'}
          />
          <ItemName>
            example
          </ItemName>
        </ItemList>
        <ItemList>
          <ImageWrapper
            backgroundImage={"url('/images/avatar/unsplash_2.jpg')"}
            backgroundRepeat={'no-repeat'}
            backgroundSize={'cover'}
          />
          <ItemName>
            example
          </ItemName>
        </ItemList>
        <ItemList>
          <ImageWrapper
            backgroundImage={"url('/images/avatar/unsplash_3.jpg')"}
            backgroundRepeat={'no-repeat'}
            backgroundSize={'cover'}
          />
          <ItemName>
            example
          </ItemName>
        </ItemList>
        <ItemList>
          <ImageWrapper
            backgroundImage={"url('/images/avatar/unsplash_4.jpg')"}
            backgroundRepeat={'no-repeat'}
            backgroundSize={'cover'}
          />
          <ItemName>
            example
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
  props => ({
  })
)
const ImageWrapper = styled.div<CSS_TYPE>(
  {
    width: '100%',
    height: '80%',
    position: 'relative',
    display: 'block',
    margin: '0 0 8px 0',
    borderRadius: '8px'
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