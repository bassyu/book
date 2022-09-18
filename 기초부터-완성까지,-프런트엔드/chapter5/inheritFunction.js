function inherit(perent, child) {
  child.prototype = new perent();
  child.prototype.constructor = child;
}

// perent
function Vehicle(type) {
  this.type = type;
}
Vehicle.prototype.stop = function () {
  console.log(`stop ${this.type}`);
}

const v = new Vehicle('car');
v.stop();
v.new = 'new'

// child
function Car(type, speed) {
  Vehicle.apply(this, [type]);
  this.speed = speed;
}
inherit(Vehicle, Car);
Car.prototype.run = function () {
  console.log(`run ${this.type} ${this.speed}`);
}

const c = new Car('SUV', 100);
c.stop();  // Vehicle prototype method
c.run(); // Car prototype method
console.log(c.new)  // undefined

console.log(Vehicle.prototype); // this.run()
console.log(Car.prototype); // this.[[Protorype]].run() this.stop()