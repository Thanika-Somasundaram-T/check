import processData from './shop.mjs';
import dummyData from '../fixtures/renderData.mjs';
import shops from '../data/shops.mjs';

const pretty = (data) => JSON.stringify(data, null, "\t"); 

const testProcessData = () =>{
    const result = processData(shops);
    console.log(pretty(result));
    console.log("testing getClassDetails");

    if(result === null) {
        console.log("failed:", "result is a null");
        return;
    }
    console.log("passed");

}

testProcessData();