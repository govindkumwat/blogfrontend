import { Divider } from '@mantine/core'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSpring, animated, useInView } from '@react-spring/web'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import getTopPostList from '../Radux/actions/getTopPostList'

const TopPost = (props) => {
  const { getTopPostList, getTopPost } = props
  

  console.log(getTopPost, 'getTopPost')

  useEffect(() => {
    getTopPostList()
  }, [])
  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
        x: 100,
        
      },
      to: {
        opacity: 1,
        x: 0,
      },
    }),
    {
      // rootMargin: '-40% 0%',
    }
  )
  return (
    <>
    <div className='top_post_heading'>Top Posts</div>
    
        {
       getTopPost?.map((data, index) => (
        <animated.div ref={ref} style={{...springs}}>
        <Link className='postname' to={{ pathname: `${data._id}`, state: { getTopPost } }} >
<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M917 211.1l-199.2 24c-6.6.8-9.4 8.9-4.7 13.6l59.3 59.3-226 226-101.8-101.7c-6.3-6.3-16.4-6.2-22.6 0L100.3 754.1a8.03 8.03 0 0 0 0 11.3l45 45.2c3.1 3.1 8.2 3.1 11.3 0L433.3 534 535 635.7c6.3 6.2 16.4 6.2 22.6 0L829 364.5l59.3 59.3a8.01 8.01 0 0 0 13.6-4.7l24-199.2c.7-5.1-3.7-9.5-8.9-8.8z"></path></svg>       {data?.title}
      </Link>
      </animated.div>
       ))
        }
        <Divider style={{marginTop: '10px'}}/>
    </>
    
  )
}

const mapStateToProps = (state) => {
  return {
    getTopPost: state.getTopPostReducers.data

   
  }
}

const mapDisPatchToProps = (dispatch) => {
  return bindActionCreators(
    {
    getTopPostList
    },
    dispatch
  )
}

export default connect (mapStateToProps, mapDisPatchToProps)(TopPost)

