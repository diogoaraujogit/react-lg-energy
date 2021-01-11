import React, { useEffect, useState } from 'react';
import { MdLens } from 'react-icons/md';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout'
import PieChart from '../../components/PieChart';
import TabsComponent from '../../components/Tabs';
import api_server from '../../services/api_server';
import Loading from '../../components/Loading';


import { Container, MessageArea, LoadingArea,
  Content, DiskUsage, UsageHeader, UsageChart, UsageInfo, StorageList, ListItem } from './styles';

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

  const [disk, setDisk] = useState()
  const [chartData, setChartData] = useState([])
  const [dbs, setDbs] = useState(db_base)
  const [files, setFiles] = useState(files_base)
  const [itemsList, setItensList] = useState(dbs)
  const [loading, setLoading] = useState(false)
  const [bodyMessage, setBodyMessage] = useState('')

  const tabs = ['Databases', 'Files']
  const [tab, setTab] = useState(0)

  useEffect(() => {

    tab ? setItensList(files) : setItensList(dbs)

  }, [tab, dbs, files])

  useEffect(() => {

    const used = disk?.used?.slice(0, -3) || 0
    const free = disk?.free?.slice(0, -3) || 0

    const data = [
      {
        "id": "used",
        "label": "used",
        "value": used,
      },
      {
        "id": "free",
        "label": "free",
        "value": free,
      }
    ]

    setChartData(data)

  }, [disk])

  useEffect(() => {

    getDisk()

  }, [])

  async function getDisk() {

    setLoading(true)

    try {

      const response = await api_server.get('/disk')
      console.log(response)
      if (response.data) {
        getDatabase()
        setDisk(response.data)
      } else {
        setLoading(false)
        setBodyMessage('Error trying to load database information')
      }

    } catch (e) {
      setLoading(false)
      toast.error('Error trying to load database information')
    }
  }

  async function getDatabase() {

    try {

      const response = await api_server.get('/database')
      console.log(response)
      if (response.data) {
        setDbs(response.data)
      }

    } catch (e) {
      toast.error('Error trying to load disk information')
      setBodyMessage('Error trying to load disk information')
    }

    setLoading(false)
  }

  return (
    <Layout title='Server'>
      <Container>
        {
          loading ?
            <LoadingArea>
              <Loading />
            </LoadingArea>
            :
            bodyMessage ?
              <MessageArea>
                {bodyMessage}
              </MessageArea>
              :

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
                      <h2>{`${disk?.percentageUsed || '-'}%`}</h2>
                      <p>Used Space</p>
                    </div>
                    <div className='chart'>
                      <PieChart data={chartData} />
                    </div>
                  </UsageChart>
                  <UsageInfo>
                    <div className='available'>{`Available: ${disk?.free || '-'}`}</div>
                    <div className='used'>{`Used Space: ${disk?.used || '-'}`}</div>
                  </UsageInfo>
                </DiskUsage>
                <StorageList>
                  <div className='tabs'>
                    <TabsComponent tabs={tabs} onTabChange={setTab} />
                  </div>
                  <div className='table'>
                    <div className='table-header'>
                      <p>Item</p>
                      <p>Size</p>
                    </div>
                    <div className='table-body'>
                      {
                        itemsList.map(item => {

                          const name = item.name || item.table
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
        }
      </Container>
    </Layout>
  );
}

export default Storage;