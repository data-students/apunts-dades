import { buttonVariants } from "@/components/ui/Button"
import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import {
  HomeIcon,
  FileQuestionIcon,
  FileTextIcon,
  InfoIcon,
} from "lucide-react"
import { notFound } from "next/navigation"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import SubscribeHeartToggle from "@/components/SubscribeHeartToggle"

const Layout = async ({
  children,
  params: { slug },
}: {
  children: React.ReactNode
  params: { slug: string }
}) => {
  const session = await getAuthSession()

  const subject = await db.subject.findFirst({
    where: { acronym: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
      questions: {
        include: {
          answers: true,
        },
      },
    },
  })

  const subscription = !session?.user
    ? undefined
    : await db.subscription.findFirst({
        where: {
          subject: {
            acronym: slug,
          },
          user: {
            id: session.user.id,
          },
        },
      })

  const isSubscribed = !!subscription

  if (!subject) return notFound()

  const memberCount = await db.subscription.count({
    where: {
      subject: {
        acronym: slug,
      },
    },
  })

  const mostRecentPostYear = subject.posts.reduce((acc, post) => {
    if (post.year > acc) return post.year
    return acc
  }, 0)

  const questionCount = await db.question.count({
    where: {
      subject: {
        acronym: slug,
      },
    },
  })

  const unAnsweredQuestionCount = await db.question.count({
    where: {
      subject: {
        acronym: slug,
      },
      answers: {
        none: {},
      },
    },
  })

  const startsWithVowel = /^[aeiouàáâãäåæçèéêëìíîïðòóôõöøùúûüýÿ]/i
  const subjectNameArticle = subject.name.match(startsWithVowel) ? "d'" : "de "

  return (
    <div className="sm:container max-w-7xl mx-auto h-full pt-12">
      <div>
        <a href={"/"} className={buttonVariants({ variant: "ghost" })}>
          <HomeIcon className="h-4 w-4 mr-2" />
          Inici
        </a>

        <a href={`/${slug}/`} className={buttonVariants({ variant: "ghost" })}>
          <FileTextIcon className="h-4 w-4 mr-2" />
          Apunts
        </a>

        <a
          href={`/${slug}/q/`}
          className={buttonVariants({ variant: "ghost" })}
        >
          <FileQuestionIcon className="h-4 w-4 mr-2" />
          Preguntes
        </a>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span className={buttonVariants({ variant: "ghost" })}>
                <InfoIcon className="h-4 w-4 mr-2" />
                Més sobre els apunts {subjectNameArticle}
                {subject.name}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <div className="hidden md:block overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
                <div className="px-6 py-4">
                  <p className="font-semibold py-3">
                    Apunts {subjectNameArticle}
                    {subject.name}
                  </p>
                </div>

                <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
                  <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Membres</dt>
                    <dd className="text-gray-700">{memberCount}</dd>
                  </div>
                  <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Subscripció</dt>
                    <dd className="text-gray-700">
                      {isSubscribed ? "Subscrit" : "No subscrit"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Quadrimestre</dt>
                    <dd className="text-gray-700">{subject.semester}</dd>
                  </div>
                  <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Apunts més recents</dt>
                    <dd className="text-gray-700">{mostRecentPostYear}</dd>
                  </div>
                  <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Preguntes</dt>
                    <dd className="text-gray-700">{questionCount}</dd>
                  </div>
                  <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Preguntes sense respondre</dt>
                    <dd className="text-gray-700">{unAnsweredQuestionCount}</dd>
                  </div>
                  {subject.creatorId === session?.user?.id ? (
                    <div className="flex justify-between gap-x-4 py-3">
                      <p className="text-gray-500">
                        Pots editar aquesta assignatura
                      </p>
                    </div>
                  ) : null}
                </dl>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {subject.creatorId !== session?.user?.id ? (
          <SubscribeHeartToggle
            subjectId={subject.id}
            subjectName={subject.name}
            isSubscribed={isSubscribed}
          />
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
          <div className="flex flex-col col-span-3 space-y-6">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Layout
