import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2.5rem 4rem;

  > div {
    display: flex;
    flex-direction: row;
  }
`;

export const RankingChart = styled.div`
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 5px #0000000D;
  height: 55.1rem;
  width: 30rem;
  border-radius: 10px;  
  margin-right: 2.2rem;
`;

export const RankingSearch = styled.div`
  
`;

export const RankingList = styled.div`
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 5px #0000000D;
  height: 55.1rem;
  flex: 1;
  border-radius: 10px;
`;