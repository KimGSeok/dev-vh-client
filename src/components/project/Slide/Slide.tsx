import styled from '@emotion/styled';
import { CSS_TYPE, color, RadiusButton, ImageElement } from '@/src/styles/styles';
import { Dispatch, SetStateAction } from 'react';
import { ProjectSlideInterfaceProps } from '@/src/modules/type';
import { useRouter } from 'next/navigation';

interface SlideListProps {
  slideList: object[];
  setSlideList: Dispatch<SetStateAction<object[]>>;
  activeSlide: ProjectSlideInterfaceProps;
  setActiveSlide: Dispatch<SetStateAction<ProjectSlideInterfaceProps>>;
}

const Slide = ({ slideList, setSlideList, activeSlide, setActiveSlide }: SlideListProps) => {

  // Hooks
  const router = useRouter();

  // 새 슬라이드 추가
  const onAddNewSlideHandler = () =>{

    // Parameter
    const newSlideIndex = slideList.length + 1;

    // TODO 최대 슬라이드 갯수 제한

    setSlideList(prev => [...prev, {
      id: newSlideIndex.toString(),
      sequence: newSlideIndex,
      name: `slide${newSlideIndex}`,
      avatar: '',
      background: '',
      voice: '',
      thumbnail: null,
      createdAt: null
    }])
  }

  return (
    <SlideWrapper>
      <RadiusButton
        width={'fit-content'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        margin={'0 auto 24px auto'}
        padding={'8px 28px'}
        backgroundColor={color.BasicBlack}
        color={color.ModernGrey}
        borderColor={color.DarkGrey}
        onClick={() => router.back()}
      >
        <ImageElement
          src="/icons/arrow/single_arrow_left_white.svg"
          width={24}
          height={24}
          alt="arrow_left"
        />
        목록으로 가기
      </RadiusButton>
      <SlideLists>
        {
          slideList && slideList.length > 0 ?
          slideList.map((item: any, index: number) => {
            return(
              <SlideList key={index}>
                <SlideBackground
                  onClick={() => setActiveSlide(item)}
                  background={activeSlide.id === item.id ? color.White : color.ThumbnailColor}
                />
                <SlideName color={activeSlide.id === item.id ? color.White : ''}>{item.name}</SlideName>
              </SlideList>
            )
          }) : ''
        }

        {/* 새 슬라이드 추가 버튼 */}
        <SlideList>
          <SlideBackground
            onClick={() => onAddNewSlideHandler()}
            background={color.DarkGrey}
          >
            <ImageElement
              src="/icons/add_circle_white.svg"
              width={24}
              height={24}
              position={'relative'}
              top={'50%'}
              left={'50%'}
              transform={'translate(-50%, -50%)'}
              alt="new Slide"
            />
          </SlideBackground>
          <SlideName>새 슬라이드 추가</SlideName>
        </SlideList>
      </SlideLists>
    </SlideWrapper>
  )
}
const SlideWrapper = styled.div({
  width: 'calc(12% - 16px)',
  overflowY: 'scroll',

  '::-webkit-scrollbar':{
    scrollBehavior: 'smooth',
    display: 'none'
  }
})
const SlideLists = styled.ul({

})
const SlideList = styled.li<CSS_TYPE>(
  {
    width: '100%',
    margin: '0 0 24px 0',
  }
)
const SlideBackground = styled.div<CSS_TYPE>(
  {
    width: '100%',
    height: '120px',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  props => ({
    background: props.background
  })
)
const SlideName = styled.div<CSS_TYPE>(
  {
    fontSize: '0.9rem',
    margin: '16px 0 0 0',
    textAlign: 'center'
  },
  props => ({
    color: props.color ? props.color : color.DeActiveColor
  })
)

export default Slide;