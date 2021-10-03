
# just-heap

This is a super simple implementation of Heap. Simply copy the content of `Heap.js` to use in your project. All tests are in `Heap.test.js`.

```js
// constructor will take in an array and immediately balances it as heap
// This array will not be copied but reused as the internal heap data
const minHeap = new Heap([5,4,3,2,1]) 
const maxHeap = new Heap([1,2,3,4,5], Heap.Max)

const minHeap.top() // returns 1
const maxHeap.top() // returns 5

const minHeap.pop() // 1 is removed and returned
const maxHeap.pop() // 5 is removed and returned

const minHeap.add(1) // 1 is added back and will be at the top position after rebalancing
const maxHeap.add(5) // 5 is added back and will be at the top position after rebalancing
```

