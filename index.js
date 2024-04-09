// if i want to create base on Country India Check 78 line to All Country All state Area bulk code push

const { MongoClient } = require('mongodb');
const { Country, State, City } = require('country-state-city');

// MongoDB connection string
const connectionString = 'mongodb+srv://admin:admin123@cluster0.n7xxrpc.mongodb.net/AtticaPanMasalaBackend?retryWrites=true&w=majority&appName=Cluster0';

// Function to connect to MongoDB Atlas
async function connectToMongoDB() {
    try {
        const client = await MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
        return client.db(); // Return the database object directly
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
    }
}

// Function to insert states for India
async function insertStatesForIndia(db) {
    const statesBulk = db.collection('states').initializeOrderedBulkOp();
    const states = State.getStatesOfCountry('IN'); // 'IN' is the ISO code for India

    states.forEach(state => {
        statesBulk.insert({ name: state.name, short_name: state.isoCode });
    });

    try {
        const result = await statesBulk.execute();
        console.log("States for India inserted:", result);
    } catch (error) {
        console.error("Error inserting states for India:", error);
        throw error;
    }
}

// Function to insert cities for India 
async function insertCitiesForIndia(db) {
    const citiesBulk = db.collection('cities').initializeOrderedBulkOp();
    const cities = City.getCitiesOfCountry('IN'); // 'IN' is the ISO code for India

    cities.forEach(city => {
        
        citiesBulk.insert({ name: city.name, stateName: city.stateCode });
        // console.log(city.stateCode)
       

    });
    try {
        const result = await citiesBulk.execute();
        console.log("Cities for India inserted:", result);
    } catch (error) {
        console.error("Error inserting cities for India:", error);
        throw error;
    }
}

// Main function to run all operations
async function main() {
    try {
        const db = await connectToMongoDB();
        await insertStatesForIndia(db);
        await insertCitiesForIndia(db);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// Call the main function
main();





// *************************All Country All States  All City***********************************************
const { MongoClient } = require('mongodb');
const { Country, State, City } = require('country-state-city');

// MongoDB connection string
const connectionString = 'mongodb+srv://admin:admin123@cluster0.n7xxrpc.mongodb.net/counrtiesdatabase?retryWrites=true&w=majority&appName=Cluster0';

// Function to connect to MongoDB Atlas
async function connectToMongoDB() {
    try {
        const client = await MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
        return client.db(); // Return the database object directly
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
    }
}

// Function to insert countries
async function insertCountries(db) {
    const countriesBulk = db.collection('countries').initializeOrderedBulkOp();
    const countries = Country.getAllCountries();
    console.log(countries)

    countries.forEach(country => {
        countriesBulk.insert({ name: country.name, short_name: country.isoCode });
    });

    try {
        const result = await countriesBulk.execute();
        console.log("Countries inserted:", result);
    } catch (error) {
        console.error("Error inserting countries:", error);
        throw error;
    }
}

// Function to insert states
async function insertStates(db) {
    const statesBulk = db.collection('states').initializeOrderedBulkOp();
    const states = State.getAllStates();

    states.forEach(state => {
        statesBulk.insert({ name: state.name, short_name: state.isoCode });
    });

    try {
        const result = await statesBulk.execute();
        console.log("States inserted:", result);
    } catch (error) {
        console.error("Error inserting states:", error);
        throw error;
    }
}

// Function to insert cities
async function insertCities(db) {
    const citiesBulk = db.collection('cities').initializeOrderedBulkOp();
    const cities = City.getAllCities();

    cities.forEach(city => {
        citiesBulk.insert({ name: city.name, state_name: city.stateId });
    });

    try {
        const result = await citiesBulk.execute();
        console.log("Cities inserted:", result);
    } catch (error) {
        console.error("Error inserting cities:", error);
        throw error;
    }
}

// Main function to run all operations
async function main() {
    try {
        const db = await connectToMongoDB();
        await insertCountries(db);
        await insertStates(db);
        await insertCities(db);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// Call the main function
main();






