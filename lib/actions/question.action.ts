'use server'

import Question from '@/database/question.model'
import Tag from '@/database/tag.model'
import { connectToDatabase } from '../mongoose'

export async function createQuestion(params: any) {
  // eslint-disable-next-line no-empty
  try {
    connectToDatabase()

    const { title, content, tags, author, path } = params

    const question = await Question.create({
      title,
      content,
      author,
    })

    const tagDocument = []

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      )

      tagDocument.push(existingTag._id)
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocument } },
    })
  } catch (error) {}
}
