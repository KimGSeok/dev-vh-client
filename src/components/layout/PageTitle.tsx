import styled from '@emotion/styled';
import { CSS_TYPE, color, RadiusButton } from '@styles/styles';
import { MouseEventHandler } from 'react';

interface PageTitleProps {
  title: string;
  registerBtn?: boolean;
  btn?: string;
  event?: string;
  func?: MouseEventHandler<HTMLDivElement> | undefined;
}

const PageTitle = ({ title, event, func, registerBtn, btn }: PageTitleProps) => {

  return (
    <PageTitleWrap>
      {title}
      {
        registerBtn ?
          <RadiusButton
            padding={'6px 20px'}
            backgroundColor={color.BrightBlue}
            border={`1px solid ${color.BrightBlue}`}
            color={color.White}
            onClick={event === 'onClick' ? func : undefined}
          >{btn}</RadiusButton>
          : ''
      }
    </PageTitleWrap>
  )
}

const PageTitleWrap = styled.div({
  fontSize: '1.3rem',
  fontWeight: '600',
  borderBottom: `1px solid ${color.ModernGrey}`,
  padding: '0 0 8px 0',
  margin: '0 0 12px 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
})

export default PageTitle;