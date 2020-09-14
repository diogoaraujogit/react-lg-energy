import React, { useState } from 'react';

import { Container, Header, Info, Features, Body, Schedules, Schedule } from './styles';
import { useSelector } from 'react-redux';
import { MdLens } from 'react-icons/md';
import BasicTimePicker from '../../../components/BasicTimePicker';

const RelayTab = () => {

  const { device } = useSelector(state => state.device)

  const [name, setName] = useState(device.name || '-')

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

        </Features>
      </Header>
      
      <Body>
        <Schedules>
          <Schedule>
            <h4>Sunday</h4>
            <div>
              <div>
                <p>Time On</p>
                <BasicTimePicker />
              </div>
              <div>

              </div>
            </div>
          </Schedule>
        </Schedules>
      </Body>

    </Container>
  );
}

export default RelayTab;