class Node {
  constructor(ele, next) {
    this.ele = ele
    this.next = next
  }
}
class LinkedList {
  constructor() {
    this.head = null
    this.size = 0
  }
  add(index, ele) {
    // 重载
    if (arguments.length === 1) {
      ele = index
      index = this.size
    }
    if (index < 0 || index > this.size) throw new Error('越界')
    if (index === 0) {
      let head = this.head
      this.head = new Node(ele, head)
    } else {
      let preNode = this.getNode(index - 1)
      // 节点插入
      preNode.next = new Node(ele, preNode.next)
    }
    this.size++
  }
  // O(n)
  // 获取节点从头开始取，不明白为什么
  getNode(index) {
    let current = this.head
    for (let i = 0; i < index; i++) {
      current = current.next
    }
    return current
  }
  // 翻转链表
  reverse1() {
    // 个人实现的
    let head = null
    // 长度为2才有翻转的意义
    // 从最后一位开始找，记录最后一位，然后再把头指过去
    for (let i = this.size; i > 1; i--) {
      const preNode = this.getNode(i - 2)
      // 标记头
      if (i === this.size) {
        head = preNode.next
      }
      preNode.next.next = preNode
      preNode.next = null
      // 替换头
      if (i === 2) {
        this.head = head
      }
    }
    return this.head
  }
  // 珠峰实现的翻转
  reverse2() {
    // 一级一级去找
    const reverse = (head) => {
      if (head === null || head.next === null) return head
      let newHead = reverse(head.next)
      head.next.next = head
      head.next = null
      return newHead
    }
    this.head = reverse(this.head)
    return this.head
  }
  // 珠峰的第二种方式
  // 弄一个新链表，把新链表的头每次重新引用
  reverse3() {
    let head = this.head
    if (head === null || head.next === null) return head
    let newHead = null
    while (head !== null) {
      let temp = head.next // 保留下一个
      head.next = newHead // a => null
      newHead = head // newHead => a
      head = temp
    }
    this.head = newHead
    return this.head
  }
}
const ll = new LinkedList()
ll.add(100)
ll.add(1, 200)
ll.add(1, 300)
ll.add(3, 500)
ll.reverse3()
console.dir(ll, { depth: 1000 })

// 100
// 200 100
// 200 300 100
