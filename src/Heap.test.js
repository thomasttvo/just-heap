import { Heap } from "./Heap";

describe("Heap", () => {
  test("should by default, instantiate with an empty array", () => {
    expect(new Heap().data).toStrictEqual([]);
  });
  const cases = [
    "4,2",
    "4,2,5",
    "4,2,5,2,7",
    "4,2,5,2,7,32,7",
    "4,2,5,2,7,32,7,23",
    "4,2,5,2,7,32,7,23,6,2,2,4,7",
    "-4,-2,-5,-2,-7,-32",
    "4,2,5,2,7,32,7,23,6,2,2,4,7,8,7,3,32,57,678,23,1,32,2345,6,21,22,83,-10,-123,-1,-1233",
    "-10,23,7,-1233,1,8,4,32,2,6,4,2,-123,7,23,678,5,21,7,3,2,32,7,6,83,32,2345,-1,57,2,22",
    "-1233,-1,7,32,21,7,2345,2,23,2,8,2,6,4,7,32,22,6,1,57,4,678,5,23,2,83,7,-123,3,-10,32"
  ];
  for (const [heapType, createHeap, topElemCheck, validateParentChild] of [
    [
      "min",
      (a, getValFunc) => new Heap(a, Heap.Min, getValFunc),
      (a) => Math.min(...a),
      (parent, child) => parent <= child
    ],
    [
      "max",
      (a, getValFunc) => new Heap(a, Heap.Max, getValFunc),
      (a) => Math.max(...a),
      (parent, child) => parent >= child
    ]
  ]) {
    for (const [inputType, transformStreamItem, getValFunc] of [
      ["integer", (x) => x, (x) => x],
      ["object", (x) => ({ val: x }), (x) => x.val]
    ]) {
      describe(`For ${heapType} heap, and input type is "${inputType}", should always maintain the ${heapType} element at the top position`, () => {
        function streamStringToArray(streamString) {
          return streamString
            .split(",")
            .map((x) => transformStreamItem(parseInt(x, 10)));
        }

        test("upon add() and pop()", () => {
          cases.forEach((streamString) => {
            const heap = createHeap([], getValFunc);
            const stream = streamStringToArray(streamString);
            const sortedStream = [...stream].map(getValFunc).sort();

            stream.forEach((el, i) => {
              heap.add(el);
              expect(getValFunc(heap.top())).toStrictEqual(
                topElemCheck(heap.data.map(getValFunc))
              );
              expect(heap.data.map(getValFunc).sort()).toStrictEqual(
                stream
                  .slice(0, i + 1)
                  .map(getValFunc)
                  .sort()
              );
              expect(
                heapCheck(heap.data, validateParentChild, getValFunc)
              ).toBe(true);
            });

            const popped = [];
            while (!heap.isEmpty()) {
              const el = heap.pop();
              if (heap.isEmpty()) {
                expect(heap.top()).toStrictEqual(undefined);
                expect(heap.pop()).toStrictEqual(undefined);
                expect(heap.top()).toStrictEqual(undefined);
              } else {
                expect(getValFunc(heap.top())).toStrictEqual(
                  topElemCheck(heap.data.map(getValFunc))
                );
                expect(
                  validateParentChild(getValFunc(el), getValFunc(heap.top()))
                ).toBe(true);
                expect(
                  heapCheck(heap.data, validateParentChild, getValFunc)
                ).toBe(true);
              }

              popped.push(el);
              expect(
                [...popped, ...heap.data].map(getValFunc).sort()
              ).toStrictEqual(sortedStream);
            }
          });
        });
        test("upon initializing", () => {
          cases.forEach((streamString) => {
            const stream = streamStringToArray(streamString);
            const heap = createHeap(stream, getValFunc);
            expect(heapCheck(heap.data, validateParentChild, getValFunc)).toBe(
              true
            );
          });
        });
      });
    }
  }
});

function heapCheck(heapData, validateParentChild, getValFunc) {
  let result = true;
  heapData.some((el, i) => {
    const iLeft = i * 2 + 1;
    const iRight = i * 2 + 2;
    const left = heapData[iLeft];
    const right = heapData[iRight];

    let valid = true;
    if (iLeft < heapData.length) {
      valid = valid && validateParentChild(getValFunc(el), getValFunc(left));
    }
    if (iRight < heapData.length) {
      valid = valid && validateParentChild(getValFunc(el), getValFunc(right));
    }

    result = result && valid;

    return !valid;
  });

  return result;
}
