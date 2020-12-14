import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout'
import { PaginationLink } from '../../components/Pagination';
import CheckboxLabels from '../../components/Checkbox';

import { Container, LoadingArea, MessageArea, Content, Header, SingleNotification, Notification, Body, Footer } from './styles';
import { MdDelete } from 'react-icons/md';
import api_notifications from '../../services/api_logs copy';
import { toast } from 'react-toastify';
import { addHours, format, parseISO } from 'date-fns';
import Loading from '../../components/Loading';

const Notifications = () => {

  const allNotes_base = [
    {
      id: 1,
      title: 'Notification',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed sagittis enim. Aliquam erat volutpat. 
      Nam nec nibh sit amet metus tempor consectetur at quis diam. Cras tempus volutpat nisl, ac porttitor dolor feugiat 
      sit amet. Integer sollicitudin metus nisl, nec scelerisque nibh convallis a. Nullam ut faucibus risus. Sed.`,
      type: 'Device',
      createdAt: '2020-12-11T19:00:01.134Z'
    },
    {
      id: 2,
      title: 'Notification 2',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed sagittis enim. Aliquam erat volutpat. 
      Nam nec nibh sit amet metus tempor consectetur at quis diam. Cras tempus volutpat nisl, ac porttitor dolor feugiat 
      sit amet. Integer sollicitudin metus nisl, nec scelerisque nibh convallis a. Nullam ut faucibus risus. Sed.`,
      type: 'Device',
      createdAt: '2020-12-11T19:00:01.134Z'
    },
    {
      id: 3,
      title: 'Notification',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed sagittis enim. Aliquam erat volutpat. 
      Nam nec nibh sit amet metus tempor consectetur at quis diam. Cras tempus volutpat nisl, ac porttitor dolor feugiat 
      sit amet. Integer sollicitudin metus nisl, nec scelerisque nibh convallis a. Nullam ut faucibus risus. Sed.`,
      type: 'Device',
      createdAt: '2020-12-11T19:00:01.134Z'
    },
    {
      id: 4,
      title: 'Notification',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed sagittis enim. Aliquam erat volutpat. 
      Nam nec nibh sit amet metus tempor consectetur at quis diam. Cras tempus volutpat nisl, ac porttitor dolor feugiat 
      sit amet. Integer sollicitudin metus nisl, nec scelerisque nibh convallis a. Nullam ut faucibus risus. Sed.`,
      type: 'Device',
      createdAt: '2020-12-11T19:00:01.134Z'
    },
  ]

  const [option, setOption] = useState(0)
  const options = ['Todas as Notificações', 'Dispositivos', 'Grupos', 'Usuários', 'Tarifas', 'Servidor']
  const [tempItems, tempFunction] = useState([])
  const [notifications, setNotifications] = useState([])
  const [pageLoading, setPageLoading] = useState(true)
  const [bodyMessage, setBodyMessage] = useState()
  const [totalNot, setTotalNot] = useState(0)

  const [allNotes, setAllNotes] = useState(allNotes_base)
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

    const query = `skip=${searchSelected}&take=10`

    try {

      const response = await api_notifications.get(`?${query}`)

      if (response.data) {
        setBodyMessage('')
        setAllNotes(response.data.result)
        setTotalNot(response.data.total)
      }

    } catch (e) {

      toast.error('Error trying to get notifications')

    }

    setPageLoading(false)
  }

  async function deleteNotification(notifications) {

    const ids = notifications.map(notification => notification.id)
    

    try {

      const response = await api_notifications.delete(`?ids=${ids}`)

      if (response.data) {
        toast.info('Deleted')
        getNotifications()
      }

    } catch (e) {
      toast.error('Error')
    }
  }

  useEffect(() => {

    getNotifications()

  }, [searchSelected])

  useEffect(() => {

    const notificationsId = notificationsSelected.map(notification => notification.id)

    if (allNotes.filter(note => !notificationsId.includes(note.id)).length) {
      setAllSelected(false)
    } else {
      setAllSelected(true)
    }


  }, [notificationsSelected])

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
      setBodyMessage('No notifications')
    }

  }, [allNotes])

  return (
    <Layout title='Notifications'>
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
                        label={'Select All'}
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
                          <p>Delete selected</p>
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
                                  <p>By:&nbsp;</p>
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