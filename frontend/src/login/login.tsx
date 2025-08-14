import {Box, Button} from '@mui/material';

function Login(){

    const googleSignUpClick = async()=>{
        window.location.href = "http://localhost:3000/auth/google/"
    }


    return (
    <>
        <Box>

            <Button onClick={googleSignUpClick}>
                Sign up with Google
            </Button>

        </Box>
    
    </>
    )
}

export default Login;