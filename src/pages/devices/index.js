import React, { useEffect, useState, useMemo } from 'react';
import Layout from '../../components/Layout'

import { Container, Header, Info, Features, Body, BodyMessage, Groups, Group, GroupHeader, Cards, Card } from './styles';

import { MdLens } from 'react-icons/md'
import Loading from '../../components/Loading'

import api_crud from '../../services/api_crud';
import SwitchLabels from '../../components/Switch';
import { Link } from 'react-router-dom';

const Devices = () => {

  // ESTADOS INTERNOS

  const [bodyLoading, setBodyLoading] = useState(true)
  const [bodyMessage, setBodyMessage] = useState('')
  const [groups, setGroups] = useState([])

  const [switchDisabled, setSwitchDisabled] = useState(false)

  // VARIÁVEIS

  // FUNÇÕES

  

  function handlePowerDevice(checked, setChecked) {
    //setSwitchDisabled(true)
    setChecked(!checked)
    // setDevicePower(!devicePower)
}

  async function getGroups() {

    setBodyLoading(true)
    setBodyMessage('')

    try {

      const response = await api_crud.get('/groups')

      if (response.data) {
        setGroups(response.data)
      }

    } catch (e) {

      setBodyMessage('Houve um erro ao carregar os dispositivos')

    }

    setBodyLoading(false)
  }

  // USE EFFECTS

  useEffect(() => {
    getGroups()
  }, [])

  return (
    <Layout title='Devices'>
      <Container>
        <Header>
          <Info>
            <div>
              <h2>Devices</h2>
              <span>{`${groups.length} Devices`}</span>
            </div>
            <div>
              <span>Status:&emsp;</span>
              <MdLens />
              <p>&nbsp;Active&emsp;</p>
              <MdLens />
              <p>&nbsp;Inactive</p>
            </div>
          </Info>
          <Features>

          </Features>
        </Header>
        <Body>
          {bodyLoading ?
            <Loading />
            :
            bodyMessage ?
              <BodyMessage>
                {bodyMessage}
              </BodyMessage>
              :
              <Groups>
                {
                  groups && Array.isArray(groups) && groups.map(group => {

                    const devices = group.devices || []
                    const name = group.name || '-'
                    const group_id = group.id || ''

                    return (
                      <Group>
                        <GroupHeader>
                          <h2>{name}</h2>
                          <div>
                            <Link to='/groups'>
                              See Group
                            </Link>
                          </div>
                        </GroupHeader>
                        <Cards>
                          {
                            devices && Array.isArray(devices) && devices.map(device => {

                              const status = true
                              const name = device.name || '-'
                              const relay_status = false
                              

                              return (
                                <Card status={status}>
                                  <div>
                                    <div>
                                      <MdLens />
                                    </div>
                                    <p>{name}</p>
                                  </div>
                                  <SwitchLabels label='' func={(checked, setChecked) => handlePowerDevice(checked, setChecked)} variable={relay_status}
                                                fontSize={'2.4rem'} font480={'1.6rem'} disabled={switchDisabled}
                                  />
                                </Card>
                              )
                            })
                          }
                        </Cards>
                      </Group>
                    )
                  })
                }
              </Groups>
          }
        </Body>
      </Container>
    </Layout>

  );
}

export default Devices;