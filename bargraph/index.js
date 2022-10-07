async function fetchGDP(){
    const api = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    const res = await api.json()
    const datas = res.data
    Graph(datas)
}

function Graph(datas){
    const width = 800;
    const height = 500;
    const padding = 50;
    let heightScale;
    let xScale; 
    let yScale;
console.log(datas.map(d => d[1]))
    let svg = d3.select('svg');

    svg.attr('width',width)
        .attr('height',height);
    
    heightScale = d3.scaleLinear()
    .domain([0,d3.max(datas, d => d[1])])
    .range([0,height - (2*padding)]);
    
    xScale = d3.scaleLinear()
    .domain([0,datas.length - 1])
    .range([padding, width - padding]);
    
    const dates = datas.map(d => new Date(d[0]))
    
    let xAxisScale = d3.scaleTime()
    .domain([d3.min(dates), d3.max(dates)])
    .range([padding, width-padding]);

    let yAxisScale = d3.scaleLinear()
    .domain([0, d3.max(datas, d => d[1])])
    .range([height - padding, padding]);

    let toolTip = d3.select('body')
    .append('div')
    .attr('id','tooltip')
    .style('visibility','hidden')
    .style('heigth','auto')
    .style('width','auto')

    let xAxis = d3.axisBottom(xAxisScale)
    svg.append('g')
        .call(xAxis)
        .attr('id','x-axis')
        .attr('color','white')
        .attr('transform','translate(0,'+ (height - padding) + ')');
    
    let yAxis = d3.axisLeft(yAxisScale);
    svg.append('g')
        .call(yAxis)
        .attr('id','y-axis')
        .attr('color','white')
        .attr('transform','translate(' + padding +', 0)')

    svg.selectAll('rect')
        .data(datas)    
        .enter()
        .append('rect')
        .attr('class','bar')
        .attr('width', (width - (2*padding)) / datas.length)
        .attr('data-date', d => d[0])
        .attr('data-gdp', d => d[1])
        .attr('height', d => heightScale(d[1]))
        .attr('x',(d,i) => xScale(i))
        .attr('y',d => (height - padding) - heightScale(d[1]))
        .on('mouseover',(d) => {toolTip.transition()
                                        .style('visibility','visible')
                                toolTip.text(d[0])
                                toolTip.style('color','white')
                            document.getElementById('tooltip').setAttribute('data-date',d[0])})

        .on('mouseout', d => {toolTip.transition()
                                     .style('visibility','hidden')})
    
}

fetchGDP();