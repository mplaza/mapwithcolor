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
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(6);

      var svg = d3.select("#chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      console.log("createChart");
     
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

        for (var key in dataset) {
          var obj = dataset[key];
          data.push({year: parseInt(key.split("r")[1]), frequency: dataset[key]});
        }

        x.domain(d3.extent(data, function(d) { return d.year; }));
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
            .text("Frequency");

        svg.selectAll(".bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.year) - 7; })
            .attr("width", 14)
            .attr("y", function(d) { return y(d.frequency); })
            .attr("height", function(d) { return height - y(d.frequency); });
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
