/** 
 * Function for expanding information about the city.
 * @param {string} csvText - The CSV text containing city information.
 * @returns {Function} - A function for replacing city names with extended information.
 */
export function cityInformation(csvText) {
    // a variable that stores a reference to the parsed csvText
    let topCities;
    // Function to check if CSV text has changed
    const isCSVChanged = (newCSVText) => csvText !== newCSVText;

    if (!topCities || isCSVChanged(csvText)) {
        // If topCities does not yet exist, then we parse and save the result
        topCities = parseCSV(csvText);
    }
    /**
     * Replace city names in the input string with extended information.
     * @param {string} inputString - The input string containing city names.
     * @returns {string} - The input string with replaced city names and extended information.
     */
    const replaceText = (inputString) => {
        const cityReplacementMap = topCities;
        const cities = inputString.split(/[,\n]/).map(city => city.trim());
        return cities.map(cityName => {
            const cityInfo = cityReplacementMap[cityName];
            return cityInfo
                ? JSON.stringify({ [cityName]: cityInfo })
                : `${cityName} not found in the top cities list.`;
        }).join('\n');
    };
    return replaceText;
}
/**
 * Parse CSV text to extract city information.
 * @param {string} csvText - The CSV text containing city information.
 * @returns {Object} - An object containing information about the top cities.
 */
export function parseCSV(csvText) {
    return csvText
        .split('\n') // split the entire line into an array of lines on transitions to a new line
        .filter(line => line !== '' && !line.startsWith('#')) // filter empty and comment lines    
        .map(line => line.split(',').map(entry => entry.trim())) //Trim the spaces of each line
        .map(([x, y, name, population]) => ({
            x: parseFloat(x),
            y: parseFloat(y),
            name: name.replace('#', ''),
            population: parseInt(population, 10)
        })) // Make associative arrays from rows       
        .sort((a, b) => b.population - a.population) // sort cities by population
        .slice(0, 10) // Choose TOP-10 cities by population
        .reduce((result, city, index) => {
            const cityName = city.name;
            const cityPopulation = city.population;
            result[cityName] = {
                population: cityPopulation,
                rating: index + 1
            };
            return result;
        }, {}); // create one object from an array of objects
}