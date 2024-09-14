import { Bar, Line, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    BarElement
} from "chart.js";
import { getRandomColor } from "../../services/util.service";
import { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend, PointElement, LineElement, BarElement);

export function Dashboard({ orders, stays }) {
    const [selected, setSelected] = useState('pie')

    function handleChange({ target }) {
        const { value } = target
        setSelected(value)
    }
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        aspectRatio: 1,
    }

    //PIE
    const ordersRatio = [orders.filter(order => order.status === 'declined').length,
    orders.filter(order => order.status === 'pending').length,
    orders.filter(order => order.status === 'approved').length]
    const pieData = {
        labels: [
            'Declined',
            'Pending',
            'Approved'
        ],
        datasets: [{
            label: 'Orders status',
            data: ordersRatio,
            backgroundColor: [
                'rgb(204, 51, 51)',
                'rgb(255, 204, 0)',
                'rgb(0, 153, 76)'
            ],
            hoverOffset: 4
        }]
    }
    //BAR
    const prices = stays.map(stay => stay.price.night)
    const names = stays.map(stay => stay.name)
    const colors = stays.map(() => getRandomColor())
    const barData = {
        labels: names,
        datasets: [{
            label: 'Night price per stay',
            data: prices,
            backgroundColor: '#ff385c',
            borderColor: '#ff385c',
            borderWidth: 1
        }]
    }

    //LINE
    function getLineData(orders) {
        const daysInMonth = month => new Date(2024, month + 1, 0).getDate()
        const ordersCountByMonth = new Array(5).fill(0)

        orders.forEach(order => {
            const startDate = new Date(order.startDate)
            const endDate = new Date(order.endDate)

            for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
                const month = date.getMonth();
                if (month >= 8 && month <= 11) {
                    const daysInThisMonth = daysInMonth(month)
                    ordersCountByMonth[month - 8] += 1 / daysInThisMonth
                } else if (month === 0) {
                    const daysInThisMonth = daysInMonth(month)
                    ordersCountByMonth[4] += 1 / daysInThisMonth
                }
            }
        })
        return ordersCountByMonth
    }

    const months = ['September', 'October', 'November', 'December', 'January'];
    const monthData = getLineData(orders)

    const lineData = {
        labels: months,
        datasets: [{
            label: 'Reservations per month',
            data: monthData,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }
    return <section className="dashboard">
 {
            selected === 'pie' && <div style={{ width: '300px', height: '300px' }}>
                <Pie data={pieData} options={options} />
            </div>
        }

        {
            selected === 'bar' && <div style={{ width: '300px', height: '300px' }}>
                <Bar data={barData} options={options} />
            </div>
        }

        {
            selected === 'line' && <div style={{ width: '300px', height: '300px' }}>
                <Line data={lineData} options={options} />
            </div>
        }

        <Box sx={{ minWidth: 200, margin: '20px' }}>
            <FormControl fullWidth
               sx={{
                margin: '20px 0',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ff385c',
                  },
                },
              }}>
                <InputLabel id="demo-simple-select-label"
                    sx={{ color: 'black', '&.Mui-focused': { color: '#ff385c' } }}>Graph</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selected}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value='pie'>Reservations Status</MenuItem>
                    <MenuItem value='bar'>Price per Listing</MenuItem>
                    <MenuItem value='line'>Reservations per Months</MenuItem>
                </Select>
            </FormControl>
        </Box>
    </section >
}