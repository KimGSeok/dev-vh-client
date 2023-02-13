'use client';

import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useInterval } from 'src/hooks/useInterval';
import { PageLoadingAtom } from 'src/recoil/atom';
import { color, spin } from '../../styles/styles';

const PageLoading = () =>{

  // Recoil
  const loading = useRecoilValue(PageLoadingAtom);

  return (
    loading ?
    <LoadingWrapper>
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    </LoadingWrapper> : <></>
  )
}

const LoadingWrapper = styled.div({
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  top: '0',
  left: 0,
  backgroundColor: 'rgb(18, 18, 18, 0.45)',
  zIndex: 99
})
const LoaderWrapper = styled.div({
  position: 'absolute',
  top: '47.5%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
})
const Loader = styled.div(
  spin,
  {
    width: '100px',
    height: '100px',
    border: `12px solid ${color.DarkWhite}`,
    borderTop: `12px solid ${color.SkyBlue}`,
    borderRadius: '50%',
  }
)

export default PageLoading;