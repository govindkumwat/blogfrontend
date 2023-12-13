import { Button, Input, TextInput, Textarea } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useLocation } from 'react-router'

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

    const [state, setState] = useState({
        id: params?.id,
        comment: null,
        name: null,
        email: null,
        commentsList: [],
        savecomment: []

    });

    const { id, comment, name, email, commentsList } = state;

    useEffect( () => {
         axios('http://localhost:3001/posts')
             .then((res) => setData(res))
            
 
 
     }, [])
 
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
                {data && data?.data?.filter((data, index) => data?._id == params.id)[0]?.title}
            </div>
            <div className='datenTime'>Author | <TimeAgo timestamp={data && data?.data?.filter((data, index) => data?._id == params.id)[0]?.createdAt} /></div>

            <div className='imageContainerDesc'>

            </div>
            <div className='descBody'>
            <div
      dangerouslySetInnerHTML={{__html: data && data?.data?.filter((data, index) => data?._id == params.id)[0]?.description}}/>
                {/* {data && data?.data?.filter((data, index) => data?._id == params.id)[0]?.description} */}
            </div>

            <div className='comment-section'>
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
                <Button mt={10} loaderProps={{ type: 'dots' }} onClick={() =>
                    handleComments()
                }>
                    Submit
                </Button>

            </div>
            <div className='comemnt-heading'>Comments</div>

            {
                commentsList && commentsList?.map((data, index) => (
                    <div className='commentList'>
                        <div className='commentorinfo'>
                            <div className='commentor'>
                                {data?.name}
                            </div>
                            <div className='commentwhen'>
                                <TimeAgo timestamp={data.createdAt} />
                            </div>
                        </div>


                        <div className='commentcontents'>
                            {data?.comment}
                        </div>

                    </div>

                ))
            }


        </div>
    )
}

export default Description
