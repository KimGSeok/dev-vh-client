import styled from '@emotion/styled';
import { v4 as uuidV4 } from 'uuid';
import { CSS_TYPE, color, RadiusButton, ImageElement } from '@/src/styles/styles';
import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

interface SlideListProps{
  slideList: any;
  setSlideList: Dispatch<SetStateAction<object[]>>;
  activeSlideIndex: number;
  setActiveSlideIndex: Dispatch<SetStateAction<number>>;
}

const Slide = ({ slideList, setSlideList, activeSlideIndex, setActiveSlideIndex}: SlideListProps) => {

  // Hooks
  const router = useRouter();

  // 새 슬라이드 추가
  const onAddNewSlideHandler = () => {

    // Parameter
    const newSlideIndex = slideList.length + 1;

    setSlideList(prev => [...prev, {
      id: newSlideIndex.toString(),
      uuid: uuidV4(),
      sequence: newSlideIndex,
      name: `슬라이드${newSlideIndex}`,
      avatar: {},
      voice: {},
      scriptList : [
        { uuid: uuidV4(), text: '', speed: 1.0, pauseSecond: 0.5 }
      ],
      thumbnail: null,
    }])
  }

  return (
    <SlideWrapper>
      <RadiusBtn
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
      </RadiusBtn>
      <SlideLists>
        {
          slideList && slideList.length > 0 ?
            slideList.map((item: any, index: number) => {
              return (
                <SlideList key={index}>
                  <SlideBackground
                    onClick={() => setActiveSlideIndex(index)}
                    background={slideList[activeSlideIndex].id === item.id ? color.White : color.ThumbnailColor}
                  />
                  <SlideName color={slideList[activeSlideIndex].id === item.id ? color.White : ''}>{item.name}</SlideName>
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

  '::-webkit-scrollbar': {
    scrollBehavior: 'smooth',
    display: 'none'
  }
})
const RadiusBtn = styled(RadiusButton)<CSS_TYPE>(
  {
    '@media screen and (max-width: 1440px)': {
      fontSize: '0.9rem',
      padding: '8px 20px'
    },

    '@media screen and (max-width: 1023px)': {
      fontSize: '0.85rem',
      padding: '8px 18px'
    },

    '@media screen and (max-width: 960px)': {
      fontSize: '0.8rem',
      padding: '8px 16px'
    }
  },
)
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
    cursor: 'pointer',

    '@media screen and (max-width: 1440px)': {
      height: '100px'
    },

    '@media screen and (max-width: 1023px)': {
      height: '85px'
    },

    '@media screen and (max-width: 960px)': {
      height: '75px'
    }
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