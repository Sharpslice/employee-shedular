import { ActionIcon, Button, Container, Group,Menu,Popover, PopoverDropdown } from "@mantine/core"
import {DatePicker} from '@mantine/dates'
import { IconCalendar,IconChevronDown,IconChevronLeft,IconChevronRight } from "@tabler/icons-react";
import { useEffect, useState } from "react"
import {DateTime} from 'luxon'
import axios from "axios";


function Dashboard(){   
    const [dateValue,setDateValue]= useState<string | null>(DateTime.local().toISODate())
    const [view,setView] = useState<'day' | 'week' | 'bi-week' | 'month'>('week')


    
    
    const navClick = (direction: 'prev' | 'next')=>{

        const time = DateTime.fromISO(dateValue!)
        let isoDate:string | null
        if(view === 'day' ){
            isoDate = direction === 'prev' 
            ? time.minus({days:1}).toISODate()
            : time.plus({days:1}).toISODate()

        } else if (view ==='week'){
            isoDate = direction === 'prev' 
            ? time.minus({weeks:1}).toISODate()
            : time.plus({weeks:1}).toISODate()

        } else if (view ==='bi-week'){
            isoDate = direction === 'prev' 
            ? time.minus({weeks:2}).toISODate()
            : time.plus({weeks:2}).toISODate()
            
        } else if (view === 'month'){
            isoDate = direction === 'prev' 
            ? time.minus({months:1}).toISODate()
            : time.plus({months:1}).toISODate()
        }
        console.log(isoDate!)
        setDateValue(isoDate!)
        
        
    }

    useEffect(()=>{
        const fetchData =async() =>{
            const response = await axios.get(`http://localhost:3000/api/calendar/date?date=${dateValue}&view=${view}`)

            console.log(response.data.dateArray)
        }
        fetchData()
    },[dateValue,view])



    return(
        <>  
        <Container >
            <Group  style={{}}>
                <Group gap={0}>
                    <ActionIcon variant="outline" radius={0} onClick={()=>navClick('prev')}>
                        <IconChevronLeft/>
                    </ActionIcon>

                    <Popover>
                        <Popover.Target>
                            <ActionIcon variant="outline" radius={0}>
                                <IconCalendar/>
                            </ActionIcon>
                        </Popover.Target>
                        <PopoverDropdown>
                            <DatePicker
                                type='default'
                                allowDeselect value={dateValue}
                                onChange={setDateValue}
                                highlightToday={true}
                                firstDayOfWeek={0}
                                
                            />
                        </PopoverDropdown>
                    </Popover>
                
                    <ActionIcon variant="outline" radius={0} onClick={()=>navClick('next')}>
                        <IconChevronRight/>
                    </ActionIcon>
                </Group>

                
                <Button onClick={()=>{setDateValue(DateTime.local().toISODate())}}>
                    Today
                </Button>
                
                <Menu >
                    <Menu.Target>
                        <Button rightSection={<IconChevronDown/>}>
                            {view}
                        </Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        {view != 'day' && <Menu.Item onClick={()=>{setView('day')}}>
                            {'day'}
                        </Menu.Item>}
                        { view != 'week' && <Menu.Item onClick={()=>{setView('week')}}>
                            {'week'}
                        </Menu.Item>}
                        {view != 'bi-week' && <Menu.Item onClick={()=>{setView('bi-week')}}>
                            {'bi week'}
                        </Menu.Item>}
                        {view != 'month' && <Menu.Item onClick={()=>{setView('month')}}>
                            {'month'}
                        </Menu.Item>}


                    </Menu.Dropdown>
                </Menu>

                
            </Group>


        </Container>
            





        </>
    )
}

export default Dashboard