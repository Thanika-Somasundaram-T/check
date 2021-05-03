import {flatten, unique} from './lib.mjs';

const getShopName = (shop) => shop.shopName;

const getItemName = (item) => item.item;

const getItemNames = (shop) =>
    shop.items.map(getItemName);

const getItemPrices = (shops) => {

    const selectShopsWithMinimumPrice = (shopPrices) => {
        const prices = shopPrices.map((shopPrice) => shopPrice.price).filter((price) => price !== "-");
        const minimumPrice = Math.min(...prices);
        
        shopPrices.map((shopPrice) => 
            shopPrice["minimum"] = shopPrice.price === minimumPrice
        );

    }

    const getShopPrices = (itemName) => {
        const shopPrices = [];

        for(let i=0;i<shops.length;i++) {
            const items = shops[i].items;
            let price = "-";
            for(let j=0;j<items.length;j++) {
                const item = items[j];
                if(item.item === itemName) {
                    price = item.price;
                }
            }
            shopPrices.push({
                price,
            });
        }
        
        return shopPrices;
    }

    
    const getItemPrice = (itemName) => {
        const shopPrices = getShopPrices(itemName);
        selectShopsWithMinimumPrice(shopPrices);
    
        return {
            item: itemName,
            shopPrices,
        }
    }
    
    const allItemNames = shops.map(getItemNames);
    const uniqueItemNames = unique(flatten(allItemNames));
    const itemPrices = uniqueItemNames.map(getItemPrice);

    return itemPrices;
}

const processData = (shops) => {
    const shopNames = shops.map(getShopName);
    const itemPrices = getItemPrices(shops);

    return {
        shopNames,
        itemPrices,
    };
}

export default processData;