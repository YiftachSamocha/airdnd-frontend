import { Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { loadStays } from "../../store/actions/stay.actions";
ChartJS.register(ArcElement, Tooltip, Legend);

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

    const prices = stays.map(stay => stay.price.night)
    const names = stays.map(stay => stay.name)

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
    return <section className="dashboard">
        <div style={{ width: '300px', height: '300px' }}>
            <Pie data={pieData} options={options} />
        </div>
        <div style={{ width: '300px', height: '300px' }}>
            <Bar data={barData} options={options} />
        </div>

    </section>
}