import React, { useEffect, useMemo, useState } from 'react';
import { MdDelete, MdDevices } from 'react-icons/md';
import Popup from 'reactjs-popup';
import BasicDatePicker from '../../components/BasicDatePicker';
import Layout from '../../components/Layout'
import RadioButton from '../../components/Radio';
import TabsComponent from '../../components/Tabs';

import { Container, Content, FeaturesBox, Period, AddDevice, CurrentDevices, Scroll, DataBox } from './styles';

const Comparatives = () => {

  const tabs = useMemo(() => ['Consumption', 'Current', 'Demand', 'Power'], [])

  const [tab, setTab] = useState(0)

  const [periodType, setPeriodType] = useState('day')
  const [dayDate, setDayDate] = useState(new Date())
  const [monthDate, setMonthDate] = useState(new Date())
  const [param, setParam] = useState('powerConsumption')

  const selectedsDevices = [{idLora: 1, name: 'Device 01'}, {idLora: 0, name: 'Device 02'}, {idLora: 0, name: 'Device 03'}, {idLora: 0, name: 'Device 04'}, ]
  const tableLabels = [{title: 'Devices', value: 'name'}, {title: 'Phase A', value: 'a'}, {title: 'Phase B', value: 'b'}, {title: 'Phase C', value: 'c'}, {title: 'Media', value: 'average'}, {title: 'Total', value: 'total'}]
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
                      <div>
                        Teste
                      </div>
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
                          tableLabels.map((label, idx) => {

                            let value

                            if(idx === 0) {
                              value = selected.name
                            } else {
                              value = device && device[`${param}_${label.value}`]
                              console.log(`${param}_${label.value}`)
                              console.log(device)
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