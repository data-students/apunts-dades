import {
  Post,
  Subject,
  PostVote,
  QuestionVote,
  User,
  Comment,
  Question,
  Answer,
} from "@prisma/client"

export type ExtendedPost = Post & {
  subject: Subject
  votes: PostVote[]
  author: User
  comments: Comment[]
}

export type ExtendedQuestion = Question & {
  subject: Subject
  votes: QuestionVote[]
  author: User
  answers: Answer[]
}

export type ExtendedAnswer = Answer & {
  question: Question
  votes: Vote[]
  author: User
}

export type ExtendedComment = Comment & {
  votes: Vote[]
  author: User
}
