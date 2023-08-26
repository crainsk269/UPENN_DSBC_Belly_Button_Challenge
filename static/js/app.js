// Sample Data Path Variable
const samples = 'samples.json';

// Fetch the JSON data and then console log it
d3.json(samples).then((data) => {
    console.log(data);
});

function init() {
    
    // Create a Dropdown Menu Selection List
    let ddMenu = d3.select('#selDataset');

    d3.json(samples).then((data) => {
        let sampleNames = data.names;

        // Sample Names
        sampleNames.forEach((sample) => {
            ddMenu.append('option').text(sample).property('value', sample);
        });

        //First Sample
        let firstSample = sampleNames[0];
        barChart(firstSample);
        bubbleChart(firstSample);
        metaData(firstSample);
    });
};

init();

// Function to Update Data
function optionChanged(newSample) {
    barChart(newSample);
    bubbleChart(newSample);
    metaData(newSample);    
};

// Function for Bar Chart
function barChart(sample) {
    // Sample Data
    d3.json(samples).then((data) => {
        let sampleData = data.samples;

        // Sample Data Filter By ID
        let sampleFilter = sampleData.filter(result => result.id == sample);
        let sampleResult = sampleFilter[0];

        let otu_ids = sampleResult.otu_ids;
        let otu_labels = sampleResult.otu_labels;
        let sample_values = sampleResult.sample_values;

        // Create Bar Graph
        let traceBar = [{
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(ids => `OTU ${ids}`).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: 'h'
        }];

        Plotly.newPlot('bar', traceBar);
        console.log(`${sample} Bar Chart Selected`)
    });
};

// Function for Bubble Chart
function bubbleChart(sample) {
    
    // Sample Data
    d3.json(samples).then((data) => {
        let sampleData = data.samples;

        // Sample Data Filter By ID
        let sampleFilter = sampleData.filter(result => result.id == sample);
        let sampleResult = sampleFilter[0];

        let otu_ids = sampleResult.otu_ids;
        let otu_labels = sampleResult.otu_labels;
        let sample_values = sampleResult.sample_values;

        // Create Bubble Graph
        let traceBubble = [{
            x: otu_ids ,
            y: sample_values ,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Earth',
            }
        }];

        Plotly.newPlot('bubble', traceBubble);
        console.log(`${sample} Bubble Chart Selected`)
    });
};

// Function for MetaData
function metaData(sample) {
    d3.json(samples).then((data) => {
        let metaData = data.metadata;

        // MetaData Filter By ID
        let metaFilter = metaData.filter(result => result.id == sample);
        let metaResult = metaFilter[0];

        // Selector for the reference in index.html
        let panel = d3.select('#sample-metadata');
    
        // Clears Out Previous Data
        panel.html('');
    
        // Displays New Data
        Object.entries(metaResult).forEach(([key, value]) => {
            panel.append('h6').text(`${key}: ${value}`);
        });
        console.log(`${sample} MetaData Selected`)
    });
};
