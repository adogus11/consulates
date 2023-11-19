const printCharts = () => {
    rendermodelschart(),
    workgraph()
}

const rendermodelschart = () => {

    const data = {
        labels: ['California', 'Texas','Arizona', 'Florida', 'Otros'],
        datasets: [{
            data: [10, 11, 5, 2, 21],
            bordercolor: ['red', 'green', 'blue', 'brown', 'yellow'],
            backgroundcolor: ['green', 'blue', 'red', 'yellow', 'brown']
        }]
    }
    new Chart('Chart1',{type: 'doughnut',data, options: {
        responsive: true,
        maintainAspectRatio: false,
        width: 200,
        height: 200
    }

})
}

const workgraph = () => {

    const data = {
        labels: ['Agricultura', 'Construcción','Hoteleria y recreación', 'Minería', 'Servicios Generales'],
        datasets: [{
            data: [30.1, 19.5 ,14.5 ,6.3, 5.6],
            bordercolor: ['red', 'green', 'blue', 'brown', 'yellow'],
            backgroundcolor: ['green', 'blue', 'red', 'yellow', 'brown']
        }]
    }
    new Chart('Chart2',{type: 'polarArea',data, options: {
        responsive: true,
        maintainAspectRatio: false,
        width: 200,
        height: 200
    }

})
}

printCharts()