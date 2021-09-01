import React from 'react'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import FullCalendar from '@fullcalendar/react'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import moment from 'moment'
import '@fullcalendar/core/main.css'
import '@fullcalendar/timeline/main.css'
import '@fullcalendar/resource-timeline/main.css'
import 'antd/dist/antd.css'

const Dashboard = () => {
  const resources = [
    {
      id: 1,
      title: 'PZD 001',
    },
    {
      id: 2,
      title: 'PZD 002',
    },
    {
      id: 3,
      title: 'PZD 003',
    },
    {
      id: 4,
      title: 'PZD 004',
    },
    {
      id: 5,
      title: 'PZD 005',
    },
    {
      id: 6,
      title: 'PZD 006',
    },
    {
      id: 7,
      title: 'PZD 007',
    },
    {
      id: 8,
      title: 'PZD 008',
    },
    {
      id: 9,
      title: 'PZD 009',
    },
    {
      id: 10,
      title: 'PZD 010',
    },
  ]

  const events = [
    {
      id: 1,
      resourceId: 1,
      title: 'Event 1',
      start: '2021-08-10T08:00:00',
      end: '2021-08-10T09:00:00',
    },
    {
      id: 2,
      resourceId: 1,
      title: 'Event 2',
      start: '2021-08-10T09:00:00',
      end: '2021-08-10T10:00:00',
    },
    {
      id: 3,
      resourceId: 4,
      title: 'Event 3',
      start: '2021-08-10T10:00:00',
      end: '2021-08-10T111:00:00',
    },
    {
      id: 4,
      resourceId: 2,
      title: 'Event 4',
      start: '2021-08-10T11:00:00',
      end: '2021-08-10T112:00:00',
    },
    {
      id: 5,
      resourceId: 5,
      title: 'Event 5',
      start: '2021-08-14T12:00:00',
      end: '2021-08-14T113:00:00',
    },
  ]
  return (
    <>
      <CCard className="mb-4">
        <CCardBody className="mb-1">
          <CRow>
            <CCol sm="12">
              <div
                style={{
                  padding: '20px',
                }}
              >
                <FullCalendar
                  defaultView="resourceTimeline"
                  schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
                  plugins={[resourceTimelinePlugin]}
                  views={{
                    resourceTimelineDay: {
                      titleFormat: {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        weekday: 'long',
                      },
                    },
                  }}
                  header={{
                    left: 'title',
                    right: 'prev, next',
                  }}
                  height="auto"
                  resources={resources}
                  events={events}
                  dayRender={(info) => {
                    const isToday = moment().isSame(info.date, 'day')
                    if (isToday && info.view.type !== 'resourceTimelineDay') {
                      info.el.style.backgroundColor = '#EBEDEF'
                    }
                  }}
                />
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
