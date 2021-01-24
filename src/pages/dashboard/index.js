import React from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import Layout from '../../components/Layout'
import TabsComponent from '../../components/Tabs';
import ConsumptionTab from './consumption-tab';
import RankingTab from './ranking-tab';

import { Container, Tabs, PageContent } from './styles';

const Dashboard = () => {

  const tabs = useMemo(() => ['Consumption', 'Ranking'], [])
  const [tab, setTab] = useState(1)

  const renderTab = () => {
    switch (tab) {
      case 0:
        return <ConsumptionTab />
      case 1:
        return <RankingTab />
      default:
        return <h1> 404 </h1>
    }
  }


  return (
    <Layout title='Dashboard'>
      <Container>
        <Tabs>
          <TabsComponent tabs={tabs} onTabChange={setTab} initial={tab} />
        </Tabs>
        <PageContent>
          {
            renderTab()
          }
        </PageContent>
      </Container>
    </Layout>
  );
}

export default Dashboard;