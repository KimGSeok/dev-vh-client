import styled from '@emotion/styled';
import { CSS_TYPE, color, ImageElement } from '@/src/styles/styles';
import { useRef, useState } from 'react';
import { onClickOutsideHandler } from '@/src/modules/onClickOutside';

const Filter = () => {

  // Hooks
  const [isOpenFilter, setIsOpenFilter] = useState(false); // 필터 세부내역

  // Ref
  const filterAreaRef = useRef<any>(null);
  const exceptRef = useRef<any>(null);

  onClickOutsideHandler(filterAreaRef, exceptRef, setIsOpenFilter)

  return (
    <FilterWrapper>
      <FilterArea
        ref={filterAreaRef}
        onClick={() => setIsOpenFilter(!isOpenFilter)}
      >
        <ImageElement
          src="/icons/filter.svg"
          width={12}
          height={12}
          alt="filter"
        />
        <FilterContent margin={'0 8px'}>
          <FilterType>정렬기준</FilterType>
          <FilterValue>생성시간</FilterValue>
        </FilterContent>
        <FilterContent>
          <FilterType>정렬유형</FilterType>
          <FilterValue>오름차순</FilterValue>
        </FilterContent>
      </FilterArea>
      {
        isOpenFilter ?
          <FilterDetailWrapper ref={exceptRef}>
            <FilterDetailArea>
              <FilterDetailName>정렬기준</FilterDetailName>
              <FilterValueLists>
                <FilterValueList>
                  <input id='projectName' type='radio' name='orderType' defaultChecked />
                  <label htmlFor='projectName'>프로젝트명</label>
                </FilterValueList>
                <FilterValueList>
                  <input id='avatarName' type='radio' name='orderType' />
                  <label htmlFor='avatarName'>아바타명</label>
                </FilterValueList>
                <FilterValueList>
                  <input id='createAt' type='radio' name='orderType' />
                  <label htmlFor='createAt'>생성시간</label>
                </FilterValueList>
              </FilterValueLists>
            </FilterDetailArea>
            <FilterDetailArea>
              <FilterDetailName>정렬유형</FilterDetailName>
              <FilterValueLists>
                <FilterValueList>
                  <input id='desc' type='radio' name='orderBy' defaultChecked />
                  <label htmlFor='desc'>오름차순</label>
                </FilterValueList>
                <FilterValueList>
                  <input id='asc' type='radio' name='orderBy' />
                  <label htmlFor='asc'>내림차순</label>
                </FilterValueList>
              </FilterValueLists>
            </FilterDetailArea>
          </FilterDetailWrapper> : ''
      }
    </FilterWrapper>
  )
}

const FilterWrapper = styled.div({
  width: 'fit-content',
  marginLeft: 'auto',
  position: 'relative',
  cursor: 'pointer'
})
const FilterArea = styled.div({
  position: 'relative',
  border: `1px solid ${color.ThumbnailColor}`,
  borderRadius: '8px',
  padding: '6px 16px',
  display: 'flex',
  alignItems: 'center'
})
const FilterContent = styled.div<CSS_TYPE>(
  {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.9rem',
  },
  props => ({
    margin: props.margin
  })
)
const FilterType = styled.div({
  margin: '0 4px 0 0'
})
const FilterValue = styled.div({
  color: color.BasicColor,
  fontWeight: '700'
})
const FilterDetailWrapper = styled.div({
  position: 'absolute',
  top: '28px',
  left: '0px',
  width: '100%',
  backgroundColor: color.White,
  border: `1px solid ${color.ThumbnailColor}`,
  borderRadius: '8px',
  padding: '16px 16px 0px 16px',
  margin: '4px 0 0 0',
  boxShadow: '1px 1px 4px 1px rgb(53 60 73 / 10%)',
  zIndex: '2'
})
const FilterDetailArea = styled.div({
  margin: '0 0 18px 0'
})
const FilterDetailName = styled.div({
  fontSize: '0.85rem',
  fontWeight: '500',
  margin: '0 0 6px 0'
})
const FilterValueLists = styled.ul({
  display: 'flex',
})
const FilterValueList = styled.li({
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.85rem',
  margin: '0 8px 0 0',

  '& > input': {
    margin: '0 4px 0 0'
  }
})

export default Filter;