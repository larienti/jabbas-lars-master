    function dataEndpoints() {
    fetch('/endpoints').then(data=>data.json()).then(d=>{
    d.endpoints.forEach(n=>{
        o = document.createElement("option")
        o.text = n
        document.getElementById('dataSelect').add(o)
    })
    updateData()
})
}

fetch('/charts').then(data=>data.json()).then(d=>{
    d.charts.forEach(n=>{
        o = document.createElement("option")
        o.text = n
        document.getElementById('chartSelect').add(o)
    })
    dataEndpoints()
})