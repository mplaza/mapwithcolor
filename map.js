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
    
    var m_width = $("#map").width(),
      width = 938,
      height = 500,
      country,
      state;

    var projection = d3.geo.mercator()
      .scale(150)
      .translate([width / 2, height / 1.5]);

    var path = d3.geo.path()
      .projection(projection);

    var data;

    console.log(scope.mapDataset.src);

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
      console.log(maxValue);
  

      d3.json("countries.topo.json", function(error, json) {
        // for (var i = 0; i < json.objects.countries.geometries.length; i++) {
        //   console.log(json.objects.countries.geometries[i].properties.name);
        // }
        
        // for (var i = 0; i < data.length; i++) {
        //   console.log(data[i]["Country"]);
        // }

        if (error) {
          console.log(error);
        } else {
          for (var i = 0; i < data.length; i++) {

            //State name
            var dataState = data[i]["Country"];

            // console.log(dataState);
            //convert value from string to float
            var dataValue = data[i];
            // console.log(dataValue);

            //Corresponding country inside the GeoJSON
            for (var j = 0; j < json.objects.countries.geometries.length; j++) {
              var jsonState = json.objects.countries.geometries[j].properties.name;

              // console.log('test');
             
              if (dataState === jsonState) {
                //Copy the data value into the JSON
                // console.log('test');
                for (var k = startingYear; k <= endingYear; k++) {
                  var valueYear = k.toString();
                  json.objects.countries.geometries[j].properties[valueYear] = dataValue[valueYear];
                  
                  //Stop looking through the JSON
                  // break;
                }
                
              }
            }
          }
        }
       


        var svg = d3.select("#map").append("svg")
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

        var g = svg.append("g");

        // d3.json("countries.topo.json", function(error, us) {
        if (error) return console.error(error);

        g.append("g")
          .attr("id", "countries")
          .selectAll("path")
          .data(topojson.feature(json, json.objects.countries).features)
          .enter()
          .append("path")
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

            // if (value) {
            //         //If value exists…
            //         return color(value);
            // } else {
            //         //If value is undefined…
            //         return "grey";
            // }
          });



 scope.updateMap = function() {
      g.selectAll("path")
          .data(topojson.feature(json, json.objects.countries).features)
        
          .style("fill", function(d) {
            //Data value
            var value = d.properties[scope.mapYear]; 
            if(value) {
              return "rgba(255,0,0," +  (value/maxValue) + ")";
            } else {
              return "url(#no_data)";
            }

            // if (value) {
            //         //If value exists…
            //         return color(value);
            // } else {
            //         //If value is undefined…
            //         return "grey";
            // }
          });
 
    };




        var div = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 1e-6);

        function mouseOver(d) {
          var value = d.properties[scope.mapYear];
          var HIVOppositeColor;

          if(value) {
            HIVOppositeColor =  "rgba(0,255,0," +  (value/maxValue) + ")";
          };

          d3.select(this).style("fill", "rgba(0,255,100,0.3)");

          div.transition()
          .duration(200)
          .style("opacity", 1);
        }

        // display country name and data on hover
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

        function mouseOut(d) {
          var value = d.properties[scope.mapYear];
          var HIVColor = "url(#no_data)";

          if(value)
          {
            HIVColor =  "rgba(255,0,0," +  (value/maxValue) + ")";
          };

          d3.select(this).style("fill", HIVColor);

          div.transition()
          .duration(200)
          .style("opacity", 1e-6);
        }

        function zoom(xyz) {
          g.transition()
          .duration(750)
          .attr("transform", "translate(" + projection.translate() + ")scale(" + xyz[2] + ")translate(-" + xyz[0] + ",-" + xyz[1] + ")")
          .selectAll(["#countries"])
          .style("stroke-width", 1.0 / xyz[2] + "px")
          .selectAll(".city")
          .attr("d", path.pointRadius(20.0 / xyz[2]));
        }

        scope.get_xyz = function(d) {
                    var bounds = path.bounds(d);

          var w_scale = (bounds[1][0] - bounds[0][0]) / width;
          var h_scale = (bounds[1][1] - bounds[0][1]) / height;
          var z = .96 / Math.max(w_scale, h_scale);
          var x = (bounds[1][0] + bounds[0][0]) / 2;
          var y = (bounds[1][1] + bounds[0][1]) / 2 + (height / z / 6);
          return [x, y, z];
        }

        function country_clicked(d) {
          var value = d.properties[scope.mapYear];
          var HIVColor = "url(#no_data)";
          var HIVOppositeColor = "url(#no_data)";
          if(value){
                HIVColor =  "rgba(255,0,0," +  (value/maxValue) + ")";
            };

          if(value){
            HIVOppositeColor =  "rgba(0,255,0," +  (value/maxValue) + ")";
          };



          if (country) {
            $(this).css({"fill": HIVColor });
            $(this).css({"stroke": "grey"});
          }

          if (d && country !== d) {
            var xyz = scope.get_xyz(d);
            country = d;
            zoom(xyz); 
            // $(this).css({"fill": HIVOppositeColor});
            $(this).css({"stroke":"grey"});
            $(this).css({"stroke-linejoin":"round"});
            $(this).css({"stroke-linecap":"round"}); 
            div.text(value + "%");
          } else {
            var xyz = [width / 2, height / 1.5, 1];
            country = null;
            zoom(xyz);
          
          }
        };

          scope.zoomOnCountry = function(p) {
            console.log(p);
            for (var j = 0; j < json.objects.countries.geometries.length; j++) {
              var jsonState = json.objects.countries.geometries[j].properties.name;
              if(country){
                if (jsonState !== p){
                  console.log('unmatched ' + jsonState + p);
                  var xyz = [width / 2, height / 1.5, 1];
                  country = null;
                  zoom(xyz);
                }
              }
              if(jsonState === p){
                var d = topojson.feature(json, json.objects.countries).features[j];
                var value = d.properties[scope.mapYear];
                var HIVColor = "url(#no_data)";
                var HIVOppositeColor = "url(#no_data)";
                if(value){
                      HIVColor =  "rgba(255,0,0," +  (value/maxValue) + ")";
                  };

                if(value){
                  HIVOppositeColor =  "rgba(0,255,0," +  (value/maxValue) + ")";
                };

                if (country) {
                  $(this).css({"fill": HIVColor });
                  $(this).css({"stroke": "grey"});
                }
                if (d && country !== d) {

                  var xyz = scope.get_xyz(d);
                  zoom(xyz); 
                 console.log('past zoom');
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

      })
    });
    
    scope.$watch('mapYear', function(){
      console.log(scope.mapYear);
      // change year loaded to map

      scope.updateMap(scope.mapYear);
    }, true); 


    scope.$watch('mapDataset', function(){
      console.log(scope.mapDataset);
      // change year loaded to map
      scope.updateMap(scope.mapYear);
    }, true);

    scope.$watch('zoomCountry', function(){
      // change year loaded to map
      scope.zoomOnCountry(scope.zoomCountry);
    }, true); 


   

    // scope.watchCount = 0;            
    // scope.$watch('radiusdata', function(){
    //  scope.watchCount +=1;
    //  console.log(scope.watchCount);
    //  if(scope.watchCount >1){
    //    scope.updateCircle(scope.radiusdata);
    //  };
    // }, true);

    // scope.updateCircle = function(newradius) {
    //  var newcenter = newradius * 2;
    //  svgContainer.selectAll("circle")
    //    .transition()
    //    .attr("cx", newcenter)
    //    .attr("cy", newcenter)
    //    .attr("r", newradius);
    // };
  };
})