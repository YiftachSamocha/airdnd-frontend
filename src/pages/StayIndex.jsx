import { useDispatch, useSelector } from 'react-redux';
import { AppHeader } from '../cmps/AppHeader.jsx'
import { StayList } from '../cmps/StayList.jsx'
import { useEffect } from 'react';
import { loadUsers, login } from '../store/actions/user.actions.js';
import { userService } from '../services/user/user.service.local.js';
import { SET_CURR_USER, SET_USERS } from '../store/reducers/user.reducer.js';
import { makeId } from '../services/util.service.js';


export function StayIndex() {
    const dispatch = useDispatch()
    const currUser = useSelector(state => state.userModule.currUser)

    // useEffect(() => {
    //     const initialize = async () => {
    //         const loadedUsers = await userService.getUsers()
    //         dispatch({ type: SET_USERS, users: loadedUsers })

    //         if (!currUser && loadedUsers.length > 0) {
    //             const loggedInUser = await userService.signup({
    //                 username: makeId(6),
    //                 password: makeId(6),
    //             })

    //             dispatch({ type: SET_CURR_USER, user: loggedInUser })
    //         }
    //     };

    //     initialize()
    // }, [currUser, dispatch])
   


    return <section className='main-layout'>
        <AppHeader />
        <StayList />
    </section>

}