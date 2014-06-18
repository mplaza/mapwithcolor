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

// var color = d3.scale.quantize()
//                     .range(["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"]);

d3.csv("hiv-2010.csv", function(data) {

  //     color.domain([
  //         d3.min(data, function(d) { return d.HIV; }),
  //         d3.max(data, function(d) { return d.HIV; })
  // ]);

  d3.json("countries.topo.json", function(error, json) {
    console.log(json.objects.countries.geometries[1].properties.name)

    if (error) {
      console.log(error);
    } else {
      for (var i = 0; i < data.length; i++) {

        //State name
        var dataState = data[i].country;

        //convert value from string to float
        var dataValue = parseFloat(data[i].HIV);

        //Corresponding country inside the GeoJSON
        for (var j = 0; j < json.objects.countries.geometries.length; j++) {
          var jsonState = json.objects.countries.geometries[j].properties.name;
          if (dataState === jsonState) {
            //Copy the data value into the JSON
            json.objects.countries.geometries[j].properties.value = dataValue;
            //Stop looking through the JSON
            break;
          }
        }
      }
    }


    var svg = d3.select("#map").append("svg")
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("viewBox", "0 0 " + width + " " + height)
      .attr("width", m_width)
      .attr("height", m_width * height / width);

      // svg.append("rect")
      //     .attr("class", "background")
      //     .attr("width", width)
      //     .attr("height", height)
      //     .on("click", country_clicked);

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
        var value = d.properties.value;
        if(value) {
          console.log( "rgba(255,0,0," +  Math.floor(value/30) + ")");
          return "rgba(255,0,0," +  (value/30) + ")";
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

    var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 1e-6);


    function mouseOver(d) {
      var value = d.properties.value;
      var HIVOppositeColor = "url(#no_data)";

      if(value)
        {
        HIVOppositeColor =  "rgba(0,255,0," +  (value/30) + ")";
        };

      d3.select(this).style("fill", HIVOppositeColor);

      div.transition()
      .duration(200)
      .style("opacity", 1);
    }

    function mouseMove(d) {

      div
      .text(d.properties.name)
      .style("left", (d3.event.pageX + 10) + "px")
      .style("top", (d3.event.pageY - 20) + "px");
    }

    function mouseOut(d) {
      var value = d.properties.value;
      var HIVColor = "url(#no_data)";

      if(value)
      {
        HIVColor =  "rgba(255,0,0," +  (value/30) + ")";
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

    function get_xyz(d) {
      var bounds = path.bounds(d);
      var w_scale = (bounds[1][0] - bounds[0][0]) / width;
      var h_scale = (bounds[1][1] - bounds[0][1]) / height;
      var z = .96 / Math.max(w_scale, h_scale);
      var x = (bounds[1][0] + bounds[0][0]) / 2;
      var y = (bounds[1][1] + bounds[0][1]) / 2 + (height / z / 6);
      return [x, y, z];
    }

    function country_clicked(d) {
      var value = d.properties.value;
      var HIVColor = "url(#no_data)";
      var HIVOppositeColor = "url(#no_data)";
      if(value){
            HIVColor =  "rgba(255,0,0," +  (value/30) + ")";
        };

      if(value){
        HIVOppositeColor =  "rgba(0,255,0," +  (value/30) + ")";
      };

      console.log(d);

      if (country) {
        $(this).css({"fill": HIVColor });
        $(this).css({"stroke": "grey"});
      }

      if (d && country !== d) {
        var xyz = get_xyz(d);
        country = d;
        zoom(xyz); 
        $(this).css({"fill": HIVOppositeColor});
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
  })
});