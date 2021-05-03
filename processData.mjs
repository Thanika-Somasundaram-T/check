import {flatten} from "./lib.mjs";

const getMinimumPrices = (priceMatrix) => {
    const minimumPrices = {};
    const itemNames = Object.keys(priceMatrix);

    itemNames.map((itemName) => {
        const shopPrices = Object.values(priceMatrix[itemName]);
        minimumPrices[itemName] = Math.min(...shopPrices);
    });

    return minimumPrices;
}

const getMaximumPrices = (priceMatrix) => {
    const maximumPrices = {};
    const itemNames = Object.keys(priceMatrix);

    itemNames.map((itemName) => {
        const shopPrices = Object.values(priceMatrix[itemName]);
        maximumPrices[itemName] = Math.max(...shopPrices);
    });

    return maximumPrices;
}

const buildPriceMatrix = (items) => {
    const priceMatrix = {};

    items.map((itemData) => {
        const {name, shopName, price} = itemData;
        console.log(name, shopName, price);

        priceMatrix[name] = priceMatrix[name] || {};
        priceMatrix[name][shopName] = price;
    });
 
    return priceMatrix; 
}

const getItems = (shop) => {
    const {shopName, items} = shop;

    return items.map((item) => ({
        shopName, ...item,
    }));
}

const denormalize = (shops) => flatten(shops.map(getItems));

const getShopName = (shop) => shop.shopName;

const processData = (shops) => {
    const shopNames = shops.map(getShopName);
    
    const denormalized = denormalize(shops);
    console.log(denormalized);
    const priceMatrix = buildPriceMatrix(denormalized);
    const minimumPrices = getMinimumPrices(priceMatrix);
    const maximumPrices = getMaximumPrices(priceMatrix);
    const itemNames = Object.keys(priceMatrix);
    const items = itemNames.map((itemName) => {
        const shopPrices = shopNames.map((shopName) => {
            const listPrice = priceMatrix[itemName][shopName];
            const minimum = listPrice === minimumPrices[itemName];
            const maximum = listPrice === maximumPrices[itemName];
            const price = listPrice !== undefined ? listPrice : "-"; 

            return {
                price,
                minimum,
                maximum,
            }
        });

        return {
            name: itemName,
            shopPrices,
        };
    });

    return {
        shopNames,
        items,
    }
}

export default processData;