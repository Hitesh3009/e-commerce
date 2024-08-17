import {promises as fs } from 'fs';
export async function POST(req){
    try {   
        const body=await req.json(); // Access the returned json body
        fs.writeFile('cartproducts/products.json',JSON.stringify(body,null,4)); // writes the data into the specified directory

        // Return the success message after successfully writing the JSON file
        return new Response(JSON.stringify({message:'Product data added successfully.'},{
            headers:{'Content-Type': 'application/json'},
            status: 200
        }));

    } catch (e) {
        console.error('Error parsing JSON ',e.message); //If any error is encountered while parsing the JSON

        //Display the error message as json response
        return new Response(JSON.stringify({error:'Failed to add the cart products data'},{
            headers:{'Content-Type': 'application/json'},
            status:400
        }));
    }

}