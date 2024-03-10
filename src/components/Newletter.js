import { Input } from '@mantine/core'
import React, { useState } from 'react'

const Newletter = ({sendMail}) => {
  const [getemail, setGetEmail] = useState('')
  return (
    <div className='newsletterContainer'>
        <div className='newsletterHeading'>Newsletter</div>
      <input className='newsletterinput' onChange={(e) => setGetEmail(e.target.value)} placeholder='Enter your email'/>
      <button className='newsletterbutton' onClick={() => sendMail(getemail)}>Subscribe</button>
    </div>
  )
}

export default Newletter
