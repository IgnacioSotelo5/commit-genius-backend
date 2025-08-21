import { Elysia, t } from "elysia";
import { Groq } from "groq-sdk";
import {cors} from "@elysiajs/cors"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || (() => {
    throw new Error('GROQ_API_KEY is required')
  })()
})
const app = new Elysia()

.get("/", () => "Hello Elysia")
.post("/generate-commit", async ({body}) => {  
  const {diff} = body  

  try {
    const groqResponse = await groq.chat.completions.create({
      model: 'openai/gpt-oss-120b',
      messages: [
        {
          role: 'user',
          content: `
          Analiza este diff y genera 3 commits descriptivos siguiendo conventional commits.
          El formato esperado en la respuesta es JSON y UNICAMENTE JSON, nada de texto extra.
          La estructura aceptada en el JSON es la siguiente:
          [{"title": "type(scope): descripción", "description": "descripcion detallada"}, ...]
          Cada commit debe tener título con el tipo de commit (feat, chore, fix, etc) y una descripcion detallada.
          Diff: ${diff}`
        }
      ]
    })
    
    const commits = groqResponse.choices[0].message.content
    
    const parsedCommits = JSON.parse(commits || '[]')
    if(!Array.isArray(parsedCommits) || parsedCommits.length !== 3) {
      throw new Error('Invalid response format from AI.')
    }    

    return {commits: parsedCommits}
    
  } catch (error: any) {
    console.error('Groq API error:', error)
    return {error: 'Failed to generate commits'}
  }
  

}, {
  body: t.Object({
    diff: t.String()
  }),
  response: {
    200: t.Object({
      commits: t.Array(
        t.Object({
          title: t.String(),
          description: t.String()
        })
      )
    }),
    400: t.Object({
      error: t.String()
    })
  }  
})
.use(cors())

.listen(3000);
