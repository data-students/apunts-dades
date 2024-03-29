"use client"

import { formatTimeToNow } from "@/lib/utils"
import { Question, User, QuestionVote } from "@prisma/client"
import { MessageSquare } from "lucide-react"
import Link from "next/link"
import { FC, useRef } from "react"
import EditorOutput from "./EditorOutput"
import QuestionVoteClient from "./votes/QuestionVoteClient"

type PartialVote = Pick<QuestionVote, "type">

interface QuestionProps {
  question: Question & {
    author: User
    votes: QuestionVote[]
  }
  votesAmt: number
  subjectName: string
  currentVote?: PartialVote
  answerAmt: number
  subjectAcronym: string
}

const QuestionComponent: FC<QuestionProps> = ({
  question,
  votesAmt: _votesAmt,
  currentVote: _currentVote,
  subjectName,
  answerAmt,
  subjectAcronym,
}) => {
  const pRef = useRef<HTMLParagraphElement>(null)

  return (
    <div className="rounded-md bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        <QuestionVoteClient
          initialVotesAmt={_votesAmt}
          questionId={question.id}
          initialVote={_currentVote?.type}
        />

        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500">
            {subjectName ? (
              <>
                <a
                  className="underline text-zinc-900 text-sm underline-offset-2"
                  href={`/${subjectAcronym}`}
                >
                  {subjectAcronym}
                </a>
                <span className="px-1">•</span>
              </>
            ) : null}
            <span>Compartit per {question.author.name}</span>{" "}
            {formatTimeToNow(new Date(question.createdAt))}
          </div>
          <a href={`/${subjectAcronym}/q/${question.id}`}>
            <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
              {question.title}
            </h1>
          </a>

          <div
            className="relative text-sm max-h-40 w-full overflow-clip"
            ref={pRef}
          >
            <EditorOutput content={question.content} />
            {pRef.current?.clientHeight === 160 ? (
              // blur bottom if content is too long
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 z-20 text-sm px-4 py-4 sm:px-6">
        <Link
          href={`/${subjectName}/q/${question.id}`}
          className="w-fit flex items-center gap-2"
        >
          <MessageSquare className="h-4 w-4" /> {answerAmt} answers
        </Link>
      </div>
    </div>
  )
}
export default QuestionComponent
