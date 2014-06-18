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

var svg = d3.select("#map").append("svg")
    .attr("preserveAspectRatio", "xMidYMid")
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("width", m_width)
    .attr("height", m_width * height / width);

  svg.append("rect")
      .attr("class", "background")
      .attr("width", width)
      .attr("height", height)
      .on("click", country_clicked);


var g = svg.append("g");

d3.json("countries.topo.json", function(error, us) {
  if (error) return console.error(error);
  console.log(us);


  g.append("g")
      .attr("id", "countries")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.countries).features)
      .enter()
      .append("path")
      .attr("id", function(d,i){return 'country'+i} )
      .attr("d", path)
      .on("click", country_clicked)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseout", mouseout);
});

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 1e-6);




function mouseover() {
  d3.select(this).style("fill", "#F08080");
  div.transition()
      .duration(200)
      .style("opacity", 1)
}

function mousemove(d) {
  div
      .text(d.properties.name)
      .style("left", (d3.event.pageX - 34) + "px")
      .style("top", (d3.event.pageY - 12) + "px");
}

function mouseout() {
  d3.select(this).style("fill", "#808080");
  div.transition()
      .duration(500)
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



      if (country) {
        // g.selectAll("#" + country.id).style('display', null);
        $('path').css({"fill":"#808080"})
        console.log(country)

      }

      if (d && country !== d) {
        var xyz = get_xyz(d);
        country = d;
        zoom(xyz); 
        $(this).css({"fill": "#CD3333"});
        $(this).css({"stroke":"#fff"});
        $(this).css({"stroke-linejoin":"round"});
        $(this).css({"stroke-linecap":"round"});  
        
      } 

      else {
        var xyz = [width / 2, height / 1.5, 1];
        country = null;
        zoom(xyz);
        $('path').css({"fill":"#808080"})
       
      }
    };




