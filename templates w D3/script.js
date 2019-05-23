d3.csv('data.csv', function (data) {
  
  // Variables
  var body = d3.select('#scatter')
	var margin = { top: 50, right: 50, bottom: 50, left: 50 }
	var h = 500 - margin.top - margin.bottom
	var w = 500 - margin.left - margin.right
	var formatNumber = d3.format(',d')

  // Scales
  var colorScale = d3.scale.category20c()
  var xScale = d3.scale.linear()
    .domain([
        0,d3.max(data,function (d) { return +d.lelow; })
    ])
    .range([0,w])
  var yScale = d3.scale.linear()
    .domain([
        0,d3.max(data,function (d) { return +d.lehigh; })
    ])
    .range([h,0])
  
  // SVG
	var svg = body.append('svg')
	    .attr('height',h + margin.top + margin.bottom)
	    .attr('width',w + margin.left + margin.right)
	    .append('g')
	    .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
  
  // X-axis
	var xAxis = d3.svg.axis()
	  .scale(xScale)
	  .tickFormat(d3.format(',d'))
	  .ticks(5)
	  .orient('bottom')
  
  // Y-axis
	var yAxis = d3.svg.axis()
	  .scale(yScale)
	  .tickFormat(d3.format(',d'))
	  .ticks(5)
	  .orient('left')
  
  // Circles
  var circles = svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx',function (d) { return xScale(d.lelow) })
      .attr('cy',function (d) { return yScale(d.lehigh) })
      .attr('r','10')
      .attr('stroke','black')
      .attr('stroke-width',1)
      .attr('fill',function (d,i) { return colorScale(i) })
      .on('mouseover', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',20)
          .attr('stroke-width',3)
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',10)
          .attr('stroke-width',1)
      })
      .append('title') // Tooltip
      .text(function (d) { return d.Breed +
                           '\nLife Expectancy Low: ' + formatNumber(d.lehigh) +
                           '\nLife Expectancy High.: ' + formatNumber(d.lelow) })
      .append('image')
      .attr('xlink:href', function (d) { return d.ImageURL })
      .attr('width', 200)
      .attr('height', 200)
      
  // X-axis
  svg.append('g')
      .attr('class','axis')
      .attr('transform', 'translate(0,' + h + ')')
      .call(xAxis)
      .append('text') // X-axis Label
      .attr('class','label')
      .attr('y',-15)
      .attr('x',w)
      .attr('dy','.71em')
      .style('text-anchor','end')
      .text('Life Expectancy Low')
  // Y-axis
  svg.append('g')
      .attr('class','axis')
      .call(yAxis)
      .append('text') // y-axis Label
      .attr('class','label')
      .attr('transform','rotate(-90)')
      .attr('x',0)
      .attr('y',5)
      .attr('dy','.71em')
      .style('text-anchor','end')
      .text('Life Expectancy High')

  // List of groups (here I have one group per column)
  var allGroup = d3.map(data, function(d){return(d.Breed)}).keys()

  // add the options to the button
  d3.select("#selectButton")
    .selectAll('myOptions')
    .data(allGroup)
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; }) // corresponding value returned by the button

    // Circles
    var circles = svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .datum(data.filter(function(d){return d.Breed==allGroup[0]}))
    .attr('cx',function (d) { return xScale(d.lelow) })
    .attr('cy',function (d) { return yScale(d.lehigh) })
    .attr('r','10')
    .attr('stroke','black')
    .attr('stroke-width',1)
    .attr('fill',function (d,i) { return colorScale(i) })
    .on('mouseover', function () {
      d3.select(this)
        .transition()
        .duration(500)
        .attr('r',20)
        .attr('stroke-width',3)
    })
    .on('mouseout', function () {
      d3.select(this)
        .transition()
        .duration(500)
        .attr('r',10)
        .attr('stroke-width',1)
    })
    .append('title') // Tooltip
    .text(function (d) { return d.Breed +
      '\nLife Expectancy Low: ' + formatNumber(d.lehigh) +
      '\nLife Expectancy High.: ' + formatNumber(d.lelow) })

  // A function that update the chart
  function update(selectedGroup) {

  // Create new data with the selection?
  var dataFilter = data.filter(function(d){return d.Breed==selectedGroup})

    // Give these new data to update line
    circles
      .datum(dataFilter)
      .transition()
      .duration(1000)
      .attr('cx',function (d) { return xScale(d.lelow) })
      .attr('cy',function (d) { return yScale(d.lehigh) })
      .attr('r','10')
      .attr('stroke','black')
      .attr('stroke-width',1)
      .attr('fill',function (d,i) { return colorScale(i) })
      .on('mouseover', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',20)
          .attr('stroke-width',3)
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',10)
          .attr('stroke-width',1)
      })
      .append('title') // Tooltip
        .text(function (d) { return d.Breed +
          '\nLife Expectancy Low: ' + formatNumber(d.lehigh) +
          '\nLife Expectancy High.: ' + formatNumber(d.lelow) })
  }

  // When the button is changed, run the updateChart function
  d3.select("#selectButton").on("change", function(d) {
      // recover the option that has been chosen
       var selectedOption = d3.select(this).property("value")
       // run the updateChart function with this selected option
       update(selectedOption)
    })
})