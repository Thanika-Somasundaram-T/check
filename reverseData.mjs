import {flatten} from "./lib.mjs";

const denormalize = (renderData) => {
    const { items, shopNames } = renderData;

    const denormalized = items.map((itemPrice) => {
        const { name, shopPrices } = itemPrice;

        const itemsData = shopPrices.map((shopPrice, i)=>{
            const { price } = shopPrice;
            const shopName = shopNames[i];

            return {
                shopName,
                itemName: name,
                price,
            }
        });
        
        return itemsData.filter((item)=> item.price !== "-");
    });

    return flatten(denormalized);
}

const reverseData = (renderData) => {
    const denormalized = denormalize(renderData);
    const { shopNames } = renderData;   

    const getShopDetails = (shopName) => {
        const isCurrentShopItem = (item) => item.shopName === shopName;
        const selectWantedKeys = (itemData) =>{
            const { price, itemName } = itemData;
         
            return {
                name: itemName,
                price,
            }
        }

        const filtered = denormalized.filter(isCurrentShopItem);
        const items = filtered.map(selectWantedKeys);

        return {
            shopName: shopName,
            items: items,
        }
    }
    
    return shopNames.map(getShopDetails);
}

export default reverseData;

