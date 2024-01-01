import { Badge, Button, Input, Text, TextInput, Textarea, Avatar, Group  } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useLocation } from 'react-router'
import postById from '../Radux/actions/postById';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userDetails } from '../Radux/actions/auth';


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
        const intervalId = setInterval(calculateTimeAgo, 60000);
        return () => clearInterval(intervalId);
    }, [timestamp]);

    return <span>{timeAgo}</span>;
};
const Description = (props) => {
    const [data, setData] = useState([])
    const params = useParams()

    const {postById, detailPost, userDetails} = props 

    console.log(userDetails, 'userDetails')

    const [state, setState] = useState({
        id: params?.id,
        comment: null,
        name: userDetails?.data?.name || null,
        email: userDetails?.data?.email || null,
        commentsList: [],
        savecomment: []

    });

    const { id, comment, name, email, commentsList } = state;

    useEffect(() => {
        postById(params.id)
    },[])

    console.log(detailPost)

   
 
    useEffect(() => {
        axios(`http://localhost:3001/getcomment/${state?.id}`)
            .then((res) => {
                setState((prevState) => ({
                    ...prevState,
                    commentsList: res?.data
                }))
            })
    }, [])



    const handleComments = async () => {
        const response = await axios.post('http://localhost:3001/savecomments', {
            id,
            comment,
            name,
            email
        }
        );

        setState((prevState) => ({
            ...prevState,
            savecomment: response?.data,
            comment: null,
            name: null,
            email: null,

        }))
       
       


       await axios(`http://localhost:3001/getcomment/${state?.id}`)
        .then((res) => {
            setState((prevState) => ({
                ...prevState,
                commentsList: res?.data
            }))
        })
        setState((prevState) => ({
            ...prevState,
            comment: '',
            name: '',
            email: '',
        }))
    }

   

    return (
        <div className='detailContainer'>
            <div className='desctitle'>
              {detailPost.title}
            </div>
            <div className='postCategory'>
                    {
                      detailPost?.tags?.map((tagsdata, index) => (
                        <Badge color={'blue'}>{tagsdata}</Badge>
                      ))
                    }
                  </div>
            <div className='datenTime'>Posted By: {detailPost.userName} | <TimeAgo timestamp={detailPost?.createdAt} /></div>

            <div className='imageContainerDesc'>

            </div>
            <div className='descBody'>
            <div
      dangerouslySetInnerHTML={{__html: detailPost?.description}}/>
                {/* {data && data?.data?.filter((data, index) => data?._id == params.id)[0]?.description} */}
            </div>

            <div className='comment-section'>
                {
                    userDetails?.data?.name && 
                    <Text mt={10} mb={10}>Commenting as <strong>{userDetails?.data?.name}</strong> </Text>
                }
                
                <Textarea
                    value={comment}
                    size="md"
                    placeholder="Enter Comment Here"
                    onChange={(e) => {
                        setState((prevState) => ({
                            ...prevState,
                            comment: e.target.value
                        }))
                    }}
                />
                {
                    userDetails == null ? 
                    <>
                    <TextInput mt={'10px'} value={name} placeholder='Name' required onChange={(e) => {
                    setState((prevState) => ({
                        ...prevState,
                        name: e.target.value
                    }))
                }} />
                <Input
                    mt={'10px'}
                    placeholder="Email"
                    value={email}
                    leftSection={<IconAt size={16} />} onChange={(e) => {

                        setState((prevState) => ({
                            ...prevState,
                            email: e.target.value
                        }))
                    }} />
                    </>
                    :
                    null
                }
                
                <Button mt={10} loaderProps={{ type: 'dots' }} onClick={() =>
                    handleComments()
                }>
                    Submit
                </Button>

            </div>
            {
                commentsList.length > 0 && 
                <div className='comemnt-heading'>Comments</div>
            }
            

            {
                commentsList && commentsList?.map((data, index) => (
                    <div style={{border: '1px solid #d2d2d2', borderRadius: '10px', padding: '6px', marginBottom: '10px'}}>
                    <Group >
                      <Avatar
                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                        alt="Jacob Warnhalter"
                        radius="xl"
                      />
                      <div>
                        <Text size="sm"> {data?.name}</Text>
                        <Text size="xs" c="dimmed">
                        <TimeAgo timestamp={data.createdAt} />
                        </Text>
                      </div>
                    </Group>
                    <Text pl={54} pt="sm" size="sm">
                    {data?.comment}
                    </Text>
                  </div>
                ))
            }


        </div>
    )
}

const mapStateToProps = (state) => {
    return {
     detailPost: state?.postByIdReducer?.data,
     userDetails: state?.loginReducer.user
    }
  }
  
  const mapDisPatchToProps = (dispatch) => {
    return bindActionCreators(
      {
        postById
      },
      dispatch
    )
  }
  

export default connect(mapStateToProps, mapDisPatchToProps) (Description)
