import styled from 'styled-components'

import { darken } from 'polished'

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #F5F5F5;
  overflow: hidden;
`;

export const MenuArea = styled.div`
  display: flex;
  height: 100%;
  background-color: #ffffff;
`;

export const ContentArea = styled.div`
  height: 100%;
  width: 94vw;
  overflow: hidden;
`;

export const HeaderArea = styled.div`
  height: 6.5rem;
  width: 100%;
  background-color: #F8F8F8;
`;

export const PageArea = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #F8F8F8;
`;