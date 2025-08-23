import { ActionIcon, Button, Container, Group,Menu,Popover, PopoverDropdown } from "@mantine/core"
import {DatePicker} from '@mantine/dates'
import { IconCalendar,IconChevronDown,IconChevronLeft,IconChevronRight } from "@tabler/icons-react";
import { useEffect, useState } from "react"
import {DateTime} from 'luxon'
import axios from "axios";
function Dashboard(){   
    const [dateValue,setDateValue]= useState<string | null>(DateTime.local().toISODate())
    const [filterByValue,setFilterByValue] = useState<string>('week')

    const onFilterClick =(select: 'day' | 'week' | 'bi week' | 'month') =>{
        setFilterByValue(select)
    }
    const onTodayClick =()=>{
        console.log(DateTime.local().toISODate())
        setDateValue(DateTime.local().toISODate())
    }

    const navClick = (direction: 'prev' | 'next')=>{
        const time = DateTime.fromISO(dateValue!)

        if(direction == 'prev'){
            console.log('prev')
            const prevWeek = time.minus({week:1});
            
            const test = prevWeek.minus({day: (prevWeek.weekday % 7)}).toISODate()
         
            setDateValue(test!)
            console.log(test)
        }
        else if(direction=='next'){
            console.log('next')
            
            const nextWeek = time.plus({week:1});
            
            const test = nextWeek.startOf('week',{useLocaleWeeks:true}).toISODate()
         
            setDateValue(test!)
            console.log(test)
            
        }

        
    }

    useEffect(()=>{
        const fetchData =async() =>{
            await axios.get(`http://localhost:3000/api/calendar/date?date=${dateValue}`)
        }
        fetchData()
    },[dateValue])



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

                
                <Button onClick={onTodayClick}>
                    Today
                </Button>
                
                <Menu >
                    <Menu.Target>
                        <Button rightSection={<IconChevronDown/>}>
                            {filterByValue}
                        </Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        {filterByValue != 'day' && <Menu.Item onClick={()=>{onFilterClick('day')}}>
                            {'day'}
                        </Menu.Item>}
                        { filterByValue != 'week' && <Menu.Item onClick={()=>{onFilterClick('week')}}>
                            {'week'}
                        </Menu.Item>}
                        {filterByValue != 'bi week' && <Menu.Item onClick={()=>{onFilterClick('bi week')}}>
                            {'bi week'}
                        </Menu.Item>}
                        {filterByValue != 'month' && <Menu.Item onClick={()=>{onFilterClick('month')}}>
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