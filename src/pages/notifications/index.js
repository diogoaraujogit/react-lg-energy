/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout'
import { PaginationLink } from '../../components/Pagination';
import CheckboxLabels from '../../components/Checkbox';

import { Container, LoadingArea, MessageArea, Content, Header, SingleNotification, Notification, Body, Footer } from './styles';
import { MdDelete } from 'react-icons/md';
import api_notifications from '../../services/api_notifications';
import { toast } from 'react-toastify';
import { addHours, format, parseISO } from 'date-fns';
import Loading from '../../components/Loading';
import { useSelector } from 'react-redux';
import translation from './transl';

const Notifications = () => {

  const { english } = useSelector(props => props.intl)
  const transl = english? translation.en : translation.pt


  const [option, setOption] = useState(0)
  const options = ['Todas as Notificações', 'Dispositivos', 'Grupos', 'Usuários', 'Tarifas', 'Servidor']
  const [tempItems, tempFunction] = useState([])
  const [notifications, setNotifications] = useState([])
  const [pageLoading, setPageLoading] = useState(true)
  const [bodyMessage, setBodyMessage] = useState()
  const [totalNot, setTotalNot] = useState(0)

  const [allNotes, setAllNotes] = useState([])
  const [notificationsSelected, setNotificationsSelected] = useState([])
  const [searchSelected, setSearchSelected] = useState(1)
  const [numberNotesToShow, setNumbersNoteToShow] = useState(5)

  const [allSelected, setAllSelected] = useState(false)
  const [idsDeleting, setIdsDeleting] = useState()


  const formatDate = (date) => {

    var result = parseISO(date)
    console.log(result)

    var offset = new Date().getTimezoneOffset();

    const utcDate = addHours(result, offset / 60)

    const formattedDate = format(utcDate, 'dd/MM/yyyy HH:mm')
    console.log(formattedDate)

    return formattedDate
  }

  async function getNotifications() {

    setPageLoading(true)

    const skip = searchSelected*10 - 10
    const query = `skip=${skip}&take=10`

    try {

      const response = await api_notifications.get(`?${query}`)

      if (response.data) {
        setBodyMessage('')
        setAllNotes(response.data.result)
        setTotalNot(response.data.total)
      }

    } catch (e) {

      toast.error(transl.errorNotifications)

    }

    setPageLoading(false)
  }

  async function deleteNotification(notifications) {

    const ids = notifications.map(notification => notification.id)
    

    try {

      const response = await api_notifications.delete(`?ids=${ids}`)

      if (response.data) {
        toast.info(transl.deleteSuccess)
        getNotifications()
      }

    } catch (e) {
      toast.error(transl.errorNotifications)
    }
  }

  
  useEffect(() => {

    getNotifications()

  }, [searchSelected])

  useEffect(() => {

    const notificationsId = notificationsSelected.map(notification => notification.id)


    if ( allNotes.filter(note => !notificationsId.includes(note.id)).length) {
      setAllSelected(false)
    } else {
      setAllSelected(true)
    }


  }, [notificationsSelected, allNotes])

  useEffect(() => {

    if (allSelected) {
      setNotificationsSelected(allNotes)
    } else if (notificationsSelected !== allNotes) {

    } else {
      setNotificationsSelected([])
    }

  }, [allSelected])

  useEffect(() => {

    if (!allNotes.length) {
      setBodyMessage(transl.noNotifications)
    }

  }, [allNotes])

  return (
    <Layout title={transl.title}>
      <Container>
        <Content>
          {
            pageLoading ?
              <LoadingArea>
                <Loading />
              </LoadingArea>
              :
              bodyMessage ?
                <MessageArea>
                  {bodyMessage}
                </MessageArea>
                :
                <>
                  <Header>
                    <div>
                      <CheckboxLabels
                        label={transl.selectAll}
                        variable={allSelected}
                        value={true}
                        func={setAllSelected}
                        disabled={false}
                        single
                      />
                    </div>
                    {
                      notificationsSelected.length ?
                        <div className='delete-all' onClick={() => deleteNotification(notificationsSelected)}>
                          <MdDelete />
                          <p>{transl.deleteSelected}</p>
                        </div>
                        :
                        <></>
                    }
                  </Header>

                  <Body>
                    {
                      allNotes.map(notification => {

                        const id = notification.id
                        const title = notification.title
                        const body = notification.description
                        const generatedBy = notification.type
                        const date = formatDate(notification.createdAt)

                        return (
                          <SingleNotification>
                            <div>
                              <CheckboxLabels
                                label={''}
                                variable={notificationsSelected}
                                value={id}
                                func={setNotificationsSelected}
                                disabled={false}
                                multiple
                              />
                            </div>
                            <div className='delete'>
                              <MdDelete onClick={() => deleteNotification([{ id: id }])} />
                            </div>
                            <Notification>
                              <div className='header'>

                                <h4>{title}</h4>


                                <div>
                                  <p>{transl.generatedBy}:&nbsp;</p>
                                  <h4>{generatedBy}</h4>
                                </div>

                                <p>{date}</p>



                              </div>
                              <div className='body'>
                                <p>{body}</p>
                              </div>
                            </Notification>
                          </SingleNotification>
                        )
                      })
                    }

                  </Body>
                </>
          }
          <Footer>

            <PaginationLink total={Math.ceil(totalNot / 10) || 1} setSearchSelected={setSearchSelected} />
          </Footer>
        </Content>


      </Container>
    </Layout>

  );
}

export default Notifications;