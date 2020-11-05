import React, { useEffect, useMemo, useState } from 'react';
import { MdClear, MdDelete, MdDevices } from 'react-icons/md';
import Popup from 'reactjs-popup';
import BasicDatePicker from '../../components/BasicDatePicker';
import CheckboxLabels from '../../components/Checkbox';
import Layout from '../../components/Layout'
import Loading from '../../components/Loading';
import RadioButton from '../../components/Radio';
import TabsComponent from '../../components/Tabs';
import { Search } from '../group/config-tab/styles';

import { Container, Content, FeaturesBox, Period, AddDevice, AddDeviceModal, CurrentDevices, Scroll, DataBox } from './styles';

const Comparatives = () => {

  const tabs = useMemo(() => ['Consumption', 'Current', 'Demand', 'Power'], [])

  const [tab, setTab] = useState(0)

  const [periodType, setPeriodType] = useState('day')
  const [dayDate, setDayDate] = useState(new Date())
  const [monthDate, setMonthDate] = useState(new Date())
  const [param, setParam] = useState('powerConsumption')

  const selectedsDevices_base = [{ idLora: 1, name: 'Device 01' }, { idLora: 0, name: 'Device 02' }, { idLora: 0, name: 'Device 03' }, { idLora: 0, name: 'Device 04' },]

  const [searchDevice, setSearchDevice] = useState('')
  const [devicesArray, setDevicesArray] = useState([])
  const [allDevices, setAllDevices] = useState([])
  const [saving, setSaving] = useState(false)
  const [selectedsDevices, setSelectedsDevices] = useState(selectedsDevices_base)


  const tableLabels = [{ title: 'Devices', value: 'name' }, { title: 'Phase A', value: 'a' }, { title: 'Phase B', value: 'b' }, { title: 'Phase C', value: 'c' }, { title: 'Media', value: 'average' }, { title: 'Total', value: 'total' }]
  const devices = [
    {
      "idLora": 1,
      "date": "03/11/2020",
      "current_a": "8.03",
      "current_b": "7.45",
      "current_c": "7.73",
      "current_total": "23.21",
      "current_average": "7.74",
      "activePower_a": "0.05",
      "activePower_b": "0.05",
      "activePower_c": "0.05",
      "activePower_total": "0.15",
      "activePower_average": "0.05",
      "powerConsumption_a": "0.01",
      "powerConsumption_b": "0.01",
      "powerConsumption_c": "0.01",
      "powerConsumption_total": "0.04",
      "powerConsumption_average": "0.01"
    },
    {
      "idLora": 2,
      "date": "03/11/2020",
      "current_a": "8.37",
      "current_b": "7.29",
      "current_c": "8.43",
      "current_total": "24.09",
      "current_average": "8.03",
      "activePower_a": "0.05",
      "activePower_b": "0.05",
      "activePower_c": "0.05",
      "activePower_total": "0.15",
      "activePower_average": "0.05",
      "powerConsumption_a": "0.01",
      "powerConsumption_b": "0.01",
      "powerConsumption_c": "0.01",
      "powerConsumption_total": "0.04",
      "powerConsumption_average": "0.01"
    }
  ]

  useEffect(() => {
    switch (tab) {
      case 0:
        setParam('powerConsumption')
        return;
      case 1:
        setParam('current')
        return;
      case 2:
        setParam('demand')
        return;
      case 3:
        setParam('activePower')
        return;
      default:
        return;
    }
  }, [tab])

  return (
    <Layout title='Comparatives'>
      <Container>
        <Content>

          <FeaturesBox>
            <Period>
              <p>Period:</p>
              <div className='radio-buttons'>
                <RadioButton label='Day' value='day' variable={periodType} func={setPeriodType} />
                <RadioButton label='Month' value='month' variable={periodType} func={setPeriodType} />
              </div>
              <div className='date-input'>
                {
                  periodType === 'day' ?
                    <BasicDatePicker value={dayDate} handleChange={setDayDate} />
                    :
                    <BasicDatePicker value={monthDate} handleChange={setMonthDate} format='MM/yyyy' views={['year', 'month']} />
                }
              </div>
            </Period>
            <AddDevice>
              <Popup
                onOpen={() => {
                  // setSelectedsDevices(devices)
                }}
                contentStyle={{ width: '37rem', height: '54rem', borderRadius: '1rem' }}
                trigger={
                  <button>
                    Add Device
                </button>
                }
                modal
              >
                {
                  close => {

                    return (
                      <AddDeviceModal>
                        {/* <h3>Edit Subgroup</h3>

                        <div className='search'>
                          <Search>
                            <div>
                              <input
                                type='text'
                                maxlength='20'
                                autoFocus
                                value={searchDevice}
                                onChange={event => setSearchDevice(event.target.value)}
                              />
                              <button onClick={() => setSearchDevice('')} >
                                <MdClear />
                              </button>
                            </div>

                          </Search>
                        </div>
                        <div className='devices'>
                          {
                            devicesArray && devicesArray.map(device => {

                              return (
                                <div>
                                  <CheckboxLabels
                                    label={device.name}
                                    variable={selectedsDevices}
                                    value={device.id}
                                    func={setSelectedsDevices}
                                    multiple
                                    notRemove
                                  />

                                </div>
                              )
                            })
                          }
                        </div>
                        <div className='buttons'>
                          <button onClick={() => close()}>
                            Cancel
                                      </button>
                          <button
                            disabled={saving}
                            // onClick={() => handleEditSub(group, close)}
                          >
                            Save {saving && <Loading />}
                          </button>
                        </div> */}
                      </AddDeviceModal>
                    )
                  }
                }
              </Popup>

            </AddDevice>
            <CurrentDevices>
              <p>Current devices</p>
              <Scroll options={{ suppressScrollX: true, useBothWheelAxes: false }}>
                {
                  selectedsDevices.map(device => {

                    return (
                      <div>
                        <p>{device.name}</p>
                        <MdDelete />
                      </div>
                    )
                  })
                }
              </Scroll>
            </CurrentDevices>
          </FeaturesBox>

          <DataBox>
            <div className='tabs'>
              <TabsComponent tabs={tabs} onTabChange={setTab} initial={tab} />
            </div>
            <div className='body'>
              <div className='header'>
                {
                  tableLabels.map(item => (
                    <div>
                      {item.title}
                    </div>
                  ))
                }
              </div>
              <div className='table'>
                {
                  selectedsDevices.map(selected => {

                    const device = devices.find(device => device.idLora === selected.idLora)


                    return (
                      <div>
                        {
                          tableLabels.map(label => {

                            let value

                            if (label.value === 'name') {
                              value = selected.name
                            } else {
                              value = device && device[`${param}_${label.value}`]
                            }

                            return (
                              <div>{value}</div>
                            )
                          })
                        }
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </DataBox>
        </Content>
      </Container>
    </Layout>

  );
}

export default Comparatives;