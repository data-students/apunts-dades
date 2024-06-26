"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/Button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { Combobox } from "@/components/Combobox"
import { Checkbox } from "@/components/ui/checkbox"
import { ApuntsPostCreationRequest } from "@/lib/validators/post"
import { uploadFiles } from "@/lib/uploadthing"
import Fireworks from "react-canvas-confetti/dist/presets/fireworks"
import { MultiFileDropzone } from "@/components/MultiFileDropzone"
import { Textarea } from "./ui/Textarea"
import { MAX_FILE_COUNT, MAX_FILE_SIZE_MB } from "@/config"

const formSchema = z.object({
  pdf: z.array(z.any()),
  title: z.string({
    required_error: "Selecciona un títol",
  }),
  content: z
    .string()
    .max(320, {
      message: "La descripció ha de tenir com a màxim 320 caràcters.",
    })
    .optional()
    .default(""),
  year: z.string({
    required_error: "Selecciona un any",
  }),
  assignatura: z.string({
    required_error: "Selecciona una assignatura.",
  }),
  tipus: z.string({
    required_error: "Selecciona un tipus.",
  }),
  anonim: z.boolean().default(false),
  authorEmail: z.string({
    required_error: "Selecciona un email",
  }),
})
type FormSchemaType = z.infer<typeof formSchema>

export function ProfileForm({
  PreselectedSubject,
  isAdmin,
  generacio,
  semester,
}: {
  PreselectedSubject: string
  isAdmin: boolean
  generacio: number
  semester?: number
}) {
  const router = useRouter()
  const [assignatures, setAssignatures] = useState([])
  const [isVisible, setIsVisible] = useState(false)

  const { mutate: createApuntsPost } = useMutation({
    mutationFn: async ({
      pdf,
      title,
      content,
      year,
      assignatura,
      tipus,
      anonim,
      authorEmail,
    }: ApuntsPostCreationRequest) => {
      const payload: ApuntsPostCreationRequest = {
        pdf,
        title,
        content,
        year,
        assignatura,
        tipus,
        anonim,
        authorEmail,
      }
      const { data } = await axios.post("/api/subject/post/create", payload)
      return data
    },
    onError: (error) => {
      if ((error as any).response && (error as any).response.status === 406) {
        return toast({
          title: "Ja tens un post amb aquest títol per aquesta assignatura",
          description:
            "Si creus que això és un error, contacta amb nosaltres a hola@aed.cat",
        })
      } else {
        const Errmessage = (error as Error).message
          ? (error as Error).message
          : "No s'ha pogut crear el post."
        toast({
          title: Errmessage,
          description:
            "Alguna cosa ha anat malament, si creus que no hauria d'haver-hi cap problema, contacta amb nosaltres a hola@aed.cat",
          variant: "destructive",
        })
      }
    },
    onSuccess: (subjectAcronym) => {
      setIsVisible(true)
      router.push(`/${subjectAcronym}`)
      router.refresh()

      return toast({
        description: "El teu post s'ha creat correctament",
      })
    },
  })
  const form = useForm({
    resolver: zodResolver(formSchema),
  })
  useEffect(() => {
    if (PreselectedSubject !== "AllSubjects") {
      form.setValue("assignatura", PreselectedSubject)
    }
  }, [PreselectedSubject, form])
  useEffect(() => {
    if (!isAdmin) {
      form.setValue("authorEmail", "Uploader")
    }
  }, [form, isAdmin])
  async function onSubmit(data: FormSchemaType) {
    const res = await uploadFiles("fileUploader", {
      files: data.pdf,
    })
    const payload: ApuntsPostCreationRequest = {
      pdf: res,
      title: data.title,
      content: data.content,
      year: Number(data.year),
      assignatura: data.assignatura,
      tipus: data.tipus,
      anonim: data.anonim,
      authorEmail: data.authorEmail,
    }

    createApuntsPost(payload)
  }

  useEffect(() => {
    async function fetchAssignatures() {
      try {
        const response = await axios.get("/api/subject/all/value-label")
        setAssignatures(response.data)
      } catch (error) {
        toast({
          title: "No s'han pogut carregar les assignatures",
          description: `Error fetching subjects: ${error}`,
        })
      }
    }
    fetchAssignatures()
  }, [])

  const tipus = [
    {
      value: "apunts",
      label: "Apunts",
    },
    {
      value: "examens",
      label: "Exàmens",
    },
    {
      value: "exercicis",
      label: "Exercicis",
    },
    {
      value: "diapositives",
      label: "Diapositives",
    },
    {
      value: "altres",
      label: "Altres",
    },
  ]

  const date = new Date()
  const end = date.getFullYear()
  interface Year {
    value: string
    label: string
  }
  let tipus_any: Year[] = []
  for (let i = generacio; i < end; i++) {
    tipus_any.push({
      value: i.toString(),
      label: i.toString(),
    })
  }
  const default_year = semester
    ? (generacio + Math.floor((semester - 1) / 2)).toString()
    : undefined

  return (
    <div className="mb-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
            <FormField
              control={form.control}
              name="pdf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fitxers PDF</FormLabel>
                  <FormControl>
                    <div className="w-full max-w-sm items-center gap-1.5">
                      <MultiFileDropzone
                        value={field.value}
                        onChange={(acceptedFiles) => {
                          if (
                            acceptedFiles.length > MAX_FILE_COUNT ||
                            acceptedFiles.some(
                              (file) => file.size >= MAX_FILE_SIZE_MB * 10 ** 6,
                            )
                          ) {
                            toast({
                              variant: "destructive",
                              title: "Fitxers no vàlids",
                              description:
                                "Només pots pujar fins a 10 fitxers de menys de 32MB cada un.",
                            })
                            field.onChange([])
                          } else {
                            field.onChange(acceptedFiles)
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Penja els teus apunts en format PDF.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Títol dels Apunts</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="WhoIsGraf?"
                        {...field}
                        className="my-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Descripció (opcional)"
                        className="resize-none my-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
            {PreselectedSubject === "AllSubjects" && (
              <FormField
                control={form.control}
                name="assignatura"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignatura</FormLabel>
                    <FormControl>
                      <Combobox
                        options={assignatures}
                        value={field.value}
                        setValue={field.onChange}
                        width="full"
                      />
                    </FormControl>
                    <FormDescription>Tria l&apos;assignatura.</FormDescription>
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => {
                if (!field.value && default_year) {
                  field.value = default_year
                  field.onChange(default_year)
                }

                return (
                  <FormItem>
                    <FormLabel>Any</FormLabel>
                    <FormControl>
                      <Combobox
                        options={tipus_any}
                        value={field.value}
                        setValue={field.onChange}
                        width="full"
                      />
                    </FormControl>
                    <FormDescription>
                      Any que has cursat l&apos;assignatura.
                    </FormDescription>
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="tipus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipus</FormLabel>
                  <FormControl>
                    <Combobox
                      options={tipus}
                      value={field.value}
                      setValue={field.onChange}
                      width="full"
                    />
                  </FormControl>
                  <FormDescription>Tria el tipus de document.</FormDescription>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="anonim"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Penjar com a anònim</FormLabel>
                  <FormDescription>
                    L&apos;AED guarda sempre l&apos;autor dels apunts.
                    L&apos;opció d&apos;anònim permet que no es mostrin als
                    altres usuaris.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          {isAdmin && (
            <FormField
              control={form.control}
              name="authorEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Uploader" {...field} />
                  </FormControl>
                  <FormDescription>
                    Aquest camp t&apos;apareix ja que ets admin i tens permís
                    per a compartir apunts en nom d&apos;algú altre. Escriu
                    &quot;Uploader&quot; si els comparteixes en nom teu.
                    <br />
                    Gràcies per ajudar!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button type="submit" isLoading={form.formState.isSubmitting}>
            Submit
          </Button>
          {isVisible && <Fireworks autorun={{ speed: 0.5 }} />}
        </form>
      </Form>
    </div>
  )
}

export default ProfileForm
