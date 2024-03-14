import React, { lazy, useEffect, useState } from 'react'
import { Badge, Button, Divider, Modal, Pagination, Skeleton } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import Search from './Search';
import getPostList from '../Radux/actions/getPostList';
import setPostAction from '../Radux/actions/setPostAction';
import { bindActionCreators } from 'redux';
import { userDetails } from '../Radux/actions/auth';
import { performLogOutAction } from '../Radux/actions/auth';
import '../App.css'
import { useDisclosure } from '@mantine/hooks';
import deletePostById from '../Radux/actions/deletePostById';
import Social from './Social';
import Newletter from './Newletter';
import { Novu } from '@novu/node';
import { useSpring, animated, useInView } from '@react-spring/web'
import { Suspense } from 'react';
import Loading from './Loading';
const TopPost = lazy(() => import('./TopPost'));



const TimeAgo = ({ timestamp }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const calculateTimeAgo = () => {
      const now = new Date();
      const createdAt = new Date(timestamp);
      const timeDifference = now - createdAt;
      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (seconds < 60) {
        setTimeAgo(`${seconds} seconds ago`);
      } else if (minutes < 60) {
        setTimeAgo(`${minutes} minutes ago`);
      } else if (hours < 24) {
        setTimeAgo(`${hours} hours ago`);
      } else {
        setTimeAgo(`${days} days ago`);
      }
    };

    calculateTimeAgo();
    // Refresh time every minute (optional)
    const intervalId = setInterval(calculateTimeAgo, 60000);
    return () => clearInterval(intervalId);
  }, [timestamp]);

  return <span>{timeAgo}</span>;
};

const PostList = (props) => {
  const [searchInput, setSearchInput] = useState('')
  const { getPostList, postList, userDetails, userInfo, deletePostById } = props
  const [opened, { open, close }] = useDisclosure(false);
  const [deletePostId, setDeletePostId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
        y: 100,

      },
      to: {
        opacity: 1,
        y: 0,
      },
    }),
    {
      // rootMargin: '-40% 0%',
    }
  )

  const sendMail = (email) => {
    const novu = new Novu('46f6f6746b09459a6a6d88254e9878ed');

    // Trigger the on-boarding notification
    novu.trigger('on-boarding-notification', {
      to: {
        subscriberId: '48',
        email: email,
      },
      payload: {
        number: '1'
      }
    });
  }

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        await userDetails();
        await getPostList(page);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state if needed
      }
    };

    fetchData();
    setLoading(false)
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        await getPostList(page);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state if needed
      }
    };

    fetchData();
  }, [page])

  const deletePost = (id) => {
    open()
    setDeletePostId(id)
  }

  const DeletePostConfirm = async () => {
    await deletePostById(deletePostId)
    await getPostList()
    close()
  }

  const navigate = useNavigate()


  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const profileNavigate = () => {
    navigate('/profile')
  }


  return (
    <>
      <Modal opened={opened} onClose={close} title="Are you sure you want to delete this post?" centered>
        <div className='deleteModel'>
          <Button color='red' onClick={() => DeletePostConfirm()}>Yes, Delete it</Button>
          <Button variant='success' onClick={close}>No</Button>
        </div>
      </Modal>
      <Search setSearchInput={setSearchInput} />
      <div className='homePosts'>
        <div className='homePostList'>
          {
            postList?.posts
              ?.filter(
                (data) =>
                  data?.title?.toLowerCase()?.includes(searchInput.toLowerCase()) || data?.description?.toLowerCase()?.includes(searchInput.toLowerCase())
              )
              ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
              .map((data, index) => (
                <div className='postList' ref={ref} style={{ ...springs }}>

                  <div className='post'>
                    <img className='thumbnail' src={data?.thumbs} alt={data.title} />
                    <div className='textPost'>
                      <div className='datenTime'>Posted By: {data?.userName} | <TimeAgo timestamp={data?.createdAt} /></div>
                      <Link to={{ pathname: `${data._id}`, state: { postList } }}>
                        <div className='postTitle'>{data?.title}</div>
                      </Link>
                      {
                        <div className='postCategory'>
                          {
                            data?.tags?.map((tagsdata, index) => (
                              <Badge variant="default" color={'#f3f0f0'}>{tagsdata}</Badge>
                            ))
                          }
                          {
                            userInfo?.role_id == 1 &&
                            <div className='deleteButton' onClick={() => deletePost(data._id)}>
                              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path></svg>
                              Delete
                            </div>
                          }
                        </div>
                      }
                      {/* <div className='postDescription'> <div
                    dangerouslySetInnerHTML={{ __html: data?.description }}
                  /></div> */}
                    </div>
                  </div>
                  <Divider style={{ marginTop: '10px' }} />
                </div>
              ))
          }
          {
            postList?.pageInfo?.totalPages > 0 &&
            <Pagination total={postList?.pageInfo?.totalPages} value={page} onChange={setPage} style={{ marginTop: '10px', paddingLeft: "16%", marginBottom: '20px' }} />
          }
        </div>
        <div style={{ width: '40%' }}>
          <div className='topPostContainer'>
            <Suspense fallback={<Loading />}>
              <TopPost postList={postList?.posts} />
            </Suspense>
          </div>
          <Social />
          <Newletter sendMail={sendMail} />
        </div>
      </div>
    </>
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
      performLogOutAction,
      deletePostById
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDisPatchToProps)(PostList)
