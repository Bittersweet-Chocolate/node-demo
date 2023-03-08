/*
 * @Author: czh-mac
 * @Date: 2023-03-07 17:16
 * @LastEditTime: 2023-03-08 13:30
 * @Description: 观察者模式，被观察者通知观察者
 */
class Subject {
  constructor(state) {
    this.state = state
    this.observers = []
  }
  attch(o) {
    this.observers.push(o)
  }
  setState(newState) {
    this.state = newState
    this.observers.forEach((o) => o.update(this))
  }
}
class Observer {
  constructor(name) {
    this.name = name
  }
  update(sub) {
    console.log(sub.state)
  }
}
const a = new Subject('test')
const b = new Observer('czh')
a.attch(b)
a.setState('test1')
