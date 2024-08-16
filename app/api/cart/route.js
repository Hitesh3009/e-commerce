export async function POST(req) {
    const {prod}=await req.json();
    console.log(prod);

    return new Response('res',{
        headers:{'Content-Type': 'application/json'},
        status: 200,
    });
}
