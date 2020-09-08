import React, { useCallback, useState } from 'react';

import { Container, Header, Info, Features, Boards, Values, Config } from './styles';
import { useSelector } from 'react-redux';
import { MdLens, MdEdit } from 'react-icons/md';
import Popup from 'reactjs-popup';
import api_crud from '../../../services/api_crud';
import { toast } from 'react-toastify';
import SwitchLabels from '../../../components/Switch';

const InfoTab = () => {

  const { device } = useSelector(state => state.device)
  const { minCurrent, maxCurrent, minConsumption, maxConsumption, minActivePower, maxActivePower, minDemand, maxDemand } = device

  const [name, setName] = useState(device.name || '-')

  const [idSubgroup, setIdSubgroup] = useState(device.idSubgroup)
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

  const mask = useCallback((i, type) => {
    var v = i.value;

    if (isNaN(v[v.length - 1])) { // impede entrar outro caractere que não seja número
      i.value = v.substring(0, v.length - 1);
      return;
    }

  }, [])


  const handleCancel = () => {
    setSwitchboard(device.switchboard)
    setNominalCurrent(device.nominalCurrent)
    setOnEdit(false)
  }

  const handleSave = async () => {
    setOnEdit(false)

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
      minCurrent,
      maxCurrent,
      minConsumption,
      maxConsumption,
      minActivePower,
      maxActivePower,
      minDemand,
      maxDemand,
      idSubgroup: idSubgroup.id
    }

    try {

      const response = await api_crud.patch(`devices/{device.id}`, body)

      if (response.data) {
        toast.success('Sucesso')
        console.log(response.data)
      }

    } catch (e) {
      toast.error('Erro')
    }
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

                <button onClick={() => handleSave()}>
                  Save
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

            contentStyle={{ width: '53rem', height: '27rem', borderRadius: '1rem' }}
            trigger={
              <button className='add-device-button'>
                DELETE DEVICE
                  </button>
            }
            modal
          >
            {
              // close => {
              //   return (
              //     <AddDevice formError={formError} registering={registering}>
              //       <p>New Device</p>
              //       <div>
              //         <span>{formError}</span>
              //       </div>
              //       <form onSubmit={(e) => handleSubmit(e, close)}>
              //         <input
              //           maxLength='20'
              //           value={deviceName}
              //           onChange={event => {
              //             setFormError('')
              //             setDeviceName(event.target.value);
              //           }}
              //           placeholder='Device name'
              //         />
              //         <div>
              //           <button disabled={registering} onClick={() => close()}>
              //             Cancel
              //           </button>
              //           <button disabled={registering} type='submit'>
              //             Register {registering && <Loading />}
              //           </button>
              //         </div>
              //       </form>
              //     </AddDevice>
              //   )
              // }
            }

          </Popup>
        </Features>
      </Header>
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
            <h2>{ device.idSubgroup && device.idSubgroup.name }</h2>
          </div>
          <div>
            <SwitchLabels label='' func={(checked, setChecked) => {
              setChecked(!checked)
              setIsRelayEnabled(!isRelayEnabled)
            }} variable={isRelayEnabled}
              fontSize={'2.4rem'} font480={'1.6rem'} size='medium'
            />
          </div>
        </div>
      </Boards>
      <Values>
        <div>
          <h4>Switchboard</h4>
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
                  type='number'
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
                  value={switchboard}
                  onChange={(e) => setSwitchboard(e.target.value)}
                />
                :
                <p>{device.switchboard}</p>

            }
          </div>
        </div>
        <div>
          <h4>Current Transformer</h4>
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
          <h4>Phase</h4>
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
          <h4>Diameter</h4>
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
          <h4>Frame Voltage</h4>
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
      </Values>
      <Values>
        <div>
          <h4>ID Lora</h4>
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
          <h4>Mac Address</h4>
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
          <h4>IP</h4>
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
      </Values>
    </Container>
  );
}

export default InfoTab;