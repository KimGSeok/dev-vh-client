import styled from '@emotion/styled';
import { CSS_TYPE, color, SelectBox } from '@/src/styles/styles';

const Search = () => {
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
        <Keyword type='text' placeholder='검색어를 입력해주세요.' />
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