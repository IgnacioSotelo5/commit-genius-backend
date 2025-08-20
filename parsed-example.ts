// import { Elysia, t } from "elysia";
// import { Groq } from "groq-sdk";
// import {cors} from "@elysiajs/cors"

// const groq = new Groq({apiKey: process.env.GROQ_API_KEY})
// const app = new Elysia()

// .get("/", () => "Hello Elysia")
// .post("/generate-commit", async ({body}) => {  
//   const {diff} = body

//   try {
//     const groqResponse = await groq.chat.completions.create({
//       model: 'openai/gpt-oss-120b',
//       messages: [
//         {
//           role: 'user',
//           content: `Analiza este diff y genera 3 commits descriptivos siguiendo conventional commits. Diff: ${diff}`
//         }
//       ]
//     })
    
//     const commits = groqResponse.choices[0].message.content

//     const parsedCommits = commits?.replaceAll('**', '').replaceAll('\n', ' ').replaceAll('---', "").split('```')

//     let filteredCommit: string[] = [];
//     const commitKeywords = ['feat', 'fix', 'refactor', 'test', 'docs', 'chore']

//     for(let i = 0; i < parsedCommits!.length; i++){
//      if(i % 2 !== 0){
//       filteredCommit.push(parsedCommits![i].trim())
//      }
//     }

//     const finalCommits = filteredCommit.filter(item => commitKeywords.some(keyword =>item.startsWith(keyword + '(')))


//     return {commits: [...finalCommits]}
    
//   } catch (error: any) {
//     throw new Error(error.message)
//   }
  
  

// }, {
//   body: t.Object({
//     diff: t.String()
//   }),
//   response: {
//     200: t.Object({
//       commits: t.Array(t.String())
//     }),
//     400: t.Object({
//       error: t.String()
//     })
//   }  
// })
// .use(cors())

// .listen(3000);
// console.log(
//   `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
// );
