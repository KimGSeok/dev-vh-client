import styled from '@emotion/styled';
import { color, CSS_TYPE } from '@/src/styles/styles';
import Image from 'next/image';
import { useState, useRef, MouseEvent } from 'react';

const ProjectSlide = () =>{

  // Hooks
  const scrollRef = useRef<any>(null);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);

  // Throttle Many Function Delay For Once
  const throttle = (func: any, ms: number) => {
    let throttled = false;

    return (...args: any) =>{
      if(!throttled){
        throttled = true;
        setTimeout(() => {
          func(...args);
          throttled = false;
        }, ms);
      }
    }
  }

  // Left Mouse Click Event
  const onDragStart = (e: MouseEvent<HTMLUListElement>) =>{
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  }

  // Left Mouse Click Out Event
  const onDragEnd = (e: MouseEvent<HTMLUListElement>) =>{
    e.preventDefault();
    setIsDrag(false);
  }

  const onDragMove = (e: MouseEvent<HTMLUListElement>) =>{
    e.preventDefault();

    if(isDrag){
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

      scrollRef.current.scrollLeft = startX - e.pageX;

      if(scrollLeft === 0){
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft ) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  }

  const onThrottleDragMove = throttle(onDragMove, 10);
  
  return(
    <MainComponent>
      <SlideLists
        onMouseDown={onDragStart}
        onMouseMove={isDrag ? onThrottleDragMove : undefined}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        ref={scrollRef}
      >
        <SlideList>
          <SlideTitle>1. 제목</SlideTitle>
          <SlidePreview>
            <SlideThumbnailType>음성</SlideThumbnailType>
            <SlideThumbnailArea></SlideThumbnailArea>
          </SlidePreview>
        </SlideList>
        <SlideList>
          <SlideTitle>2. 제목</SlideTitle>
          <SlidePreview>
            <SlideThumbnailType>음성</SlideThumbnailType>
            <SlideThumbnailArea></SlideThumbnailArea>
          </SlidePreview>
        </SlideList>
        <SlideList>
          <SlideTitle>3. 제목</SlideTitle>
          <SlidePreview>
            <SlideThumbnailType>음성</SlideThumbnailType>
            <SlideThumbnailArea></SlideThumbnailArea>
          </SlidePreview>
        </SlideList>
        <SlideList>
          <SlideTitle>4. 제목</SlideTitle>
          <SlidePreview>
            <SlideThumbnailType>음성</SlideThumbnailType>
            <SlideThumbnailArea></SlideThumbnailArea>
          </SlidePreview>
        </SlideList>
        <SlideList>
          <SlideTitle>5. 제목</SlideTitle>
          <SlidePreview>
            <SlideThumbnailType>음성</SlideThumbnailType>
            <SlideThumbnailArea></SlideThumbnailArea>
          </SlidePreview>
        </SlideList>
        <SlideList>
          <SlideTitle>6. 제목</SlideTitle>
          <SlidePreview>
            <SlideThumbnailType>음성</SlideThumbnailType>
            <SlideThumbnailArea></SlideThumbnailArea>
          </SlidePreview>
        </SlideList>
        <SlideList>
          <SlideTitle>7. 제목</SlideTitle>
          <SlidePreview>
            <SlideThumbnailType>음성</SlideThumbnailType>
            <SlideThumbnailArea></SlideThumbnailArea>
          </SlidePreview>
        </SlideList>
        <SlideList>
          <SlideTitle>8. 제목</SlideTitle>
          <SlidePreview>
            <SlideThumbnailType>음성</SlideThumbnailType>
            <SlideThumbnailArea></SlideThumbnailArea>
          </SlidePreview>
        </SlideList>
        <SlideList>
          <SlideTitle>9. 제목</SlideTitle>
          <SlidePreview>
            <SlideThumbnailType>음성</SlideThumbnailType>
            <SlideThumbnailArea></SlideThumbnailArea>
          </SlidePreview>
        </SlideList>
        <SlideList>
          <SlideTitle>10. 제목</SlideTitle>
          <SlidePreview>
            <SlideThumbnailType>음성</SlideThumbnailType>
            <SlideThumbnailArea></SlideThumbnailArea>
          </SlidePreview>
        </SlideList>
        <SlideList>
          <SlideTitle>11. 제목</SlideTitle>
          <SlidePreview>
            <SlideThumbnailType>음성</SlideThumbnailType>
            <SlideThumbnailArea></SlideThumbnailArea>
          </SlidePreview>
        </SlideList>
        <SlideList>
          <SlideTitle>12. 제목</SlideTitle>
          <SlidePreview>
            <SlideThumbnailType>음성</SlideThumbnailType>
            <SlideThumbnailArea></SlideThumbnailArea>
          </SlidePreview>
        </SlideList>
        <SlideList>
          <SlideTitle>13. 제목</SlideTitle>
          <SlidePreview>
            <SlideThumbnailType>음성</SlideThumbnailType>
            <SlideThumbnailArea></SlideThumbnailArea>
          </SlidePreview>
        </SlideList>
      </SlideLists>
    </MainComponent>
  )
}

const MainComponent = styled.div({
  margin: '0 0 16px 0'
})
const SlideLists = styled.ul({
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  overflowX: 'auto',
  cursor: 'grab',

  '::-webkit-scrollbar': {
    display: 'none'
  }
})
const SlideList = styled.li({
  width: '192px',
  margin: '0 16px 0 0',
  cursor: 'pointer'
})
const SlideTitle = styled.div<CSS_TYPE>({
  fontSize: '1.2rem',
  margin: '0 0 4px 0'
})
const SlidePreview = styled.div({
  position: 'relative',
  width: '192px',
  height: '108px'
})
const SlideThumbnailArea = styled.div({
  height: '100%',
  backgroundColor: color.ThumbnailColor,
  borderRadius: '8px'
})
const SlideThumbnailType = styled.div({
  position: 'absolute',
  top: '8px',
  left: '8px',
  backgroundColor: color.White,
  borderRadius: '28px',
  fontSize: '0.8rem',
  padding: '4px 12px'
})
const SlideThumbnail = styled(Image)({

})

export default ProjectSlide;