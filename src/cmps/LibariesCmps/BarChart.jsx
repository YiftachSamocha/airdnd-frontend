import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Function to generate data with a peak in the middle
function generateBarData(numBars, maxPrice) {
    const data = [];
    const peakIndex = Math.floor(numBars / 2);
    const step = (maxPrice - 40) / numBars
    let price = 40


    for (let i = 0; i < numBars; i++) {
        const value = Math.max(0, peakIndex - Math.abs(peakIndex - i));
        price += step
        data.push({ name: `Bar ${i + 1}`, value, price });
    }

    return data;
};

// CustomBarChart component
export function BarChart({ range, maxPrice }) {
    const data = generateBarData(16, maxPrice);

    const chartData = {
        labels: data.map(d => d.name),
        datasets: [
            {
                label: 'Value',
                data: data.map(d => d.value),
                backgroundColor: data.map(d =>
                    d.price >= range[0] && d.price <= range[1] ? '#ff385c' : '#ccc'
                ),
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Hide the legend
            },
            tooltip: {
                enabled: false, // Disable tooltips
            },
        },
        scales: {
            x: {
                display: false, // Hide x-axis
            },
            y: {
                display: false, // Hide y-axis
                beginAtZero: true,
            },
        },
        elements: {
            bar: {
                borderWidth: 0, // Optional: remove border if any
            },
        },
        layout: {
            padding: 0, // Remove padding
        },
    };

    return <Bar data={chartData} options={options} />;
}
