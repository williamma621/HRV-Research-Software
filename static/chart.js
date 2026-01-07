const CHART_MAX_POINTS = 121
const CHART_CONTAINER_WIDTH = chartContainer.clientWidth;
const WIDTH_PER_POINT = CHART_CONTAINER_WIDTH / CHART_MAX_POINTS
const chartData = {
    labels: Array.from({ length: CHART_MAX_POINTS}, (_, i) => i),
    datasets: [{
        label: "RMSSD",
        data: [],
        borderWidth: 2,
        borderColor: '#3498db',
        tension: 0.3,
        pointRadius: 0
    }]
};

const chart = new Chart(document.getElementById("rmssd-chart"), {
    type: "line",
    data: chartData,
    options: { animation: false, responsive: false, maintainAspectRatio: false,
        scales: {
            x: { title: { display: true, text: 'Time (seconds)'} },
            y: { title: { display: true, text: 'RMSSD (ms)'}, min:0, max:100} },
        plugins: { legend: { display: false } }
    }});

function updateGraph(){
    if (appState.isRecording && !appState.isPaused){
        updateGraphInterval = setInterval(function () {
            const rmssd = rr_record.at(-1)['rmssd'];
            if (rmssd) { 
                chartData.datasets[0].data.push(rmssd);
                liveValue.innerText = Math.round(rmssd);
                let num_points = chartData.datasets[0].data.length;
                if (num_points > CHART_MAX_POINTS){
                    chartData.labels.push(num_points-1)
                    chartContainer.style.width = num_points * WIDTH_PER_POINT + 'px';
                    chart.canvas.style.width = num_points * WIDTH_PER_POINT + 'px';
                    chart.resize();
                    scrollContainer.scrollLeft = scrollContainer.scrollWidth;
                }
                chart.update();
            }
        }, 1000)
    }
    else {
        clearInterval(updateGraphInterval);
    }
}