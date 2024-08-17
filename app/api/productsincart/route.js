import { promises as fs } from 'fs';
export async function GET() {
    try {
        const res = await fs.readFile('cartproducts/products.json', 'utf-8');

        return new Response(res, {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (e) {
        console.error(e.message);
        return new Response(JSON.stringify({ error: 'Internal Server error' }, {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        }));
    }
}