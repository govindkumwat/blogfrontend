import { Badge, Button, Input, Text, TextInput, Textarea, Avatar, Group, Divider, Skeleton } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useLocation } from 'react-router'
import postById from '../Radux/actions/postById';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userDetails } from '../Radux/actions/auth';
import '../App.css'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

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
                setTimeAgo(`Moments ago`);
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
    const params = useParams()
    const { postById, detailPost, userDetails, userdetails } = props

    const [state, setState] = useState({
        id: params?.id,
        comment: null,
        name: '',
        email: '',
        commentsList: [],
        savecomment: [],
        loading: false
    });

    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            id: params?.id,
            name: userdetails && userdetails?.data?.name || null,
            email: userdetails && userdetails?.data?.email || null,
        }));
    }, [params.id, userdetails]);

    const { id, comment, name, email, commentsList, loading } = state;

    useEffect(() => {
        // Define a variable to track whether the component is mounted
        let isMounted = true;

        // Inside an async function to use await
        const fetchData = async () => {
            try {
                setState((prevState) => ({
                    ...prevState,
                    loading: true
                }));

                // Fetch data
                const result = await postById(params.id);

                // Check if the component is still mounted before updating state
                if (isMounted) {
                    // Update state with the fetched data
                    setState((prevState) => ({
                        ...prevState,
                        loading: false,
                        data: result  // Assuming there is a data property in the result
                    }));
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle error state if needed
            }
        };
        // Call the fetchData function
        fetchData();
        // Cleanup function to be executed when the component is unmounted
        return () => {
            isMounted = false;
        };
    }, [params.id]);  // Include any dependencies that should trigger a re-fetch



    useEffect(() => {
        axios(`http://localhost:3000/getcomment/${state?.id}`)
            .then((res) => {
                setState((prevState) => ({
                    ...prevState,
                    commentsList: res?.data
                }))
            })
    }, [])



    const handleComments = async () => {
        const response = await axios.post('http://localhost:3000/savecomments', {
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

        await axios(`http://localhost:3000/getcomment/${state?.id}`)
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
        <>

            <Helmet>
                <title>{detailPost?.title}</title>
            </Helmet>

            <div className='detailContainer'>
                <Link to='/' className='backButton'>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 11L6.414 11 11.707 5.707 10.293 4.293 2.586 12 10.293 19.707 11.707 18.293 6.414 13 21 13z"></path></svg>
                    Back to home
                </Link>
                <div className='desctitle'>


                    {loading ? <Skeleton height={50} mt={6} /> : detailPost.title}
                </div>
                {
                    loading ? <Skeleton height={10} width={100} mt={6} mb={6} />
                        :
                        <div className='datenTime'>Posted By: <strong>{detailPost.userName}</strong>  | <TimeAgo timestamp={detailPost?.createdAt} /></div>
                }

                <Divider />
                {
                    loading ? <Skeleton height={300} mt={6} mb={6} /> :
                        <div className='imageContainerDesc'>
                            <img src={detailPost.thumbs} />
                        </div>
                }

                <div className='descBody'>
                    {
                        loading ?
                            <>
                                <Skeleton height={16} mt={6} mb={6} />
                                <Skeleton height={16} mt={6} mb={6} />
                                <Skeleton height={16} mt={6} mb={6} />
                                <Skeleton height={16} mt={6} mb={6} />
                                <Skeleton height={16} mt={6} mb={6} width={500} />
                                <Skeleton height={16} mt={6} mb={6} />
                                <Skeleton height={16} mt={6} mb={6} />
                                <Skeleton height={16} mt={6} mb={6} width={300} />
                                <Skeleton height={16} mt={6} mb={6} />
                                <Skeleton height={16} mt={6} mb={6} />
                                <Skeleton height={16} mt={6} mb={6} />
                                <Skeleton height={16} mt={6} mb={6} width={600} />
                                <Skeleton height={16} mt={6} mb={6} />
                                <Skeleton height={16} mt={6} mb={6} />
                                <Skeleton height={16} mt={6} mb={6} />
                                <Skeleton height={16} mt={6} mb={6} width={300} />
                                <Skeleton height={16} mt={6} mb={6} />
                                <Skeleton height={16} mt={6} mb={6} />
                                <Skeleton height={16} mt={6} mb={6} />
                                <Skeleton height={16} mt={6} mb={6} />
                                <Skeleton height={16} mt={6} mb={6} />
                            </>
                            :
                            <div
                                dangerouslySetInnerHTML={{ __html: detailPost?.description }} />
                    }
                </div>
                <Divider />

                {
                    loading ? 
                    <div style={{display:'flex', gap: '10px'}}>
                         <Skeleton height={16} mt={6} mb={6} width={60} />
                         <Skeleton height={16} mt={6} mb={6} width={60} />
                         <Skeleton height={16} mt={6} mb={6} width={60} />
                    </div>
                    :
                    <div className='postCategory'>
                    {
                        detailPost?.tags?.map((tagsdata, index) => (
                            <Badge variant="default" color={'#f3f0f0'}>{tagsdata}</Badge>
                        ))
                    }
                </div>
                }

               

                <div className='comment-section'>
                    {
                        userdetails?.data?.name &&
                        <Text mt={10} mb={10}>Commenting as <strong>{userdetails?.data?.name}</strong> </Text>
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
                        userdetails == null ?
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
                        <div style={{ border: '1px solid #d2d2d2', borderRadius: '10px', padding: '6px', marginBottom: '10px' }}>
                            <Group >
                                <Avatar
                                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                                    alt="Jacob Warnhalter"
                                    radius="xl"
                                />
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                    <Text size="sm"> {data?.name}</Text>
                                    <Text size="xs" c="dimmed">
                                        <TimeAgo timestamp={data.createdAt} />
                                    </Text>
                                </div>
                            </Group>
                            <Text pl={54} pt="sm" size="sm" fw={500}>
                                {data?.comment}
                            </Text>
                        </div>
                    ))
                }


            </div>
        </>

    )
}

const mapStateToProps = (state) => {
    return {
        detailPost: state?.postByIdReducer?.data,
        userdetails: state?.loginReducer.user
    }
}

const mapDisPatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            postById,
            userDetails
        },
        dispatch
    )
}


export default connect(mapStateToProps, mapDisPatchToProps)(Description)
