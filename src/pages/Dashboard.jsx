import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import useGetAllLinks from "../utils/hooks/useGetAllLinks";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const Dashboard = () => {
    const { links, fetchLinkState } = useGetAllLinks();
    console.log(links, fetchLinkState);
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        indexAxis: "y",
        elements: {
            bar: {
                height: "20px",
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: "Visitor Clicks per Link",
            },
        },
    };

    const labels = links.map((link) => link.slug);

    const chartData = {
        labels,
        datasets: [
            {
                label: "Clicks",
                data: links.map((link) => link.visit_counter),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };
    return (
        <DashboardLayout>
            <div className="flex flex-col flex-grow flex-shrink p-8">
                <h2 className="text-orange-100 text-4xl font-bold mb-8">
                    Dashboard
                </h2>
                <div className="bg-orange-100 p-8 rounded-lg">
                    <Bar className="" options={options} data={chartData} />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
