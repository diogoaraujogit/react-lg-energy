/* eslint-disable react-hooks/exhaustive-deps */

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
import translation from '../transl';

const InfoTab = () => {

  
  const { english } = useSelector(props => props.intl)
  const transl = english? translation.en : translation.pt


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
      toast.error(transl.notificationError)
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


    try {

      const response = await api_crud.patch(`devices/${device.id}`, body)

      if (response.data) {
        toast.success(transl.updateSuccess)
        notifyUpdate(device, body)
        getDevice()
        setOnEdit(false)
      }

    } catch (e) {
      toast.error(transl.updateError)
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
      toast.error(transl.notificationError)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    setFormError('')

    try {

      const response = await api_crud.delete(`devices/${device.id}`)

      if (response) {
        toast.info(transl.deleteSucces)
        notifyDelete(device.name)
        history.push('/devices')
      }

    } catch (e) {
      toast.error(transl.deleteError)
      setFormError(transl.deleteError)
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
        setBodyMessage(transl.errorDevice)
      }

    } catch (e) {
      toast.error(transl.errorDevice)
      setBodyMessage(transl.errorDevice)
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
            <span>&nbsp;{transl.OnlineTime}:&nbsp;</span>
            <span>00:00:00</span>
          </div>
        </Info>
        <Features>

          {
            onEdit ?
              <div>
                <button onClick={() => handleCancel()}>
                  {transl.Cancel}
                </button>

                <button disabled={saving} onClick={() => handleSave()}>
                  {transl.Save} {saving && <Loading />}
                </button>
              </div>
              :
              <button onClick={() => setOnEdit(true)}>
                <MdEdit />
                    {transl.Edit}
              </button>
          }


          <Popup
            onOpen={() => {
            }}

            contentStyle={{ width: '53rem', height: '25rem', borderRadius: '1rem' }}
            trigger={
              <button className='add-device-button'>
                {transl.DeleteDeviceButton}
              </button>
            }
            modal
          >
            {
              close => {
                return (
                  <DelDevice formError={formError} deleting={deleting}>
                    <p>{transl.DeleteDevice}</p>
                    <div>
                      <span>{formError}</span>
                    </div>
                    <div>
                      <p>
                        {transl.ConfirmDelete}
                      </p>
                    </div>
                    <div className='buttons'>
                      <button disabled={deleting} onClick={() => close()}>
                        {transl.Cancel}
                        </button>
                      <button disabled={deleting} onClick={() => handleDelete()}>
                        {transl.Delete} {deleting && <Loading />}
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
                  <h4>{transl.description}</h4>
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
                    <h4>{transl.AddedSubgroup}:</h4>
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
                      {`${transl.RelayOption} ${isRelayEnabled ? transl.enabled : transl.disabled}`}
                      <br />
                      {`${transl.clickTo} ${isRelayEnabled ? transl.disable : transl.enable}`}
                    </p>
                  </div>
                </div>
              </Boards>
              <Values>
                <div>
                  <h4>{transl.Switchboard}</h4>
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
                  <h4>{transl.NominalCUrrent}</h4>
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
                  <h4>{transl.RatedVoltage}</h4>
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
                  <h4>{transl.CurrentTransformer}</h4>
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
                  <h4>{transl.Phase}</h4>
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
                  <h4>{transl.Diameter}</h4>
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
                  <h4>{transl.FrameVoltage}</h4>
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
                  <h4>{transl.IDLora}</h4>
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
                  <h4>{transl.MacAddress}</h4>
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