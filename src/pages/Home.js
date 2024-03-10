import React, { lazy } from 'react'
// import PostList from '../components/PostList'
import UpperStrip from '../components/UpperStrip'
import { Helmet } from 'react-helmet'
import { Suspense } from 'react'
const PostList = lazy(() => import('../components/PostList'));

const Home = () => {
  return (
   <>
      <Helmet>
        <title>ByteBurst</title>
      </Helmet>
       <Suspense fallback={'Loading'}>
      <PostList/>
    </Suspense>
    </>
  )
}

export default Home
