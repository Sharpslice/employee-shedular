import { ActionIcon, Button, Container, Group,Popover, PopoverDropdown } from "@mantine/core"
import {DatePicker} from '@mantine/dates'
import { IconCalendar,IconChevronLeft,IconChevronRight } from "@tabler/icons-react";
import { useState } from "react"
import {DateTime} from 'luxon'
function Dashboard(){   
    const [dateValue,setDateValue]= useState<string | null>(DateTime.local().toISODate())

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

                <Group>
                    <Button onClick={onTodayClick}>
                        Today
                    </Button>
                </Group>


                
            </Group>


        </Container>
            





        </>
    )
}

export default Dashboard