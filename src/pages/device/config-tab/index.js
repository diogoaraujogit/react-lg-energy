/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useEffect, useState } from 'react';

import { Container, Header, Info, Features, LoadingArea, BodyMessage, Body, Values, Limits } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { MdLens } from 'react-icons/md';
import Loading from '../../../components/Loading';
import { toast } from 'react-toastify';
import api_crud from '../../../services/api_crud';
import { setDevice } from '../../../store/modules/device/actions';
import translation from '../transl'

const ConfigTab = () => {

  const { english } = useSelector(props => props.intl)
  const transl = english? translation.en : translation.pt


  const { device } = useSelector(state => state.device)
  const { id } = device
  const dispatch = useDispatch()
  const [bodyLoading, setBodyLoading] = useState(false)
  const [bodyMessage, setBodyMessage] = useState('')

  const [name, setName] = useState(device.name || '-')
  const [minConsumption, setMinConsumption] = useState(device.minConsumption)
  const [maxConsumption, setMaxConsumption] = useState(device.maxConsumption)
  const [minCurrent, setMinCurrent] = useState(device.minCurrent)
  const [maxCurrent, setMaxCurrent] = useState(device.maxCurrent)
  const [minActivePower, setMinActivePower] = useState(device.minActivePower)
  const [maxActivePower, setMaxActivePower] = useState(device.maxActivePower)
  const [minDemand, setMinDemand] = useState(device.minDemand)
  const [maxDemand, setMaxDemand] = useState(device.maxDemand)

  const [onEdit, setOnEdit] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleCancel = () => {
    setMinConsumption(device.minConsumption)
    setMaxConsumption(device.maxConsumption)
    setMinCurrent(device.minCurrent)
    setMaxCurrent(device.maxCurrent)
    setMinActivePower(device.minActivePower)
    setMaxActivePower(device.maxActivePower)
    setMinDemand(device.minDemand)
    setMaxDemand(device.maxDemand)
    setOnEdit(false)
  }

  const handleSave = async () => {
    setSaving(true)

    const body = {
      minConsumption,
      maxConsumption,
      minActivePower,
      maxActivePower,
      minCurrent,
      maxCurrent,
      minDemand,
      maxDemand
    }

    try {

      const response = await api_crud.patch(`devices/${device.id}`, body)

      if (response.data) {
        toast.success(transl.updateSuccess)
        getDevice()
        setOnEdit(false)
      }

    } catch (e) {
      toast.error(transl.updateError)
    }

    setSaving(false)
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

  return (
    <Container>
      <Header>
        <Info>
          <div>
            <h2>{name}</h2>
          </div>
          <div>
            <MdLens />
            <span>&nbsp;{transl.OnlineTime}:&nbsp;</span>
            <span>00:00:00</span>
          </div>
        </Info>
        <Features>

          {
            onEdit &&
            <div>
              <button onClick={() => handleCancel()}>
                {transl.Cancel}
              </button>

              <button disabled={saving} onClick={() => handleSave()}>
                {transl.Save} {saving && <Loading />}
              </button>
            </div>

          }

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
              <Values>
                <h3>{transl.LimitValues}</h3>
                <div>
                  <Limits>
                    <h4>{transl.Consumption}<span>(kWh)</span></h4>
                    <div>
                      <div>
                        <input
                          value={minConsumption || ''}
                          onChange={(e) => {
                            setMinConsumption(mask(e.target, 'number'))
                            e.target.value !== device.minConsumption && setOnEdit(true)
                          }}
                        />
                        <p>Min.</p>
                      </div>
                      <div>
                        <input
                          value={maxConsumption || ''}
                          onChange={(e) => {
                            setMaxConsumption(mask(e.target, 'number'))
                            e.target.value !== device.maxConsumption && setOnEdit(true)
                          }}
                        />
                        <p>Max.</p>
                      </div>
                    </div>
                  </Limits>
                  <Limits>
                    <h4>{transl.Power}<span>(kW)</span></h4>
                    <div>
                      <div>
                        <input
                          value={minActivePower || ''}
                          onChange={(e) => {
                            setMinActivePower(mask(e.target, 'number'))
                            e.target.value !== device.minActivePower && setOnEdit(true)
                          }}
                        />
                        <p>Min.</p>
                      </div>
                      <div>
                        <input
                          value={maxActivePower || ''}
                          onChange={(e) => {
                            setMaxActivePower(mask(e.target, 'number'))
                            e.target.value !== device.maxActivePower && setOnEdit(true)
                          }}
                        />
                        <p>Max.</p>
                      </div>
                    </div>
                  </Limits>
                  <Limits>
                    <h4>{transl.Current}<span>(A)</span></h4>
                    <div>
                      <div>
                        <input
                          value={minCurrent || ''}
                          onChange={(e) => {
                            setMinCurrent(mask(e.target, 'number'))
                            e.target.value !== device.minCurrent && setOnEdit(true)
                          }}
                        />
                        <p>Min.</p>
                      </div>
                      <div>
                        <input
                          value={maxCurrent || ''}
                          onChange={(e) => {
                            setMaxCurrent(mask(e.target, 'number'))
                            e.target.value !== device.maxCurrent && setOnEdit(true)
                          }}
                        />
                        <p>Max.</p>
                      </div>
                    </div>
                  </Limits>
                  <Limits>
                    <h4>{transl.Demand}<span>(kWh)</span></h4>
                    <div>
                      <div>
                        <input
                          value={minDemand || ''}
                          onChange={(e) => {
                            setMinDemand(mask(e.target, 'number'))
                            e.target.value !== device.minDemand && setOnEdit(true)
                          }}
                        />
                        <p>Min.</p>
                      </div>
                      <div>
                        <input
                          value={maxDemand || ''}
                          onChange={(e) => {
                            setMaxDemand(mask(e.target, 'number'))
                            e.target.value !== device.maxDemand && setOnEdit(true)
                          }}
                        />
                        <p>Max.</p>
                      </div>
                    </div>
                  </Limits>
                </div>
              </Values>
            </Body>
      }
    </Container>
  );
}

export default ConfigTab;