// import { OpenAI } from "openai";
// import { NextResponse } from "next/server";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(request: Request) {
//   const { message } = await request.json();

//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: message }],
//     });

//     return NextResponse.json({ reply: response.choices[0].message.content });
//   } catch (error) {
//     console.error("Error fetching AI response:", error);
//     return NextResponse.json(
//       { error: "Something went wrong. Please try again later." },
//       { status: 500 }
//     );
//   }
// }
