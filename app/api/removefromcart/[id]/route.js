import {promises as fs} from 'fs';
export async function DELETE(req,{ params }) {
    try {
        // const products=await req.json(); 
        const jsonData= fs.readFile('cartproducts/products.json','utf-8');
        const { id } = params;
        const prodIndex = jsonData.findIndex(product => product.id === id);
        if (prodIndex === -1) {
            return new Response(JSON.stringify({ message: 'Product not found' },
                {
                    headers: { 'Content-Type': 'application/json' },
                    status: 404
                }
            ));
        }
        else {
            jsonData.splice(prodIndex, 1);

            return new Response(JSON.stringify({ message: 'Product successfully deleted', }, {
                headers: { 'Content-Type': 'application/json' },
                status: 200
            }));
        }
    } catch (e) {
        return new Response(JSON.stringify({ error: 'Error removing the product' },
            {
                headers: { 'Content-Type': 'application/json' },
                status: 500
            }
        ))
    }
}