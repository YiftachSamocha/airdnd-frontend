import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { userService } from "../services/user";
import { login, signup } from "../store/actions/user.actions";

export function LoginSignup({ closeLoginsignup, initalType }) {
    const [type, setType] = useState(initalType)
    const [credentials, setCredentials] = useState(userService.getEmptyUser())
    const [isErrorMsg, setIsErrorMsg] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            if (isErrorMsg) setIsErrorMsg(false)
        }, 3000)
    }, [isErrorMsg])
    const customClr = {
        '& .MuiOutlinedInput-root': {
            backgroundColor: '#ffffff',
            '& fieldset': {
                borderColor: '#000000',
            },
            '&:hover fieldset': {
                borderColor: '#000000',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#000000',
            },
            '& .MuiInputBase-input': {
                color: '#000000',
            },
        },
        '& .MuiInputLabel-root': {
            color: '#000000',
            '&.Mui-focused': {
                color: '#000000',
            },
        },
    }


    function handleChnage({ target }) {
        const { name, value } = target
        setCredentials(prev => ({ ...prev, [name]: value }))
    }

    async function onSubmit() {
        if (type === 'login') {
            const user = await login(credentials)
            if (!user) {
                setIsErrorMsg(true)
                return
            }
        }
        else {
            signup(credentials)
        }
        closeLoginsignup()
    }

    return <section className="loginsignup">
        <div className="loginsignup-content">
            <div className="loginsignup-header">
                <button onClick={closeLoginsignup}>x</button>
                <p>Log in or sign up</p>
            </div>
            <div className="loginsignup-main">
                <h4>Welcome to Airdnd</h4>
                <div className="loginsignup-inputs">
                    <TextField size="medium" id="filled-basic" label="Username" variant="outlined" sx={customClr}
                        name="username" value={credentials.username} onChange={handleChnage} />
                    <TextField size="medium" id="filled-basic" label="Password" variant="outlined" sx={customClr}
                        name="password" value={credentials.password} onChange={handleChnage} />
                    {type === 'signup' ? <TextField id="filled-basic" label="Fullname" variant="outlined" sx={customClr}
                        name="fullname" value={credentials.fullname} onChange={handleChnage} /> :
                        <p className="error-msg">{isErrorMsg && 'Wrong username or password. Try again!'}</p>
                    }

                </div>

                <div>

                    <button onClick={onSubmit} >Continue</button>
                    {type === 'login' ?
                        <button onClick={() => setType('signup')}>Sign up</button> :
                        <button onClick={() => setType('login')}>Log in</button>
                    }
                </div>
            </div>
        </div>
    </section>
}