const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	
	constructor(maxSize) {
		
		this.heap = new MaxHeap();
		
		if (maxSize == null){
			maxSize = 30;
		}
		
		this.maxSize = maxSize;
		
	}

	push(data, priority) {
		
		if (this.maxSize !== this.heap.size()){
			
			this.heap.push(data, priority);
			
		} else{
			
			throw new Error("Error from queue.push()");
		}
		
	}

	shift() {
		if (this.isEmpty() == false){
			
			return this.heap.pop();
			
		} else{
			
			throw new Error("Error from queue.shift()");
		}
		
	}

	size() {
		
		return this.heap.size();
		
	}

	isEmpty() {
		
		return this.heap.isEmpty();
		
	}
}

module.exports = PriorityQueue;
