import reverseData from './reverseData.mjs';
import renderData from '../fixtures/renderData.mjs';

const pretty = (data) => JSON.stringify(data, null, "\t"); 

const testReverseData = () =>{
    const result = reverseData(renderData);
    console.log("testing getClassDetails");
    console.log(pretty(result));
    console.log("Passed");
}

testReverseData();