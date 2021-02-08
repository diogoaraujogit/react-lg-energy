import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import Layout from '../../components/Layout'

import { Container, Content, Header, Body, Previous } from './styles';

const Tariffs = () => {

  const [onEdit, setOnEdit] = useState(false)
  const [averageTariff, setAverageTariff] = useState('1,07')
  const [tempAverageTariff, setTempAverageTariff] = useState(averageTariff)
  const [peakTariff, setPeakTariff] = useState('1,57')
  const [tempPeakTariff, setTempPeakTariff] = useState(peakTariff)
  const [referenceDate, setReferenceDate] = useState('20/12/2020')
  const [tempReferenceDate, setTempReferenceDate] = useState(referenceDate)

  const tariffs = [
    {
      value: '$ 1,07',
      peak: '$ 1,57',
      date: '$ 20/12/2020',
    },
    {
      value: '$ 1,07',
      peak: '$ 1,57',
      date: '$ 20/12/2020',
    },
    {
      value: '$ 1,07',
      peak: '$ 1,57',
      date: '$ 20/12/2020',
    },
    {
      value: '$ 1,07',
      peak: '$ 1,57',
      date: '$ 20/12/2020',
    },
  ]

  const handleSave = () => {

    setAverageTariff(tempAverageTariff)
    setPeakTariff(tempPeakTariff)
    setReferenceDate(tempReferenceDate)
    setOnEdit(false)
  }

  return (
    <Layout title='Tariffs'>
      <Container>
        <Content>
          <Header>
            <div className='peak'>
              <p>Peak Hour</p>
              <div>
                <p>Starter hour</p>
                <div>
                  00:00
                </div>
              </div>
              <div>
                <p>Final hour</p>
                <div>
                  00:00
                </div>
              </div>
            </div>
            <div className='edit'>
              {
                onEdit ?
                  <div>
                    <button onClick={() => setOnEdit(false)} className='cancel'>
                      Cancel
                    </button>
                    <button onClick={() => handleSave()} className='save'>
                      Save
                    </button>
                  </div>
                  :
                  <button onClick={() => setOnEdit(true)}>
                    <MdEdit /> Edit
                  </button>
              }
            </div>
          </Header>
          <Body>
            <div>
              <h4>Average Tariff</h4>
              <div>
                {
                  onEdit ?
                    <div>
                      <input
                        value={tempAverageTariff}
                        onChange={e => setTempAverageTariff(e.target.value)}
                      />
                    </div>
                    :
                    <div>
                      <p>{`$ ${averageTariff}`}</p>
                    </div>

                }
              </div>
            </div>
            <div>
              <h4>Average Peak Tariff</h4>
              <div>
              {
                  onEdit ?
                    <div>
                      <input
                        value={tempPeakTariff}
                        onChange={e => setTempPeakTariff(e.target.value)}
                      />
                    </div>
                    :
                    <div>
                      <p>{`$ ${peakTariff}`}</p>
                    </div>

                }
              </div>
            </div>
            <div>
              <h4>Reference Date</h4>
              <div>
              {
                  onEdit ?
                    <div>
                      <input
                        value={tempReferenceDate}
                        onChange={e => setTempReferenceDate(e.target.value)}
                      />
                    </div>
                    :
                    <div>
                      <p>{`${referenceDate}`}</p>
                    </div>

                }
              </div>
            </div>
          </Body>
          <Previous>
            <h3>PREVIOUS TARIFFS</h3>
            <div>
              {
                tariffs.map(tariff => {

                  return (
                    <div>
                      <div>
                        <p>Tariff Value</p>
                        <span>{tariff.value}</span>
                      </div>
                      <div>
                        <p>Peak Tariff</p>
                        <span>{tariff.peak}</span>
                      </div>
                      <div>
                        <p>Reference Date</p>
                        <span>{tariff.date}</span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </Previous>
        </Content>
      </Container>
    </Layout>

  );
}

export default Tariffs;