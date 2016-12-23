'use strict';
$(window).load(function() {
  let scm = new ColorScheme;
  scm.from_hue(21).scheme('triade').distance(0.1).add_complement(false).variation('pastel').web_safe(true);
  let colors = scm.colors();
  let instance = api.instance.get();

  let json = api.boa.fars('fatal.boa');
  $('#loading').hide();
  $('#content').show();

  let canvas = $('#chart-output').get(0).getContext("2d");
  let chartData = [];
  let count = 0;

  for(let index in json.DEVs) {
    count++;
    $('#numToShow').append(`<option value="${count}"> ${count} </option>`);
    let month = index;

    if(parseFloat(index) == 1)
      month = "January";
    else if(parseFloat(index) == 2)
      month = "February";
    else if(parseFloat(index) == 3)
      month = "March";
    else if(parseFloat(index) == 4)
        month = "April";
    else if(parseFloat(index) == 12)
        month = "May";
    else if(parseFloat(index) == 5)
      month = "June";
    else if(parseFloat(index) == 6)
      month = "July";
    else if(parseFloat(index) == 7)
      month = "August";
    else if(parseFloat(index) == 8)
      month = "September";
    else if(parseFloat(index) == 9)
      month = "October";
    else if(parseFloat(index) == 10)
      month = "November";
    else if(parseFloat(index) == 11)
      month = "December";

    chartData.push({
        label: month,
        value: json.DEVs[index],
        color: '#' + _.sample(colors)
    });
  }

  $('#numToShow').change(function() {
    $('#output').html('<canvas id="chart-output"> </canvas>');
    canvas = $('#chart-output').get(0).getContext('2d');
    display($('#numToShow').val());
  });

  /*chartData = _.sortBy(chartData, function(line) {
    return Number(-line.value);
  });*/

  display(1);

  $('#app-title').html(`Number of Accidents per Month on ${instance.repos.name}`);

  function display(num) {
    let limitedData = _.first(chartData, num);

    $('#table-output-body').html('');
    _.each(limitedData, function(element, index, list) {
      let num = index + 1;
      $('#table-output-body').append(`<tr><td> ${num} </td> <td> ${element.label} </td> <td> ${element.value} </td> </tr>`)
    });

    let outputChart = new Chart(canvas).Line(limitedData, {responsive: true});
  }

});
