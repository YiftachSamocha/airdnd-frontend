import { TextField } from "@mui/material";
import { useState } from "react";
import { userService } from "../services/user";
import { login, signup } from "../store/actions/user.actions";

export function LoginSignup({ closeLoginsignup }) {
    const [type, setType] = useState('login')
    const [credentials, setCredentials] = useState(userService.getEmptyUser())
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
                borderBottomColor: '#000000',
            },
            '&:hover::before': {
                borderBottomColor: '#000000',
            },
            '&.Mui-focused::before': {
                borderBottomColor: '#000000 !important',
            },
            '& .MuiInputBase-input': {
                color: '#000000',
            },
            '&::after': {
                borderBottomColor: '#000000 !important',
            }
        },
        '& .MuiInputLabel-root': {
            color: '#000000',
        },
    }

    function handleChnage({ target }) {
        const { name, value } = target
        setCredentials(prev => ({ ...prev, [name]: value }))
    }

    async function onSubmit() {
        if (type === 'login') {
            login(credentials)
        }
        else {
            signup(credentials)
        }
        closeLoginsignup()
    }

    return <section className="loginsignup">
        <div className="loginsignup-header">
            <button onClick={closeLoginsignup}>x</button>
            <p>Log in or sign up</p>
        </div>
        <div className="loginsignup-main">
            <h4>Welcome to Airdnd</h4>
            <div className="loginsignup-inputs">
                <TextField id="filled-basic" label="Username" variant="filled" sx={customClr}
                    name="username" value={credentials.username} onChange={handleChnage} />
                <TextField id="filled-basic" label="Password" variant="filled" sx={customClr}
                    name="password" value={credentials.password} onChange={handleChnage} />
                {type === 'signup' && <TextField id="filled-basic" label="Fullname" variant="filled" sx={customClr}
                    name="fullname" value={credentials.fullname} onChange={handleChnage} />}
            </div>
            <button onClick={onSubmit} >Continue</button>
            {type === 'login' ?
                <button onClick={() => setType('signup')}>Sign up</button> :
                <button onClick={() => setType('login')}>Log in</button>
            }
        </div>
    </section>
}