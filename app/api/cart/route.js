import {promises as fs } from 'fs';
export async function POST(req){
    try {   
        const body=await req.json();
        fs.writeFile('cartproducts/products.json',JSON.stringify(body,null,4));
        return new Response(JSON.stringify({message:'Product data added successfully.'},{
            headers:{'Content-Type': 'application/json'},
            status: 200
        }));
    } catch (e) {
        console.error('Error parsing JSON ',e.message);
        return new Response(JSON.stringify({error:'Failed to add the cart products data'},{
            headers:{'Content-Type': 'application/json'},
            status:400
        }));
    }

}