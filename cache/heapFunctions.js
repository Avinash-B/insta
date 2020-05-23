const parent = (index) => {
    if(index == 0) return -1;
    return Math.floor((index-1)/2);
};

const left = (index, heap) => {
    if(2 * index + 1 < heap.length) return 2 * index + 1;
    return -1;
};

const right = (index, heap) => {
    if(2 * index + 2 < heap.length) return 2 * index + 2;
    return -1;
};

const swap = (index1, index2, heap, nextTrendingCategoryName) => {
    let temp = heap[index1];
    heap[index1] = heap[index2];
    heap[index2] = temp;
    temp = nextTrendingCategoryName[index1];
    nextTrendingCategoryName[index1] = nextTrendingCategoryName[index2];
    nextTrendingCategoryName[index2] = temp;
};

const insert = (element, heap) => {
    heap.push(element);
    heapifyUp(heap.length - 1, heap);
};

const deleteMin = (heap) => {
    heap[0] = heap[heap.length - 1];
    heap.pop();
    heapifyDown(0, heap);
};

const heapifyUp = (index, heap) => {
    if(index >= 0 && parent(index) >=0 && heap[parent(index)] > heap[index]){
        swap(index, parent(index), heap, nextTrendingCategoryName);
        heapifyUp(parent(index), heap);
    }
};

const heapifyDown = (index, heap) => {
    let child = left(index, heap);
    let temp = right(index, heap);
    if(child >= 0 && temp >= 0 && heap[child] > heap[temp]){
        child = temp;
    }
    if(child > 0 && heap[index] > heap[child]){
        swap(index, child,  heap, nextTrendingCategoryName);
        heapifyDown(child, heap);
    }
};

module.exports = {
    insert,
    deleteMin,
};