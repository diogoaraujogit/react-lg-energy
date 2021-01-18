import React from 'react';
import { useState } from 'react';
import { useMemo } from 'react';

import { 
  Container,
  Content,
  RankingChart,
  RankingList,
  RankingSearch 
} from './styles';

const RankingTab = () => {

  const [showRanking, setShowRanking] = useState(true)

  return (
    <Container>
      <Content>
        <div></div>
        <div>
          {
            showRanking?
            <RankingChart>

            </RankingChart>
            :
            <RankingSearch>

            </RankingSearch>
          }
          <RankingList>
            
          </RankingList>
        </div>
      </Content>
    </Container>
  );
}

export default RankingTab;