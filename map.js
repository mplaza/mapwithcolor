app.directive('map', function() {
  return {
    restrict: 'AE',
      replace: 'true',
      scope: {
        mapData: '=data',
        mapYear: '=year',
        mapDataset: '=dataset',
        zoomCountry: '=country'
      },
      link: link
    }

  function link(scope, element, attr) {

    // map display area on page
    var m_width = $("#map").width(),
      width = 938,
      height = 600;

    // displays map as mercator projection
    var projection = d3.geo.mercator()
      .scale(150)
      .translate([width / 2, height / 1.5]);

    var path = d3.geo.path()
      .projection(projection);

    var data;
    var g, svg;

    // CREATE AN EMPTY MAP
    var createMap = function () {
      //bring in topojson-- from natural earth data, Medium scale data, 1:50m, without Antartica
      d3.json("countries.topo.json", function(error, json) {
     
        svg = d3.select("#map").append("svg")
          .attr("preserveAspectRatio", "xMidYMid")
          .attr("viewBox", "0 0 " + width + " " + height)
          .attr("width", m_width)
          .attr("height", m_width * height / width);

        svg.append("defs")
          .append('pattern')
          .attr('id', 'no_data')
          .attr('patternUnits', 'userSpaceOnUse')
          .attr('width', 100)
          .attr('height', 75)
          .append("image")
          .attr("xlink:href", "graystripes.gif")
          .attr('width', 100)
          .attr('height', 75);

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

      })
    }
    
    // LOAD MAP DATASET
    var loadDataset = function() {
      d3.json(scope.mapDataset.src, function(error, json) {
        if (error) return console.warn(error);
        data = json;
   
        var startingYear = parseFloat(Object.keys(data[0])[0]);
        var numberOfYears = parseFloat(Object.keys(data[0]).length - 3);
        var endingYear = parseFloat(Object.keys(data[0])[numberOfYears]);

        var maxValue = 0;
        for (var i = startingYear; i <= endingYear; i++) {
          var max = d3.max(data, function(d) {
            return d[i.toString()];
          });
          if (max > maxValue) {
            maxValue = max;
          }
        }
  
      // TAKING COUNTRY TOPO DATA AND ADDING MDG DATA TO IT
        d3.json("countries.topo.json", function(error, json) {

          if (error) {
            console.log(error);
          } else {
            for (var i = 0; i < data.length; i++) {

              //state name
              var dataState = data[i]["Country"];

              //convert value from string to float
              var dataValue = data[i];

              //find corresponding country inside the GeoJSON
              for (var j = 0; j < json.objects.countries.geometries.length; j++) {
                var jsonState = json.objects.countries.geometries[j].properties.name;

               
                if (dataState === jsonState) {
                  //add values for each year from the MDG Data into the properties of countries in the topojson
                  for (var k = startingYear; k <= endingYear; k++) {
                    var valueYear = k.toString();
                    json.objects.countries.geometries[j].properties[valueYear] = dataValue[valueYear];
                    
                  }
                  
                }
              }
            }
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
              var value = d.properties[startingYear.toString()]; 
              if(value) {
                return "rgba(255,0,0," +  (value/maxValue) + ")";
              } else {
                return "url(#no_data)";
              }
            });

          //update the country fills when the slider changes the year being viewed
          scope.updateMap = function() {
            d3.selectAll("path")
              .data(topojson.feature(json, json.objects.countries).features)
              .style("fill", function(d) {
              //Data value
              var value = d.properties[scope.mapYear]; 
              var thisYear = parseInt(scope.mapYear);
              //for incomplete datasets, leave the fill of previous years until new data available
              var prevValue = null;
              for(var i=thisYear; i>startingYear; i-=1){
                prevYearsValue = d.properties[(i.toString())];
                if(prevYearsValue != null){
                  prevValue = prevYearsValue;
                  break;
                }
              }
              if(value) {
                return "rgba(255,0,0," +  (value/maxValue) + ")";
              } 
              else {
                if(prevValue){
                  return "rgba(255,0,0," +  (prevValue/maxValue) + ")";
                }
                else
                  return "url(#no_data)";
                
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

            if (d.properties[scope.mapYear]) {
              dataString = d.properties[scope.mapYear] + "%";
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
            console.log(p);
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
      scope.updateMap(scope.mapYear);
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


    // CALL FUNCTIONS HERE
    createMap();
   

  // END LINK FUNCTION
  };

// END DIRECTIVE
})