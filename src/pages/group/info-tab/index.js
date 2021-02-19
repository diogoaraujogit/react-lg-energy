import React, { useState } from 'react';

import { Container, Header, Info, Features, DelDevice, LoadingArea, BodyMessage, Body } from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { MdEdit } from 'react-icons/md';
import Popup from 'reactjs-popup';
import api_crud from '../../../services/api_crud';
import { toast } from 'react-toastify';
import { setGroup } from '../../../store/modules/group/actions';
import Loading from '../../../components/Loading';
import { useHistory } from 'react-router-dom';
import api_notifications from '../../../services/api_notifications';

const InfoTab = () => {

  const { group } = useSelector(state => state.group)
  const { id } = group
  const dispatch = useDispatch()
  const history = useHistory()
  const [bodyLoading, setBodyLoading] = useState(false)
  const [bodyMessage, setBodyMessage] = useState('')
  const [saving, setSaving] = useState(false)


  const [name, setName] = useState(group.name || '-')
  const [onEdit, setOnEdit] = useState(false)

  const [formError, setFormError] = useState(false)
  const [deleting, setDeleting] = useState(false)


  const handleCancel = () => {
    setName(group.name || '-')
    setOnEdit(false)
  }

  async function notifyUpdate() {

    if(group.name !== name) {
    try {

      const response = await api_notifications.post('/users', {
        action: "edited_group",
        userName: "teste",
        userId: 0,
        notification: {
          title: "Group update",
          description: `Group name '${group.name}' has been update to '${name}'`
        }
      })

    } catch(e) {
      toast.error(`Notification can't be sent`)
    }
  }
  }

  const handleSave = async () => {
    setSaving(true)

    try {

      const response = await api_crud.patch(`groups/${group.id}`, {
        ...group, name
      })

      if (response.data) {
        toast.success('Success')
        notifyUpdate()
        getGroup()
        setOnEdit(false)
      }

    } catch (e) {
      toast.error('Unable to save')
    }

    setSaving(false)
  }

  async function notifyDelete(title) {

    try {

      const response = await api_notifications.post('/users', {
        action: "group_removed",
        userName: "teste",
        userId: 0,
        notification: {
          title: "Group deleted",
          description: `Group '${title}' has been deleted`
        }
      })

    } catch(e) {
      toast.error(`Notification can't be sent`)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    setFormError('')

    try {

      const response = await api_crud.delete(`groups/${group.id}`)

      if (response) {
        toast.info('Group was successfully deleted')
        notifyDelete(group.name)
        history.push('/groups')
      }

    } catch (e) {
      toast.error('Error trying to delete this group')
      setFormError('Error trying to delete this group')
    }

    setDeleting(false)
  }


  async function getGroup() {
    // setBodyLoading(true)
    setBodyMessage('')

    try {

      const response = await api_crud.get(`/groups/${id}`)

      if (response.data) {
        console.log(response.data)
        dispatch(setGroup(response.data))
      } else {
        setBodyMessage('Unable to get group')
      }

    } catch (e) {
      toast.error('Unable to get group')
      setBodyMessage('Unable to get group')
    }

    setBodyLoading(false)
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

          </div>
        </Info>
        <Features>

          {
            onEdit ?
              <div>
                <button onClick={() => handleCancel()}>
                  Cancel
                </button>

                <button disabled={saving} onClick={() => handleSave()}>
                  Save {saving && <Loading />}
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

            contentStyle={{ width: '53rem', height: '25rem', borderRadius: '1rem' }}
            trigger={
              <button className='add-device-button'>
                DELETE GROUP
              </button>
            }
            modal
          >
            {
              close => {
                return (
                  <DelDevice formError={formError} deleting={deleting}>
                    <p>Delete Group</p>
                    <div>
                      <span>{formError}</span>
                    </div>
                    <div>
                      <p>
                        Are you sure you want to delete this group?
                      </p>
                    </div>
                    <div className='buttons'>
                      <button disabled={deleting} onClick={() => close()}>
                        Cancel
                        </button>
                      <button disabled={deleting} onClick={() => handleDelete()}>
                        Delete {deleting && <Loading />}
                      </button>
                    </div>
                  </DelDevice>
                )
              }
            }

          </Popup>
        </Features>
      </Header>
      {
        bodyLoading ?
          <LoadingArea>
            <Loading />
          </LoadingArea>
          :
          bodyMessage ?
            <BodyMessage>
              {bodyMessage}
            </BodyMessage>
            :
            <Body>

            </Body>
      }
    </Container>
  );
}

export default InfoTab;