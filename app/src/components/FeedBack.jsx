
import Alerts from './Alerts'
import CommentsMain from './CommentsMain'
import { useState } from 'react'
import TabPanel from './TabPanel'
import { FiAlertTriangle } from 'react-icons/fi'
import { GoComment } from 'react-icons/go'
const { Box, Tabs, Tab } = require('@mui/material')

export default function FeedBack () {
  const [feedTab, setFeedTab] = useState(0)

  // Receive event of tab change and stablish the new one throught the state
  const handleFeedTabs = (e, newTab) => {
    setFeedTab(newTab)
  }

  return (
    <>
      <Box position='relative' sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={feedTab} onChange={handleFeedTabs}>
          <Tab label={<span id='AlertsTab'><FiAlertTriangle color='red' /> Alerts </span>} />
          <Tab label={<span id='CommentsTab'><GoComment color='blue' /> Comments </span>} />
        </Tabs>
      </Box>
      <TabPanel value={feedTab} index={0}>
        <Alerts />
      </TabPanel>
      <TabPanel value={feedTab} index={1}>
        <CommentsMain />
      </TabPanel>
    </>
  )
}
