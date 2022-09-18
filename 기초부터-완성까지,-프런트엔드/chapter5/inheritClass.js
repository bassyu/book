class Vehicle {
  constructor(type) {
    this.type = type;
  }
  
  stop() {
    console.log(`stop ${this.type}`);
  }
}

const v = new Vehicle('car');
v.stop();

class Car extends Vehicle {
  constructor(type, speed) {
    super(type);
    this.speed = speed;
  }

  run() {
    console.log(`run ${this.type} ${this.speed}`);
  }
}

const c = new Car('SUV', 100);
c.stop();
c.run();

console.log(Vehicle.prototype);
console.log(Car.prototype);