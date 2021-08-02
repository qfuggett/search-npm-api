// TYPESCRIPT EXAMPLES: ANNOTATIONS & INFERENCE

const add = (a: number, b: number): number => {
    // return 'd;lajl;jadlj';      ^ telling us what the return value should be
    return a + b;
    // typescript does not vet logic inside function, so if it was a - b, there would be no errors
};

const subtract = (a: number, b: number) => {
    return a - b;
    // typescript will infer that the return value is number
    // a - b    However, without the annotation, typescript will not throw an error for a missing return
};

function divide(a: number, b: number): number {
    return a / b;
};

const multiply = function(a: number, b:number): number {
    return a * b;
};

const logger = (message: string): void => {
    // void type declares that the function returns nothing
    console.log(message);
    // return null;
    // return undefined;
};

const throwError = (message: string): never => {
    // at some point inside the function, an error will occur and it will not complete, returning nothing
    throw new Error(message);
};

const forecast = {
    date: new Date(),
    weather: 'sunny'
};

// contains object literal that has properties
// const logWeather = (forecast: {date: Date, weather: string}): void => {
//     console.log(forecast.date);
//     console.log(forecast.weather);
// };

// destructuring with annotation
const logWeather = ({ date, weather }: {date: Date, weather: string}): void => {
    console.log(date);
    console.log(weather);
};


// OBJECTS WITH ANNOTATIONS

const profile = {
    name: 'alex',
    age: 20,
    coords: {
        lat: 0,
        lng: 15
    },
    setAge(age: number): void {
        this.age = age;
    }
};

// DESTRUCTURING
// const age = profile.age;
const { age, name }: { age: number; name: string } = profile;

// Without annotation
// const { coords: {lat, lng} } = profile;
const { coords: {lat, lng} }: { coords: {lat: number; lng: number} } = profile;


// ARRAYS

// type inference
const carMakers = ['ford', 'toyota', 'chevy'];
const dates = [new Date, new Date()];

// annotations are needed when an array is initialized empty
const carMakerz: string[] = [];

// btype interference for an array of string arrays
const carsByMake = [
    ['f150'],
    ['corolla'],
    ['camaro']
]; 
// const carsByMake: string[][] = [];

// Why do we care about Typed arrays? When we want to represent a collection of records with some arbitrary sort order
// TS can do type inference when extracting values from an array
const car = carMakers[0];
const myCar = carMakers.pop();
// It prevents us from adding incompatible values to the array, BUT, arrays can still contain multiple different types
carMakers.push(100);

// flexible types
const importantDates: (Date | string)[] = [new Date()];
importantDates.push('2010-10-10');
importantDates.push(new Date());
importantDates.push(100);

// Tuples: array like structure that represent properties of a record in a fixed order
const drink = {
    color: 'brown',
    carbonated: true,
    sugar: 40
};

const pepsi: [string, boolean, number] = ['brown', true, 40];

// OR 

type Drink = [string, boolean, number];
const pepsi: Drink = ['brown', true, 40];

// Tuples are good for CSV files, but you may not work with Tuples often because they don't convey meaningul information when modeling a record
// If you want to manage properties of data, it's best to create an object

const carSpecs: [number, number] = [400, 3354];

const carStats = {
    horsepower: 400,
    weight: 3354
};

// Interfaces and Classes work together in typescript to allow us to re-use code
// interface Vehicle {
//     name: string;
//     year: number;
//     broken: boolean;
//     summary(): string;
// };

interface Reportable {
    summary(): string;
};

const oldCivic = {
    name: 'civic',
    year: 2000,
    broken: true, 
    summary(): string {
        return `Name: ${this.name}`;
    }
};

const drink2 = {
    color: 'brown',
    carbonated: true,
    sugar: 40,
    summary(): string {
        return `My drink has ${this.sugar} grams of sugar`;
    }
};

// This is too long, you could just create an interface/new type for your annotation
// const printVehicle = (vehicle: {name: string; year: number; broken: boolean}): void => {
// const printVehicle = (vehicle: Vehicle): void => {
//     console.log(`Name: ${vehicle.name}`);
//     console.log(`Year: ${vehicle.year}`);
//     console.log(`Broken? ${vehicle.broken}`);
// };

const printSummary = (item: Reportable): void => {
    console.log(item.summary());
};
printSummary(oldCivic);
printSummary(drink2);

// REUSABLE CODE IN TYPESCRIPT ^^
// Create functions that accept arguments that are typed with interfaces
// Objects/classes can decide to implement a given interface to work with a function

// CLASSES

class Vehicle {
    // initialize a propery
    // color: string = 'red';
    // OR
    // inside a constructor; to pass in arguments to a class
    // constructor(color: string) {
    //     this.color = color;
    // }
    constructor(public color: string) {}

    protected drive(): void { // only available to child classes
        console.log('chugga chugga');
    }

    public honk(): void {
        console.log('beep');
    }
}

class Car extends Vehicle {
    constructor(public wheels: number, color:string ) {
        super(color);  // reference to the constructor method in the parent
    }
    protected drive(): void { // only available ot this class; restricts access of this function
        console.log('vroom');
    }

    private startUp(): void {
        console.log('cccchhhhh';)
    }

    starDrivingProcess(): void {
        this.drive();
        this.honk();
    }
}

const vehicle = new Vehicle();