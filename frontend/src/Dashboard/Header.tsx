import { ActionIcon, Button, Group, Menu } from "@mantine/core"
import {  DatePickerInput } from "@mantine/dates"
import { IconCalendar, IconChevronDown, IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import {DateTime} from 'luxon'


import { Link, useNavigate} from "react-router-dom"


type HeaderProps = {
    date: string 
    view: string
}

function Header({view,date}:HeaderProps){
    const navigate = useNavigate();
    

    const viewClick = (selectedView:'day' | 'week' | 'bi-week' | 'month') =>{
        if(selectedView != view){
            navigate(`${selectedView}/${date}`);
            
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
        
        navigate(`${view}/${isoDate!}`)
        
    }

    
    return(<>
        <Group bg={'LIGHTGRAY'} justify="space-between" w={'100%'} p={'0.6rem 1rem'} 
            style={{
                boxShadow:'0 4px 6px rgba(0,0,0,0.4)',
                borderTop:'1px solid black',
                borderBottom:'1px solid black',
               
            
            }}
        >

            <Group>
                <Group>
                    <DatePickerInput
                   
                    allowDeselect value={date}
                    onChange={(e)=>{navigate(`${view}/${e ?e :DateTime.local().toISODate()}`)}}
                    highlightToday={true}
                    firstDayOfWeek={0}
                    style={{minWidth:'10rem'}}
                
        
                />
                
                
                <ActionIcon style={{border:'1px px black'}} size={36} variant="filled" radius={'sm'}  onClick={()=>navClick('prev')}

                    >
                    <IconChevronLeft/>
                </ActionIcon>

                <ActionIcon size={36}  variant="filled" radius={'sm'} onClick={()=>navClick('next')}
                    
                    >
                    <IconChevronRight/>
                </ActionIcon>

                </Group>
                


                <Group>
                        <Button onClick={()=>{ navigate(`${view}/${DateTime.local().toISODate()}`);}}>
                    Today
                </Button>
                
                <Menu>
                    <Menu.Target>
                        <Button style={{width:'120px'}}rightSection={<IconChevronDown/>}>
                            {view}
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

