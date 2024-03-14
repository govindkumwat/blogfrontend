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
       <Suspense fallback={<div className='loader'>
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="30" height="20">
                  <circle cx="50" cy="50" r="40" stroke="white" stroke-width="8" fill="none">
                    <animate attributeName="stroke-dasharray" values="0, 200; 90, 150; 140, 110; 200, 0" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="stroke-dashoffset" values="0, -20; -40, -60; -100, -120; -200, -220" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>
       </div>}>
      <PostList/>
    </Suspense>
    </>
  )
}

export default Home
