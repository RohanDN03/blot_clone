// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold
// } = require("@google/generative-ai");

// const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI({
//     model:"gemini-2.0-flash-exp"
// });

// const generationConfig={
//     temperature:1,
//     topP:0.95,
//     topK:40,
//     maxOutputTokens:8192,
//     responseMimeType:"text/plain",
// }

// const CodeGenerationConfig={
//     temperature:1,
//     topP:0.95,
//     topK:40,
//     maxOutputTokens:8192,
//     responseMimeType:"application/json",
// }

//    export const chatSession = model.startChat({
//         generationConfig,
//         history:[],
// })
//     export const GenAiCode=model.startChat({
//         generationConfig:CodeGenerationConfig,
//         history:[],
//     });



// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());



import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing Gemini API Key. Set NEXT_PUBLIC_GEMINI_API_KEY in .env");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

const CodeGenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const GenAiCode = model.startChat({
  generationConfig: CodeGenerationConfig,
  history: [],
});









//     import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/genai";

// const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// if (!apiKey) {
//   throw new Error("Missing NEXT_PUBLIC_GEMINI_API_KEY in environment variables");
// }

// // Initialize client
// const genAI = new GoogleGenerativeAI({ apiKey });

// // Model name
// const MODEL_NAME = "gemini-2.0-flash-exp";

// // Configurations
// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// const codeGenerationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 8192,
//   responseMimeType: "application/json",
// };

// // Get model instance
// const model = genAI.getGenerativeModel({ model: MODEL_NAME });

// // Create chat sessions
// export const chatSession = model.startChat({
//   generationConfig,
//   history: [],
// });

// export const genAiCode = model.startChat({
//   generationConfig: codeGenerationConfig,
//   history: [],
// });

// // Export client & configs if needed elsewhere
// export { genAI, HarmCategory, HarmBlockThreshold };