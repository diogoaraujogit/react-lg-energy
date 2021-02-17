/* eslint-disable react-hooks/exhaustive-deps */
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
import { useSelector } from 'react-redux';
import translation from './transl';

const Storage = () => {

  
  const { english } = useSelector(props => props.intl)
  const transl = english? translation.en : translation.pt

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
  const [dbs, setDbs] = useState([])
  const [files, setFiles] = useState(files_base)
  const [itemsList, setItensList] = useState(dbs)
  const [loading, setLoading] = useState(false)
  const [bodyMessage, setBodyMessage] = useState('')

  const tabs = [transl.Databases, transl.Files]
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
        "label": transl.used,
        "value": used,
      },
      {
        "id": "free",
        "label": transl.free,
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
        setBodyMessage(transl.errorDisk)
      }

    } catch (e) {
      setLoading(false)
      toast.error(transl.errorDisk)
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
      toast.error(transl.errorDatabase)
      setBodyMessage(transl.errorDatabase)
    }

    setLoading(false)
  }

  return (
    <Layout title={transl.title}>
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
                    <h3>{transl.DiskUsage}</h3>
                    <div>
                      <div>
                        <MdLens />
                        <p>{transl.Free}</p>
                      </div>
                      <div>
                        <MdLens id="used" />
                        <p>{transl.Used}</p>
                      </div>
                    </div>
                  </UsageHeader>
                  <UsageChart>
                    <div className='info'>
                      <h2>{`${disk?.percentageUsed || '-'}%`}</h2>
                      <p>{transl.UsedSpace}</p>
                    </div>
                    <div className='chart'>
                      <PieChart data={chartData} />
                    </div>
                  </UsageChart>
                  <UsageInfo>
                    <div className='available'>{`${transl.Available}: ${disk?.free || '-'}`}</div>
                    <div className='used'>{`${transl.UsedSpace}: ${disk?.used || '-'}`}</div>
                  </UsageInfo>
                </DiskUsage>
                <StorageList>
                  <div className='tabs'>
                    <TabsComponent tabs={tabs} onTabChange={setTab} />
                  </div>
                  <div className='table'>
                    <div className='table-header'>
                      <p>{transl.Item}</p>
                      <p>{transl.Size}</p>
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