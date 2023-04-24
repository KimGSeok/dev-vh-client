import { KeyboardEvent } from 'react';
import styled from '@emotion/styled';
import { color, SelectBox } from '@styles/styles';

const Search = () => {

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {

    console.log(e);

    if (e.key === 'Enter' && e.shiftKey) {
      return false;
    } else if (e.key === 'Enter') {

      e.preventDefault();
    }
  }

  return (
    <SearchWrap>
      <SelectBox
        padding={'6px 32px 6px 12px'}
        border={`1px solid ${color.ModernGrey}`}
      >
        <option>전체</option>
        <option>프로젝트명</option>
        <option>아바타명</option>
      </SelectBox>
      <div>
        <Keyword type='text' placeholder='검색어를 입력해주세요.' onKeyDown={(e) => onKeyDown(e)} />
      </div>
    </SearchWrap>
  )
}

const SearchWrap = styled.div({
  width: 'fit-content',
  position: 'relative',
  margin: '8px 0 0 auto',
  display: 'flex',
  alignItems: 'center'
})
const Keyword = styled.input(
  {
    minWidth: '480px',
    fontSize: '0.9rem',
    borderRadius: '8px',
    padding: '6px 32px 6px 12px',
    margin: '0 0 0 8px',
    border: `1px solid ${color.ModernGrey}`,

    '&::placeholder': {
      padding: '0 0 0 28px',
      backgroundImage: "url('/icons/search.svg')",
      backgroundSize: '',
      backgroundPosition: '1px center',
      backgroundRepeat: 'no-repeat',
      textAlign: 'left',
      textIndent: '0'
    }
  }
)

export default Search;