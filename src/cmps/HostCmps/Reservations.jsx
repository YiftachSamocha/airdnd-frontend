import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updateOrder } from "../../store/actions/order.action";
import { useSelector } from "react-redux";
import arrowRight from '../../assets/imgs/arrow-right.png'
import arrowLeft from '../../assets/imgs/arrow-left.png'
import { SOCKET_EVENT_CHANGE_STATUS, socketService } from "../../services/socket.service";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export function Reservations({ orders, listings }) {
    const [reservations, setReservations] = useState([])
    const [filterBy, setFilterBy] = useState({ type: 'all', listing: 'all', page: 0 })
    const currUser = useSelector(state => state.userModule.currUser)
    const [pageSize, setPageSize] = useState(5)
    const [isNarrow, setIsNarrow] = useState(window.innerWidth < 1130)

    useEffect(() => {
        let newRes = [...orders]
        if (filterBy.type !== 'all') {
            newRes = newRes.filter(res => res.status === filterBy.type)
        }
        if (filterBy.listing !== 'all') {
            newRes = newRes.filter(res => res.stay._id === filterBy.listing)
        }
        //const totalFilteredReservations = newRes.length;
        const start = filterBy.page * pageSize
        const end = start + pageSize
        newRes = newRes.slice(start, end)
        setReservations(newRes)
    }, [filterBy, orders, pageSize])

    useEffect(() => {
        const handleResize = () => {
            setIsNarrow(window.innerWidth < 1130)
            if (window.innerWidth <= 550 && pageSize !== 1) {
                setPageSize(1)
                setFilterBy(prev => ({ ...prev, page: 0 })); 
            }
            else if (window.innerWidth > 550 && pageSize !== 5){
                setPageSize(5)
                setFilterBy(prev => ({ ...prev, page: 0 }));
            }
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [pageSize])

    function formatDate(date) {
        return format(date, 'yy-MM-dd')
    }

    async function changeStatus(order, newStatus) {
        const updatedOrder = { ...order, status: newStatus }
        await updateOrder(updatedOrder)
        socketService.emit(SOCKET_EVENT_CHANGE_STATUS, updatedOrder)
    }

    function onChangeListing({ target }) {
        const { value } = target
        setFilterBy(prev => ({ ...prev, listing: value, page: 0 }))
    }

    function onChangePage(rightLeft) {
        const totalFilteredReservations = orders
            .filter(res => filterBy.type === 'all' || res.status === filterBy.type)
            .filter(res => filterBy.listing === 'all' || res.stay._id === filterBy.listing)
        const totalPages = Math.ceil(totalFilteredReservations.length / pageSize)
        if (rightLeft + filterBy.page < 0) return
        if (rightLeft + filterBy.page >= totalPages) return
        setFilterBy(prev => ({ ...prev, page: prev.page + rightLeft }))
    }

    return <section className="reservations">

        {!currUser ? <div>Log in to watch your reservations</div> : <div>
            <h2>Your Reservations</h2>
            <div className="reservations-filter">
                <div className="filter-page">
                    <button onClick={() => onChangePage(-1)}><img src={arrowLeft} /></button>
                    <span>{filterBy.page + 1}</span>
                    <button onClick={() => onChangePage(1)}><img src={arrowRight} /></button>
                </div>
                <div className="res-filter-cont">
                    <div className="filter-type">
                        <button onClick={() => setFilterBy(prev => ({ ...prev, type: 'all', page: 0 }))}
                            className={filterBy.type === 'all' ? 'selected' : ''} >All</button>
                        <button onClick={() => setFilterBy(prev => ({ ...prev, type: 'approved', page: 0 }))}
                            className={filterBy.type === 'approved' ? 'selected' : ''} >Aprroved</button>
                        <button onClick={() => setFilterBy(prev => ({ ...prev, type: 'pending', page: 0 }))}
                            className={filterBy.type === 'pending' ? 'selected' : ''} >Pending</button>
                        <button onClick={() => setFilterBy(prev => ({ ...prev, type: 'declined', page: 0 }))}
                            className={filterBy.type === 'declined' ? 'selected' : ''}>Declined</button>
                    </div>
                    <div className="filter-listing">
                        <Box sx={{ minWidth: 400, margin: '20px' }}>
                            <FormControl fullWidth
                                sx={{
                                    margin: '20px 0',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#e0e0e0',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#ff385c',
                                            top: '-5px',
                                        },
                                        '& .MuiInputLabel-root': {
                                            padding: '0 4px',
                                        },
                                    },
                                }}>
                                <InputLabel id="demo-simple-select-label"
                                    sx={{
                                        color: 'black',
                                        '&.Mui-focused': { color: '#ff385c' },
                                        backgroundColor: 'white',
                                        paddingInline: '8px',
                                    }}
                                    shrink>Listing</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={filterBy.listing}
                                    label="Age"
                                    onChange={onChangeListing}
                                >
                                    <MenuItem value="all">All</MenuItem>
                                    {listings.filter(list => list.status === 'published').map(listing => {
                                        return <MenuItem value={listing._id}>{listing.name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>

            </div>
            {isNarrow ?
                <div className="narrow-res">
                    {reservations.map(reservation => {
                        return <div key={reservation._id} className="res-item">
                            <div>
                                {filterBy.type === 'all' && <p className={`status ${reservation.status.toLowerCase()}`}>{reservation.status}</p>}
                                {/* <span>·</span> */}
                                <p>{reservation.totalPrice}$</p>
                            </div>
                            <Link to={'/stay/' + reservation.stay._id} className="name" >{reservation.stay.name}</Link>
                            <div>
                                <p>{reservation.capacity.total} guests</p>
                                {/* <span>·</span> */}
                                <div>
                                    <p>{format(reservation.startDate, 'MMM dd')}</p>
                                    <span>-</span>
                                    <p>{format(reservation.endDate, 'MMM dd')}</p>
                                </div>
                            </div>
                            {(filterBy.type === 'all' || filterBy.type === 'pending') && <p className="actions">
                                {reservation.status === 'pending' && <><button onClick={() => changeStatus(reservation, 'approved')} >Approve</button>
                                    <button onClick={() => changeStatus(reservation, 'declined')} >Decline</button></>}
                            </p>}
                        </div>
                    })}

                </div>
                : <table>
                    <thead>
                        <tr>
                            {filterBy.type === 'all' && <th>Status</th>}
                            <th>Guests</th>
                            <th>Check in</th>
                            <th>Check out</th>
                            <th>Booked</th>
                            <th>Listing</th>
                            <th>Total payout</th>
                            {(filterBy.type === 'all' || filterBy.type === 'pending') && <th>Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(reservation => {
                            return <tr key={reservation._id}>
                                {filterBy.type === 'all' && <td className={`status ${reservation.status.toLowerCase()}`}>{reservation.status}</td>}
                                <th>{reservation.capacity.total}</th>
                                <th>{formatDate(reservation.startDate)}</th>
                                <th>{formatDate(reservation.endDate)}</th>
                                <th>{formatDate(reservation.createdAt)}</th>
                                <th><Link to={'/stay/' + reservation.stay._id} >{reservation.stay.name}</Link></th>
                                <th>{reservation.totalPrice}$</th>
                                {(filterBy.type === 'all' || filterBy.type === 'pending') && <th className="actions">
                                    {reservation.status === 'pending' && <><button onClick={() => changeStatus(reservation, 'approved')} >Approve</button>
                                        <button onClick={() => changeStatus(reservation, 'declined')} >Decline</button></>}
                                </th>}
                            </tr>
                        })}
                    </tbody>
                </table>}
            {orders.length === 0 && <div>No reservations yet</div>}
        </div>}
    </section>

}