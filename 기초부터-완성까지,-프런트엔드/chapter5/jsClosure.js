function counterModule() {
  let counter = 0;

  function increment() {
    counter += 1;
  }

  function decrement() {
    counter -= 1;
  }

  function getCount() {
    return counter;
  }

  return {
    increment,
    decrement,
    getCount
  };
}

const myCounter = counterModule();

myCounter.increment();
console.log(myCounter.getCount());
myCounter.decrement();
console.log(myCounter.getCount());
