import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface TaskFiles {
  html: string[]
  css: string[]
  js: string[]
  other: string[]
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string; taskId: string }> }
) {
  const { category, taskId } = await params

  // Build the path to the task folder in public directory
  const taskPath = path.join(process.cwd(), 'public', category, taskId)

  try {
    // Check if directory exists
    if (!fs.existsSync(taskPath)) {
      return NextResponse.json({ error: 'Task folder not found' }, { status: 404 })
    }

    // Read all files in the directory
    const files = fs.readdirSync(taskPath)

    // Categorize files by extension
    const taskFiles: TaskFiles = {
      html: [],
      css: [],
      js: [],
      other: []
    }

    files.forEach(file => {
      const ext = path.extname(file).toLowerCase()
      if (ext === '.html' || ext === '.htm') {
        taskFiles.html.push(file)
      } else if (ext === '.css') {
        taskFiles.css.push(file)
      } else if (ext === '.js') {
        taskFiles.js.push(file)
      } else if (!file.startsWith('.')) {
        taskFiles.other.push(file)
      }
    })

    // Sort files - put common names first
    const htmlPriority = ['index.html', 'main.html', 'home.html']
    const cssPriority = ['styles.css', 'style.css', 'main.css', 'global.css', 'app.css']
    const jsPriority = ['main.js', 'app.js', 'script.js', 'scripts.js', 'index.js']

    const sortByPriority = (files: string[], priority: string[]) => {
      return files.sort((a, b) => {
        const aIndex = priority.indexOf(a)
        const bIndex = priority.indexOf(b)
        if (aIndex === -1 && bIndex === -1) return a.localeCompare(b)
        if (aIndex === -1) return 1
        if (bIndex === -1) return -1
        return aIndex - bIndex
      })
    }

    taskFiles.html = sortByPriority(taskFiles.html, htmlPriority)
    taskFiles.css = sortByPriority(taskFiles.css, cssPriority)
    taskFiles.js = sortByPriority(taskFiles.js, jsPriority)

    return NextResponse.json({
      files: taskFiles,
      path: `/${category}/${taskId}`
    })
  } catch (error) {
    console.error('Error reading task folder:', error)
    return NextResponse.json({ error: 'Failed to read task folder' }, { status: 500 })
  }
}
