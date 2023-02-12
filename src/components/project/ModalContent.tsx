'use client';

import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CSS_TYPE, color, RadiusButton, Warning, ImageElement } from '@/src/styles/styles';
import { post } from 'src/hooks/asyncHooks';

const ModalContent = () => {

  // Hooks
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const [validation, setValidation] = useState({ name: false })

  // Validation
  const checkNameHandler = (name: string | null) => {
    return name !== '' || name === null;
  }

  const onClickNextStepBtnHandler = async () => {

    // Parameter
    const name: string | null = nameRef.current && nameRef.current.value;
    if (checkNameHandler(name)) {

      setValidation({ name: false })

      // Next To Project Generate Page
      const response = await post('project', { 'projectName' : name }, {});
      if(response.status === 201 && response.data){

        alert('프로젝트가 생성되었어요.\n프로젝트 스튜디오에서 아바타를 제작해주세요.');
        router.push(`/project/generate?name=${name}&projectId=${response.data.insertId}`)
      }
      else {
        alert('프로젝트 생성에 실패했어요.\n관리자에게 문의해주세요.')
      }
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
              프로젝트에서 목소리&#40;음성 녹음&#41;와 모델 아바타&#40;영상 촬영&#41;를 통해서 아바타를 생성할 수 있어요.
            </DescriptionList>
            <DescriptionList>
              음성 및 영상 변환 시 크기에 따라서 소요되는 시간에 차등이 있어요.
            </DescriptionList>
            <DescriptionList>
              모델 아바타 선택과 스크립트를 다 입력하셨다면 변환하기 버튼을 통해서 아바타를 생성해주세요.
            </DescriptionList>
            <DescriptionList color={color.Red} fontWeight={'600'}>
              아바타를 제작하기 전, 프로젝트가 우선 생성이 된 후 진행이 되니 참고해주세요!
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
const DescriptionList = styled.li<CSS_TYPE>(
  {
    listStyle: 'disc',
    fontSize: '1rem',
    margin: '12px 0 12px 12px',
  },
  props => ({
    color: props.color,
    fontWeight: props.fontWeight
  })
)
const ButtonWrapper = styled.div({
  textAlign: 'right'
})

export default ModalContent;