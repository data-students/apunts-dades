import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

export async function GET(req: Request) {
  const url = new URL(req.url)

  const session = await getAuthSession()

  let followedCommunitiesIds: string[] = []

  if (session && session.user) {
    const followedCommunities = await db.subscription.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        subject: true,
      },
    })

    followedCommunitiesIds = followedCommunities.map((sub) => sub.subject.id)
  }

  try {
    const { limit, page, subjectAcronym } = z
      .object({
        limit: z.string(),
        page: z.string(),
        subjectAcronym: z.string().nullish().optional(),
      })
      .parse({
        subjectAcronym: url.searchParams.get("subjectAcronym"),
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      })

    let whereClause = {}

    if (subjectAcronym) {
      whereClause = {
        subject: {
          acronym: subjectAcronym,
        },
      }
    } else if (session) {
      whereClause = {
        subject: {
          id: {
            in: followedCommunitiesIds,
          },
        },
      }
    }

    const questions = await db.question.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
      orderBy: {
        createdAt: "desc",
      },
      include: {
        subject: true,
        votes: true,
        author: true,
        answers: true,
      },
      where: whereClause,
    })

    return new Response(JSON.stringify(questions))
  } catch (error) {
    return new Response("Could not fetch posts", { status: 500 })
  }
}
