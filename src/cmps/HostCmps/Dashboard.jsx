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

ChartJS.register(ArcElement, Tooltip, Legend, PointElement, LineElement, BarElement);

export function Dashboard({ orders, stays }) {
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
                'rgb(255, 128, 128',
                'rgb(253, 253, 150)',
                'rgb(144, 238, 144)'
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
        <div style={{ width: '300px', height: '300px' }}>
            <Pie data={pieData} options={options} />
        </div>
        <div style={{ width: '300px', height: '300px' }}>
            <Bar data={barData} options={options} />
        </div>
        <div style={{ width: '300px', height: '300px' }}>
            <Line data={lineData} options={options} />

        </div>

    </section>
}