import { ActionIcon, Button, Container, Group,Popover, PopoverDropdown } from "@mantine/core"
import {DatePicker} from '@mantine/dates'
import { IconCalendar,IconChevronLeft,IconChevronRight } from "@tabler/icons-react";
import { useState } from "react"

function Dashboard(){   
    const [dateValue,setDateValue]= useState<string | null>(null)
    return(
        <>  
        <Container >
            <Group  style={{}}>
                <Group gap={0}>
                    <ActionIcon variant="outline" radius={0}>
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
                                allowDeselect value={dateValue}
                                onChange={setDateValue}
                                highlightToday={true}
                                firstDayOfWeek={0}

                            />
                        </PopoverDropdown>
                    </Popover>
                
                    <ActionIcon variant="outline" radius={0}>
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