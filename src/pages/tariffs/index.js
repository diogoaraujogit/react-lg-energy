/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout'
import api_tariffs from '../../services/api_tariffs';
import BasicDatePicker from '../../components/BasicDatePicker'
import BasicTimePicker from '../../components/BasicTimePicker'

import { Container, Content, Header, Body, Previous } from './styles';
import { format, parse } from 'date-fns';
import Loading from '../../components/Loading';
import { LoadingArea, MessageArea } from '../dashboard/ranking-tab/styles';
import { useSelector } from 'react-redux';
import translation from './transl';


const Tariffs = () => {

  const { english } = useSelector(props => props.intl)
  const transl = english? translation.en : translation.pt


  const [tariffs, setTariffs] = useState([])
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
      toast.error(transl.errorGetTariffs)
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
        toast.success(transl.saveSuccess)
        setOnEdit(false)
        getTariffs()
      }

    } catch (e) {
      toast.error(transl.saveError)
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

  const handleTimeFormat = (time) => {
    const stringTime = parse(time, 'HH:mm:ss', new Date())

    return stringTime
  }

  return (
    <Layout title={transl.title}>
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
                    <p>{transl.peakHour}</p>
                    <div>
                      <p>{transl.StarterHour}</p>
                      {
                        onEdit?
                        <div>
                          <BasicTimePicker 
                            value={handleTimeFormat(tempTariff.peak_hour_start)}
                            handleChange={e => setTempTariff({ ...tempTariff, peak_hour_start: format(e, 'HH:mm:ss') })}
                          />
                        </div>
                        :
                        <div>
                          {tempTariff.peak_hour_start?.slice(0, -3)}
                        </div>
                      }
                    </div>
                    <div>
                      <p>{transl.FinalHour}</p>
                      {
                        onEdit?
                        <div>
                          <BasicTimePicker 
                            value={handleTimeFormat(tempTariff.peak_hour_end)}
                            handleChange={e => setTempTariff({ ...tempTariff, peak_hour_end: format(e, 'HH:mm:ss') })}
                          />
                        </div>
                        :
                        <div>
                          {tempTariff.peak_hour_end?.slice(0, -3)}
                        </div>
                      }
                    </div>
                  </div>
                  <div className='edit'>
                    {
                      onEdit ?
                        <div>
                          <button onClick={() => setOnEdit(false)} className='cancel'>
                            {transl.Cancel}
                          </button>
                          <button onClick={() => handleSave()} className='save'>
                            {transl.Save}
                          </button>
                        </div>
                        :
                        <button onClick={() => setOnEdit(true)}>
                          <MdEdit /> {transl.Edit}
                  </button>
                    }
                  </div>
                </Header>
                <Body>
                  <div>
                    <h4>{transl.AverageTariff}</h4>
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
                    <h4>{transl.PeakTariff}</h4>
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
                    <h4>{transl.ReferenceDate}</h4>
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
                  <h3>{transl.Previous}</h3>
                  <div>
                    {
                      tariffs.map(tariff => {

                        return (
                          <div>
                            <div>
                              <p>{transl.TariffValue}</p>
                              <span>{tariff.tariffValue}</span>
                            </div>
                            <div>
                              <p>{transl.PeakTariff}</p>
                              <span>{tariff.tariffPeakValue}</span>
                            </div>
                            <div>
                              <p>{transl.ReferenceDate}</p>
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