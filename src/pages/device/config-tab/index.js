import React, { useState } from 'react';

import { Container, Header, Info, Features, Body, Values, Limits } from './styles';
import { useSelector } from 'react-redux';
import { MdLens } from 'react-icons/md';

const ConfigTab = () => {

  const { device } = useSelector(state => state.device)

  const [name, setName] = useState(device.name || '-')
  const [minConsumption, setMinConsumption] = useState(device.minConsumption)

  const [onEdit, setOnEdit] = useState(false)

  const handleCancel = () => {

  }

  const handleSave = () => {

  }

  return (
    <Container>
      <Header>
        <Info>
          <div>
            <h2>{name}</h2>
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

              <button onClick={() => handleSave()}>
                Save
                    </button>
            </div>

          }

        </Features>
      </Header>

      <Body>
        <Values>
          <h3>LIMIT OF VALUES</h3>
          <div>
            <Limits>
              <h4>Energy Consumption <span>(kWh)</span></h4>
              <div>
                <div>
                  <input 
                  value={minConsumption}
                  onChange={(e) => {
                    setMinConsumption(e.target.value)
                    e.target.value !== device.minConsumption && setOnEdit(true)
                  }}
                  />
                  <p>Min.</p>
                </div>
                <div>
                  <input />
                  <p>Max.</p>
                </div>
              </div>
            </Limits>
            <Limits>
              <h4>Power <span>(kW)</span></h4>
              <div>
                <div>
                  <input />
                  <p>Min.</p>
                </div>
                <div>
                  <input />
                  <p>Max.</p>
                </div>
              </div>
            </Limits>
            <Limits>
              <h4>Power Current <span>(A)</span></h4>
              <div>
                <div>
                  <input />
                  <p>Min.</p>
                </div>
                <div>
                  <input />
                  <p>Max.</p>
                </div>
              </div>
            </Limits>
            <Limits>
              <h4>Demand <span>(kWh)</span></h4>
              <div>
                <div>
                  <input />
                  <p>Min.</p>
                </div>
                <div>
                  <input />
                  <p>Max.</p>
                </div>
              </div>
            </Limits>
          </div>
        </Values>
      </Body>
    </Container>
  );
}

export default ConfigTab;