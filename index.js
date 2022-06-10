const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [{
        label: 'Spending - Last 7 days',
        barPercentage: 0.5,
        barThickness: 100,
        maxBarThickness: 100,
        minBarLength: 2,
        data: [10, 20, 30, 40, 50, 60, 70],
        backgroundColor: 'rgb(236, 117, 93)',
        pointHoverRadius: 5,
        hoverBackgroundColor: 'rgb(118, 181, 188)'
    }]
}

//config
const config = {
    type: 'bar',
    data,
    options: {
        scaleShowVerticalLines: false,
      scales: {
        y: {
          display: false,
          grid: {
            drawBorder: false, // <-- this removes y-axis line
            }
        },
        x: {
            grid: {
              display: false // Removes Vertical x-axis line
            }
          }
      }
    },
  };

  const myChart = new Chart(
      document.getElementById('myChart'),
      config
  );

async function fetchData() {
    const dataUrl = 'http://127.0.0.1:5500/data.json';
    const response = await fetch(dataUrl);
    const datapoints = await response.json();
    return datapoints;
};

fetchData().then(datapoints => {
    const day = datapoints.map(
        function(index){
            return index.day;
    });
    console.log(day);
    myChart.config.data.labels = day;
    myChart.update();

    const amount = datapoints.map(
        function(index){
            return index.amount;
    });
    console.log(amount);
    myChart.config.data.datasets[0].data = amount;
    myChart.update();
});