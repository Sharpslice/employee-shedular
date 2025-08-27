import { Container, Group } from '@mantine/core';
import { Link } from 'react-router-dom';


type Links={
    link:string,
    label:string
}

function Header(){
    const links:Links[] = [
        {link: '/schedule', label: 'Schedule'},
        {link: '/contacts', label: 'Contacts'},
        {link: '/availability', label:'Availability'}
    ]

    const items = links.map((link)=>{
        return (
            <Link key={link.label} to={link.link} >
                {link.label}
            </Link>
        )
       
    })


    return(<>
        <Container fluid style={{width:'100%',height:'4rem', backgroundColor:'grey'}}>
            <Group>
                {items}
            </Group>





        </Container>
    </>)
}   

export default Header;