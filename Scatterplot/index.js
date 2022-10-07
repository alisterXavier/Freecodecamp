async function getData(){
    const res = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    const data = await res.json()
    Plot(data)
}


function Plot(datas){
    let xAxis;
    let yAxis;
    const width = 800;
    const height = 500;
    const padding = 50
    const svg = d3.select('svg')
    // const tooltip = d3.select('#tooltip')
    let tooltip = d3.select('body')
    .append('div')
    .attr('id','tooltip')
    .style('visibility','hidden')
    .style('height','100px')
    .style('width','160px')

    svg.attr('width',width)
        .attr('height',height)
    
    let heightScale = d3.scaleLinear()
                        .domain([0,d3.max(datas, d => d.Year)])
                        .range([0,height - (padding * 2)])
console.log(datas.map(d => d.Year))
    let xAxisScale = d3.scaleTime()
                        .domain([d3.min(datas, d => d.Year) - 1,
                                d3.max(datas, d => d.Year)])
                        .range([padding, width - padding])

    xAxis = d3.axisBottom(xAxisScale)
                .tickFormat(d3.format("d"))
    svg.append('g')
        .call(xAxis)
        .attr('id','x-axis')
        .attr('transform', 'translate(0,'+ (height - padding) +')')
        .attr('color','white')

    let yAxisScale = d3.scaleTime()
        .domain([d3.min(datas, d => new Date(d.Seconds * 1000)),d3.max(datas, d => new Date(d.Seconds * 1000))])
        .range([height - padding, padding])
    
    yAxis = d3.axisLeft(yAxisScale)
                .tickFormat(d3.timeFormat("%M:%S"))
    svg.append('g')
    .call(yAxis)
    .attr('id','y-axis')
    .attr('transform', 'translate('+ (padding) +',0)')
    .attr('color','white')

// console.log(toolTip)
    
    svg.selectAll('circle')
        .data(datas)
        .enter()
        .append('circle')
        .attr('class','dot')
        .attr('data-xvalue',d => d.Year)
        .attr('data-yvalue',d => new Date(d.Seconds * 1000))
        .attr('cx', d => xAxisScale(d.Year))
        .attr('cy', d => yAxisScale(new Date(d.Seconds * 1000)))
        .attr('r', 4)
        .attr("fill", d => (d.URL === "")? "blue": "red")
        .on('mouseover',(d) => {
            tooltip.transition()
            .style('visibility','visible')
            tooltip.html('<strong>' + d.Name 
            + '</strong><br /><span>Place :'+d.Place+'</span><br>'
            + '<span>Year :'+d.Year+'</span><br>'
            +'<span>Time :' + d.Time + '</span>')
            .attr("data-year",d.Year)
            .style('left',(d3.event.pageX) + "px")
            .style('top',(d3.event.pageY) + "px")
        })
        .on('mouseout',d => {
            tooltip.transition()
            .style('visibility','hidden')
        })
    
        let legendata = [
            {
                text:"No Doping",
                color:"blue"
            },
            {
                text:"Doping",
                color:"red"
            }
        ]
    let legend = d3.select('#legend')
    let legendContainer = legend.selectAll("div").data(legendata).enter().append('div').attr('class','content')
    legendContainer.append('div').style("background-color",d=>d.color)
    legendContainer.append('p').text(d => d.text).style('margin',"0 0 5")
}

getData()