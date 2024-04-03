import React from 'react'
import { TextInput, TextInputProps, ActionIcon, useMantineTheme, rem } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
const Search = ({setSearchInput}) => {
  return (
    <div className="search-container">
       <TextInput
      radius="xl"
      size="lg"
      placeholder="Search ..."
      onChange={(e) => setSearchInput(e.target.value)}
      rightSectionWidth={42}
      className='searchbarInput'
      leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
      rightSection={
        <ActionIcon size={32} radius="xl" color={'#228be6'} variant="filled">
          <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        </ActionIcon>
      }/>
    {/* <input type="text" 
    className="search-input"
    placeholder="Search..."  
    onChange={(e) => setSearchInput(e.target.value)}/> */}
  </div>
  )
}

export default Search
