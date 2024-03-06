import { Badge, Button, Card, Group, Text } from '@mantine/core'
import React from 'react'

const DashCard = ({icon, title, postCount}) => {
  return (
    <div>
     <Card shadow="sm" padding="lg" radius="md" withBorder>

      <Group mt="md" mb="xs" align='center'>
        <Text>{icon}</Text>
        <Text fw={500}>{title}</Text>
      </Group>

      <Text size="sm" c="dimmed">
       {postCount}
      </Text>
    </Card>
    </div>
  )
}

export default DashCard
