import { ActionIcon, Button, Group, Menu, Popover, PopoverDropdown } from "@mantine/core"
import { DatePicker } from "@mantine/dates"
import { IconCalendar, IconChevronDown, IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import {DateTime} from 'luxon'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"


type HeaderProps = {
    date: string | null
    setDate: React.Dispatch<React.SetStateAction<string | null>>;

    view: 'day' | 'week' | 'bi-week' | 'month'
    setView : React.Dispatch<React.SetStateAction<'day' | 'week' | 'bi-week' | 'month'>>
}

function Header({date,setDate,view,setView}:HeaderProps){
    const navigate = useNavigate();

    const [menuValue,setMenuValue] = useState('week')

    const viewClick = (selectedView:'day' | 'week' | 'bi-week' | 'month') =>{
        if(selectedView != view){
            navigate(`${selectedView}`);
            setView(selectedView)
            setMenuValue(selectedView)
        }
    }

    const navClick = (direction: 'prev' | 'next')=>{

        const time = DateTime.fromISO(date!)
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
        setDate(isoDate!)
       
        
        
    }

    
    return(<>
        <Group style={{padding:'0.4rem',backgroundColor:'lightgray'}}>

                <Group gap={0}>
                    <ActionIcon style={{border:'1px px black'}} size={36} variant="filled" radius={0}  onClick={()=>navClick('prev')}

                        >
                        <IconChevronLeft/>
                    </ActionIcon>

                    <Popover>
                        <Popover.Target>
                            <ActionIcon size={36} variant="filled" radius={0}>
                                <IconCalendar/>
                            </ActionIcon>
                        </Popover.Target>
                        <PopoverDropdown>
                            <DatePicker
                                type='default'
                                allowDeselect value={date}
                                onChange={setDate}
                                highlightToday={true}
                                firstDayOfWeek={0}
                                
                            />
                        </PopoverDropdown>
                    </Popover>
                    
                    

                    
                    <ActionIcon size={36}  variant="filled" radius={0} onClick={()=>navClick('next')}
                       
                        >
                        <IconChevronRight/>
                    </ActionIcon>
                </Group>
                    
                

                <Group>
                        <Button onClick={()=>{setDate(DateTime.local().toISODate())}}>
                    Today
                </Button>
                
                <Menu>
                    <Menu.Target>
                        <Button style={{width:'120px'}}rightSection={<IconChevronDown/>}>
                            {menuValue}
                        </Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        {view != 'day' && <Menu.Item onClick={()=>{viewClick('day')}}>
                            {'Day'}
                        </Menu.Item>}
                        { view != 'week' && <Menu.Item onClick={()=>{viewClick('week')}}>
                            {'Week'}
                        </Menu.Item>}
                        {view != 'bi-week' && <Menu.Item onClick={()=>{viewClick('bi-week')}}>
                            {'Bi week'}
                        </Menu.Item>}
                        {view != 'month' && <Menu.Item onClick={()=>{viewClick('month')}}>
                            {'Month'}
                        </Menu.Item>}


                    </Menu.Dropdown>
                </Menu>
                </Group>

                <Group>
                    <ActionIcon size={36} component={Link} to="/calendar">
                        <IconCalendar />
                    </ActionIcon>
                </Group>
                

                
            </Group>

            

    </>)
}
export default Header