var app = angular.module('myApp', ['ngResource', 'vr.directives.slider'])
.config(
    ['$httpProvider', function($httpProvider) {
    var authToken = angular.element("meta[name=\"csrf-token\"]").attr("content");
    var defaults = $httpProvider.defaults.headers;

    defaults.common["X-CSRF-TOKEN"] = authToken;
    defaults.patch = defaults.patch || {};
    defaults.patch['Content-Type'] = 'application/json';
    defaults.common['Accept'] = 'application/json';
}]);

// app.factory('Dataset', ['$resource', function($resource) {
//   return $resource('/fulldataset/1aa/povertyindicatorone',
//     {},
//      {update: { method: 'PATCH'}});
// }]);




app.controller('MainCtrl', ['$scope', '$timeout', function($scope, $timeout) {
  console.log('hey there');
  $scope.cx = "5";
  $scope.circles=[5,10,15,20,25];
  $scope.datasets = [
  	{name:"Select MDG Goal", src:''},
  	{name:'Population Below $1 a day', src:'/fulldatasets/1aa.json', color: 'red', dataType: '%'},
    {name:'Poverty Gap Ratio at $1 a day', src:'/fulldatasets/1ab.json', color: 'red', dataType: '%'},
    {name:"Poorest Quintile's Share in National Income", src:'/fulldatasets/1ac.json', color: 'red', dataType: '%'},
    {name:'Growth Rate of GDP per Employed Person', src:'/fulldatasets/1ba.json', color: 'green', dataType: '%'},
    {name:'Employment to Population Ratio', src:'/fulldatasets/1bb.json', color: 'green', dataType: '%'},
    {name:'Proportion of Employed People Below Poverty Line', src:'/fulldatasets/1bc.json', color: 'red', dataType: '%'},
    {name:'Proportion of Own Account and Contributing Family Workers in Total Employment', src:'/fulldatasets/1bd.json', color: 'green', dataType: '%'},
  	{name:'Children Under 5 Moderately or Severly Underweight', src:'/fulldatasets/1ca.json', color: 'red', dataType: '%'},
    {name:'Population Undernourished', src:'/fulldatasets/1cb.json', color: 'red', dataType: '%'},
    {name:'Total Net Enrolment Ratio in Primary Education', src:'fulldatasets/2aa.json', color: 'green', dataType: '%'},
    {name:'Pupils Starting Grade 1 who Reach Last Grade of Primary', src:'fulldatasets/2ab.json', color: 'green', dataType: '%'},
    {name:'Literacy Rates of 15-24 year olds', src:'fulldatasets/2ac.json', color: 'green', dataType: '%'},
    {name:'Gender Parity Index in Primary Level Enrollment', src:'/fulldatasets/3aa.json', color: 'green', dataType: ''},
    {name:'Gender Parity Index in Secondary Level Enrollment', src:'/fulldatasets/3ab.json', color: 'green', dataType: ''},
    {name:'Gender Parity Index in Tertiary Level Enrollment', src:'/fulldatasets/3ac.json', color: 'green', dataType: '%'},
    {name:'Share of Women in Wage Employment in the Non-Agricultural Secrot', src:'/fulldatasets/3ad.json', color: 'green', dataType: '%'},
    {name:'Seats Held By Women in National Parliament', src:'/fulldatasets/3ae.json', color: 'green', dataType: '%'},
    {name:'Children Under 5 Mortality per 1,000 Live Births', src:'/fulldatasets/4aa.json', color: 'red', dataType: ''},
    {name:'Infant (0-1) Mortality per 1,000 Live Births', src:'/fulldatasets/4ab.json', color: 'red', dataType: ''},
    {name:'Children 1 Year Old Immunizated Against Measles', src:'/fulldatasets/4ac.json', color: 'green', dataType: '%'},
    {name:'Maternal Mortality Ratio Per 100,000 Live Births', src:'/fulldatasets/5aa.json', color: 'red', dataType: ''},
    {name:'Births Attended By Skilled Health Personell', src:'/fulldatasets/5ab.json', color: 'green', dataType: '%'},
    {name:'Contraceptive Use Among Married Women 15-49 Years Old', src:'/fulldatasets/5ba.json', color: 'green', dataType: '%'},
    {name:'Adolescent Birth Rate per 1,000 Women', src:'/fulldatasets/5bb.json', color: 'red', dataType: ''},
    {name:'Antenatal care coverage (at least one visit)', src:'/fulldatasets/5bc.json', color: 'green', dataType: '%'},
    {name:'Antenatal care coverage (at least four visits)', src:'/fulldatasets/5bd.json', color: 'red', dataType: '%'},
    {name:'Unmet need for family planning', src:'/fulldatasets/5be.json', color: 'red', dataType: '%'},
    {name:'HIV prevalence among population aged 15-24 years', src:'/fulldatasets/6aa.json', color: 'red', dataType: '%'},
    {name:'Condom use at last high-risk sex (women)', src:'/fulldatasets/6ab.json', color: 'red', dataType: '%'},
    {name:'Condom use at last high-risk sex (men)', src:'/fulldatasets/6ac.json', color: 'red', dataType: '%'},
    {name:'Population aged 15-24 years with comprehensive knowledge of HIV/AIDS (Men)', src:'/fulldatasets/6ad.json', color: 'red', dataType: '%'},
    {name:'Population aged 15-24 years with comprehensive knowledge of HIV/AIDS (Women)', src:'/fulldatasets/6ae.json', color: 'red', dataType: '%'},
    {name:'Ratio of school attendance of orphans to school attendance of non-orphans aged 10-14 years', src:'/fulldatasets/6af.json', color: 'red', dataType: '%'},
    {name:'Proportion of population with advanced HIV infection with access to antiretroviral drugs', src:'/fulldatasets/6ba.json', color: 'red', dataType: '%'},
    {name:'Notified cases of malaria per 100,000 population', src:'/fulldatasets/6ca.json', color: 'red', dataType: '%'},
    {name:'Notified cases of malaria per 100,000 population', src:'/fulldatasets/6ca.json', color: 'red', dataType: '%'},



    ];

  $scope.targetDataset = $scope.datasets[0];
  $scope.startingYear = null;
  $scope.endingYear = null;
  $scope.extrapolationToggle = false;
  $scope.buttonText = "Play";

  $scope.play = function() {
    console.log("play");
    if ($scope.buttonText == "Play") {
      $scope.buttonText = "Pause";
      $scope.year = $scope.startingYear;
      var count = 0;
      $scope.currentTimeout = $timeout($scope.setDelay, 100);
    }
    else if ($scope.buttonText == "Pause") {
      $timeout.cancel($scope.currentTimeout);
      $scope.buttonText = "Play";
    }
  };
   
  $scope.setDelay = function(count) {
    $scope.year++;
    if ($scope.year <= $scope.endingYear) {
      $scope.currentTimeout = $timeout($scope.setDelay, 100);
    }
    else {
       $scope.buttonText = "Play";
    }
  };

  $scope.$watch('extrapolationToggle', function(){
    // change year loaded to map
    console.log("hello");
    $scope.buttonText = "Play";
    $timeout.cancel($scope.currentTimeout);
  }, true);

  $scope.$watch('targetDataset', function(){
    // change year loaded to map
    console.log("hello");
    $scope.buttonText = "Play";
    $timeout.cancel($scope.currentTimeout);
  }, true);
   


}])

app.directive('map', [function(Dataset) {

  return {
    restrict: 'AE',
    replace: 'true',
    scope: {
      mapData: '=data',
      mapYear: '=year',
      mapDataset: '=dataset',
      zoomCountry: '=country',
      myStartyear: '=',
      myEndyear: '=',
      extrapolationToggle: '='
    },
    link: link
  }

  function link(scope, element, attr) {
    scope.$broadcast('refreshSlider');

    // map display area on page
    var m_width = $("#map").width(),
      width = 938,
      height = 500;

    // displays map as mercator projection
    var projection = d3.geo.mercator()
      .scale(150)
      .translate([width / 2, height / 1.7]);

    var path = d3.geo.path()
      .projection(projection);

    var data;
    var g, svg;

    // CREATE AN EMPTY MAP
    var createMap = function () {
      //bring in topojson-- from natural earth data, Medium scale data, 1:50m, without Antartica
      d3.json("/countries.topo.json", function(error, json) {
     
        svg = d3.select("#map").append("svg")
          .attr("preserveAspectRatio", "xMidYMid")
          .attr("viewBox", "0 0 " + width + " " + height)
          .attr("width", m_width)
          .attr("height", m_width * height / width);

        svg.append("defs")
          .append('pattern')
          .attr('id', 'no_data')
          .attr('patternUnits', 'userSpaceOnUse')
          .attr('width', 6)
          .attr('height', 6)
          .append("image")
          .attr("xlink:href", "/greystripes.png")
          .attr('width', 6)
          .attr('height', 6);

        g = svg.append("g")
          .attr("id", "countries")
          .style("fill", "white")
          .selectAll("path")
          .data(topojson.feature(json, json.objects.countries).features)
          .enter()
          .append("path")
          .attr("id", function(d,i){return d.properties.name;} )
          .attr("d", path)

        if (error) return console.error(error);

        // BUILD EMPTY LEGEND
        var color_domain = [50, 150, 350, 500, 750];
        var ext_color_domain = [0, 50, 150, 350, 500, 750];
        var legend_labels = [];            
        var color = d3.scale.threshold()
          .domain(color_domain)
          .range(["url(#no_data)", "rgba(255,0,0,0.2)", "rgba(255,0,0,0.4)", "rgba(255,0,0,0.6)", "rgba(255,0,0,0.8)", "rgba(255,0,0,1)"]);

        var legend = svg.selectAll("g.legend")
          .data(ext_color_domain)
          .enter().append("g")
          .attr("class", "legend");

        var ls_w = 30, ls_h = 18;

        legend.append("rect")
          .attr("x", 20)
          .attr("y", function(d, i){ return height - (i*ls_h) - 2*ls_h;})
          .attr("width", ls_w)
          .attr("height", ls_h)
          .style("fill", "white");

        legend.append("text")
          .attr("x", 55)
          .attr("y", function(d, i){ return height - (i*ls_h) - ls_h - 4;});

      })
    }
    
    // LOAD MAP DATASET

    var loadDataset = function() {
      var dataColor;
      color = scope.mapDataset.color;
      dataType = scope.mapDataset.dataType;
      console.log(color);


      // Dataset.query(function(dataset){
      //   scope.targetDataset = dataset;
      //   // console.log(scope.targetDataset);
      // })

      console.log("src: " + scope.mapDataset.src);
      d3.json(scope.mapDataset.src, function(error, json) {

        if (error) return console.warn(error);
        data = json;

        
        var numOfPrecedingJson = 4;
        var startingYear = parseFloat(Object.keys(data[1])[numOfPrecedingJson].split("r")[1]);
        // console.log(startingYear);
        // will need to subtract more than 3 when add other data into json
        var numberOfYears = parseFloat(Object.keys(data[1]).length - numOfPrecedingJson);
        var endingYear = parseFloat(Object.keys(data[1])[numOfPrecedingJson + numberOfYears - 1].split("r")[1]);
        console.log(endingYear);
        scope.myStartyear = startingYear;
        scope.myEndyear = endingYear;
        scope.mapYear = startingYear;
    
        scope.$apply();
       

        var maxValue = 0;

        for (var i = startingYear; i <= endingYear; i++) {
          var max = d3.max(data, function(d) {
            return d["year" + i.toString()];
          });
          if (max > maxValue) {
            maxValue = max;
          }
        }
  
        // TAKING COUNTRY TOPO DATA AND ADDING MDG DATA TO IT
        d3.json("/countries.topo.json", function(error, json) {
          if (error) {
            console.log(error);
          } else {
            // LOOP THROUGH COUNTRIES
            for (var i = 0; i < data.length; i++) {

              //state name
              var dataState = data[i]["Country"];


              //convert value from string to float
              var dataValue = data[i];

              //find corresponding country inside the GeoJSON
              for (var j = 0; j < json.objects.countries.geometries.length; j++) {
                var jsonState = json.objects.countries.geometries[j].properties.name;
   
                if (dataState === jsonState) {
                  var extrapolate = new EXTRAPOLATE.LINEAR();
                  var dataCount = 0;
                  

                  // BUILD EXTRAPOLATION MODEL
                  // ONLY EXTRAPOLATE IF AT LEAST 3 DATAPOINTS
                  if (scope.extrapolationToggle) {
                    for (var k = startingYear; k <= endingYear; k++) {
                      var valueYear = "year" + k.toString();
                      if (dataValue[valueYear] != null) {
                        extrapolate.given(k).get(dataValue[valueYear]);
                        dataCount++;
                      }
                    }
                  }


                  //add values for each year from the MDG Data into the properties of countries in the topojson
                  for (var l = startingYear; l <= endingYear; l++) { 
                    var valueYear = "year" + l.toString();
                    if (dataValue[valueYear] == null && dataCount >= 3) {
                      json.objects.countries.geometries[j].properties[valueYear] = Math.round(extrapolate.valueFor(l)*10)/10;
                      // console.log(extrapolate.valueFor(l));         
                    } else {
                      json.objects.countries.geometries[j].properties[valueYear] = dataValue[valueYear];  
                    }
                  }
                  
                }
              }
            }
            // console.log(json.objects.countries);

            // console.log(json.objects.countries);

            // SET COLOR
            console.log('this is the color' + scope.mapDataset.color);
            if (scope.mapDataset.color == 'green') {
              dataColor = "rgba(0,100,0,";
                console.log("green set");
            } else if (scope.mapDataset.color == 'red') {
              console.log('red set');
              dataColor = "rgba(178,34,34,"; 
            }
            
              // json.objects.countries.geometries[j].properties[valueYear] = dataValue[valueYear];
          }
          

          if (error) return console.error(error);

          // update the paths created when the map was made to be colored and interactable based on new json data
          d3.selectAll("path")
            .data(topojson.feature(json, json.objects.countries).features)
            .attr("id", function(d,i){return d.properties.name;} )
            .attr("d", path)
            .on("click", country_clicked)
            .on("mouseover", mouseOver) 
            .on("mousemove", mouseMove)
            .on("mouseout", mouseOut)
            .style("fill", function(d) {
              //Data value
              var value = d.properties["year"+startingYear.toString()]; 
              if(value) {
                console.log(dataColor +  (value/maxValue) + ")");
                return dataColor +  (value/maxValue) + ")";
              } else {
                return "url(#no_data)";
              }
            });


          // MAP COLOR SCALE LEGEND
          var color_domain = [50, 150, 350, 500, 750];
          var ext_color_domain = [0, 50, 150, 350, 500, 750];
          var legend_labels = ["No Data", (Math.round(maxValue*10/5)/10).toString() + dataType, (Math.round(maxValue*2*10/5)/10).toString() + dataType, (Math.round(maxValue*3*10/5)/10).toString() + dataType, (Math.round(maxValue*4*10/5)/10).toString() + dataType, (Math.round(maxValue*10)/10).toString() + dataType];             
          var color = d3.scale.threshold()
            .domain(color_domain)
            .range(["url(#no_data)", dataColor + "0.2)", dataColor +"0.4)", dataColor + "0.6)", dataColor + "0.8)", dataColor + "1)"]);

          d3.selectAll("rect")
            .style("fill", function(d, i) { return color(d); });

          d3.selectAll("text")
            .text(function(d, i){ return legend_labels[i]; });

          //update the country fills when the slider changes the year being viewed
          scope.updateMap = function() {
            d3.selectAll("path")
              .data(topojson.feature(json, json.objects.countries).features)
              // .transition()
              .style("fill", function(d) {
              //Data value
              var value = d.properties["year" + scope.mapYear]; 
              var thisYear = parseInt(scope.mapYear);

              //for incomplete datasets, leave the fill of previous years until new data available
              var nextValue = null;
              var lastValue = null;
              var i;
              var j;
              var timeDifference;

              // FIND NEXT VALUE IN A DATASET WHEN NULL VALUES EXIST
              // for(i = thisYear; i <= endingYear; i++ ){
              //   var nextYearsValue = d.properties[(i.toString())];
              //   if(nextYearsValue != null) {
              //     nextValue = nextYearsValue;
              //     break;
              //   }
              // }
              // for(j = thisYear; j >= startingYear; j-- ){
              //   var lastYearsValue = d.properties[(j.toString())];
              //   if(lastYearsValue != null) {
              //     lastValue = lastYearsValue;
              //     timeDifference = i - j;
              //     break;
              //   }
              // }
              if(value) {
                return dataColor +  (value/maxValue) + ")";
              } 
              else {
                if(nextValue && lastValue) {
                  var interpolatedValue = lastValue + ((thisYear - j) * ((nextValue - lastValue) / timeDifference));
                  return dataColor +  (interpolatedValue/maxValue) + ")";
                } else {
                  return "url(#no_data)";  
                }
              }

            });
          };

          //add the tooptip to see country data when the mouse is over it
          var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 1e-6);


          //make the tooptip visible on mouseover
          function mouseOver(d) {
            div.transition()
            .duration(200)
            .style("opacity", 1);
          }

          // display country name and data when the mouse is hovering over it
          function mouseMove(d) {
         
            var dataString;

            if (d.properties["year" + scope.mapYear]) {
              dataString = d.properties["year" + scope.mapYear] + dataType;
            } else {
              dataString = "No Data";
            }

            div
              .html(d.properties.name + "<br/>" + dataString)
              .style("left", (d3.event.pageX + 10) + "px")
              .style("top", (d3.event.pageY - 20) + "px");
          }

          //make the tooltip invisible when the mouse isn't over a country
          function mouseOut(d) {
            div.transition()
              .duration(200)
              .style("opacity", 1e-6);
          }

          //change the map so one country is zoomed in on
          function zoom(xyz) {
            d3.select('g')
              .attr("transform", "translate(" + projection.translate() + ")scale(" + xyz[2] + ")translate(-" + xyz[0] + ",-" + xyz[1] + ")");
          }

          //find the point to zoom in on for the selected country
          scope.get_xyz = function(d) {
            var bounds = path.bounds(d);

            var w_scale = (bounds[1][0] - bounds[0][0]) / width;
            var h_scale = (bounds[1][1] - bounds[0][1]) / height;
            var z = .96 / Math.max(w_scale, h_scale);
            var x = (bounds[1][0] + bounds[0][0]) / 2;
            var y = (bounds[1][1] + bounds[0][1]) / 2 + (height / z / 6);
            return [x, y, z];
          }

          //zoom in on a country when it's clicked and then back out when it's clicked again
          var country = null;
          function country_clicked(d) {
           if(country) {
              $(this).css({"stroke": "grey"});
            }

            if(d && country !== d) {
              var xyz = scope.get_xyz(d);
              country = d;
              zoom(xyz); 
              $(this).css({"stroke":"black"});
              $(this).css({"stroke-linejoin":"round"});
              $(this).css({"stroke-linecap":"round"}); 
            } else {
              var xyz = [width / 2, height / 1.5, 1];
              country = null;
              zoom(xyz);          
            }
          };

          //zoom on country when it's name is typed in and then out when it's not a match anymore
          scope.zoomOnCountry = function(p) {
            for (var j = 0; j < json.objects.countries.geometries.length; j++) {
              var jsonState = json.objects.countries.geometries[j].properties.name;
              if(country) {
                if (jsonState.toLowerCase() !== p.toLowerCase()) {
                  var xyz = [width / 2, height / 1.5, 1];
                  country = null;
                  zoom(xyz);
                }
              }
              if(jsonState.toLowerCase() === p.toLowerCase()) {
                var d = topojson.feature(json, json.objects.countries).features[j];
                var value = d.properties[scope.mapYear];
                var HIVColor = "url(#no_data)";
                var HIVOppositeColor = "url(#no_data)";
                if(value) {
                  HIVColor =  "rgba(255,0,0," +  (value/maxValue) + ")";
                };

                if(value) {
                  HIVOppositeColor = "rgba(0,255,0," +  (value/maxValue) + ")";
                };

                if (country) {
                  $(this).css({"fill": HIVColor });
                  $(this).css({"stroke": "grey"});
                }
                if (d && country !== d) {
                  var xyz = scope.get_xyz(d);
                  zoom(xyz); 
                  country = d;
                  // $(this).css({"fill": HIVOppositeColor});
                  $(this).css({"stroke":"grey"});
                  $(this).css({"stroke-linejoin":"round"});
                  $(this).css({"stroke-linecap":"round"}); 
                  div.text(value + "%");
                } else {
                  var xyz = [width / 2, height / 1.5, 1];
                  country = null;
                  zoom(xyz);
                };
                break;
              };
            };
          };

        // END TAKING COUNTRY TOPO DATA AND ADDING MDG DATA TO IT
        })
      // END LOAD MAP DATASET
      });
    }


    // WATCHERS    
    scope.$watch('mapYear', function(){
      // change year loaded to map
      scope.updateMap();
    }, true); 

    var mapDatasetWatchCount = 0;
    scope.$watch('mapDataset', function(){
      if (mapDatasetWatchCount > 0) {
        // change year loaded to map
        loadDataset();
      }
      mapDatasetWatchCount++;
    }, true);

    scope.$watch('zoomCountry', function(){
      // change year loaded to map
      scope.zoomOnCountry(scope.zoomCountry);
    }, true);

    scope.$watch('extrapolationToggle', function(){
      // change year loaded to map
      loadDataset();
    }, true);

    // scope.$watch(function() {
    //   return angular.element($window)[0].innerWidth;
    // }, function() {
    //   console.log("resized!");
    // });


    // CALL FUNCTIONS HERE
    createMap();
   

  // END LINK FUNCTION
  };

// END DIRECTIVE
}])

