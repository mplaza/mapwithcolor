app.directive('chart', [function() {

  return {
    restrict: 'AE',
    replace: 'true',
    scope: {
      mapDataset: '=dataset',
      targetCountry: '=',
      clickedCountry: '=',
      minDatasetValue: '=',
      maxDatasetValue: '='
    },
    link: link
  }

  function link(scope, element, attr) {

    var createChart = function() {
      d3.select("#chart").select("svg").remove();

      var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 550 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

      var x = d3.scale.linear()
          .range([0, width]);

      var y = d3.scale.linear()
          .range([height, 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .tickFormat(d3.format("d"));

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(6);

      var svg = d3.select("#chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


      var tip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function(d) {
            return "<strong>Frequency:</strong> <span style='color:red'>" + d.frequency + "</span>";
          });

      svg.call(tip);
     
      d3.json(scope.mapDataset.src, function(error, json) {

        // console.log(json);
        // for (var i = startingYear; i <= endingYear; i++) {
        //   var max = d3.max(data, function(d) {
        //     return d["year" + i.toString()];
        //   });
        //   if (max > maxValue) {
        //     maxValue = max;
        //   }
        // }

        for (var i = 0; i < json.length; i++) {
          if (json[i]["Country"] == scope.targetCountry) {
            dataset = json[i];
            console.log("found country");
          }
        }
        delete dataset.goal;
        delete dataset.targetset;
        delete dataset.Country;
        delete dataset.CountryCode;

        var xValues = [];
        var yValues = [];
        var data = [];
        
        var extrapolate = new EXTRAPOLATE.LINEAR();
        var dataCount = 0;

        for (var key in dataset) {
          var obj = dataset[key];
          data.push({year: parseInt(key.split("r")[1]), frequency: dataset[key], color: "rgba(178,34,34,0.7)"});
        }

        console.log(data);

        // BUILD EXTRAPOLATION MODEL
        // ONLY EXTRAPOLATE IF AT LEAST 3 DATAPOINTS
        for (var i = 0; i < data.length; i++) {
          if (data[i].frequency != null) {
            extrapolate.given(data[i].year).get(data[i].frequency);
            dataCount++;
          }
        }
        console.log(dataCount);

        if (dataCount >= 3) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].frequency == null) {
              data[i].frequency = Math.round(extrapolate.valueFor(data[i].year)*10)/10;
              data[i].color = "rgba(255,204,51,0.7)";
            }
          }
        }
        
        minMaxYears = (d3.extent(data, function(d) { return d.year; }));
        x.domain([minMaxYears[0]-2,minMaxYears[1]+2]);
        y.domain([scope.minDatasetValue, scope.maxDatasetValue]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("frequency");

        svg.selectAll(".bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.year) - 7; })
            .attr("width", 14)
            .attr("y", function(d) { return y(d.frequency); })
            .attr("height", function(d) { return height - y(d.frequency); })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
            .style("fill", function(d) {return d.color;} );

            // .on('mouseover', tip.show)
            // .on('mouseout', tip.hide);
      }); 
    }
    console.log(scope.mapDatasets);

    var targetCountryWatchCount = 0;
    scope.$watch('targetCountry', function(){
      if (targetCountryWatchCount > 0) {
        // change year loaded to map
        console.log("hello");
        createChart();
      }
      targetCountryWatchCount++;
    }, true);
    
  }
}]);
