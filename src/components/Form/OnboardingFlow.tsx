"use client"

import React, { useState } from "react"
import { Button } from "@/shadcn/button"
import dynamic from "next/dynamic"
import { type getDictionary } from "@/src/get-dictionary"

const Form = dynamic(() => import("@/components/Form/Form"))

type Option = { label: string; isOther?: boolean }

type Question = {
  id: string
  title: string
  options: Option[]
}

const translations = {
  es: [
    {
      id: "q1",
      title: "¿Qué tipo de solución tecnológica estás buscando principalmente?",
      options: [
        { label: "Desarrollo de Software a Medida / App" },
        { label: "Diseño y Desarrollo de Sitio Web" },
        { label: "E-commerce" },
        { label: "Otro", isOther: true },
      ],
    },
    {
      id: "q2",
      title: "¿Cuál es el principal objetivo de este proyecto?",
      options: [
        { label: "Automatizar y optimizar procesos internos" },
        { label: "Aumentar ventas y conseguir más clientes online" },
        { label: "Mejorar la imagen corporativa y profesionalismo" },
        { label: "Otro", isOther: true },
      ],
    },
    {
      id: "q3",
      title: "¿En qué etapa se encuentra actualmente tu proyecto?",
      options: [
        { label: "Es solo una idea / Empezando desde cero" },
        { label: "Ya tengo requerimientos o un diseño base" },
        { label: "Ya tengo un negocio operando y busco escalarlo digitalmente" },
        { label: "Otro", isOther: true },
      ],
    },
    {
      id: "q4",
      title: "¿Cuál es tu presupuesto estimado para este proyecto?",
      options: [
        { label: "Básico / Emprendedor ($1k - $5k)" },
        { label: "Estándar / Pyme ($5k - $10k)" },
        { label: "Avanzado / Corporativo (Más de $10k)" },
        { label: "Otro", isOther: true },
      ],
    },
  ],
  en: [
    {
      id: "q1",
      title: "What type of technology solution are you primarily looking for?",
      options: [
        { label: "Custom Software Development / App" },
        { label: "Website Design & Development" },
        { label: "E-commerce" },
        { label: "Other", isOther: true },
      ],
    },
    {
      id: "q2",
      title: "What is the main goal of this project?",
      options: [
        { label: "Automate and optimize internal processes" },
        { label: "Increase sales and get more clients online" },
        { label: "Improve corporate image and professionalism" },
        { label: "Other", isOther: true },
      ],
    },
    {
      id: "q3",
      title: "What stage is your project currently at?",
      options: [
        { label: "Just an idea / Starting from scratch" },
        { label: "I have requirements or a base design" },
        { label: "I have an operating business and want to scale digitally" },
        { label: "Other", isOther: true },
      ],
    },
    {
      id: "q4",
      title: "What is your estimated budget for this project?",
      options: [
        { label: "Basic / Startup ($1k - $5k)" },
        { label: "Standard / SMB ($5k - $10k)" },
        { label: "Advanced / Enterprise (Over $10k)" },
        { label: "Other", isOther: true },
      ],
    },
  ],
} satisfies Record<string, Question[]>

type Lang = keyof typeof translations

import { useParams } from "next/navigation"

export default function OnboardingFlow({
  formDictionary,
}: {
  formDictionary?: Awaited<ReturnType<typeof getDictionary>>["form"]
}) {
  const { lang } = useParams()
  const currentLang: Lang = lang === "es" ? "es" : "en"
  const questions: Question[] = translations[currentLang]

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [otherText, setOtherText] = useState("")

  const currentQuestion = questions[step]

  const handleOptionSelect = (option: Option) => {
    if (!currentQuestion) return
    if (option.isOther) {
      if (!otherText.trim()) return // Don't proceed if empty
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: `Otro: ${otherText}` }))
      setOtherText("")
    } else {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option.label }))
    }
    setStep((prev) => prev + 1)
  }

  // If completed, show original Form with compiled answers
  if (!currentQuestion) {
    const initialMessage =
      currentLang === "es"
        ? `Respuestas del Onboarding:
1. Tipo de solución: ${answers["q1"]}
2. Objetivo: ${answers["q2"]}
3. Etapa: ${answers["q3"]}
4. Presupuesto: ${answers["q4"]}

Mensaje Adicional:`
        : `Onboarding Answers:
1. Solution Type: ${answers["q1"]}
2. Goal: ${answers["q2"]}
3. Stage: ${answers["q3"]}
4. Budget: ${answers["q4"]}

Additional Message:`

    return <Form className="!w-full" dictionary={formDictionary} initialMessage={initialMessage} />
  }

  const uiText =
    currentLang === "es"
      ? {
          step: "Paso",
          of: "de",
          completed: "completado",
          specify: "Especificar",
          placeholder: "Escribe tu respuesta...",
          next: "Siguiente",
        }
      : {
          step: "Step",
          of: "of",
          completed: "completed",
          specify: "Specify",
          placeholder: "Type your answer...",
          next: "Next",
        }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-900/60 p-4 shadow-2xl backdrop-blur-xl duration-300 animate-in fade-in zoom-in sm:p-8">
      <div className="mb-6 sm:mb-8">
        <div className="mb-2 flex justify-between text-xs text-muted-foreground sm:text-sm">
          <span>
            {uiText.step} {step + 1} {uiText.of} {questions.length}
          </span>
          <span>
            {Math.round((step / questions.length) * 100)}% {uiText.completed}
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-brand transition-all duration-300"
            style={{ width: `${(step / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="mb-5 text-lg font-bold text-foreground sm:mb-6 sm:text-2xl">{currentQuestion.title}</h3>

      <div className="flex flex-col gap-3 sm:gap-4">
        {currentQuestion.options.map((option, index) => (
          <div key={index}>
            {option.isOther ? (
              <div className="flex flex-col gap-2 rounded-lg border border-slate-700/50 bg-slate-800/30 p-3 text-slate-200 shadow-sm transition-colors hover:border-brand sm:p-4">
                <span className="text-sm font-medium sm:text-base">
                  {option.label} ({uiText.specify})
                </span>
                <div className="mt-1 flex gap-2 sm:mt-2">
                  <input
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                    placeholder={uiText.placeholder}
                    className="min-w-0 flex-1 rounded-md border border-slate-700/50 bg-slate-900/50 px-3 py-2 text-sm text-slate-100 shadow-sm transition-colors placeholder:text-slate-400 focus:border-brand focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleOptionSelect(option)
                    }}
                  />
                  <Button variant="default" onClick={() => handleOptionSelect(option)} disabled={!otherText.trim()}>
                    {uiText.next}
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                className="h-auto w-full justify-start whitespace-normal border-slate-700/50 bg-slate-800/30 px-4 py-3 text-left text-sm text-slate-200 shadow-sm transition-all hover:border-brand hover:bg-brand hover:text-white sm:px-6 sm:py-4 sm:text-base"
                onClick={() => handleOptionSelect(option)}
              >
                {option.label}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
