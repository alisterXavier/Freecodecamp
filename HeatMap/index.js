const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

async function APIdata(){
    const res = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
    const data = await res.json()
    heatMap(data)
}
function heatMap(data){
    // console.log(data)

    const base = data.baseTemperature
    const datas = data.monthlyVariance
    const width = 900;
    const height = 600;
    const padding = 60;
    let xScale;
    let yScale;
    const minYear = d3.min(datas,d => d.year)
    const maxYear = d3.max(datas,d => d.year)

    d3.selectAll('#svgContainer').append("svg")
    const svg = d3.select('svg')

    let toolTip = d3.select("body")
                        .append('div')
                        .attr("id","tooltip")
                        .style("visibility",'hidden')
                        .attr("width","100")
                        .attr("height","100");

    d3.selectAll('h2')
        .html("Temperatures from "+ minYear +" - " + maxYear + "<br>Base Temperature: " + base)
        .attr("color","white")
        .attr("id","description")


    svg.attr('width',width).attr('height',height)
    
    let xAxisScale = d3.scaleTime()
                        .domain([minYear, maxYear])
                        .range([padding,width-padding]);
    xScale = d3.axisBottom(xAxisScale)
    .tickFormat(d3.format('d'))
    svg.append('g')
        .call(xScale)
        .attr('id','x-axis')        
        .attr('color','white')
        .attr('transform','translate(0,'+ (height - padding) + ')');
        
    let yAxisScale = d3.scaleTime()
                        .domain([new Date(0, 0, 0, 0, 0, 0),new Date(0, 12, 0, 0, 0, 0)])
                        .range([padding, height - padding])

    yScale = d3.axisLeft(yAxisScale)
            .tickFormat(d3.timeFormat('%B'))
    svg.append('g')
        .call(yScale)
        .attr('id','y-axis')
        .attr("color","white")
        .attr('transform',"translate("+ padding + ",0)")

    let heightScale = d3.scaleLinear()
                        .domain(0,d3.max(datas, d => d.variance))
                        .range(0 , height-(padding*2))
console.log((0.36 > 1))
    svg.selectAll('rect')
        .data(datas)
        .enter()
        .append('rect')
        .attr('class','cell')
        .attr("data-temp",d=> d.variance)
        .attr("data-month",d => d.month - 1)
        .attr("data-year",d => d.year)
        .attr("width",d => (width - (padding*2)) / (maxYear - minYear))
        .attr("height", (height - (2*padding)) / 12)
        .attr('x',d =>  xAxisScale(d.year))
        .attr('y',d => yAxisScale(new Date(0,d.month -1,0,0,0,0,0)))
        .attr("fill",d => (d.variance <= -1)? "lightblue" : (d.variance <= 0)? "steelblue": (d.variance > 1)? "orange" : "red")
        .on('mouseover', (d) => {
            toolTip.transition()
            .style('visibility','visible')
            .attr("data-year",d.year)
            toolTip.html(d.year + "<br>" + d.variance + "<br>" + month[d.month - 1])
            .attr("color","white")
            .style('left',d3.event.pageX + 20)
            .style('top',d3.event.pageY + 5)
        })
        .on('mouseout', (d) => {
            toolTip.transition()
            .style('visibility','hidden')
        })
    
        const color = ["lightblue","steelblue",'red',"orange"]
        const datal = ["-1","0","1","2"]
    const legend = d3.select('#svgContainer').append('svg').attr("id","legend").attr('width',400).attr('height',100)
    const g = legend.selectAll('g')
            .data(color)
            .enter()
            .append('g')
            .attr('width',100)
            .attr("height",100)
            .attr("transform",(d,i)=>'translate('+ i*100 +',0)')

    g.append("rect")
        .attr("class","legend-rect")
        .attr('width',100)
        .attr('height',50)
        .style('fill',d => d)

    g.data(datal)
        .append('text')
        .attr("class","legend-text")
        .attr("transform",(d , i) => "translate("+ 90 + "," + 80 +")")
        .attr('width',100)
        .attr('height',50)
        .text(d => d)
        .attr("fill","white")
    

            
}
APIdata();