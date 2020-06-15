// fetch("/movie_data").then(data=>data.json()).then(d=>{

// })

d3.json("http://127.0.0.1:5000/movie_data").then((data) => {
    console.log(data)
    var selector=d3.select('#selDataset');

    // for (var i=0; i<data.length; i++)
    var genre_list = []
    data.forEach((movie)=> {
        var genre = movie.genres;
        genre_list.push(genre)
    })
       
     
    var unique_genres = Array.from(new Set(genre_list))
    console.log(unique_genres)
    unique_genres.forEach((genre)=> {
        selector.append('option')
        .property('value', genre)
        .text(genre)
    })

buildChart(unique_genres[0]);

});



function buildChart(selection) {
    d3.json("http://127.0.0.1:5000/movie_data").then((data)=> {
        var filterSubject = data.filter(data => data.genres==selection)
        console.log(filterSubject)
       
        var country_list = []
        filterSubject.forEach((movie)=>{
            var country = movie.country
            country_list.push(country)
        
        });

        var country_dict = country_list.reduce((a,c)=> (a[c]=(a[c]||0)+1,a),Object.create(null));
        console.log(country_dict)
        var labels = Object.keys(country_dict)
        var values = Object.values(country_dict)
        console.log(values)

        var trace = {
            labels: labels, 
            values: values,
            type: "pie",
            text: labels, 
            textposition: "inside",
        };
        var layout = {
            //title: `${selection} Movies broken out by Country of Origin`,
            title:{
                text:`${selection} Movies broken out by Country of Origin`,
                font: {
                    family: 'Calibri',
                    size: 20
                },
                position: 'top'
            },
            showlegend: false

        };
        var data = [trace];
        Plotly.newPlot("pie", data, layout);

        var titles_list = []
        var ratings_list = []
        var colors = []
        filterSubject.forEach((movie)=> {
            var movie_title = movie.movie
            titles_list.push(movie_title)
            var imdb_rating = movie.rating
            ratings_list.push(imdb_rating)
            colors.push(`rgb(${255 * Math.random()},${255 * Math.random()},${255 * Math.random()})`)
        })
        var titles_list = titles_list.slice(0,25)
        var ratings_list = ratings_list.slice(0,25)
        var colors = colors.slice(0,25)
        console.log(titles_list)
      

        cnvs = document.createElement('canvas')
        cnvs.setAttribute('id','canvas_space')
        ctx = cnvs.getContext('2d')

        var barChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: titles_list,
                datasets: [{
                    label: 'Movie Titles',
                    data: ratings_list,
                    backgroundColor: '#2980B9' 
                }]
                },
                options: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text:`Top ${selection} Movies`,
                        position: 'top',
                        font: {
                            family: 'Calibri',
                            size: 20
                        }
                        //text: `Top ${selection} Movies`,

                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                //offsetGridLines: true
                                display: false
                            }
                            // ,
                            // ticks: {
                            //     minRotation:90
                            // }
                        }],
                        yAxes: [{
                            gridLines: {
                                display: false
                            }
                        }]
                    },
                    aspectRatio: 1.3,
                    // maintainAspectRatio: true
                    responsive: true
                }
        });
        document.getElementById('bar').innerHTML="";
        document.getElementById('bar').appendChild(cnvs);
    });
    
}



function optionChanged(selectedRating) {
    console.log(selectedRating);
    buildChart(selectedRating);
};
