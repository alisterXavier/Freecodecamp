async function getApi(){
    const eduRes = await fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json');
    const countyRes = await fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json');

    const eduData = await eduRes.json();
    const countyData = await countyRes.json();

    choropleth(eduData,countyData)
}

function choropleth(edu,county){
    console.log(edu)
    console.log(county)
    const width = 950;
    const height = 600;

    const tooltip = d3.selectAll('body')
                        .append('div')
                        .data(edu)
                        .attr('id','tooltip')
                        .attr("width", 100)
                        .attr("height", 100)

    const svg = d3.select('body')
                    .append('svg')
                    .attr("height",height)
                    .attr("width",width )

    countyData = topojson.feature(county, county.objects.counties).features
    svg.selectAll('path')
    .data(countyData)
    .enter()
    .append('path')
    .attr('d', d3.geoPath())
    .attr('class','county')
    .attr('data-fips', item =>{ 
        let id
        edu.map(d => {
            if(d.fips == item.id)
            id = d.fips
        })
        return id
    })
    .attr('data-education', item => {
        let eduPrec;
        edu.map(d => {
            if(d.fips == item.id)
            eduPrec = d.bachelorsOrHigher
        })
        return eduPrec
    })
    .attr("fill",item => {
        let color;
        edu.map(d => {
            if(d.fips === item.id){
                if(d.bachelorsOrHigher < 18)
                color = "lightblue"
                else if(d.bachelorsOrHigher < 36)
                color = "steelblue"
                else if(d.bachelorsOrHigher < 54)
                color = "blue"
                else if(d.bachelorsOrHigher < 75)
                color = "navy"
            }
        })
        return color
    })
    .data(countyData)
    .on("mouseover",item => {
        tooltip.transition()
            .style('visibility','visible')
            let id = item.id
            let text = edu.find(d => {
                return d.fips === id
            })
        tooltip.html(text.area_name + "<br>" + text.bachelorsOrHigher)
            .style("top",(d3.event.pageY > 550)? d3.event.pageY - 100 : d3.event.pageY + 15)
            .style("left",(d3.event.pageX > 950)? d3.event.pageX - 150 : d3.event.pageX + 15)
        tooltip.attr("data-education",text.bachelorsOrHigher)
    })
    .on("mouseout", d=>  tooltip.transition()
                            .style("visibility","hidden"))

    const color = ["lightblue","steelblue","blue","navy"]
    const legendText = [18,36,54,75]

    const legend = d3.select("body")
        .append("svg")
        .attr("id",'legend')
        .attr('width',250)
        .attr('height',100)

    const legendG = legend.selectAll('g')
        .data(color)
        .enter()
        .append('g')
        .attr('width',60)
        .style("text-align","right")
        .attr('height',50)
        .attr('transform',(d,i) => 'translate('+ i*60 +' 0)')
        
        legendG.append('rect')
            .attr('fill',d => d)
            .attr('width',60)
            .attr('height',50)

        legendG.data(legendText)
                .append('text')
                .attr('fill','white')
                .attr('width',10)
                .attr('height',50)
                .text(d => d)
                .attr('transform',(d,i) => 'translate(' + 50 + "," + 80 + ')')
        
// .attr('data-education', d => d.bachelorsOrHigher)
}       

getApi();
