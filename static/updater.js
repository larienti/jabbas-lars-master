
function updateData(){
    endpoint = $('#dataSelect').val()
    chartType = $('#chartSelect').val()
    points = $('#lengthInput').val()
    htmlList = []
    chartData = []
    colors = []
    cnvs = document.createElement("canvas")
    ctx = cnvs.getContext('2d')
    fetch(`/${endpoint}?length=${points}`).then(data=>data.json()).then(d=>{
        console.log(d);
        chartData=d.dataSetResults;
        d.dataSetResults.forEach(n=>{
            htmlList.push(`<b>Number:</b>${n}`);
            colors.push(`rgb(${255 * Math.random()},${255 * Math.random()},${255 * Math.random()})`)
    });
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: chartType,
    
        // The data for our dataset
        data: {
            labels: chartData,
            datasets: [{
                
                label: endpoint,
                backgroundColor: colors,
                borderColor: colors,
                data: chartData
            }]
        },
    
        // Configuration options go here
        options: {}
    });
    document.getElementById('onlydiv').innerHTML=htmlList.join("<br>");
    document.getElementById('secondDiv').innerHTML=""
    document.getElementById('secondDiv').appendChild(cnvs);
})
}