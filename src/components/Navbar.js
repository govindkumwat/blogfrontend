import { Modal } from '@mantine/core'
import React, { useState, useEffect, forwardRef } from 'react'
import UploadUI from './UploadUI'
import { useDisclosure } from '@mantine/hooks'
import { connect, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import getPostList from '../Radux/actions/getPostList'
import { Button, Menu, UnstyledButton, Group, Avatar, Text } from '@mantine/core'
import { IconChevronRight, IconLogout, IconUser } from '@tabler/icons-react';
import { bindActionCreators } from 'redux'
import setPostAction from '../Radux/actions/setPostAction'
import { userDetails } from '../Radux/actions/auth'
import { performLogOutAction } from '../Radux/actions/auth'
import { Link } from 'react-router-dom'
import '../App.css'


const Navbar = (props) => {
    const [searchInput, setSearchInput] = useState('')
    const [opened, { open, close }] = useDisclosure(false);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState([])
    const [thumbs, setThumbs] = useState([])
    const dispatch = useDispatch();

    const {postList, setPostAction, savePostResponse, userDetails, userInfo, performLogOutAction} = props

    useEffect(() => {
        userDetails()
      }, []);

      const navigate = useNavigate()

      const UserButton = forwardRef(
        ({ image, name, email, icon, ...others }, ref) => (
          <UnstyledButton
            ref={ref}
            style={{
              padding: 'var(--mantine-spacing-md)',
              color: 'var(--mantine-color-text)',
              borderRadius: 'var(--mantine-radius-sm)',
            }}
            {...others}
          >
            <Group>
              <Avatar src={image} radius="xl" />
      
              <div style={{ flex: 1 }}>
                <Text size="sm" fw={500}>
                  {name}
                </Text>
      
                <Text c="dimmed" size="xs">
                  {email}
                </Text>
              </div>
      
              {icon || <IconChevronRight size="1rem" />}
            </Group>
          </UnstyledButton>
        )
      );

      const handleSubmit = async () => {
        try {
         await setPostAction(
            userInfo?.userId,
            userInfo?.name,
            title,
            description,
            tags,
            )
           await close();
           setTitle('')
           setTags([])
          await dispatch(getPostList());
    
        } catch (error) {
          console.error('Error submitting post:', error);
        }
      };

  return (
    <div>
       <Modal opened={opened} onClose={close} fullScreen >
        <UploadUI
          setTitle={setTitle}
          setDescription={setDescription}
          setTags={setTags}
          tags={tags}
          title={title}
          description={description}
          setThumbs={setThumbs}
          thumbs={thumbs}
          handleSubmit={handleSubmit} />
      </Modal>

      <div className='uploadbutton'>
        <Link to='/' className='trendingheader'>Trashpost</Link>
        <div className='btnGroup'>
          {
            userInfo?.name && 
            <div className='uploadButton' onClick={open} >
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16,2H8C4.691,2,2,4.691,2,8v13c0,0.553,0.447,1,1,1h13c3.309,0,6-2.691,6-6V8C22,4.691,19.309,2,16,2z M20,16 c0,2.206-1.794,4-4,4H4V8c0-2.206,1.794-4,4-4h8c2.206,0,4,1.794,4,4V16z"></path><path d="M13 7L11 7 11 11 7 11 7 13 11 13 11 17 13 17 13 13 17 13 17 11 13 11z"></path></svg>
               Post
            </div>
          }
        {
          userInfo?.name ?
          <Menu withArrow>
          <Menu.Target>
            <UserButton
              image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
              name={userInfo?.name}
              email={userInfo?.email}
            />
          </Menu.Target>
          <Menu.Dropdown>
         
          <Menu.Item leftSection={<IconLogout style={{ width: '1rem', height:'1rem' }} />} onClick={() => performLogOutAction()}>
          Logout
        </Menu.Item>
          </Menu.Dropdown>
        </Menu>
          :
          <div className='uploadButton' onClick={() => navigate('/login')} style={{marginLeft: '10px'}}>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"></path></svg>
            Login
            </div>
        }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
      postList: state?.getPostReducers?.data,
      savePostResponse: state?.setPostReducers.data,
      userInfo: state?.loginReducer?.user?.data
    }
  }
  
  const mapDisPatchToProps = (dispatch) => {
    return bindActionCreators(
      {
        getPostList,
        setPostAction,
        userDetails,
        performLogOutAction
      },
      dispatch
    )
  }

export default connect(mapStateToProps, mapDisPatchToProps) (Navbar)
