let select1 = document.getElementById('select1');
let select2 = document.getElementById('select2');
let select3 = document.getElementById('select3');

let graph_button1 = document.getElementById('single');
let graph_button2 = document.getElementById('compare');
let container1 = document.getElementById('container-single');
let container2 = document.getElementById('container-compare');
let graph1 = document.getElementById('graph1');
let graph2 = document.getElementById('graph2');
let data1;
let data2;
let allUsersNumber;

let svgContainer1 = d3.select("#graph1");
let svgContainer2 = d3.select("#graph2");
let arr = [];

let width = graph1.width.baseVal.value/2;
let height;

//Buttons
graph_button2.addEventListener('click', function() {
	container1.style.display = "none";
	container2.style.display = "block";
  this.style.background = "#ddd4ba";
  document.getElementById("single").style.background = "#ccc5b1";

  loadSelect();
  selectCompare();
})

graph_button1.addEventListener('click', function() {
	container2.style.display = "none";
	container1.style.display = "block";
  this.style.background = "#ddd4ba";
  document.getElementById("compare").style.background = "#ccc5b1";

  selectSingle();
});


//Get number of users and initialize graphs
(function() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);
            allUsersNumber = parseInt(data[0].number);
            selectSingle();
            selectCompare()
        }
    };
    
    xmlhttp.open("GET", "server.php?asknumber=ask", true);
    xmlhttp.send();
})()






//Function drawing graph
function graphDraw(data, container, width, height, allNumber) {
  d3.select(container).selectAll('*').remove();

  let scale
            if (window.innerWidth >= 1025) {
              scale = d3.scaleSqrt().domain([0, allNumber]).range([0, 170]);
            } else if (window.innerWidth >= 801 && window.innerWidth < 1025) {
              scale = d3.scaleSqrt().domain([0, allNumber]).range([0, 160]);
            } else if (window.innerWidth >= 600 && window.innerWidth < 801) {
              scale = d3.scaleSqrt().domain([0, allNumber]).range([0, 150]);
            } else if (window.innerWidth >= 400 && window.innerWidth < 600) {
              scale = d3.scaleSqrt().domain([0, allNumber]).range([0, 130]);
            } else {
              scale = d3.scaleSqrt().domain([0, allNumber]).range([0, 100]);
            }

  var svg = d3.select(container).append('g').attr('transform', 'translate(' + width + ',' + height + ')');

  var colorScale = d3.scaleLinear()
    .domain([0, allNumber])
    .range(['#e8a586', '#e3e8a0'])
    .interpolate(d3.interpolateHcl);
  
  let simulation = d3.forceSimulation()
    .force('x', d3.forceX().strength(0.05))
    .force('y', d3.forceY().strength(0.05))
    .force('collide', d3.forceCollide(function(d) {
      return scale(d.number) + 1;
    }));
  
  (function(){
    let svgChildren = svg.selectAll('g')
      .data(data)
      .enter()

    let circles = svgChildren
      .append('g')
      .append('circle')
      .attr('fill', function(d) {
        return colorScale(d.number)
      })
      .attr('r', function(d) {
        return scale(d.number)
      });
  
    let text = svgChildren
      .data(data)
      .append('text')
      .attr('font-family', 'Arial')
      .attr('font-weight', 'bold')
      .attr('font-size', function(d) {
        return scale(d.number/10)
      })
      .attr("dy", "0em")
      .attr('text-anchor', 'middle')
      .text(function(d) {
        return d.name
      });

    let textNumber = svgChildren
      .data(data)
      .append('text')
      .attr('font-family', 'Arial')
      .attr('font-size', function(d) {
        return scale(d.number/10)
      })
      .attr("dy", "1em")
      .attr('text-anchor', 'middle')
      .text(function(d) {
        return "(" + d.number + ")"
      });

    function ticked() {
      circles
        .attr('cx', function(d) {
          return d.x
        })
        .attr('cy', function(d) {
          return d.y
        })

      text
        .attr('x', function(d) {
          return d.x
        })
        .attr('y', function(d) {
          return d.y
        })

      textNumber
        .attr('x', function(d) {
          return d.x
        })
        .attr('y', function(d) {
          return d.y
        })
    };
  
  simulation.nodes(data)
    .on('tick', ticked);
})()
};
