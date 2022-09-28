/**
 * Promise의 기본적인 사용법
 */

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const random = Math.floor(Math.random() * 10);
    const value = 'value';

    if (random % 2) {
      resolve(value);
    }
    else {
      reject(value);
    }
  }, 300);
});

promise.then(
  // 첫번째 인자를 resolve 매개변수로 전달
  (result) => {
    console.log('resolve!', result);
  },
  // 두번째 인자를 reject 매개변수로 전달
  (error) => {
    console.log('reject!', error);
  }
);

promise.catch(
  // reject 매개변수로 전달
  (error) => {
    console.log('catch!', error);
  }
);

/**
 * Promise.all() 예제
 */

let values = [];
function doA() {
  return new Promise((resolve, reject) => {
    setTimeout(() => { 
      resolve(1); 
    }, 500);
  });
}
function doB() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    }, 500);
  });
}
function doC() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(3);
    }, 500);
  });
}
function sum() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const value = values.reduce((total, value) => total + value, 0);
      resolve(value);
    }, 500);
  });
}

// 1) 이전 비동기 함수가 끝나야 다음 비동기 함수가 시작된다.
function ex1() {
  doA().then((resultA) => {
    values.push(resultA);
    return doB();
  }).then((resultB) => {
    values.push(resultB);
    return doC();
  }).then((resultC) => {
    values.push(resultC);
    return sum();
  }).then((total) => {
    console.log(total);
  });
}
// 2) Promise.all() 안의 비동기함수를 동시에 실행한다.
function ex2() {
  Promise.all([doA(), doB(), doC()]).then((result) => {
    values = result;
    return result;
  }).then(() => {
    console.log(values)
    return sum();
  }).then((total) => {
    console.log(total);
  });
}

ex1();

/**
 * async, await
 */

function a() {
  return Promise.resolve(1);
}

async function b() {
  return 1;
}

