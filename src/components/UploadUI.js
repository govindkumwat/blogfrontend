import { TextInput, TagsInput, Button } from '@mantine/core'
import React from 'react'
import { FileInput } from '@mantine/core'

const UploadUI = ({setTitle, setDescription, setTags, tags, title, description, setThumbs, thumbs, handleSubmit}) => {


  return (
    <div>



      <TextInput
        label="Title"
        placeholder="Type Post Title Here"
        inputWrapperOrder={['label', 'error', 'input', 'description']}
        onChange={(e) => 
        {
          setTitle(e.target.value)
        }}
        value={title}
      />

      <TextInput
        label="Post Description"
        placeholder="Type Post Description Here"
        inputWrapperOrder={['label', 'error', 'input', 'description']}
        onChange={(e) => 
          {
            setDescription(e.target.value)
          }}
          value={description}
      />

      <TagsInput label="Press Enter to submit a tag" placeholder="Enter tag" 
       data={[]} value={tags} onChange={setTags}
      />

      <FileInput multiple value={thumbs} onChange={setThumbs} />

      <div className='postButton'>
      <Button mt={10} onClick={handleSubmit} leftSection={<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 0 0-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path></svg>} variant="filled">Post</Button>

      </div>

     



    </div>
  )
}

export default UploadUI
