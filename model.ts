import 'dotenv/config'
async function generate(){
  const res = await fetch("https://api.deepseek.com/account/balance", {
  headers: { "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}` },
});

console.log(process.env.DEEPSEEK_API_KEY)
const data = await res.json();
console.log(data);
}
generate();