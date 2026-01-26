import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function runQuery(sections: any[], query: string) 
{
const intent = await detectIntentWithAI(query);

switch(intent)
{
    case "SUMMARY":
        return await generateSummaryWithAI(sections);

    case "SEARCH":
        return await searchInSections(sections, query);
    default:
        return "this question is outside of the document scope";
}
}

async function detectIntentWithAI(query:string):Promise<string>
{
    const prompt = `Classify the intent of the following user query into one of two categories: "SUMMARY" or "SEARCH" or "OUT_OF_SCOPE".`;

    const response = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
            {
                role: "system",
                content: prompt
            },
            {
                role: "user",
                content: query
            }
        ],
        temperature: 0,
    });

    return response.choices[0].message.content || "OUT_OF_SCOPE";
}


async function generateSummaryWithAI(sections:any[]):Promise<string>
{
    const prompt = `Provide a concise summary of the following document sections based on the document and if the answer doesn't present in the document say "NOT PRESENT IN DOCUMENT": ${sections.map((section:any) => `Title: ${section.title}\nContent: ${section.content}`).join('\n\n')}`;

    const response = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
            {
                role: "system",
                content: prompt
            }
        ],
        temperature: 0,
    });

    return response.choices[0].message.content || "NOT PRESENT IN DOCUMENT";
}

async function searchInSections(sections:any[], query:string):Promise<string>
{
    const prompt = `Based on the following document sections, answer the user query. If the answer is not present in the document, respond with "NOT PRESENT IN DOCUMENT": ${sections.map((section:any) => `Content: ${section.content}`).join('\n\n')}\n\nUser Query: ${query}`;

    const response = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
            {
                role: "system",
                content: prompt
            }
        ],
        temperature: 0,
    });

    return response.choices[0].message.content || "NOT PRESENT IN DOCUMENT";
}