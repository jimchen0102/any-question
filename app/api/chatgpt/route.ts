import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  const { question } = await request.json()

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              '你是一位資深的開發人員，請以正體中文提供盡可能全面的回答。',
          },
          {
            role: 'user',
            content: `請提供我問題的答案 ${question}`,
          },
        ],
      }),
    })

    const data = await response.json()
    const reply = data.choices[0].message.content

    return NextResponse.json({ reply })
  } catch (error: any) {
    return NextResponse.json({ error: error.message })
  }
}
