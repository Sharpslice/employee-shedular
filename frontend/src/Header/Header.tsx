import { Container, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './header.module.css'
import { useState } from 'react';

type Links={
    link:string,
    label:string
}
const links:Links[] = [
        {link: '/schedule', label: 'Schedule'},
        {link: '/contacts', label: 'Contacts'},
        {link: '/availability', label:'Availability'}
    ]

function Header(){
    const [active,setActive] = useState<string>(links[0].link)


    const onSelectClick = (link:Links) =>{
        setActive(link.link)
    }
    const items = links.map((link)=>{
        return (
            <Link 
                key={link.label}
                className={classes.link}  
                to={link.link} 
                data-active = {active === link.link?true : undefined}
                onClick={()=>{onSelectClick(link)}}
                >
                {link.label}
            </Link>
        )
       
    })


    return(<>
        <Container className={classes.inner} fluid style={{width:'100%',height:'3.2rem', backgroundColor:'grey'}}>
            <Group>
                {items}
            </Group>
            
        </Container>
    </>)
}   

export default Header;