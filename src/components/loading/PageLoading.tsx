'use client';

import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { color, spin } from '../../styles/styles';

const PageLoading = () =>{

  // Hooks
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
    return () => setMount(true);
  }, [])

  return (
    mount ? <LoadingWrapper>
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