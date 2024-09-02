import { TextField } from "@mui/material";
import { useState } from "react";

export function LoginSignup({ closeLoginsignup }) {
    const [type, setType] = useState('login')
    const customClr = {
        '& .MuiFilledInput-root': {
            backgroundColor: '#ffffff', 
            '&:hover': {
                backgroundColor: '#ffffff', 
            },
            '&.Mui-focused': {
                backgroundColor: '#ffffff', 
            },
            '&::before': {
                borderBottomColor: '#000000', // Default underline color
            },
            '&:hover::before': {
                borderBottomColor: '#000000', // Hover underline color
            },
            '&.Mui-focused::before': {
                borderBottomColor: '#000000 !important', // Focused underline color
            },
            '& .MuiInputBase-input': {
                color: '#000000', // Text color
            },
            '&::after': {
      borderBottomColor: '#000000 !important', // Focused underline color after animation
    }
        },
        '& .MuiInputLabel-root': {
            color: '#000000', 
        },
    }

    return <section className="loginsignup">
        <div className="loginsignup-header">
            <button onClick={closeLoginsignup}>x</button>
            <p>Log in or sign up</p>
        </div>
        <div className="loginsignup-main">
            <h4>Welcome to Airdnd</h4>
            <div className="loginsignup-inputs">
                <TextField id="filled-basic" label="Username" variant="filled" sx={customClr} />
                <TextField id="filled-basic" label="Password" variant="filled" sx={customClr} />
                <TextField id="filled-basic" label="Fullname" variant="filled" sx={customClr} />
            </div>
            <button>Continue</button>
            {type === 'login' ?
                <button onClick={() => setType('signup')}>Sign up</button> :
                <button onClick={() => setType('login')}>Log in</button>
            }
        </div>
    </section>
}