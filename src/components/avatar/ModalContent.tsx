'use client';

import styled from '@emotion/styled';
import { CSS_TYPE, color, RadiusButton, Warning } from '@/src/styles/styles';
import { Dispatch, SetStateAction, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface ModalProps {
  avatarType: string;
  setAvatarType: Dispatch<SetStateAction<string>>;
  avatarName: string;
  setAvatarName: Dispatch<SetStateAction<string>>;
}

const ModalContent = ({ avatarType, setAvatarType, avatarName, setAvatarName }: ModalProps) => {

  // Hooks
  const nameRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [type, setType] = useState<string>(avatarType);
  const [validation, setValidation] = useState({
    name: false
  })

  // Validation
  const checkNameHandler = () => {

    const value = nameRef.current && nameRef.current.value;
    return value !== '' || value === null;
  }

  const onClickNextStepBtnHandler = () => {
    if (checkNameHandler()) {
      setValidation({
        name: false
      })
      alert('아바타 생성을 시작합니다.');
      router.push(`/avatar/generate?type=${type}`)
    } else {
      setValidation({
        name: true
      })
    }
  }

  return (
    <MainComponent>
      <ContentWrapper>
        <ContentTitle>생성 아바타의 유형을 선택해주세요.</ContentTitle>
        <ContentArea>
          <RadioButton
            type={'raido'}
            id={'voice'}
            name={'avatar'}
            defaultValue={'voice'}
            defaultChecked={type === 'voice'}
          />
          <RadioLabel
            htmlFor={'voice'}
            RadioChecked={type === 'voice'}
            borderRight={type === 'voice' ? '0' : ''}
            onClick={() => setType('voice')}
          >음성</RadioLabel>
          <RadioButton
            type={'raido'}
            id={'video'}
            name={'avatar'}
            borderLeft={type === 'video' ? '0' : ''}
            defaultValue={'video'}
            defaultChecked={type === 'video'}
          />
          <RadioLabel
            htmlFor={'video'}
            RadioChecked={type === 'video'}
            onClick={() => setType('video')}
          >영상</RadioLabel>
        </ContentArea>
      </ContentWrapper>
      <ContentWrapper>
        <ContentTitle>{type === 'voice' ? '음성' : '영상'} 아바타의 이름을 입력해주세요.</ContentTitle>
        <NameInput
          ref={nameRef}
          type={'text'}
          placeholder={`${type === 'voice' ? '음성' : '영상'} 아바타의 이름을 입력해주세요.`}
        />
        {
          validation.name && <Warning margin={'4px 0 0 0'} fontSize={'0.85rem'}>{type === 'voice' ? '음성' : '영상'} 아바타의 이름을 입력해주세요.</Warning>
        }
      </ContentWrapper>
      <ContentWrapper>
        <ContentTitle color={color.Purple}>이것만은 꼭 지켜주세요!</ContentTitle>
        <DescriptionLists>
          <DescriptionList>
            {type === 'voice' ?
              '주변 소음이 없는 조용한 공간에서 녹음 해주세요.' : '녹화 시작 후, 화면 속 대사를 천천히 읽어주세요.'}
          </DescriptionList>
          <DescriptionList>
            {type === 'voice' ?
              '첫 번째 문장부터 마지막 문장까지 일관된 목소리와 톤을 유지해주세요.' : '녹화 중 얼굴이 꼭 나와야 하며, 입을 가리지 않게 주의 해주세요.'}
          </DescriptionList>
          <DescriptionList>
            {type === 'voice' ?
              '문장 전체를 정확하고 자연스럽게 녹음해주세요.' : '꼭 대사를 읽을 필요는 없지만 입을 많이 움직일 수록 더 자연스러운 학습이 가능합니다.'}
          </DescriptionList>
          <DescriptionList>
            {type === 'voice' ?
              `쉼표(,) 에서는 잠시 멈추고, 물음표(?), 느낌표(!)는 최대한 느낌을 살려 읽어주세요.`
              :
              '최소 3분 이상 녹화가 필요합니다.'}
          </DescriptionList>
        </DescriptionLists>
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
    display: 'flex',
    alignItems: 'center'
  }
)
const RadioButton = styled.input<CSS_TYPE>({
  display: 'none'
})
const NameInput = styled.input({
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
const RadioLabel = styled.label<CSS_TYPE>(
  {
    fontSize: '1.2rem',
    padding: '8px 24px',
    cursor: 'pointer',
  },
  props => ({
    backgroundColor: props.RadioChecked ? color.BasicColor : color.White,
    color: props.RadioChecked ? color.White : color.ThumbnailColor,
    border: props.RadioChecked ? `1px solid ${color.BasicColor}` : `1px solid ${color.ThumbnailColor}`,
    borderLeft: props.borderLeft,
    borderRight: props.borderRight
  })
)
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