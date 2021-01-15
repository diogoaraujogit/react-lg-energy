import React, { useState } from 'react';

import { Container, Header, Info, Features, ManualRelay, Body, Schedules, Schedule } from './styles';
import { useSelector } from 'react-redux';
import { MdLens } from 'react-icons/md';
import BasicTimePicker from '../../../components/BasicTimePicker';
import SwitchLabels from '../../../components/Switch'
import Loading from '../../../components/Loading';
import api_crud from '../../../services/api_crud'
import { toast } from 'react-toastify';

const RelayTab = () => {

  const { device } = useSelector(state => state.device)

  const months = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  // const baseSchedules = 

  // const [schedules, setSchedules] = useState({})

  const [onEdit, setOnEdit] = useState(true)
  const [saving, setSaving] = useState(false)
  const [relay, setRelay] = useState(false)

  const handleSave = () => {

  }

  const handleCancel = () => {

  }

  const handleSwitch = (value) => {

    const body = {
      idDevice: device.id,
      action: value? 'ON' : 'OFF'
    }

    switchDevice(body)

  }

  async function switchDevice(body, checked, setChecked, setDisabled) {

    // setDisabled(true)

    try {

      const response = await api_crud.post('/devices/relay', body)

      if(response) {
        toast.info('Response')
        console.log(response)
        // checked? setChecked(false) : setChecked(true)
      }

    } catch(e) {
      toast.error('Error')
    }

    // setDisabled(false)
  }

  return (
    <Container>
      <Header>
        <Info>
          <div>
            <h2>{device.name}</h2>
          </div>
          <div>
            <MdLens />
            <span>&nbsp;Online time:&nbsp;</span>
            <span>00:00:00</span>
          </div>
        </Info>
        <Features>
          {
            onEdit &&
            <div>
              <button onClick={() => handleCancel()}>
                Cancel
              </button>

              <button disabled={saving} onClick={() => handleSave()}>
                Save {saving && <Loading />}
              </button>
            </div>

          }

        </Features>
      </Header>
      
      <ManualRelay>
        <p>On/Off Manual Relay</p>
        <button onClick={() => handleSwitch(true)}>ON</button>
        <button onClick={() => handleSwitch(false)}>OFF</button>
        {/* <SwitchLabels variable={relay} func={handleSwitch} disabled={!device?.isRelayEnabled}  /> */}
      </ManualRelay>

      <Body>
        <Schedules>
          {
            months.map(month => {

              return (
                <Schedule>
                  <h4>{month}</h4>
                  <div>
                    <div>
                      <p>Time On</p>
                      <BasicTimePicker />
                      <SwitchLabels size='small' />
                      <span>Disable</span>
                    </div>
                    <div>
                      <p>Time Off</p>
                      <BasicTimePicker />
                      <SwitchLabels size='small' />
                      <span>DIsable</span>
                    </div>
                  </div>
                </Schedule>
              )
            })

          }
        </Schedules>
      </Body>

    </Container>
  );
}

export default RelayTab;