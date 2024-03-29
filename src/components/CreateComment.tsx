"use client"

import { Session } from "next-auth"
import { Button } from "@/components/ui/Button"
import { FC, useState } from "react"
import UserAvatar from "./UserAvatar"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import { toast } from "@/hooks/use-toast"

interface CreateComment {
  session: Session | null
  postId: string
}

const CreateComment: FC<CreateComment> = ({ session, postId }) => {
  const [content, setContent] = useState("")

  // Define the mutation function using useMutation hook
  const { mutate: createComment, isLoading } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post("/api/subject/comment/create", {
        content: content,
        postId,
      })
      return data
    },
    onSuccess: ({}) => {
      toast({
        description: `Comment created successfully`,
      })
      setContent("")
      window.location.reload()
    },
    onError: ({}) => {
      toast({
        title: "Something went wrong",
        description: `The comment could not be created. Please try again later.`,
        variant: "destructive",
      })
    },
  })

  const handleSubmit = async () => {
    // Call the mutate function to initiate the mutation
    createComment()
  }

  return (
    <div className="overflow-hidden rounded-md bg-white shadow">
      <div className="h-auto px-6 py-4 flex flex-col justify-between">
        <div className="flex items-start gap-6">
          <div className="relative">
            <UserAvatar
              user={{
                name: session?.user?.name || null,
                image: session?.user?.image || null,
              }}
            />
            <span className="absolute bottom-1 right-1 transform translate-x-1/2 translate-y-1/2 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white" />
          </div>
          {/* form */}
          <div className="flex-grow">
            <div className="h-full">
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-full sm:w-auto mt-2"
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Compartir
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateComment
