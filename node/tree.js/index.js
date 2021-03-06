class Node {
  constructor(elemet, parent) {
    this.elemet = elemet
    this.parent = parent
    this.left = null
    this.right = null
  }
}

// ð²ä¸è½éè¿ç´¢å¼å»æ¥æ¾
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
      // éå½çæ¹å¼ï¼æ¥æ¾è¦æå¥çð²èç¹
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
  // ååºéå  æ ¹å·¦å³ï¼ ä¸è¬è®¿é®domåç´ éç¨è¯¥æ¹å¼
  preorderTraversal() {
    const traversal = (node) => {
      if (node === null) return
      console.log(node.elemet)
      traversal(node.left)
      traversal(node.right)
    }
    traversal(this.root)
  }
  // ä¸­åºéå   åéåå·¦å­æ ï¼ç¶åè®¿é®æ ¹èç¹ï¼æåéåå³å­æ 
  inorderTraversal() {
    const traversal = (node) => {
      if (node === null) return
      traversal(node.left)
      console.log(node.elemet)
      traversal(node.right)
    }
    traversal(this.root)
  }
  // ååºéå åæä½å­å¶å­èç¹
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
  // å±åºéå
  levelOrderTraversal() {
    if (this.root === null) return
    let stack = [this.root]
    let index = 0
    let currentNode = null
    while ((currentNode = stack[index++])) {
      visitor.visit(currentNode)
      if (currentNode.left) {
        stack.push(currentNode.left)
      } else {
        stack.push(currentNode.right)
      }
    }
  }
}
// æåºçæ¹å¼å¯ä»¥éè¿èªå®ä¹å½æ°æ¥æ§è¡
let bst = new BST((e1, e2) => {
  return e1 - e2
})
bst.add(10)
bst.add(9)
bst.add(8)
bst.add(12)
// console.dir(bst, { depth: 1000 })
// éåçæ¹å¼ï¼å/ä¸­/ååº  ä¿®æ¹æ°çèç¹ï¼å¯ä»¥éç¨è®¿é®èæ¨¡å¼
// è®¿é®æä¸ªèç¹
bst.preorderTraversal({
  visit(node) {
    console.log(node)
  }
})
