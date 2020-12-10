import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout'
import { PaginationLink } from '../../components/Pagination';
import CheckboxLabels from '../../components/Checkbox';

import { Container, Header, SingleNotification, Notification, Body, Footer } from './styles';
import { MdDelete } from 'react-icons/md';

const Notifications = () => {

  const allNotes_base = [
    {
      id: 1,
      title: 'Notification',
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed sagittis enim. Aliquam erat volutpat. 
      Nam nec nibh sit amet metus tempor consectetur at quis diam. Cras tempus volutpat nisl, ac porttitor dolor feugiat 
      sit amet. Integer sollicitudin metus nisl, nec scelerisque nibh convallis a. Nullam ut faucibus risus. Sed.`,
      generatedBy: 'Device',
      date: '09/10/20 16:13'
    },
    {
      id: 2,
      title: 'Notification 2',
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed sagittis enim. Aliquam erat volutpat. 
      Nam nec nibh sit amet metus tempor consectetur at quis diam. Cras tempus volutpat nisl, ac porttitor dolor feugiat 
      sit amet. Integer sollicitudin metus nisl, nec scelerisque nibh convallis a. Nullam ut faucibus risus. Sed.`,
      generatedBy: 'Device',
      date: '09/10/20 16:13'
    },
    {
      id: 3,
      title: 'Notification',
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed sagittis enim. Aliquam erat volutpat. 
      Nam nec nibh sit amet metus tempor consectetur at quis diam. Cras tempus volutpat nisl, ac porttitor dolor feugiat 
      sit amet. Integer sollicitudin metus nisl, nec scelerisque nibh convallis a. Nullam ut faucibus risus. Sed.`,
      generatedBy: 'Device',
      date: '09/10/20 16:13'
    },
    {
      id: 4,
      title: 'Notification',
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed sagittis enim. Aliquam erat volutpat. 
      Nam nec nibh sit amet metus tempor consectetur at quis diam. Cras tempus volutpat nisl, ac porttitor dolor feugiat 
      sit amet. Integer sollicitudin metus nisl, nec scelerisque nibh convallis a. Nullam ut faucibus risus. Sed.`,
      generatedBy: 'Device',
      date: '09/10/20 16:13'
    },
  ]

  const [option, setOption] = useState(0)
  const options = ['Todas as Notificações', 'Dispositivos', 'Grupos', 'Usuários', 'Tarifas', 'Servidor']
  const [tempItems, tempFunction] = useState([])
  const [notifications, setNotifications] = useState([])
  const [pageLoading, setPageLoading] = useState(true)
  const [bodyMessage, setBodyMessage] = useState()
  const [totalNot, setTotalNot] = useState()

  const [allNotes, setAllNotes] = useState([])
  const [notificationSelected, setNotificationSelected] = useState('')
  const [searchSelected, setSearchSelected] = useState(1)
  const [numberNotesToShow, setNumbersNoteToShow] = useState(5)

  const [allSelected, setAllSelected] = useState(false)

  useEffect(() => {

    if (notificationSelected !== allNotes) {
      setAllSelected(false)
    }

  }, [notificationSelected])

  useEffect(() => {

    if (allSelected) {
      setNotificationSelected(allNotes)
    } else if (notificationSelected !== allNotes) {

    } else {
      setNotificationSelected([])
    }

  }, [allSelected])

  return (
    <Layout title='Notifications'>
      <Container>

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
        </Header>

        <Body>
          {
            allNotes_base.map(notification => {

              const title = notification.title
              const body = notification.body
              const generatedBy = notification.generatedBy
              const date = notification.date

              return (
                <SingleNotification>
                  <div>
                    <CheckboxLabels
                      label={''}
                      variable={allSelected}
                      value={true}
                      func={setAllSelected}
                      disabled={false}
                      single
                    />
                  </div>
                  <div className='delete'>
                    <MdDelete />
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

        <Footer>

          <PaginationLink total={parseInt(totalNot / 10 + 1) || 10} setSearchSelected={setSearchSelected} />
        </Footer>
      </Container>
    </Layout>

  );
}

export default Notifications;