// LENGTH SCATTER PLOT
// sets frame1 up
const FRAME_HEIGHT = 450;
const FRAME_WIDTH = 450; 
const MARGINS = {left: 40, right: 40, top: 40, bottom: 40};

const FRAME1 = d3.select("#scatterLength") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");

// for scaling data
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

// scaling function for X coors
const X_SCALE1 = d3.scaleLinear() 
                    .domain([0, 8])
                    .range([0, VIS_WIDTH]); 
// scaling function for Y coors
const Y_SCALE1 = d3.scaleLinear() 
                    .domain([0, 7])
                    .range([VIS_HEIGHT, 0]); 

// WIDTH SCATTER PLOT
// sets frame2 up
const FRAME2 = d3.select("#scatterWidth") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");
// scaling function for X coors
const X_SCALE2 = d3.scaleLinear() 
                    .domain([0, 5])
                    .range([0, VIS_WIDTH]); 
// scaling function for Y coors
const Y_SCALE2 = d3.scaleLinear() 
                    .domain([0, 3])
                    .range([VIS_HEIGHT, 0]); 

// BAR PLOT
const FRAME3 = d3.select("#bar") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");



// builds scatter plot for length
function build_plots() {
    // reads in data from file
    d3.csv("data/iris.csv").then((data) => {

        // add our circles with styling 
        let myPoint1 = FRAME1.append("g")
            .selectAll("point") 
            .data(data)
            .enter()  
            .append("circle")
                .attr("cx", (d) => { return (X_SCALE1(d.Sepal_Length) + MARGINS.left); }) // scaled X
                .attr("cy", (d) => { return (Y_SCALE1(d.Petal_Length) + MARGINS.bottom); }) // scaled Y
                .attr("r", 5)
                .attr("class", (d) => { return d.Species + " point"  });

        // Add an X axis to the vis  
        FRAME1.append("g") 
            .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
            .call(d3.axisBottom(X_SCALE1).ticks(10)) 
                .attr("font-size", '10px'); 

        // Add a Y axis to the vis  
        FRAME1.append("g") 
                .attr("transform", "translate(" + MARGINS.left + 
                    "," + (MARGINS.top) + ")") 
                .call(d3.axisLeft(Y_SCALE1).ticks(10)) 
                    .attr("font-size", '10px');



        // add our circles with styling 
        let myPoint2 = FRAME2.append("g")
            .selectAll("point") 
            .data(data)
            .enter()  
            .append("circle")
                .attr("cx", (d) => { return (X_SCALE2(d.Sepal_Width) + MARGINS.left); }) // scaled X
                .attr("cy", (d) => { return (Y_SCALE2(d.Petal_Width) + MARGINS.bottom); }) // scaled Y
                .attr("r", 5)
                .attr("class", (d) => { return d.Species + " point" });

        // Add an X axis to the vis  
        FRAME2.append("g") 
            .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
            .call(d3.axisBottom(X_SCALE2).ticks(10)) 
                .attr("font-size", '10px'); 

        // Add a Y axis to the vis  
        FRAME2.append("g") 
                .attr("transform", "translate(" + MARGINS.left + 
                    "," + (MARGINS.top) + ")") 
                .call(d3.axisLeft(Y_SCALE2).ticks(10)) 
                    .attr("font-size", '10px');


        FRAME2.call(d3.brush()
                        .extent([[0,0], [FRAME_WIDTH, FRAME_HEIGHT]])
                        .on("start brush", updateChart));

        
        // scaling x function for bar graph
        const X_SCALE3 = d3.scaleBand()
                            .domain(data.map(function (d) { return d.Species; }))
                            .range([0, VIS_WIDTH]).padding(0.2);

        // scaling y function for bar graph
        const Y_SCALE3 = d3.scaleLinear()
                            .domain([0, 60])
                            .range([VIS_HEIGHT, 0]);

        const data2 = [{Species: "setosa", Amount: 50},
                {Species: "versicolor", Amount: 50},
                {Species: "virginica", Amount: 50},
            ]


        // add bars
        let myBars = FRAME3.append("g")
            .selectAll("bar") 
            .data(data2)
            .enter()  
            .append("rect")
                .attr("x", (d) => { return (X_SCALE3(d.Species) + MARGINS.left)})
                .attr("y", (d) => { return (Y_SCALE3(d.Amount) + MARGINS.top)}) 
                .attr("width", X_SCALE3.bandwidth())
                .attr("height", (d) => { return (VIS_HEIGHT - Y_SCALE3(d.Amount)); })
                .attr("class", (d) => { return d.Species + " bar" });


        // Add an X axis to the vis  
        FRAME3.append("g") 
            .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
            .call(d3.axisBottom(X_SCALE3).ticks(10)) 
                .attr("font-size", '10px'); 

        // Add a Y axis to the vis  
        FRAME3.append("g") 
                .attr("transform", "translate(" + MARGINS.left + 
                    "," + (MARGINS.top) + ")") 
                .call(d3.axisLeft(Y_SCALE3).ticks(10)) 
                    .attr("font-size", '10px');


// Function that is triggered when brushing is performed
function updateChart(event) {
    extent = event.selection;
    myPoint1.classed("brushed", function(d){ return isBrushed(extent, X_SCALE2(d.Sepal_Width) + MARGINS.left, Y_SCALE2(d.Petal_Width) + MARGINS.top)  } )
    myPoint2.classed("brushed", function(d){ return isBrushed(extent, X_SCALE2(d.Sepal_Width) + MARGINS.left, Y_SCALE2(d.Petal_Width) + MARGINS.top)  } )
    myBars.classed("brushed", function(d){ return isBrushed(extent, X_SCALE2(d.Sepal_Width) + MARGINS.left, Y_SCALE2(d.Petal_Width) + MARGINS.top)  } )
}

    });
};


// A function that return TRUE or FALSE according if a dot is in the selection or not
function isBrushed(brush_coords, cx, cy) {
    var x0 = brush_coords[0][0],
        x1 = brush_coords[1][0],
        y0 = brush_coords[0][1],
        y1 = brush_coords[1][1];
    return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
}

build_plots();


