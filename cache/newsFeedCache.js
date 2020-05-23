/*
    key : user uuid,
    value : array of [post uuid, post created time]
*/
let feedCache = new Object();
const maxDuration = 5*86400*1000; 
const removeRedundancyInterval = 30*60*1000;


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

module.exports = {
    removeRedundancy,
    feedCache,
}