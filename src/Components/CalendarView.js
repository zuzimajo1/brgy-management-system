import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import { Button, LoadingOverlay, Modal, Text } from '@mantine/core'
import dayjs from 'dayjs'

export default function CalendarView() {

    const [opened, setOpened] = useState(false);
    const [dateData, setDateData] = useState({});
    const [eventData, setEventData] = useState('');
    const [eventAboutData, setEventAboutData] = useState('');

    const INITIAL_EVENTS = [
        {
            title: 'Araw ng Barangay',
            start: '2022-07-01',
            about: 'test only',
            allDay: false
        },
        {
            title: 'Eutan event',
            start: '2022-07-04',
            about: 'test yep',
            allDay: false
        }
    ]

    const handleDateSelect = (selectInfo) => {
        let title = prompt('Enter the title of the event')
        let about = prompt('What is the event all about?')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection

        if (title) {
            calendarApi.addEvent({
                title,
                start: selectInfo.startStr,
                about,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
        }
    }

    const handleDeleteEvent = (clickInfo) => {
        if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove()
        }
    }

    const handleDateClick = (e) => {
        setEventData(e.event.title);
        setDateData(e.event.start);
        setEventAboutData(e.event.extendedProps.about)
        setOpened(true)
    }
    return (
        <div>
            <FullCalendar
                events={INITIAL_EVENTS}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                height={650}
                eventClick={e => handleDateClick(e)}    // For user to view the details of the event
                // eventClick={handleDeleteEvent} // For Admin to delete the event
                droppable={true}
                editable={true}
                selectable={true}
                select={handleDateSelect}
            />
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Event Details"
                centered
            >
                <Text>What: {eventData}</Text>
                <Text>When: {dayjs(dateData).format('dddd, MMMM D, YYYY h:mm A')}</Text>
                <Text>About: {eventAboutData}</Text>
            </Modal>
        </div>
    )
}