import { InferenceClient } from "@huggingface/inference";

if (!process.env.HF_TOKEN) {
  throw new Error("HF_TOKEN is not set in environment variables");
}

const client = new InferenceClient(process.env.HF_TOKEN);

export async function runQuery(
  sections: { content: string }[],
   query: string
): Promise<string> {
  try {
    if (!sections || sections.length === 0) {
      return "No content available.";
    }

    // Combine document content
    const documentText = sections
      .map((section) => section.content || "")
      .join("\n\n");

    // Limit size to avoid huge payload
    const trimmedText = documentText.slice(0, 15000);

    const chatCompletion = await client.chatCompletion({
      model: "openai/gpt-oss-120b:fastest",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that answers questions strictly using the provided document content. If the answer is not found in the document, say 'Not found in document.'",
        },
        {
          role: "user",
          content: `
Document:
${trimmedText}

Question:
${query}

Answer:
`,
        },
      ],
      temperature: 0.2,
      max_tokens: 500,
    });

    return (
      chatCompletion.choices?.[0]?.message?.content ||
      "No response generated."
    );
  } catch (error) {
    console.error("Hugging Face API error:", error);
    return "Error generating response.";
  }
}


