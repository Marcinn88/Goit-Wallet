import React, { useEffect } from "react";
import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import css from './Chart.module.css';
ChartJS.register(ArcElement, Tooltip, Legend);

function ChartComponent({ categorySums }) {

    const categoryColors = {
        "Main expenses": 'rgba(254, 208, 87, 1)',
        "Products": 'rgba(255, 216, 208, 1)',
        "Car": 'rgba(253, 148, 152, 1)',
        "Self care": 'rgba(197, 186, 255, 1)',
        "Child care": 'rgba(110, 120, 232, 1)',
        "Household products": 'rgba(74, 86, 226, 1)',
        "Education": 'rgba(129, 225, 255, 1)',
        "Leisure": 'rgba(36, 204, 167, 1)',
        "Other expenses": 'rgba(0, 173, 132, 1)',
    };

    const [chartData, setChartData] = useState({
        datasets: [
            {
                label: "costs",
                data: [],
                backgroundColor: [],
                borderColor: [
                    'rgba(255, 255, 255, 1)',
                ],
                borderWidth: 1,
                spacing: 1,
            }
        ],
    });

    useEffect(() => {
        if(categorySums) {
            const backgroundColors = Object.keys(categorySums).map((category) => {
                return categoryColors[category] || 'rgba(0, 0, 0, 1)';
              });
        setChartData((prevChartData) => ({
            ...prevChartData,
            datasets: [
                {
                    ...prevChartData.datasets[0],
                    data: Object.values(categorySums),
                    backgroundColor: backgroundColors,
                }
            ]
        }));
    }
    }, [categorySums]);

    return <Doughnut data={chartData} className={css.chart} />;
}

export default ChartComponent;