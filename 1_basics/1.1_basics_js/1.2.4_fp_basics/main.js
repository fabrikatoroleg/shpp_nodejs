/**
 * Main file for processing city information using CSV data.
 * Imports functions 'cityInformation' and 'parseCSV' from 'cityInformation.js'.
 */
import { cityInformation, parseCSV } from './cityInformation.js';
const inputText = "Біла Церква, Вінниця, Одеса";
const csvText = `44.38,34.33,Алушта,31440,
49.46,30.17,Біла Церква,200131,
49.54,28.49,Бердичів,87575,#некомент

#
46.49,36.58,#Бердянськ,121692,
49.15,28.41,Вінниця,356665,
#45.40,34.29,Джанкой,43343,

# в цьому файлі три рядки-коментарі :)`

const parsedetText = parseCSV(csvText);
console.log(parsedetText);

const convertedCityInformation = cityInformation(csvText);
console.log(convertedCityInformation(inputText));