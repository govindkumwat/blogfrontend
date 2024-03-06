import React from 'react'
import PostList from '../components/PostList'
import UpperStrip from '../components/UpperStrip'
import { Helmet } from 'react-helmet'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Trashpost</title>
      </Helmet>
      <PostList/>
    </div>
  )
}

export default Home
