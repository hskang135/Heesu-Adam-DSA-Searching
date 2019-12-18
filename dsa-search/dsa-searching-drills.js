//--------------------------------------------------
// 1. How many searches?

function binarySearch(array, value, count = 0, start, end) {
    start = start === undefined ? 0 : start;
    end = end === undefined ? array.length : end;
    if (start > end) {
        return { result: -1, count }
    }

    const index = Math.floor((start + end) / 2);
    const item = array[index];
    console.log(index)
    console.log(start, end);
    if (item == value) {
        return index;
    }
    else if (item < value) {
        return binarySearch(array, value, count = count + 1, index + 1, end);
    }
    else if (item > value) {
        return binarySearch(array, value, count = count + 1, start, index - 1);
    }

};

// a.
// binarySearch([3, 5, 6, 8, 11, 12, 14, 15, 17, 18], 1)

// first it will check the middle of the list, 12. Then it will check halfway between 0 and 12, 6. Then it will check halfway between 6 and 12 to find the target, 8.
// [12, 6, 8]

// b.
// binarySearch([3, 5, 6, 8, 11, 12, 14, 15, 17, 18], 16)
// first it will check the middle of the list, 12. Then it will check halfway between 12 and the end of the list, 17. Then it will check halfway between 17 and 12, 14. Then it will check halfway between 14 and 17, 15. Then the search will end because there are no more numbers to check and 16 is not in the list.
// [12, 17, 14, 15] *item not found


//--------------------------------------------------
// 3. Find a book

const library = [
    { author: 'Cowlishaw, Mike', dewey: '005.133', title: 'The REXX Language' },
    { author: 'Sams', dewey: '005.133', title: 'Teach Yourself C++ In 21 Days' },
    { author: 'Stroustrup., Bjarne', dewey: '005.133', title: 'The C++ Programming Language' },
    { author: 'Crockford, Douglas', dewey: '005.2762', title: 'JavaScript: The Good Parts' },
    { author: 'Flanagan, David', dewey: '005.2762', title: 'JavaScript: The Definitive Guide' },
    { author: 'Schmidt, Meinhard', dewey: '005.44684', title: 'Windows Vista for Dummies' },
    { author: 'Zondervan', dewey: '220.52081', title: 'NIV Study Bible' },
    { author: 'Humphries, Russell, Dr.', dewey: '231.7652', title: 'Starlight and Time' },
    { author: 'Jane, Frederick Thomas', dewey: '623.82509051', title: 'Jane\'s Fighting Ships' },
    { author: 'Norris, Chuck', dewey: '796.8092', title: 'The Official Chuck Norris Fact Book' }
];

function indexOf(array, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == value) {
            return i
        }
    }
    return -1
}

function findBook(deweyIndex, library) {
    for (let i = 0; i < library.length; i++) {
        if (library[i].dewey === deweyIndex && library[i].title === title) {
            return console.log('book found')
        }
    }
    return console.log('book not found')
}


//--------------------------------------------------
// 4. Searching in a BST

// a. 14, 19, 15, 27, 25, 90, 91, 79 

//          35
//        /    \ 
//      25      89
//     /  \    /  \
//   15   27  79   91
//  /  \          /
// 14   19       90

// b. 8, 6, 5, 7, 10, 9, 11

//         8
//       /   \
//      6     10
//     / \   /  \
//    5   7 9    11 


//--------------------------------------------------
// 5. Implement different tree traversals

class BinarySearchTree {
    constructor(key=null, value=null, parent=null) {
        this.key = key
        this.value = value
        this.parent = parent
        this.left = null
        this.right = null
    }

    insert(key, value) {
        // if the tree is empty, create the root node of the tree
        if (this.key == null) {
            this.key = key
            this.value = value
        }
        // if the tree already exists, start at the root and compare it to the key. If the new key is less than the node's key, the new node will live on the left branch
        else if (key < this.key) {
            // if the existing node does not have a left child (no left pointer) then insert the new node as the left child of that node, passing 'this' as the parent
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this)
            }
            // if the existing node has a left child, then recursively call the insert method so the node is added further down the tree
            else {
                this.left.insert(key, value)
            }
        }
        // if the new key is greater than the node's key, the new node will live on the right branch
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this)
            }
            // if the existing node has a right child, then recursively call the insert method so the node is added further down the tree
            else {
                this.right.insert(key, value)
            }
        }
    }

    find(key) {
        // if the item is in the root, return that item
        if (this.key == key) {
            return this.value
        }
        // if the target item is less than the root, follow the left child. Then recursively check the left or right child until you find the item
        else if (key < this.key && this.left) {
            return this.left.find(key)
        }
        // if the target item is greater than the root, follow the right child. Then recursively check the left or right child until you find the item
        else if (key > this.key && this.right) {
            return this.right.find(key)
        }
        // if you have searched the tree and the item is not found
        else {
            throw new Error('Key Error')
        }
    }

    remove(key) {
        // once you find the target node
        if (this.key == key) {
            // if the target node has left and right children
            if (this.left && this.right) {
                const successor = this.right._findMin()
                this.key = successor.key
                this.value = successor.value
                successor.remove(successor.key)
            }
            // if the target node only has a left child
            else if (this.left) {
                this._replaceWith(this.left)
            }
            // if the target node only has a right child
            else if (this.right) {
                this._replaceWith(this.right)
            }
            // if the node has no children, remove it and all references to it
            else {
                this._replaceWith(null)
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key)
        }
        else if (key > this.key && this.right) {
            this.right.remove(key)
        }
        else {
            throw new Error('Key Error')
        }
    }

    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node
            }
            else if (this == this.parent.right) {
                this.parent.right = node
            }
            if (node) {
                node.parent = this.parent
            }
        }
        else {
            if (node) {
                this.key = node.key
                this.value = node.value
                this.left = node.left
                this.right = node.right
            }
            else {
                this.key = null
                this.value = null
                this.left = null
                this.right = null
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this
        }
        return this.left._findMin()
    }

    preOrder() {
        console.log(this.key)
        if (this.left) {
            this.left.preOrder()
        }
        if (this.right) {
            this.right.preOrder()
        }
    }

    inOrder() {
        if (this.left) {
            this.left.inOrder()
        }
        console.log(this.key)
        if (this.right) {
            this.right.inOrder()
        }
    }

    postOrder() {
        if (this.left) {
            this.left.postOrder()
        }
        if (this.right) {
            this.right.postOrder()
        }
        console.log(this.key)
    }
}
class _Node {
    constructor(data) {
        this.data = data
        this.next = null
    }
}

class Queue {
    constructor() {
        this.first = null
        this.last = null
        this.length = 0
    }

    enqueue(data) {
        const node = new _Node(data)
        this.length += 1
        if (this.first === null) {
            this.first = node 
        }
        if (this.last) {
            this.last.next = node
        }
        this.last = node
    }

    dequeue() {
        this.length -= 1
        if (this.first === null) {
            return
        }
        const node = this.first
        this.first = this.first.next
        if (node === this.last) {
            this.last = null
        }
        return node
    }
}


function main() {
    const tree = new BinarySearchTree
    tree.insert(25)
    tree.insert(15)
    tree.insert(50)
    tree.insert(10)
    tree.insert(24)
    tree.insert(35)
    tree.insert(70)
    tree.insert(4)
    tree.insert(12)
    tree.insert(18)
    tree.insert(31)
    tree.insert(44)
    tree.insert(66)
    tree.insert(90)
    tree.insert(22)
    // tree.preOrder()
    // tree.inOrder()
    // tree.postOrder()
    const officersTree = new BinarySearchTree
    officersTree.insert(5, 'Captain Picard')
    officersTree.insert(3, 'Commander Riker')
    officersTree.insert(2, 'Lt Cmdr Worf')
    officersTree.insert(1, 'Lieutenant Security Officer')
    officersTree.insert(4, 'Lt Cmdr LaForge')
    officersTree.insert(6, 'Commander Data')
    officersTree.insert(8, 'Lt Cmdr Crusher')
    officersTree.insert(7, 'Lieutenant Selar')
    console.log(officersTree)
    console.log(officersRanks(officersTree))
}

main()


//--------------------------------------------------
// 6. Find the next commanding officer

function officersRanks(tree, values= []) {
    const queue = new Queue()
    const node = tree
    queue.enqueue(node)
    console.log(queue.length)
    while (queue.length) {
        console.log(queue.dequeue)
        const node = queue.dequeue()
        console.log(node.data.left)
        values.push(node.data.value)
        if (node.data.left) {
            queue.enqueue(node.data.left)
        }
        if (node.data.right) {
            queue.enqueue(node.data.right)
        }
    }
    return values
}


//--------------------------------------------------
// #7 Max profit

  function maxProfit(arr) {
    let max = 0;
    for(let i=0; i<arr.length; i++) {
    if(arr[i+1] - arr[i] > max) {
        max = arr[i+1] - arr[i]
    }
    }
    return max;
};