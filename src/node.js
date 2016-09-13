class Node {
	constructor(data, priority) {
		
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		
		if (!node) return;
		
		if(!this.left){
			
			this.left = node;
			node.parent = this;
			return;
		}
		
		if(!this.right){
			
			this.right = node;
			node.parent = this;
			return;
		}
		
		return;

	}

	removeChild(node) {
		
		if(this.left == node){
			this.left = null;
			node.parent = null;
			return;
		}
		
		if(this.right == node){
			this.right = null;
			node.parent = null;
			return;
		}
		
		throw new Error("Error of removing child");

	}

	remove() {
		
		if(this.parent){
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		
		if (!this.parent) return;

		
		var leftChild = this.left;
		var rightChild = this.right;
		var parent = this.parent;
		var parentLChild = parent.left;
		var parentRChild = parent.right;
		var grandpa = this.parent.parent;
		
		parent.remove();
		if (leftChild)  leftChild.remove();
		if (rightChild) rightChild.remove();

		if (this === parentLChild) {
			this.remove();
			this.appendChild(parent);
			this.appendChild(parentRChild);
		}

		if (this === parentRChild) {
			this.remove();
			this.appendChild(parent);
			parentLChild.remove();
			this.appendChild(parentLChild);
			
		}

		parent.appendChild(leftChild);
		parent.appendChild(rightChild);

		if (grandpa){
			grandpa.appendChild(this);
		}
	}
}

module.exports = Node;
