import React, { useCallback, useState } from 'react';

import { Container, Header, Info, Features, DelDevice, LoadingArea, BodyMessage, Body, Boards, Values } from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { MdLens, MdEdit } from 'react-icons/md';
import Popup from 'reactjs-popup';
import api_crud from '../../../services/api_crud';
import { toast } from 'react-toastify';
import SwitchLabels from '../../../components/Switch';
import { setDevice } from '../../../store/modules/device/actions';
import Loading from '../../../components/Loading';
import { useHistory } from 'react-router-dom';
import api_notifications from '../../../services/api_notifications';

const InfoTab = () => {

  const { device } = useSelector(state => state.device)
  const { id } = device
  const dispatch = useDispatch()
  const history = useHistory()
  const [bodyLoading, setBodyLoading] = useState(false)
  const [bodyMessage, setBodyMessage] = useState('')
  const [saving, setSaving] = useState(false)


  const [name, setName] = useState(device.name || '-')

  const [isRelayEnabled, setIsRelayEnabled] = useState(device.isRelayEnabled)

  const [description, setDescription] = useState(device.description)
  const [switchboard, setSwitchboard] = useState(device.switchboard)
  const [nominalCurrent, setNominalCurrent] = useState(device.nominalCurrent)
  const [ratedVoltage, setRatedVoltage] = useState(device.ratedVoltage)
  const [currentTransformer, setCurrentTransformer] = useState(device.currentTransformer)
  const [diameter, setDiameter] = useState(device.diameter)
  const [frameVoltage, setFrameVoltage] = useState(device.frameVoltage)
  const [phase, setPhase] = useState(device.phase)

  const [idLora, setIdLora] = useState(device.idLora)
  const [macAddress, setMacAddress] = useState(device.macAddress)


  const [onEdit, setOnEdit] = useState(false)

  const [formError, setFormError] = useState(false)
  const [deleting, setDeleting] = useState(false)


  const mask = useCallback((i, type) => {
    var v = i.value;

    if (!v) {
      return null
    }

    if (isNaN(v[v.length - 1]) || (v[v.length - 1]) === 'e') { // impede entrar outro caractere que não seja número
      i.value = v.substring(0, v.length - 1);
      return i.value;
    }

    return parseInt(i.value)

  }, [])


  const handleCancel = () => {
    setName(device.name)
    setDescription(device.description)
    setIsRelayEnabled(device.isRelayEnabled)
    setSwitchboard(device.switchboard)
    setNominalCurrent(device.nominalCurrent)
    setRatedVoltage(device.ratedVoltage)
    setCurrentTransformer(device.currentTransformer)
    setPhase(device.phase)
    setDiameter(device.diameter)
    setFrameVoltage(device.frameVoltage)
    setMacAddress(device.macAddress)
    setOnEdit(false)
  }

  async function notifyUpdate(device, body) {

    let message = ''
    var hasChanges = false 

    const associateParams = {
      name: 'Name', idLora: 'ID Lora', description: 'Description', isRelayEnabled: 'Relay option',
      switchboard: 'Switchboard', nominalCurrent: 'Nominal current', ratedVoltage: 'Rated Voltage',
      currentTransformer: 'Current transformer', phase: 'Phase', diameter: 'Diameter', frameVoltage: 'Frame Voltage',
      macAddress: 'Mac Address'
    }

    if(device.name !== body.name) {
      hasChanges = true
      message = message.concat(`Device '${device.name}' has been updated to '${body.name}'.`)
    } else {
      message = message.concat(`Device '${device.name}' has been updated.`)
    }

    ['idLora', 'description', 'isRelayEnabled', 'switchboard', 
    'nominalCurrent', 'ratedVoltage', 'currentTransformer', 'phase', 
    'diameter', 'frameVoltage', 'macAddress'].map(param => {
      if((device[param] || body[param]) && (device[param] !== body[param])) {
        hasChanges = true
        message = message.concat(` ${associateParams[param]} from '${device[param]}' to '${body[param]}'.`)
        console.log('----> MESSAGE')
        console.log(message)
      }
    })

    if(hasChanges){

    try {

      const response = await api_notifications.post('/users', {
        action: "edited_device",
        userName: "teste",
        userId: 0,
        notification: {
          title: "Device update",
          description: `${message}`
        }
      })

    } catch(e) {
      toast.error(`Notification can't be sent`)
    }
  }
  }

  const handleSave = async () => {
    setSaving(true)

    const body = {
      idLora,
      macAddress,
      name,
      description,
      switchboard,
      nominalCurrent,
      ratedVoltage,
      currentTransformer,
      diameter,
      frameVoltage,
      phase,
      isRelayEnabled,
    }

    console.log('Body')
    console.log(body)

    try {

      const response = await api_crud.patch(`devices/${device.id}`, body)

      if (response.data) {
        toast.success('Sucess')
        notifyUpdate(device, body)
        getDevice()
        setOnEdit(false)
      }

    } catch (e) {
      toast.error('Error trying to save')
    }

    setSaving(false)
  }

  async function notifyDelete(deviceName) {

    try {

      const response = await api_notifications.post('/users', {
        action: "device_removed",
          userName: "teste",
          userId: 0,
          notification: {
            title: "Device deleted",
            description: `Device '${deviceName}' has been deleted`
          }
      })

    } catch(e) {
      toast.error(`Notification can't be sent`)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    setFormError('')

    try {

      const response = await api_crud.delete(`devices/${device.id}`)

      if (response) {
        toast.info('Device was successfully deleted')
        notifyDelete(device.name)
        history.push('/devices')
      }

    } catch (e) {
      toast.error('Error trying to delete')
      setFormError('Unable to delete this device')
    }

    setDeleting(false)
  }


  async function getDevice() {
    setBodyLoading(true)
    setBodyMessage('')

    try {

      const response = await api_crud.get(`/devices/${id}`)

      if (response.data) {
        console.log(response.data)
        dispatch(setDevice(response.data))
      } else {
        setBodyMessage('Unable to get device')
      }

    } catch (e) {
      toast.error('Unable to get device')
      setBodyMessage('Unable to get device')
    }

    setBodyLoading(false)
  }

  return (
    <Container>
      <Header>
        <Info>
          <div>
            {
              onEdit ?
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                :
                <h2>{name}</h2>

            }
          </div>
          <div>
            <MdLens />
            <span>&nbsp;Online time:&nbsp;</span>
            <span>00:00:00</span>
          </div>
        </Info>
        <Features>

          {
            onEdit ?
              <div>
                <button onClick={() => handleCancel()}>
                  Cancel
                </button>

                <button disabled={saving} onClick={() => handleSave()}>
                  Save {saving && <Loading />}
                </button>
              </div>
              :
              <button onClick={() => setOnEdit(true)}>
                <MdEdit />
                    Edit
              </button>
          }


          <Popup
            onOpen={() => {
            }}

            contentStyle={{ width: '53rem', height: '25rem', borderRadius: '1rem' }}
            trigger={
              <button className='add-device-button'>
                DELETE DEVICE
                  </button>
            }
            modal
          >
            {
              close => {
                return (
                  <DelDevice formError={formError} deleting={deleting}>
                    <p>Delete Device</p>
                    <div>
                      <span>{formError}</span>
                    </div>
                    <div>
                      <p>
                        Are you sure you want to delete this device?
                      </p>
                    </div>
                    <div className='buttons'>
                      <button disabled={deleting} onClick={() => close()}>
                        Cancel
                        </button>
                      <button disabled={deleting} onClick={() => handleDelete()}>
                        Delete {deleting && <Loading />}
                      </button>
                    </div>
                  </DelDevice>
                )
              }
            }

          </Popup>
        </Features>
      </Header>
      {
        bodyLoading ?
          <LoadingArea>
            <Loading />
          </LoadingArea>
          :
          bodyMessage ?
            <BodyMessage>
              {bodyMessage}
            </BodyMessage>
            :
            <Body>
              <Boards>

                <div>
                  <h4>DESCRIPTION</h4>
                  <div>
                    {
                      onEdit ?
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                        :
                        <p>{device.description}</p>

                    }
                  </div>
                </div>
                <div>
                  <div>
                    <h4>Added to the subgroup:</h4>
                    <h2>{device.idSubgroup && device.idSubgroup.name}</h2>
                  </div>
                  <div>
                    <div>
                      <SwitchLabels label='' func={(checked, setChecked) => {
                        setOnEdit(true)
                        setChecked(!checked)
                        setIsRelayEnabled(!isRelayEnabled)
                      }} variable={isRelayEnabled}
                        fontSize={'2.4rem'} font480={'1.6rem'} size='medium'
                      />
                    </div>
                    <p>
                      {`The relay option is ${isRelayEnabled ? 'enabled' : 'disabled'}`}
                      <br />
                      {`Click to ${isRelayEnabled ? 'disable' : 'enable'}`}
                    </p>
                  </div>
                </div>
              </Boards>
              <Values>
                <div>
                  <h4>Electrical Switchboard</h4>
                  <div>
                    {
                      onEdit ?
                        <input
                          value={switchboard}
                          onChange={(e) => setSwitchboard(e.target.value)}
                        />
                        :
                        <p>{device.switchboard}</p>

                    }
                  </div>
                </div>
                <div>
                  <h4>Nominal Current</h4>
                  <div>
                    {
                      onEdit ?
                        <input
                          value={nominalCurrent}
                          onChange={(e) => setNominalCurrent(mask(e.target, 'number'))}
                        />
                        :
                        <p>{device.nominalCurrent}</p>

                    }
                  </div>
                </div>
                <div>
                  <h4>Rated Voltage</h4>
                  <div>
                    {
                      onEdit ?
                        <input
                          value={ratedVoltage}
                          onChange={(e) => setRatedVoltage(mask(e.target, 'number'))}
                        />
                        :
                        <p>{device.ratedVoltage}</p>

                    }
                  </div>
                </div>
                <div>
                  <h4>Current Transformer</h4>
                  <div>
                    {
                      onEdit ?
                        <input
                          value={currentTransformer}
                          onChange={(e) => setCurrentTransformer(mask(e.target, 'number'))}
                        />
                        :
                        <p>{device.currentTransformer}</p>

                    }
                  </div>
                </div>
                <div>
                  <h4>Phase</h4>
                  <div>
                    {
                      onEdit ?
                        <input
                          value={phase}
                          onChange={(e) => setPhase(mask(e.target, 'number'))}
                        />
                        :
                        <p>{device.phase}</p>

                    }
                  </div>
                </div>
                <div>
                  <h4>Diameter</h4>
                  <div>
                    {
                      onEdit ?
                        <input
                          value={diameter}
                          onChange={(e) => setDiameter(mask(e.target, 'number'))}
                        />
                        :
                        <p>{device.diameter}</p>

                    }
                  </div>
                </div>
                <div>
                  <h4>Frame Voltage</h4>
                  <div>
                    {
                      onEdit ?
                        <input
                          value={frameVoltage}
                          onChange={(e) => setFrameVoltage(mask(e.target, 'number'))}
                        />
                        :
                        <p>{device.frameVoltage}</p>

                    }
                  </div>
                </div>
              </Values>
              <Values>
                <div>
                  <h4>ID Lora</h4>
                  <div>
                    {
                      onEdit ?
                        <input
                          value={idLora}
                          // onChange={(e) => setIdLora(mask(e.target, 'number'))}
                          onChange={(e) => setIdLora(e.target.value)}
                        />
                        :
                        <p>{device.idLora}</p>

                    }
                  </div>
                </div>
                <div>
                  <h4>Mac Address</h4>
                  <div>
                    {
                      onEdit ?
                        <input
                          value={macAddress}
                          onChange={(e) => setMacAddress(e.target.value)}
                        />
                        :
                        <p>{device.macAddress}</p>

                    }
                  </div>
                </div>

              </Values>
            </Body>
      }
    </Container>
  );
}

export default InfoTab;