d3.json("http://127.0.0.1:5000/movie_data").then((data) => {
    console.log(data);
    var tbody = d3.select("tbody");

    data.forEach(function(movies) {
        var row = tbody.append("tr");
        Object.entries(movies).forEach(function([key, value]) 
        {
            var cell = row.append("td");
            cell.text(value);
            })
        });
    });



var button = d3.select("#filter-btn");

function PressButton()
    {
    d3.event.preventDefault();
    tableData = d3.json("http://127.0.0.1:5000/movie_data").then((data) => {
        console.log(`promiseResult ${data}`);
    
        var inputTitle = d3.select("#title").property("value");
        var inputGenre = d3.select("#genre").property("value").charAt(0).toUpperCase();
        var inputYear = d3.select("#year").property("value").charAt(0).toUpperCase();
        var inputRating = d3.select("#rating").property("value");
        var inputDirector = d3.select("#director").property("value").charAt(0).toUpperCase();

        let inputValues = [
            [inputTitle, 'movie'],
            [inputGenre, 'genres'],
            [inputYear, 'year'],
            [inputRating, 'rating'],
            [inputDirector, 'director']
        ];

        // make a copy of the table to do the filter on
       // let filteredInfo = [];

        // loop through the inputs and filter each one that is given
      //  inputValues.forEach(i => {
            // check for not an empty string
           // if (i[0].length) {
                // apply filter
             //   filteredInfo.push = (data).filter(info => info[i[1]] === i[0]);
          //  }
     //   }); 
        filteredInfo = [];

        Object.entries(inputValues).forEach((k)=>{
            console.log(k[1][1], k[1][0])
            filteredInfo.push(data[data.findIndex(s => s[k[1][1]] == k[1][0])])
        });

        // console.log(d3.event.target);
        console.log(filteredInfo);

        var tbody = d3.select("tbody");

        d3.select("tbody").html("");

        filteredInfo.forEach(function(filtered)
            {
                console.log(filtered);
                var row = tbody.append("tr");
                Object.entries(filtered).forEach(function([key, value])
                    {
                        console.log(key, value);
                        var cell = row.append("td");
                        cell.text(value);
                    });
            });
        });
    };

    
button.on("click", PressButton)