import React, { useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout'
import api_tariffs from '../../services/api_tariffs';
import BasicDatePicker from '../../components/BasicDatePicker'
import { Container, Content, Header, Body, Previous } from './styles';
import { format, parse } from 'date-fns';
import Loading from '../../components/Loading';
import { LoadingArea, MessageArea } from '../dashboard/ranking-tab/styles';

const tariffsBase = [
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

const Tariffs = () => {


  const [tariffs, setTariffs] = useState(tariffsBase)
  const [currentTariff, setCurrentTariff] = useState({})
  const [tempTariff, setTempTariff] = useState({})
  const [onEdit, setOnEdit] = useState(false)

  const [pageLoading, setPageLoading] = useState(true)
  const [pageMessage, setPageMessage] = useState('')
  const [saving, setSaving] = useState(false)



  const handleSave = () => {
    updateTariff()
  }

  async function getTariffs() {
    setPageLoading(true)

    try {

      const [responseTariffs, responseCurrent] = await Promise.all(
        [
          api_tariffs.get('/'),
          api_tariffs.get('/current')
        ]
      )

      console.log(responseCurrent)
      console.log(responseTariffs)

      if (responseTariffs.data && responseCurrent.data) {
        setTariffs(responseTariffs.data)
        setCurrentTariff(responseCurrent.data)
        setTempTariff(responseCurrent.data)
      }

    } catch (e) {
      toast.error('Error trying to get tariffs')
    }

    setPageLoading(false)
  }

  async function updateTariff() {
    setSaving(true)

    try {

      const response = await api_tariffs.patch('/', {
        period: tempTariff.period,
        tariffValue: Number(tempTariff.tariff_value),
        tariffPeakValue: Number(tempTariff.tariff_peak_value),
        peakHourStart: tempTariff.peak_hour_start.slice(0, 5),
        peakHourEnd: tempTariff.peak_hour_end.slice(0, 5),
      })

      if (response.data) {
        toast.success('Saved')
        setOnEdit(false)
        getTariffs()
      }

    } catch (e) {
      toast.error('Error trying to save')
    }

    setSaving(false)
  }

  useEffect(() => {
    getTariffs()
  }, [])

  console.log(tempTariff)

  const handleDateFormat = () => {
    const stringDate = parse(tempTariff.period, 'MM/yyyy', new Date())

    return stringDate
  }

  return (
    <Layout title='Tariffs'>
      <Container>
        {
          pageLoading ?
            <LoadingArea>
              <Loading />
            </LoadingArea>
            :
            pageMessage ?
              <MessageArea>
                {pageMessage}
              </MessageArea>
              :
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
                              type='number'
                              value={tempTariff.tariff_value}
                              onChange={e => setTempTariff({ ...tempTariff, tariff_value: e.target.value })}
                            />
                          </div>
                          :
                          <div>
                            <p>{`$ ${currentTariff.tariff_value || '1,07'}`}</p>
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
                              type='number'
                              value={tempTariff.tariff_peak_value}
                              onChange={e => setTempTariff({ ...tempTariff, tariff_peak_value: e.target.value })}
                            />
                          </div>
                          :
                          <div>
                            <p>{`$ ${currentTariff.tariff_peak_value}`}</p>
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
                            <BasicDatePicker
                              value={handleDateFormat()}
                              handleChange={e => setTempTariff({ ...tempTariff, period: format(e, 'MM/yyyy') })}
                              format='MM/yyyy'
                              views={["year", "month"]}
                            />
                          </div>
                          :
                          <div>
                            <p>{`${currentTariff.period}`}</p>
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
                              <span>{tariff.tariffValue}</span>
                            </div>
                            <div>
                              <p>Peak Tariff</p>
                              <span>{tariff.tariffPeakValue}</span>
                            </div>
                            <div>
                              <p>Reference Date</p>
                              <span>{tariff.period}</span>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </Previous>
              </Content>
        }
      </Container>
    </Layout>

  );
}

export default Tariffs;