export class Heap {
  static Max = (a, b) => b - a
  static Min = (a, b) => a - b

  constructor(data, compareFunc = Heap.Min) {
    this.data = data || []
    this.compare = compareFunc

    // balance heap when initializing
    let i = this.data.length - 1
    if (i % 2 === 1) i++
    while (i > 0) {
      this._heapifyDown(this._iParent(i))

      // move to next right
      i -= 2
    }
  }

  add(el) {
    const data = this.data

    // push el
    data.push(el)

    let i = data.length - 1
    let iParent = this._iParent(i)
    let parent = data[iParent]

    // compare w/ parent
    while (
      // is parent swappable?
      iParent > -1 && // valid parent
      this.compare(el, parent) < 0 // invalid position
    ) {
      // swap
      ;[data[i], data[iParent]] = [data[iParent], data[i]]
      i = iParent
      // new parent
      iParent = this._iParent(i)
      parent = data[iParent]
    }
  }

  pop() {
    const data = this.data
    const result = data[0]
    if (this.isEmpty()) return result

    // move right most el to the top
    data[0] = data[data.length - 1]
    data.length = data.length - 1

    this._heapifyDown(0)
    return result
  }

  _heapifyDown(i) {
    const data = this.data
    let el, left, right, iLeft, iRight, leftSwappable, rightSwappable, swappable

    do {
      el = data[i]
      ;[iLeft, iRight] = this._iChildren(i)
      ;[left, right] = [data[iLeft], data[iRight]]
      leftSwappable = iLeft < data.length && this.compare(el, left) > 0
      rightSwappable = iRight < data.length && this.compare(el, right) > 0
      swappable = leftSwappable || rightSwappable

      let iChildToSwap

      // if both children are swappable,
      // swap with the smaller child
      if (leftSwappable && rightSwappable) {
        iChildToSwap = this.compare(left, right) <= 0 ? iLeft : iRight
      }
      // else only one child is swappable,
      // swap with that child
      else if (rightSwappable) {
        iChildToSwap = iRight
      } else if (leftSwappable) {
        iChildToSwap = iLeft
      }

      if (swappable) {
        // swap
        ;[data[iChildToSwap], data[i]] = [data[i], data[iChildToSwap]]
        i = iChildToSwap
      }
    } while (swappable)
  }

  top() {
    return this.data[0]
  }

  isEmpty() {
    return !this.data.length
  }

  _iParent(i) {
    return Math.floor((i - 1) / 2) // returns -1 if i is 0
  }

  _iChildren(i) {
    return [i * 2 + 1, i * 2 + 2]
  }
}
