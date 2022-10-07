async function getApi(){

    const res = await fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json')

    const data = await res.json();
    
    treeMap(data)
}

function treeMap(VideoGames){
    
    const height = 600; 
    const width = 900;
    
    const tooltip = d3.select('body')
                        .append('div')
                        .attr('id','tooltip')
                        .style('visibility','hidden')

    const svg = d3.select('body').append('svg')
        
    svg.attr("width",width)
        .attr("height",height)
    
    const hierarchy = d3.hierarchy(VideoGames, node => node.children)
                        .sum(d => d.value)
                        .sort((a,b)=> b.value - a.value)
    
    const treemap = d3.treemap()
                        .size([800,600])
                        .padding(2)

    treemap(hierarchy)

    console.log(hierarchy.leaves().map(d => console.log(d.data)))
    svg.selectAll('rect')
        .data(hierarchy.leaves())
        .enter()
        .append('rect')
        .attr('class',"tile")
        .attr('x', d => d.x0)
        .attr('y', d => d.y0)
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => d.y1 - d.y0)
        .attr("data-category",d=> d.data.category)
        .attr("data-value", d=> d.data.value)
        .attr("data-name", d => d.data.value)
        .attr("fill", d => 
            (d.data.category === "Wii" || d.data.category === "GB" 
            || d.data.category === "NES" || d.data.category === "DS" 
            || d.data.category === "3DS" || d.data.category === "SNES" 
            || d.data.category === "N64" || d.data.category === "GBA" 
            || d.data.category === "2600")? "crimson" 
            : (d.data.category === "PSP" || d.data.category === "PS2" 
            || d.data.category === "PS3" || d.data.category === "PS4" 
            || d.data.category === "PS")? "blue" 
            : (d.data.category === "X360" || d.data.category === "XOne" 
            || d.data.category === "PC" || d.data.category === "XB")? "lime" 
            : "white")
        .attr("border","2px solid black")
        .on('mouseover', d => {
            tooltip.transition()
            .style('visibility','visible')
            .attr('data-value', d.data.value)
            tooltip.html(d.data.name + "<br>" + d.data.category)
            .style('left', (d3.event.pageX + 20 >= 900)? d3.event.pageX - 150 + "px": d3.event.pageX + 20 + "px")
            .style('top', (d3.event.pageY >= 560)? d3.event.pageY - 100 + "px": d3.event.pageY + 20 + "px")
        })
        .on('mouseout',d => {
            tooltip.transition()
                    .style('visibility','hidden')
        })
    
    const platform = ['Nintendo','Microsoft','Playstation'];
    const platformColor = ['crimson','Lime','Blue'];

    const legendcontainer = d3.select('body')
                                .append('svg')
                                .attr('id','legend')
    
    const legend = legendcontainer.selectAll('g')
                                    .data(platform)
                                    .enter()
                                    .append('g')
                                    .attr('width', 100)
                                    .attr('height', 50)
                                    .attr("transform",(d,x) => 'translate(0,' + x*75+')') 
        
    legend.append('rect')
            .data(platformColor)
            .attr('class','legend-item')
            .attr('width', 100)
            .attr('height', 50)
            .attr('fill',d => d)
    
    legend.append('text')
            .text(d => d)
            .attr('fill',d => (d == 'Playstation')? "White": "black")
            .attr("transform",(d,x) => 'translate('+ 100 + ',' + 30 + ')') 

}

getApi()