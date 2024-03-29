import CreatePost from "@/components/CreatePost"
import PostFeed from "@/components/PostFeed"
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config"
import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    slug: string
  }
}

const page = async ({ params }: PageProps) => {
  const { slug } = params

  const session = await getAuthSession()

  const subject = await db.subject.findFirst({
    where: { acronym: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: {
            include: {
              _count: true,
            },
          },
          subject: true,
        },
        orderBy: {
          createdAt: "desc",
        },

        take: INFINITE_SCROLL_PAGINATION_RESULTS,
      },
    },
  })

  if (!subject) return notFound()

  return (
    <>
      <h1 className="text-3xl md:text-4xl h-14">
        <span className="font-bold">{subject.acronym}/</span>
        {subject.name}
      </h1>

      <CreatePost session={session} />

      <PostFeed initialPosts={subject.posts} subjectAcronym={subject.acronym} />
    </>
  )
}

export default page
