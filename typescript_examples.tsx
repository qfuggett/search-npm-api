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