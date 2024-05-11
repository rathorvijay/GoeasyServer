import React, { useState } from 'react'

import {Chart, registerables} from "chart.js"
import {Pie} from "react-chartjs-2"

Chart.register(...registerables);

const InstructorChart = ({services}) => {

    const [currChart, setCurrChart] = useState("customers");

    //functio to genertae random colors
    const getRandomColors = (numColors) => {
        const colors = [];
        for(let i=0; i<numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random()*256)},
            ${Math.floor(Math.random()*256)})`
            colors.push(color);
        }
        return colors;
    }

    //create data for chart displaying student info

    const chartDataForStudents = {
        labels: services.map((service)=> service.serviceName),
        datasets: [
            {
                data: services.map((service)=> service.totalCustomerEnrolled),
                backgroundColor: getRandomColors(services.length),
            }
        ]
    }


    //create data for chart displaying iincome info
    const chartDataForIncome = {
        labels:services.map((service)=> service.serviceName),
        datasets: [
            {
                data: services.map((service)=> service.totalAmountGenerated),
                backgroundColor: getRandomColors(services.length),
            }
        ]
    }


    //create options
    const options = {

    };


  return (
    <div className=' bg-richblack-500 p-5 w-full h-250'>
      <p className='font-bold'>Visualise</p>
      <div className='flex gap-x-5'>
        <button className='hover:text-yellow-25'
        onClick={() => setCurrChart("students")}
        >
            Customer
        </button>

        <button className='hover:text-yellow-25'
        onClick={() => setCurrChart("income")}
        >
            Income
        </button>
      </div>
      <div className='flex justify-center w-[300px] items-center m-auto'>
        <Pie 
            data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
            options={options}
        />
      </div>
    </div>
  )
}

export default InstructorChart
