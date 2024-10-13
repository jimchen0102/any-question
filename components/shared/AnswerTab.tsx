import { getUserAnswers } from '@/lib/actions/user.action'
import { SearchParamsProps } from '@/types'
import AnswerCard from '../cards/AnswerCard'

interface Props extends SearchParamsProps {
  userId: string
  clerkId?: string | null
}

const AnswerTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserAnswers({
    userId,
  })

  return (
    <>
      {result.answers.map((answer) => (
        <AnswerCard
          key={answer._id}
          _id={answer._id}
          clerkId={clerkId}
          question={answer.question}
          author={answer.author}
          upvotes={answer.upvotes}
          createdAt={answer.createdAt}
        />
      ))}
    </>
  )
}

export default AnswerTab
