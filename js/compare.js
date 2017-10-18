//Compare
function selectCompare() {
	let val1 = select2.value;
	let val2 = select3.value;
	let val3 = select4.value;

	let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        	data = JSON.parse(this.responseText);
          let width = graph1.width.baseVal.value/2;
            let height
            if (window.innerWidth >= 1025) {
              height = 300;
              width = 475;
            } else if (window.innerWidth >= 801 && window.innerWidth < 1025) {
              height = 268;
              width = 390;
            } else if (window.innerWidth >= 600 && window.innerWidth < 801) {
              height = 233;
              width = window.innerWidth/2
            } else {
              height = 266;
              width = window.innerWidth/2
            };
        	if (data.length>0) {

            let arr = [];
            let allNumber = 0;
            for (val in data) {
              arr.push({
                name: data[val][Object.keys(data[val])[0]],
                number: data[val][Object.keys(data[val])[1]]
              });
              allNumber += parseInt(data[val][Object.keys(data[val])[1]])
            };
            graphDraw(arr, "#graph2", width, height, allNumber);
        	} else {
        		d3.select('#graph2').selectAll('*').remove();
            d3.select('#graph2')
              .append('text')
              .text('no data')
              .attr('text-anchor', 'middle')
              .attr('x', width)
              .attr('y', height - 30)
        	}
        }
    };

    xmlhttp.open("GET", "server.php?compare1=" + val1 + "&compare2=" + val2 + "&compare3=" + val3, true);
    xmlhttp.send();
};

//Load secondary categories in select element
function loadSelect() {
  select4.options.length = 0;

  for (value in allData[select3.value]) {
    let node = document.createElement("option");
    let textnode = document.createTextNode(value);
    node.appendChild(textnode);
    select4.appendChild(node);
  }
};