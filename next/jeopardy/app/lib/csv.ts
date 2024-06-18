// import { parse } from 'csv-parse/sync';
// import { promises as fsPromises } from 'fs';

// /**
//  * Read in a CSV file
//  * @param filePath
//  * @returns parsed CSV file
//  */
// export async function read(filePath: string): Promise<any[]> {
//     try {
//         // Read the CSV file
//         const csvData = await fsPromises.readFile(filePath, 'utf8');

//         // Parse CSV data
//         const records = parse(csvData, {
//             columns: true, // Treat the first row as headers
//             skip_empty_lines: true, // Skip any empty lines,
//             delimiter: ','
//         });

//         return records;
//     } catch (err) {
//         console.error('Error reading or parsing the CSV file:', err);
//         throw err; // Throw the error to handle it elsewhere
//     }
// }
