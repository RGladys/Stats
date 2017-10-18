

//Chose single category
function selectSingle() {
	let val1 = select1.value;
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        	data = JSON.parse(this.responseText);
            
            data.forEach((responseValue)=>{
            	allData[Object.keys(responseValue)[0]][responseValue[Object.keys(responseValue)[0]]] = parseInt(responseValue[Object.keys(responseValue)[1]]);	
            });
            currentData = allData[Object.keys(data[0])[0]];
            
            arr = [];
            arrNames = [];
           	for (let i in currentData) {
           		arr.push({name: i, number: currentData[i]})
                arrNames.push(i)
           	};

            let width = graph1.width.baseVal.value/2;
            let height
            if (window.innerWidth >= 1025) {
              height = 270;
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
            } 

            graphDraw(arr, "#graph1", width, height, allUsersNumber)
        }
    };

    xmlhttp.open("GET", "server.php?single=" + val1, true);
    xmlhttp.send();
};




