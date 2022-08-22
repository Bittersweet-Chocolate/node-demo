class Node {
  constructor(elemet, parent) {
    this.elemet = elemet
    this.parent = parent
    this.left = null
    this.right = null
  }
}

// 🌲不能通过索引去查找
class BST {
  constructor(compare) {
    this.root = null
    this.size = 0
    this.compare = compare || this.compare
  }
  compare(e1, e2) {
    return e1 - e2
  }
  add(ele) {
    if (this.root === null) {
      this.root = new Node(ele, null)
    } else {
      // 递归的方式，查找要插入的🌲节点
      let currentNode = this.root
      let parent = null
      let type = 'left'
      while (currentNode) {
        let compare = this.compare(ele, currentNode.elemet)
        type = compare > 0 ? 'right' : 'left'
        parent = currentNode
        currentNode = currentNode[type]
      }
      if (parent === null) return
      parent[type] = new Node(ele, parent)
    }
    this.size++
  }
  // 先序遍历  根左右， 一般访问dom元素采用该方式
  preorderTraversal() {
    const traversal = (node) => {
      if (node === null) return
      console.log(node.elemet)
      traversal(node.left)
      traversal(node.right)
    }
    traversal(this.root)
  }
  // 中序遍历   先遍历左子树，然后访问根节点，最后遍历右子树
  // 8 9 10 12
  inorderTraversal() {
    const traversal = (node) => {
      if (node === null) return
      traversal(node.left)
      console.log(node.elemet)
      traversal(node.right)
    }
    traversal(this.root)
  }
  // 后序遍历 先操作子叶子节点，先左后右再根
  // 8 9 12 10
  postorderTraversal(visitor = null) {
    if (visitor === null) return
    const traversal = (node) => {
      if (node === null) return
      traversal(node.left)
      traversal(node.right)
      console.log(node.elemet)
      visitor.visit(node)
    }
    traversal(this.root)
  }
  // 层序遍历
  levelOrderTraversal(visitor = null) {
    if (this.root === null) return
    // 采用队列的形式，从子节点开始，进行指针的下一位切换插入每一层
    // [10,8,9,12]
    let stack = [this.root]
    let index = 0
    let currentNode = stack[0]
    // 可简写
    // currentNode = null
    // while(currentNode = stack[index++])
    while (currentNode) {
      visitor.visit(currentNode)
      if (currentNode.left) {
        stack.push(currentNode.left)
      }
      if (currentNode.right) {
        stack.push(currentNode.right)
      }
      index++
      currentNode = stack[index]
    }
    console.log(stack)
    stack = null
  }
  // 翻转二叉树  层序遍历加左右交换
  invertTree(visitor = null) {
    if (this.root === null) return
    let stack = [this.root]
    let index = 0
    let currentNode = null
    // 10 12 9 8
    while ((currentNode = stack[index++])) {
      visitor.visit(currentNode)
      ;[currentNode.left, currentNode.right] = [
        currentNode.right,
        currentNode.left
      ]
      if (currentNode.left) {
        stack.push(currentNode.left)
      }
      if (currentNode.right) {
        stack.push(currentNode.right)
      }
      index++
      currentNode = stack[index]
    }
    stack = null
  }
}
// 排序的方式可以通过自定义函数来执行
let bst = new BST((e1, e2) => {
  return e1 - e2
})
bst.add(10)
bst.add(9)
bst.add(8)
bst.add(12)
//    10
//  9    12
// 8
// console.dir(bst, { depth: 1000 })
// 遍历的方式，前/中/后序  修改数的节点，可以采用访问者模式
// 访问某个节点
bst.invertTree({
  visit(node) {
    // console.log(node)
  }
})

// 翻转二叉树 遍历树，交换树
