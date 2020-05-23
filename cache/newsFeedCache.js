/*
    key : user uuid,
    value : array of [post uuid, post created time]
*/
let feedCache = new Object();
const maxDuration = 5*86400*1000; 
const removeRedundancyInterval = 30*60*1000;

/* 
    user_uuid, post_uuid : unique ids
    created_at : time stamp
*/
const addPostToCache = (user_uuid, post_uuid, created_at) => {
    if(user_uuid in feedCache){
        if(feedCache[user_uuid].length > 25) feedCache[user_uuid].shift();
        feedCache.push([post_uuid, created_at])
    }
    else{
        feedCache[user_uuid] = [[post_uuid, created_at]];
    }
};

const removeRedundancy = () => {
    setInterval( () => {
        let now = new Date();
        for(let userID in feedCache){
            for(let index=0; index < feedCache[userID].length; index++){
                if (now - feedCache[userID][index][1] > maxDuration) {
                    feedCache[userID].shift();
                }
                else{
                    break;
                }
            }
        }
    }, removeRedundancyInterval);
};

/* 
    user_uuids : list
    last_fetch : time stamp
*/
const getNewsFeed = (user_uuids, last_fetch) => {
    let posts = [];
    for(let index = 0; index < user_uuids.length; index += 1){
        if(!(user_uuids[index] in feedCache)) continue;
        for(let post in feedCache[user_uuids[index]]){
            if(post[1] > last_fetch) posts.push(posts);
            else break;
        }
    }
    return posts;
}

module.exports = {
    addPostToCache,
    removeRedundancy,
    getNewsFeed,
    feedCache,
}