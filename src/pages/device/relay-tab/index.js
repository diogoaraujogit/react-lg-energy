import React, { useState } from 'react';

import { Container, Header, Info, Features, ManualRelay, Body, Schedules, Schedule } from './styles';
import { useSelector } from 'react-redux';
import { MdLens } from 'react-icons/md';
import BasicTimePicker from '../../../components/BasicTimePicker';
import SwitchLabels from '../../../components/Switch'
import Loading from '../../../components/Loading';
import api_crud from '../../../services/api_crud'
import { toast } from 'react-toastify';
import { format, parse } from 'date-fns';

const RelayTab = () => {

  const { device } = useSelector(state => state.device)

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const allSchedulesBase = [
    {
      "id": "repeat:4047f03b17c9a410c60fe28276c7ce85:1614568320000",
      "idDevice": 0,
      "dayOfWeek": "SUNDAY",
      "action": "ON",
      "isEnabled": true,
      "hour": "23",
      "minute": "12",
      "jobId": "0-SUNDAY-ON"
    },
    {
      "id": "repeat:49b9431ba3abe28bc20008d769a521cd:1614352260000",
      "idDevice": 0,
      "dayOfWeek": "FRIDAY",
      "action": "ON",
      "isEnabled": true,
      "hour": "11",
      "minute": "11",
      "jobId": "0-FRIDAY-ON"
    }
  ]

  const [allSchedules, setAllSchedules] = useState(allSchedulesBase)

  // const baseSchedules = 

  // const [schedules, setSchedules] = useState({})

  const [onEdit, setOnEdit] = useState(true)
  const [saving, setSaving] = useState(false)
  const [relay, setRelay] = useState(false)

  const handleSave = () => {
    updateSchedules()
  }

  const handleCancel = () => {

  }

  const handleSwitch = (value) => {

    const body = {
      idDevice: device.id,
      action: value ? 'ON' : 'OFF'
    }

    switchDevice(body)

  }

  async function switchDevice(body, checked, setChecked, setDisabled) {

    // setDisabled(true)

    try {

      const response = await api_crud.post('/devices/relay', body)

      if (response) {
        toast.info('Response')
        console.log(response)
        // checked? setChecked(false) : setChecked(true)
      }

    } catch (e) {
      toast.error('Error')
    }

    // setDisabled(false)
  }

  async function updateSchedules() {

    const body = allSchedules.filter(schedule => !schedule.id)

    try {

      const response = await Promise.all(body.map(item => api_crud.patch('/devices/relay/scheduler', item)))

    } catch(e) {

    }

  }

  const handleScheduleChange = (schedule, params) => {

    const newSchedule = {...schedule, ...params}
    
    const aux = allSchedules.filter(singleSchedule => singleSchedule.dayOfWeek !== newSchedule.dayOfWeek || singleSchedule.action !== newSchedule.action)
    
    setAllSchedules([...aux, newSchedule])

  }

  const handleEnable = (checked, setChecked, schedule) => {
    handleScheduleChange(schedule, {isEnabled: !checked})
    setChecked(!checked)
  }

  const handleTime = (e, schedule) => {
    const minute = format(e, 'mm')
    const hour = format(e, 'HH')
    
    handleScheduleChange(schedule, {hour, minute})
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
            weekDays.map(weekDay => {

              const [onSchedule] = allSchedules.filter(schedule => schedule.dayOfWeek.toLowerCase() === weekDay.toLowerCase() && schedule.action === 'ON')              
              const [offSchedule] = allSchedules.filter(schedule => schedule.dayOfWeek.toLowerCase() === weekDay.toLowerCase() && schedule.action === 'OFF')

              const onValidSchedule = onSchedule || {idDevice: device.id, dayOfWeek: weekDay.toUpperCase(), action: 'ON', isEnabled: false, hour: "00", minute: "00"}

              const validOnTime = onSchedule && parse(`${onSchedule.hour}:${onSchedule.minute}`, 'HH:mm', new Date())
              

              return (
                <Schedule>
                  <h4>{weekDay}</h4>
                  <div>
                    <div>
                      <p>Time On</p>
                      <BasicTimePicker value={validOnTime} handleChange={e => handleTime(e, onValidSchedule)} />
                      <SwitchLabels size='small' variable={onValidSchedule.isEnabled} 
                      func={(checked, setChecked) => handleEnable(checked, setChecked, onValidSchedule)} />
                      <span>Enable</span>
                    </div>
                    <div>
                      <p>Time Off</p>
                      <BasicTimePicker />
                      <SwitchLabels size='small' />
                      <span>Enable</span>
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