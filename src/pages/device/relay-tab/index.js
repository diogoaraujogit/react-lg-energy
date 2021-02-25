/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { Container, Header, Info, Features, ManualRelay, Body, Schedules, Schedule } from './styles';
import { useSelector } from 'react-redux';
import { MdLens } from 'react-icons/md';
import BasicTimePicker from '../../../components/BasicTimePicker';
import SwitchLabels from '../../../components/Switch'
import Loading from '../../../components/Loading';
import api_crud from '../../../services/api_crud'
import { toast } from 'react-toastify';
import { format, parse } from 'date-fns';
import { LoadingArea } from '../../dashboard/ranking-tab/styles';
import { PageMessage } from '../../comparatives/styles';

const RelayTab = () => {

  const { device } = useSelector(state => state.device)

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const [pageLoading, setPageLoading] = useState(false)
  const [pageMessage, setPageMessage] = useState('')

  const [allSchedules, setAllSchedules] = useState([])
  const [onEdit, setOnEdit] = useState(true)
  const [saving, setSaving] = useState(false)
  const [relay, setRelay] = useState(false)

  const handleSave = () => {
    updateSchedules()
  }

  const handleCancel = () => {
    getSchedules()
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

  async function getSchedules() {

    setPageLoading(true)

    try {

      const response = await api_crud.get(`/devices/relay/scheduler/${device.id}`)

      if (response.data) {
        setAllSchedules(response.data)
      }

    } catch (e) {
      toast.error('')
      setPageMessage('error trying to load schedules')
    }

    setPageLoading(false)
  }

  async function updateSchedules() {
    setSaving(true)
    const body = allSchedules.filter(schedule => !schedule.id)

    try {

      const responses = await Promise.all(body.map(item => api_crud.patch('/devices/relay/scheduler', item)))

      console.log(responses)

      if (!responses.filter(response => !response.data).length) {
        toast.success('All changes have been saved')
        getSchedules()
      }

    } catch (e) {
      toast.error('At least one of the changes could not be saved')
    }

    setSaving(false)
  }

  const handleScheduleChange = ({idDevice, dayOfWeek, action, isEnabled, hour, minute}, params) => {

    const newSchedule = { idDevice, dayOfWeek, action, isEnabled, hour, minute, ...params }

    const aux = allSchedules.filter(singleSchedule => singleSchedule.dayOfWeek !== newSchedule.dayOfWeek || singleSchedule.action !== newSchedule.action)

    setAllSchedules([...aux, newSchedule])

  }

  const handleEnable = (checked, setChecked, schedule) => {
    handleScheduleChange(schedule, { isEnabled: !checked })
    setChecked(!checked)
  }

  const handleTime = (e, schedule) => {
    const minute = format(e, 'mm')
    const hour = format(e, 'HH')

    handleScheduleChange(schedule, { hour, minute })
  }

  useEffect(() => {

    getSchedules()

  }, [])

  return (
    <Container>
      {
        pageLoading ?
          <LoadingArea>
            <Loading />
          </LoadingArea>
          :
          pageMessage ?
            <PageMessage>
              {pageMessage}
            </PageMessage>
            :
            <>
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

                      const onValidSchedule = onSchedule || { idDevice: device.id, dayOfWeek: weekDay.toUpperCase(), action: 'ON', isEnabled: false, hour: "00", minute: "00" }
                      const offValidSchedule = offSchedule || { idDevice: device.id, dayOfWeek: weekDay.toUpperCase(), action: 'OFF', isEnabled: false, hour: "00", minute: "00" }

                      const validOnTime = parse(`${onValidSchedule.hour}:${onValidSchedule.minute}`, 'HH:mm', new Date())
                      const validOffTime = parse(`${offValidSchedule.hour}:${offValidSchedule.minute}`, 'HH:mm', new Date())


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
                              <BasicTimePicker value={validOffTime} handleChange={e => handleTime(e, offValidSchedule)} />
                              <SwitchLabels size='small' variable={offValidSchedule.isEnabled}
                                func={(checked, setChecked) => handleEnable(checked, setChecked, offValidSchedule)} />
                              <span>Enable</span>
                            </div>
                          </div>
                        </Schedule>
                      )
                    })

                  }
                </Schedules>
              </Body>
            </>
      }
    </Container>
  );
}

export default RelayTab;