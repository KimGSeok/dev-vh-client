import styled from '@emotion/styled';
import { CSS_TYPE, color, RadiusButton } from '@/src/styles/styles';
import { useRouter } from 'next/navigation';

interface PageTitleProps {
  title: string;
  link?: string;
  registerBtn?: boolean;
  btn?: string;
}

const PageTitle = ({ title, link, registerBtn, btn }: PageTitleProps) => {

  // Hooks
  const router = useRouter();

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
            onClick={() => { link ? router.push(link) : null }}
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