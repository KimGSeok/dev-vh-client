import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { get } from '@hooks/asyncHooks';
import { KeyValueProps } from '@modules/interface';
import { CSS_TYPE, color, ImageWrap, ImageElement, VerticalBar, RadiusButton } from '@styles/styles';
import { useRouter } from 'next/navigation';

interface MasterAuthSideComponentProps {
  virtualHumanInfo: KeyValueProps;
  setShowComponent: Dispatch<SetStateAction<boolean>>;
}

const MasterAuthRightSideComponent = ({ virtualHumanInfo, setShowComponent }: MasterAuthSideComponentProps) => {

  const router = useRouter();
  const [data, setData] = useState<object[]>();

  useEffect(() => {

    const getVirtualHumanDetailInfo = async () => {
      const response = await get(`virtual-human/resource/${virtualHumanInfo.id}&uuid=${virtualHumanInfo.uuid}`, 'no-cache', '');
      setData(response);
    }

    getVirtualHumanDetailInfo();
  }, [])

  return (
    <Container>
      <HeaderContaier>
        <Title>{virtualHumanInfo.name}의 {virtualHumanInfo.type === 'voice' ? '녹음' : '녹화'}목록</Title>
        <ImageWrap
          position={'relative'}
          cursor={'pointer'}
          top={'1px'}
          onClick={() => setShowComponent(false)}
        >
          <ImageElement
            src="/icons/close.svg"
            width={24}
            height={24}
            alt="close button"
          />
        </ImageWrap>
      </HeaderContaier>
      <SummaryContainer>
        <SummaryHeaderContainer>
          <NameContainer>
            <VerticalBar
              width={'3px'}
              borderRadius={'25px'}
              margin={'0 6px 0 0'}
            />
            {virtualHumanInfo.name}
          </NameContainer>
          <SummaryBtnContainer>
            <RadiusButton
              backgroundColor={color.BasicBlue}
              display={'flex'}
              alignItems={'center'}
              padding={'6px 20px'}
              color={color.White}
              opacity={'0.5'}
              cursor={'default'}
            >
              <ImageWrap>
                <ImageElement
                  src="/icons/cloud_download.svg"
                  width={24}
                  height={24}
                  style={{
                    width: '100%',
                    height: '100%',
                    padding: '0 6px 0 0',
                    position: 'relative',
                    top: '1px'
                  }}
                  alt="all resource download"
                />
              </ImageWrap>
              전체 다운로드
            </RadiusButton>
          </SummaryBtnContainer>
        </SummaryHeaderContainer>
      </SummaryContainer>
      <ContentListContainer>
        <ContentListHeader>
          <ContentListType>{virtualHumanInfo.type === 'voice' ? '목소리' : '아바타'} 프로젝트</ContentListType>
          <div>{data ? data.length : 0}개</div>
        </ContentListHeader>
        <ContentLists>
          {
            data && data.length > 0 ?
              data.map((item: any,) => {
                return (
                  <ContentList key={item.uuid}>
                    <ContentScript>{item.record_type === 'video' ? item.file_name : item.script}</ContentScript>
                    <ContentBtnContainer>
                      {/* <ImageElement
                        src="/icons/play.svg"
                        width={24}
                        height={24}
                        hoverbackground={color.BrightGrey}
                        style={{
                          position: 'relative',
                          margin: 'auto 2px',
                          padding: '2px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                        }}
                        onClick={(e) => {}}
                        alt="play"
                      /> */}
                      <ImageElement
                        src="/icons/download.svg"
                        width={24}
                        height={24}
                        hoverbackground={color.BrightGrey}
                        style={{
                          position: 'relative',
                          margin: 'auto 2px',
                          padding: '2px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                        }}
                        onClick={(e) => router.push(item.download_url)}
                        alt="download"
                      />
                    </ContentBtnContainer>
                  </ContentList>
                )
              }) : <ContentList>스크립트 목록이 없어요.</ContentList>
          }
        </ContentLists>
      </ContentListContainer>
    </Container>
  )
}

const Container = styled.div({
  position: 'relative',
  height: '100%',
})
const HeaderContaier = styled.div({
  position: 'relative',
  height: '6%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${color.ModernGrey}`,
  padding: '0 20px',
  fontSize: '1.2rem',
})
const Title = styled.div({
  fontWeight: '700'
})
const SummaryContainer = styled.div({
  position: 'relative',
  height: '8%',
  padding: '8px 16px'
})
const SummaryHeaderContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative'
})
const NameContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  fontSize: '1rem',
  fontWeight: '600'
})
const SummaryBtnContainer = styled.div({
  display: 'flex'
})
const ContentListContainer = styled.div({
  position: 'relative',
  height: '84%',
  padding: '4px 16px 8px 16px',
  overflowY: 'scroll',

  '::-webkit-scrollbar': {
    scrollBehavior: 'smooth',
    display: 'none'
  }
})
const ContentListHeader = styled.div({
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.1rem',
  color: color.BasicColor,
  justifyContent: 'space-between',
  margin: '0 0 8px 0'
})
const ContentListType = styled.div({
  fontWeight: '600',
})
const ContentLists = styled.ul({
  padding: '8px 0'
})
const ContentList = styled.li<CSS_TYPE>(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: `1px solid ${color.ModernGrey}`,
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '1rem',
    margin: '0 0 12px 0',

    ':hover': {
      border: `1px solid #4B73FF`,
      boxShadow: '1px 1px 12px rgba(163, 163, 163, 0.2)'
    }
  },
  props => ({

  })
)
const ContentScript = styled.div({
  width: '90%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  padding: '0 12px 0 0'
})
const ContentBtnContainer = styled.div({
  width: '10%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around'
})

export default MasterAuthRightSideComponent;