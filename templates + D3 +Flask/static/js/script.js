
// dummy data for testing, debugging and development
let dummy_data = [{'breed': 'Affenpischer', 
                  'group': 'Toy Group',
                  'temperament1': 'Confident',
                  'temperament2': 'Famously Funny',
                  'temperament3': 'Fearless',
                  'life_expectancy_years': 19.5,
                  'avg_height_inches': 10.25,
                  'avg_weight_pounds': 8.5,
                  'energy': 'Regular Exercise',
                  'grooming': '2-3 Times a Week',
                  'trainability': 'Easy Training',
                  'shedding': 'Seasonal'},
                  
                  {'breed': 'Afghan Hound', 
                  'group': 'Hound Group',
                  'temperament1': 'Friendly',
                  'temperament2': 'Sweet',
                  'temperament3': 'Regal',
                  'life_expectancy_years': 21,
                  'avg_height_inches': 26,
                  'avg_weight_pounds': 55,
                  'energy': 'Energetic',
                  'grooming': 'Daily Brushing',
                  'trainability': 'May be stubborn',
                  'shedding': 'Infrequent'}]
  

async function getMetadata() {
  let metaURL = `/dogdata`
  console.log(metaURL)
  
  // check for data
  let metaData = await d3.json(metaURL, d => console.log(d));

  // populate the base dropdowns
  let metaData1 = await d3.json(metaURL, d => dogOptions(d));

  // populate the base scatter
  let metaData2 = await d3.json(metaURL, d => scatter(d));

  
}
getMetadata();



async function dogOptions(data) {

  // let metaURL = `/dogdata`
  // console.log(metaURL)
  // let metaData = await d3.json(metaURL, d => console.log(d));
  
  // List of groups (here I have one group per column)
  var allGroup1 = d3.map(data, d => d.breed).keys()

  // add the options to the button
  d3.select("#breed")
    .selectAll('myOptions')
    .data(allGroup1)
    .enter()
    .append('option')
    // .text("Select One") // text showed in the menu
    // .attr("value", "Select One") // corresponding value returned by the button
    // how do we get a none option?
    .text(d => d) // text showed in the menu
    .attr("value", d => d) // corresponding value returned by the button

  // List of groups (here I have one group per column)
  var allGroup2 = d3.map(data, d => d.group).keys()

  // add the options to the button
  d3.select("#group")
    .selectAll('myOptions')
    .data(allGroup2)
    .enter()
    .append('option')
    .text(d => d) // text showed in the menu
    .attr("value", d => d) // corresponding value returned by the button

  // List of groups (here I have one group per column)
  var allGroup4 = d3.map(data, d => d.energy).keys()

  // add the options to the button
  d3.select("#energy")
    .selectAll('myOptions')
    .data(allGroup4)
    .enter()
    .append('option')
    .text(d => d) // text showed in the menu
    .attr("value", d => d) // corresponding value returned by the button

  // List of groups (here I have one group per column)
  var allGroup5 = d3.map(data, d => d.grooming).keys()

  // add the options to the button
  d3.select("#grooming")
    .selectAll('myOptions')
    .data(allGroup5)
    .enter()
    .append('option')
    .text(d => d) // text showed in the menu
    .attr("value", d => d) // corresponding value returned by the button

  // List of groups (here I have one group per column)
  var allGroup6 = d3.map(data, d => d.shedding).keys()

  // add the options to the button
  d3.select("#shedding")
    .selectAll('myOptions')
    .data(allGroup6)
    .enter()
    .append('option')
    .text(d => d) // text showed in the menu
    .attr("value", d => d) // corresponding value returned by the button

  // List of groups (here I have one group per column)
  var allGroup7 = d3.map(data, d => d.trainability).keys()

  // add the options to the button
  d3.select("#trainability")
    .selectAll('myOptions')
    .data(allGroup7)
    .enter()
    .append('option')
    .text(d => d) // text showed in the menu
    .attr("value", d => d) // corresponding value returned by the button

}

// populate dropdowns for testing
// dogOptions(dummy_data);


// function that creates scatter plot
function scatter(data) {
  console.log(data)
  
  // clear scatter plot every time it restarts
  d3.select('svg').remove();
  
  // Variables
  var body = d3.select('#scatter')
	var margin = { top: 50, right: 50, bottom: 50, left: 50 }
	var h = 500 - margin.top - margin.bottom
	var w = 800 - margin.left - margin.right
	var formatNumber = d3.format(',d')

  // Scales
  var colorScale = d3.scale.category20c()
  var xScale = d3.scale.linear()
  .domain([d3.min(data, d => d.life_expectancy_years-1),
    d3.max(data, d => d.life_expectancy_years*1.022)])
  .range([0,w])
  console.log(xScale)

  var yScale = d3.scale.linear()
  .domain([d3.min(data, d => d.avg_weight_pounds-15),
    d3.max(data, d => d.avg_weight_pounds*1.028)])
  .range([h,0])
  console.log(yScale)
  
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
	  .ticks(10)
    .orient('bottom')
  // console.log(xAxis)
  
  // Y-axis
	var yAxis = d3.svg.axis()
	  .scale(yScale)
	  .tickFormat(d3.format(',d'))
	  .ticks(10)
    .orient('left')
  // console.log(yAxis)
  
  // Circles
  var circles = svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => (xScale(d.life_expectancy_years)))
      .attr('cy', d => yScale(d.avg_weight_pounds))
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
      .text(function (d) { return d.breed +
                           '\nLife Expectancy Years: ' + d.life_expectancy_years +
                           '\nAverage Weight Pounds: ' + d.avg_weight_pounds +
                            '\nTemperament: ' + d.temperament1 + ',' + d.temperament2 + ',' + d.temperament3})
      // .append('image')
      // .attr('xlink:href', function (d) { return d.ImageURL })
      // .attr('width', 200)
      // .attr('height', 200)
      
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
      .text('Average Life Expectancy (Years)')
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
      .text('Average Weight (Pounds)')

}


// plot the base scatter plot
// scatter(dummy_data);


// Keep Track of all filters
var filters = {};


function updateFilters(parameter1, parameter2) {

  // Save the element, value, and id of the filter that was changed
  var elementValue = parameter1
  console.log(elementValue)

  var filterId = parameter2
  console.log(filterId)


  // If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object
  if (elementValue != 'Select One') {
    filters[filterId] = elementValue;
  }
  else {
    delete filters[filterId];
  }

  console.log(filters)
  // Call function to apply all filters and rebuild the table
  filterCircles();

}

// filters the circles based on selections
async function filterCircles() {

  // Set the filteredData to the dymmy_data for testing
  // let filteredData = dummy_data;
  let metaURL = `/dogdata`
  console.log(metaURL)

  let filteredData = await d3.json(metaURL, function(filteredData) {
  // Loop through all of the filters and keep any data that
  // matches the filter values
  Object.entries(filters).forEach(([key, value]) => {
    filteredData = filteredData.filter(row => row[key] === value);
  });

  // Finally, rebuild the table using the filtered Data
  scatter(filteredData);

  });

  
}


// resets the filters and graph upon clicking the reset button
async function resetFilters() {

  let metaURL = `/dogdata`
  console.log(metaURL)
  
  let scatterReset = await d3.json(metaURL, d => scatter(d));

  // // scatter(dummy_data)
  d3.selectAll('select').property('selectedIndex', 0)
}

