import { ActionIcon, Button, Container, Group,Popover, PopoverDropdown } from "@mantine/core"
import {DatePicker} from '@mantine/dates'
import { IconCalendar,IconChevronLeft,IconChevronRight } from "@tabler/icons-react";
import { useState } from "react"
import {DateTime} from 'luxon'
function Dashboard(){   
    const [dateValue,setDateValue]= useState<string | null>(new Date().toString())

    

    const navClick = (direction: 'prev' | 'next')=>{
        if(direction == 'prev'){
            console.log(dateValue)
        }
        else if(direction=='next'){
            console.log(dateValue)
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
                    <Button>
                        Today
                    </Button>
                </Group>


                
            </Group>


        </Container>
            





        </>
    )
}

export default Dashboard