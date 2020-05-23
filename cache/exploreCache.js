const { insert, deleteMin}  = require('./heapFunctions');
/*
    key : category name,
    value : object of count and post uuid array
*/
let recentCategories = new Object();
let trendingCategory = new Object();
// array of category name && count with max 5 elements 
let heap = [];
let nextTrendingCategoryName = [];
const trendingCategoryInterval = 30*60*1000;

const heapInsert = (category_name, count) => {
    if(heap.length < 5){
        nextTrendingCategoryName.push(category_name);
        insert(count, heap);
    }
    else if(heap[0] < count){
        nextTrendingCategoryName[0] = nextTrendingCategoryName[nextTrendingCategoryName.length - 1];
        nextTrendingCategoryName.pop();
        deleteMin(heap);
        nextTrendingCategoryName.push(category_name);
        insert(count, heap);
    }
};

const addCategory = (category_name, post_uuid) => {
    if(category_name in recentCategories){
        recentCategories[category_name]['count'] += 1;
        recentCategories[category_name]['posts_uuid'].push(post_uuid);
    }
    else{
        recentCategories[category_name] = {
            'count': 1,
            posts_uuid: [post_uuid],
        };
    }
    heapInsert(category_name ,recentCategories[category_name]['count']);
};


const updateTrending = () => {
    setInterval(() => {
        for(let key in trendingCategory) delete trendingCategory[key];
        for(let index=0; index < nextTrendingCategoryName.length; index += 1){
            trendingCategory[nextTrendingCategoryName[index]] = Object.assign(
                {}, recentCategories[nextTrendingCategoryName[index]]);
        }
        for(let key in recentCategories) delete recentCategories[key];
        while(heap.length != 0) {
            heap.pop();
            nextTrendingCategoryName.pop();
        }
    }, trendingCategoryInterval);
};

module.exports = {
    addCategory,
    updateTrending,
    trendingCategory,
}