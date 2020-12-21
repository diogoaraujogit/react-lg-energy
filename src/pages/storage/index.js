import React, { useEffect, useState } from 'react';
import { MdLens } from 'react-icons/md';
import Layout from '../../components/Layout'
import PieChart from '../../components/PieChart';
import TabsComponent from '../../components/Tabs';

import { Container, Content, DiskUsage, UsageHeader, UsageChart, UsageInfo, StorageList, ListItem } from './styles';

const Storage = () => {

  

  const db_base = [
    {
      name: 'DB Notification',
      size: '15 MB',
    },
    {
      name: 'DB Notification',
      size: '15 MB',
    },
  ]

  const files_base = [
    {
      name: 'File 01',
      size: '5 MB',
    },
    {
      name: 'File 02',
      size: '1 MB',
    },
  ]

  const data = [
    {
      "id": "used",
      "label": "used",
      "value": 50,
    },
    {
      "id": "free",
      "label": "free",
      "value": 50,
    }
  ]
  

  const [dbs, setDbs] = useState(db_base)
  const [files, setFiles] = useState(files_base)
  const [itemsList, setItensList] = useState(dbs)

  const tabs = ['Databases', 'Files']
  const [tab, setTab] = useState(0)

  useEffect(() => {

    tab? setItensList(files) : setItensList(dbs)

  }, [tab])

  return (
    <Layout title='Server'>
      <Container>
        <Content>
          <DiskUsage>
            <UsageHeader>
              <h3>DISK USAGE</h3>
              <div>
                <div>
                  <MdLens />
                  <p>Free</p>
                </div>
                <div>
                  <MdLens id="used" />
                  <p>Used</p>
                </div>
              </div>
            </UsageHeader>
            <UsageChart>
              <div className='info'>
                <h2>50%</h2>
                <p>Used Space</p>
              </div>
              <div className='chart'>
                <PieChart data={data} />
              </div>
            </UsageChart>
            <UsageInfo>
              <div className='available'>Available: 500GB</div>
              <div className='used'>Used Space: 250GB</div>
            </UsageInfo>
          </DiskUsage>
          <StorageList>
            <div className='tabs'>
              <TabsComponent tabs={tabs} onTabChange={setTab} />
            </div>
            <div>
              <div className='table-header'>
                <p>Item</p>
                <p>Size</p>
              </div>
              <div>
                {
                  itemsList.map(item => {

                    const name = item.name
                    const size = item.size

                    return (
                      <ListItem>
                        <p>{name}</p>
                        <p>{size}</p>
                      </ListItem>
                    )
                  })
                }
              </div>

            </div>
          </StorageList>
        </Content>
      </Container>
    </Layout>
  );
}

export default Storage;