const Node = require('./node');

class MaxHeap {
	
	constructor() {
		
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
		
	}

	push(data, priority) {
		
		var node = new Node(data, priority);
		
		if (this.insertNode(node)){
			this.heapSize++;
			this.shiftNodeUp(node);
		}
		
	}

	pop() {
		
		if (this.root == null) return;

		var detachedNode = this.detachRoot();
		var dataNode = detachedNode.data;
		
		if (dataNode !== null){
			this.heapSize--;
		}
		
		this.restoreRootFromLastInsertedNode(detachedNode);
		this.shiftNodeDown(this.root);
		
		return dataNode;
	}

	detachRoot() {
		
		if (this.root == null) return;

		var node = this.root;
		this.root = null;
		
		if (node !== null){
			var index = this.parentNodes.indexOf(node);
			if (index !== -1) {
				this.parentNodes.shift();
			}
		}
		
		return node;
	}

	restoreRootFromLastInsertedNode(detached) {
		
		if (this.parentNodes.length !== 0){
			var lastNode = this.parentNodes.pop();
			this.root = lastNode;
			
			if (lastNode.parent !== null) {
				var parent = lastNode.parent;
				lastNode.remove();
				if (parent !== detached){
					if(parent.right == null && parent.left !== null){
					this.parentNodes.unshift(parent);
					}
				}
			}
		
			if (detached.left) {
				lastNode.appendChild(detached.left);
			}
		
			if (detached.right) {
				lastNode.appendChild(detached.right);
			}else{
				this.parentNodes.unshift(lastNode);
			}
				
		}
		
	}

	size() {
		return this.heapSize;
	}

	isEmpty() {
		return (this.root == null);
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}
	
	insertNode(node) {

		if (this.root == null) {			
			this.root = node;
			this.parentNodes.push(node);
			return true;
		}

		if (this.parentNodes[0].left == null) {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
		} else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			this.parentNodes.shift();
		}
		
		return true;
	}

	shiftNodeUp(node) {
		
		if(node.parent !== null){
			
			var childIndex = this.parentNodes.indexOf(node);
			var parentIndex = this.parentNodes.indexOf(node.parent);
			
			if (node.parent.priority < node.priority) {
				
				if (node.parent == this.root) {
					this.root = node;
				}
				
			if (parentIndex !== -1) {
				
				this.parentNodes[childIndex] = node.parent;
				this.parentNodes[parentIndex] = node;
				
			} else {
				
				this.parentNodes[childIndex] = node.parent;
			}

			node.swapWithParent();
			
			this.shiftNodeUp(node);			
			}
		}
	}

	shiftNodeDown(node) {
		
		if (node == null) return;

		if (node.left !== null) {
			
			var priorityNode;
			
			if(node.right !== null){
				
				if (node.left.priority >= node.right.priority) {
					
				priorityNode = node.left;
				
				}else{
					
					priorityNode = node.right;
				}
			}else{
				
				priorityNode = node.left;
			}
			
			var childIndex = this.parentNodes.indexOf(node);
			var parentIndex = this.parentNodes.indexOf(priorityNode);

			if (priorityNode.priority > node.priority) {
				
				if (node == this.root){
					this.root = priorityNode;
				}

				priorityNode.swapWithParent();
				

				if (childIndex !== -1) {
					
					this.parentNodes[parentIndex] = node;
					this.parentNodes[childIndex]= priorityNode;
					
				} else {
					
					this.parentNodes[parentIndex] = node;
				}

				this.shiftNodeDown(node);
			}
		}
	}
}

module.exports = MaxHeap;
