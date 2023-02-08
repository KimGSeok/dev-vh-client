'use client';

import styled from '@emotion/styled';
import { CSS_TYPE, color, RadiusButton, Warning } from '@/src/styles/styles';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ModalProps {

}

const ModalContent = () => {

  // Hooks
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const [validation, setValidation] = useState({ name: false })

  // Validation
  const checkNameHandler = (name: string | null) => {
    return name !== '' || name === null;
  }

  const onClickNextStepBtnHandler = () => {

    // Parameter
    const name: string | null = nameRef.current && nameRef.current.value;
    if (checkNameHandler(name)) {

      setValidation({ name: false })
      alert('프로젝트 생성을 시작합니다.');
      router.push(`/project/detail?name=${name}`)
    } else {

      setValidation({ name: true })
    }
  }

  return (
    <MainComponent>
      <ContentWrapper>
        <ContentTitle>프로젝트의 이름을 입력해주세요.</ContentTitle>
        <ContentArea>
          <TitleInput ref={nameRef} type="text" placeholder={'프로젝트 이름을 입력해주세요.'} />
          {
            validation.name && <Warning margin={'4px 0 0 0'} fontSize={'0.85rem'}>프로젝트 이름을 입력해주세요.</Warning>
          }
        </ContentArea>
        <ContentWrapper>
          <ContentTitle color={color.Purple}>프로젝트 제작 전 읽어주세요!</ContentTitle>
          <DescriptionLists>
            <DescriptionList>
              프로젝트에서 목소리&#40;음성 녹음&#41;와 모델 아바타&#40;영상 촬영&#4;를 통해서 아바타를 생성할 수 있어요.
            </DescriptionList>
            <DescriptionList>
              음성 및 영상 변환 시 크기에 따라서 소요되는 시간에 차등이 있어요.
            </DescriptionList>
            <DescriptionList>
              모델 아바타 선택과 스크립트를 다 입력하셨다면 변환하기 버튼을 통해서 아바타를 생성해주세요.
            </DescriptionList>
          </DescriptionLists>
        </ContentWrapper>
      </ContentWrapper>
      <ButtonWrapper>
        <RadiusButton
          backgroundColor={color.BasicColor}
          color={color.White}
          padding={'12px 28px'}
          margin={'12px 0 0 0'}
          onClick={onClickNextStepBtnHandler}
        >다음으로</RadiusButton>
      </ButtonWrapper>
    </MainComponent>
  )
}

const MainComponent = styled.div({
  margin: '0 12px',
  padding: '0 0 24px 0'
})
const ContentWrapper = styled.div({
  margin: '0 0 24px 0'
})
const ContentTitle = styled.div<CSS_TYPE>(
  {
    fontSize: '1rem',
    fontWeight: '700',
    margin: '12px 0'
  },
  props => ({
    color: props.color
  })
)
const ContentArea = styled.div(
  {
    margin: '0 0 24px 0'
  }
)
const TitleInput = styled.input({
  minWidth: '480px',
  fontSize: '0.9rem',
  borderRadius: '8px',
  padding: '6px 32px 6px 12px',
  border: `1px solid ${color.ModernGrey}`,

  '&::placeholder': {
    textAlign: 'left',
    textIndent: '0'
  }
})
const DescriptionLists = styled.ul({})
const DescriptionList = styled.li({
  listStyle: 'disc',
  fontSize: '1rem',
  margin: '12px 0 12px 12px',
})
const ButtonWrapper = styled.div({
  textAlign: 'right'
})

export default ModalContent;