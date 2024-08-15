export async function POST(req){
    const res=await req.json();
    console.log(res);

    return new Response('res',{
        headers:{'Content-Type': 'application/json'},
        status:200
    });
}