import { ActionIcon, Button, Group, Menu } from "@mantine/core"
import {  DatePickerInput } from "@mantine/dates"
import { IconCalendar, IconChevronDown, IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import axios from "axios"
import {DateTime} from 'luxon'


import { Link, useNavigate} from "react-router-dom"


type HeaderProps = {
    selectedDate: string 
    view: string
}

function Header({view,selectedDate}:HeaderProps){
    const navigate = useNavigate();
    

    const viewClick = (selectedView:'day' | 'week' | 'bi-week' | 'month') =>{
        if(selectedView != view){
            navigate(`${selectedView}/${selectedDate}`);
            
        }
    }
    
    const navClick = (direction: 'prev' | 'next')=>{

        const time = DateTime.fromISO(selectedDate!)
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


    const copyLastWeek= async()=>{
        const date = DateTime.fromISO(selectedDate);

        const startOfPrevWeek = date.minus({week:1}).startOf('week',{useLocaleWeeks:true})
        console.log(startOfPrevWeek.toISODate())
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const lastWeekArray = Array.from({length:7},(_,i)=>{
            //console.log(startOfPrevWeek.toISODate())
            return(
                startOfPrevWeek.plus({day:i}).toISODate()
            )
            
        })
        console.log(lastWeekArray)
        try{
            await axios.post(`http://localhost:3000/api/employee/shift/copyOverLastWeek`,
                {
                    lastWeekArray
                },{withCredentials:true}
            )
        }catch(error){
            console.error(error)
        }
        

        
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
                   
                    allowDeselect value={selectedDate}
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
                <Button onClick={copyLastWeek} w={'140px'}>
                    Copy last week
                </Button>


                <ActionIcon size={36} component={Link} to="/calendar">
                    <IconCalendar />
                </ActionIcon>
            </Group>
                

                
     </Group>

            

    </>)
}
export default Header

