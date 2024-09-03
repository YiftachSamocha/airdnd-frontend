import { useSelector } from "react-redux";
import { AppHeader } from "../cmps/AppHeader";

export function Trips() {
    const currUser = useSelector(state => state.userModule.currUser)

    return <section>
        <AppHeader />
    </section>




}