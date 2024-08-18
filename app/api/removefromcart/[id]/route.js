import { promises as fs } from 'fs';
export async function DELETE(req, { params }) {
    try {
        const { products } = await req.json();
        const { id } = params;

        const prodIndex = products.findIndex(product => product.id === Number(id));
        if (prodIndex === -1) {
            return new Response(JSON.stringify({ message: 'Product not found' }), {
                headers: { 'Content-Type': 'application/json' },
                status: 404
            });
        }
        else {
            products.splice(prodIndex, 1);
            await fs.writeFile('cartproducts/products.json', JSON.stringify(products, null, 4), 'utf-8');
            return new Response(JSON.stringify({ message: 'Product successfully deleted' }), {
                headers: { 'Content-Type': 'application/json' },
                status: 200
            });
        }
    } catch (e) {
        return new Response(JSON.stringify({ error: 'Error removing the product' }),
            {
                headers: { 'Content-Type': 'application/json' },
                status: 500
            });
    }
}