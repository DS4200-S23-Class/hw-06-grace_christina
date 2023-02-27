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

// builds scatter plot for length
function build_length_scatter() {
    // reads in data from file
    d3.csv("data/iris.csv").then((data) => {

        // add our circles with styling 
        FRAME1.selectAll("point") 
            .data(data)
            .enter()  
            .append("circle")
                .attr("cx", (d) => { return (X_SCALE1(d.Sepal_Length) + MARGINS.left); }) // scaled X
                .attr("cy", (d) => { return (Y_SCALE1(d.Petal_Length) + MARGINS.bottom); }) // scaled Y
                .attr("r", 5)
                .attr("class", (d) => { return d.Species; });
                // .on("mouseover", function(d) {
                //     d3.select(this).style("fill", "rosybrown"); }) // mouse over function       
                // .on("mouseout", function(d) {
                //     d3.select(this).style("fill", "pink"); }) // mouse out function
                // .on("click", function(d) {
                //     d3.select(this).classed("border", !d3.select(this).classed("border")); // toggles border class
                //     click(d3.select(this).attr('cx'),  d3.select(this).attr("cy")); // displays last pt clicked
            //})

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

        FRAME1.append('text')
                .attr("x", (FRAME_WIDTH / 2))             
                .attr("y", (MARGINS.top / 2))
                .attr("text-anchor", "middle")  
                .style("font-size", "16px") 
                .style("font-weight", "800")  
                .text("Petal_Length vs. Sepal_Length");

  
    });
};
build_length_scatter();


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

// builds scatter plot for width
function build_width_scatter() {
    // reads in data from file
    d3.csv("data/iris.csv").then((data) => {

        // add our circles with styling 
        FRAME2.selectAll("point") 
            .data(data)
            .enter()  
            .append("circle")
                .attr("cx", (d) => { return (X_SCALE2(d.Sepal_Width) + MARGINS.left); }) // scaled X
                .attr("cy", (d) => { return (Y_SCALE2(d.Petal_Width) + MARGINS.bottom); }) // scaled Y
                .attr("r", 5)
                .attr("class", (d) => { return d.Species; });
                // .on("mouseover", function(d) {
                //     d3.select(this).style("fill", "rosybrown"); }) // mouse over function       
                // .on("mouseout", function(d) {
                //     d3.select(this).style("fill", "pink"); }) // mouse out function
                // .on("click", function(d) {
                //     d3.select(this).classed("border", !d3.select(this).classed("border")); // toggles border class
                //     click(d3.select(this).attr('cx'),  d3.select(this).attr("cy")); // displays last pt clicked
            //})

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

        FRAME2.append('text')
                .attr("x", (FRAME_WIDTH / 2))             
                .attr("y", (MARGINS.top / 2))
                .attr("text-anchor", "middle")  
                .style("font-size", "16px") 
                .style("font-weight", "800")  
                .text("Petal_Width vs. Sepal_Width");

  
    });
};
build_width_scatter();

// BAR GRAPH
// sets frame3 up
const FRAME3 = d3.select("#bar") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");

function countSpecies(data, species) {
    
}

// builds bar graph
function build_bar() {
    // reads in data from file
    d3.csv("data/iris.csv").then((data) => {
        // sets domains
        const X_SCALE3 = d3.scaleBand()
                            .domain(data.map(function (d) { return d.Species; }))
                            .range([0, VIS_WIDTH]).padding(0.2);
        const Y_SCALE3 = d3.scaleLinear()
                            .domain([0, 60])
                            .range([VIS_HEIGHT, 0]);

        // add bars
        FRAME3.selectAll("bar") 
            .data(data)
            .enter()  
            .append("rect")
                .attr("x", (d) => { return (X_SCALE3(d.Species) + MARGINS.left)})
                .attr("y", (d) => { return (Y_SCALE3(50) + MARGINS.top)}) 
                .attr("width", X_SCALE3.bandwidth())
                .attr("height", (d) => { return (VIS_HEIGHT - Y_SCALE3(50)); })
                .attr("class", (d) => { return d.Species; });
                // .on("mouseover", function(d) {
                //     d3.select(this).style("fill", "rosybrown"); }) // mouse over function       
                // .on("mouseout", function(d) {
                //     d3.select(this).style("fill", "pink"); }); // mouse out function

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

        FRAME3.append('text')
                .attr("x", (FRAME_WIDTH / 2))             
                .attr("y", (MARGINS.top / 2))
                .attr("text-anchor", "middle")  
                .style("font-size", "16px") 
                .style("font-weight", "800")  
                .text("Counts of Species");

    });
};
build_bar();
