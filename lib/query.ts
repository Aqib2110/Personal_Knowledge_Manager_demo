// import { InferenceClient } from "@huggingface/inference";

// if (!process.env.HF_TOKEN) {
//   throw new Error("HF_TOKEN is not set in environment variables");
// }

// const client = new InferenceClient(process.env.HF_TOKEN);

// export async function runQuery(
//   sections: { content: string }[],
//    query: string
// ): Promise<string> {
//   try {
//     if (!sections || sections.length === 0) {
//       return "No content available.";
//     }

//     // Combine document content
//     const documentText = sections
//       .map((section) => section.content || "")
//       .join("\n\n");

//     // Limit size to avoid huge payload
//     const trimmedText = documentText.slice(0, 15000);

//     const chatCompletion = await client.chatCompletion({
//       model: "openai/gpt-oss-120b:fastest",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are an AI assistant that answers questions strictly using the provided document content. If the answer is not found in the document, say 'Not found in document.'",
//         },
//         {
//           role: "user",
//           content: `
// Document:
// ${trimmedText}

// Question:
// ${query}

// Answer:
// `,
//         },
//       ],
//       temperature: 0.2,
//       max_tokens: 500,
//     });

//     return {
//       answer: chatCompletion.choices?.[0]?.message?.content || "No response generated.",
//       sectionName: chatCompletion.choices?.[0]?.message?.metadata?.sectionName || null,
//       matchScore: chatCompletion.choices?.[0]?.message?.metadata?.matchScore || null,
//     }
//   } catch (error) {
//     console.error("Hugging Face API error:", error);
//     return "Error generating response.";
//   }
// }

import { InferenceClient } from "@huggingface/inference";

if (!process.env.HF_TOKEN) {
  throw new Error("HF_TOKEN is not set in environment variables");
}

const client = new InferenceClient(process.env.HF_TOKEN);

type QueryResponse = {
  answer: string;
  sectionName: string | null;
  matchScore: number;
};

export async function runQuery(
  sections: { title?: string; content: string }[],
  query: string
): Promise<QueryResponse> {
  try {
    if (!sections || sections.length === 0) {
      return {
        answer: "No content available.",
        sectionName: null,
        matchScore: 0,
      };
    }

    const formattedSections = sections
      .map((section, index) => {
        const title = section.title || `Section ${index + 1}`;
        return `Section Title: ${title}\nContent:\n${section.content}`;
      })
      .join("\n\n---\n\n");

    const trimmedText = formattedSections.slice(0, 15000);

    const chatCompletion = await client.chatCompletion({
      model: "openai/gpt-oss-120b:fastest",
      messages: [
        {
          role: "system",
          content: `
You are an AI assistant that answers questions strictly using the provided document sections.

Return ONLY valid JSON in this format:

{
  "answer": "string",
  "sectionName": "string",
  "matchScore": number
}

Rules:
- If answer not found, set answer to "Not found in document."
- sectionName must be the section title where the answer was found.
- If no title exists, suggest a short descriptive section name.
- matchScore must be between 0 and 1 indicating relevance confidence.
- Do not return anything except JSON.
`,
        },
        {
          role: "user",
          content: `
Document Sections:
${trimmedText}

Question:
${query}
`,
        },
      ],
      temperature: 0.2,
      max_tokens: 500,
    });

    const raw = chatCompletion.choices?.[0]?.message?.content;

    if (!raw) {
      return {
        answer: "No response generated.",
        sectionName: null,
        matchScore: 0,
      };
    }
console.log("raw",raw);
    try {
      const parsed = JSON.parse(raw);

      return {
        answer: parsed.answer || "No answer generated.",
        sectionName: parsed.sectionName || null,
        matchScore:
          typeof parsed.matchScore === "number"
            ? Math.min(Math.max(parsed.matchScore, 0), 1)
            : 0,
      };
    } catch {
      return {
        answer: raw,
        sectionName: "Unknown Section",
        matchScore: 0.5,
      };
    }
  } catch (error) {
    console.error("Hugging Face API error:", error);

    return {
      answer: "Error generating response.",
      sectionName: null,
      matchScore: 0,
    };
  }
}

