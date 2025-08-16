import {Box, Button} from '@mui/material';

function Login(){

    const googleSignUpClick = async()=>{
        window.location.href = "http://localhost:3000/auth/google/"
    }


    return (
    <>
        <Box sx={{border: "1px solid black"}}>

            <Button onClick={googleSignUpClick}>
                Sign up with Google
            </Button>

        </Box>
    
    </>
    )
}

export default Login;