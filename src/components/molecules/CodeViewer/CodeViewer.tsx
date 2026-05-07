'use client'

import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'

interface CodeViewerProps {
  code: string
  language?: string
}

const CodeViewer = ({ code, language = 'typescript' }: CodeViewerProps) => {
  const [lightHtml, setLightHtml] = useState<string>('')
  const [darkHtml, setDarkHtml] = useState<string>('')

  useEffect(() => {
    codeToHtml(code, {
      lang: language,
      theme: 'monokai',
      transformers: [
        {
          pre(node) {
            node.properties.style = 'background: transparent; padding: 0; margin: 0;'
          },
          line(node, line) {
            node.children.unshift({
              type: 'element',
              tagName: 'span',
              properties: {
                style:
                  'display:inline-block; width:2rem; text-align:right; margin-right:1.5rem; color:#4b5563; user-select:none; flex-shrink:0;',
              },
              children: [{ type: 'text', value: String(line) }],
            })
          },
        },
      ],
    }).then(setDarkHtml)

    codeToHtml(code, {
      lang: language,
      theme: 'github-light',
      transformers: [
        {
          pre(node) {
            node.properties.style = 'background: transparent; padding: 0; margin: 0;'
          },
          line(node, line) {
            node.children.unshift({
              type: 'element',
              tagName: 'span',
              properties: {
                style:
                  'display:inline-block; width:2rem; text-align:right; margin-right:1.5rem; color:#a8abb0; user-select:none; flex-shrink:0;',
              },
              children: [{ type: 'text', value: String(line) }],
            })
          },
        },
      ],
    }).then(setLightHtml)
  }, [code, language])

  return (
    <div className="flex-1 border overflow-x-auto bg-neutral-1000 border-neutral-900 dark:bg-[#272822] dark:border-neutral-400">
      {/* Header bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b bg-neutral-900/50 border-neutral-800 dark:bg-neutral-200 dark:border-[#3e3d32]">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="text-neutral-400 dark:text-neutral-900 text-xs font-mono ml-2">
          src/config/project.config.ts
        </span>
      </div>

      {/* Code */}
      <div className="overflow-auto py-4 pl-2 pr-4">
        {/* Light mode */}
        {lightHtml ? (
          <div
            className="dark:hidden text-xs font-mono [&_pre]:!bg-transparent [&_pre]:!p-0"
            dangerouslySetInnerHTML={{ __html: lightHtml }}
          />
        ) : (
          <div className="dark:hidden text-neutral-700 text-xs font-mono animate-pulse">
            Rendering...
          </div>
        )}

        {/* Dark mode */}
        {darkHtml ? (
          <div
            className="hidden dark:block text-xs font-mono [&_pre]:!bg-transparent [&_pre]:!p-0"
            dangerouslySetInnerHTML={{ __html: darkHtml }}
          />
        ) : (
          <div className="hidden dark:block text-[#75715e] text-xs font-mono animate-pulse">
            Rendering...
          </div>
        )}
      </div>
    </div>
  )
}

export default CodeViewer
