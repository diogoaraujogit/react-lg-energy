import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import Popup from 'reactjs-popup';
import BasicDatePicker from '../../components/BasicDatePicker';
import Layout from '../../components/Layout'
import RadioButton from '../../components/Radio';

import { Container, Content, FeaturesBox, Period, AddDevice, CurrentDevices, DataBox } from './styles';

const Comparatives = () => {

  const [periodType, setPeriodType] = useState('day')
  const [dayDate, setDayDate] = useState(new Date())
  const [monthDate, setMonthDate] = useState(new Date())

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
                <div>
                  {
                    ['name', 'name 2', 'name 3', 'name 3', 'name 3', 'name 3', 'name 3', 'name 3', 'name 3', 'name 3', 'name 3', 'name 3', 'name 3'].map(device => {

                      return (
                        <div>
                          <p>{device}</p>
                          <MdDelete />
                        </div>
                      )
                    })
                  }
                </div>
            </CurrentDevices>
          </FeaturesBox>

          <DataBox>

          </DataBox>

        </Content>
      </Container>
    </Layout>

  );
}

export default Comparatives;