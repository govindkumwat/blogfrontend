import React, { useEffect, useState } from 'react'
import { Badge, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import Search from './Search';
import UploadUI from './UploadUI';
import { fetchPostAction } from '../Radux/actions/fetchPostAction';


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


const PostList = () => {
  const [postData, setPostData] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [opened, { open, close }] = useDisclosure(false);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState([])
  const [thumbs, setThumbs] = useState([])

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostAction());
  }, []);


  const postsState = useSelector(state => state.posts);
  console.log(postsState, 'homePOst')




  const navigate = useNavigate()

  useEffect(() => {
    axios('http://localhost:3001/posts')
      .then(response => setPostData(response?.data))
  }, [])

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data', // Important for file uploads
    },
  };

  const handleSubmit = async () => {
    try {
      const formattedTags = tags.map((tag, index) => ({ [`tags[${index}][value]`]: tag }));

      const response = await axios.post('http://localhost:3001/savepost', {
        title,
        description,
        ...formattedTags,
      }, config);

      const postsResponse = await axios.get('http://localhost:3001/posts');
      setPostData(postsResponse?.data);

      close();
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add New Post">
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
        <h2 className='trendingheader'>Trending</h2>
        <div className='btnGroup'>
        <Button onClick={open} leftSection={<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 0 0-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path></svg>} variant="filled">
          Upload
        </Button>
        <Button onClick={() => navigate('/login')} style={{marginLeft: '10px'}}>Login</Button>
        </div>
      </div>
      <Search setSearchInput={setSearchInput} />
      {
        postData
          ?.filter(
            (data) =>
              data?.title?.toLowerCase()?.includes(searchInput.toLowerCase()) || data?.description?.toLowerCase()?.includes(searchInput.toLowerCase())
          )
          ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
          .map((data, index) => (
            <div className='postList'>
              <div className='post'>
                <img className='thumbnail' src={`https://picsum.photos/200/300?random=${index}`} />
                <div className='textPost'>
                  <div className='datenTime'>Author | <TimeAgo timestamp={data?.createdAt} /></div>
                  <Link to={{ pathname: `${data._id}`, state: { postData } }}>
                    <div className='postTitle'>{data?.title}</div>
                  </Link>
                  <div className='postDescription'> <div
                    dangerouslySetInnerHTML={{ __html: data?.description }}
                  /></div>
                  <div className='postCategory'>
                    {
                      data?.category?.map((tagsdata, index) => (
                        <Badge color={getRandomColor()}>{tagsdata}</Badge>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          ))
      }
    </>


  )
}

export default PostList
