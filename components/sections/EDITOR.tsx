/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// EDITOR.tsx

import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Delimiter from "@editorjs/delimiter";
import Alert from "editorjs-alert";
import Table from "editorjs-table";
import EditorjsList from "@editorjs/list";
import SimpleImage from "simple-image-editorjs";
import CodeTool from "@editorjs/code";
import Checklist from "@editorjs/checklist";

import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseClient";
import GenerateFromAI from "../GenerateFromAI";
import { toast } from "sonner";
import { GoogleGenAI } from "@google/genai";

// 🧠 أنواع إضافية لو أردت الدقة
type EditorInstance = EditorJS | null;

// ✅ 1. إعداد أدوات Editor.js
function getEditorTools() {
    return {
        header: {
            class: Header as any,
            inlineToolbar: true,
        },
        delimiter: {
            class: Delimiter as any,
        },
        alert: {
            class: Alert as any,
            inlineToolbar: true,
            config: {
                alertTypes: ["info", "success", "danger"],
                defaultType: "info",
                messagePlaceholder: "Enter message",
            },
        },
        table: {
            class: Table as any,
            inlineToolbar: true,
        },
        image: {
            class: SimpleImage as any,
        },
        code: {
            class: CodeTool as any,
        },
        List: {
            class: EditorjsList as any,
            inlineToolbar: true,
            config: {
                defaultStyle: "unordered",
            },
        },
        checklist: {
            class: Checklist as any,
            inlineToolbar: true,
        },
    };
}

// ✅ 2. وظيفة الحفظ إلى Firestore مع Debounce
function handleEditorSave(
    editorRef: React.RefObject<EditorInstance>,
    saveTimeoutRef: React.RefObject<NodeJS.Timeout | null>,
    isRemoteUpdate: React.RefObject<boolean>,
    cur: string
) {
    if (isRemoteUpdate.current) return;

    if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
        editorRef.current?.save().then((outputData) => {
            const outputRef = doc(db, "outputs", cur);
            updateDoc(outputRef, { output: JSON.stringify(outputData) });
            // toast("Saved", { description: "Changes were saved successfully." });
        });
    }, 300);
}

// ✅ 3. الاشتراك في تحديثات Realtime من Firebase
function setupRealtimeListener(
    cur: string,
    editorRef: React.RefObject<EditorInstance>,
    isRemoteUpdate: React.RefObject<boolean>
) {
    const outputDocRef = doc(db, "outputs", cur);

    return onSnapshot(outputDocRef, (snapshot) => {
        const data = snapshot.data();

        if (data?.output && editorRef.current) {
            isRemoteUpdate.current = true;

            editorRef.current.isReady
                .then(() => {
                    // return editorRef.current?.render(JSON.parse(data.output));
                    return editorRef.current?.render(JSON.parse(data.output));
                })
                .finally(() => {
                    isRemoteUpdate.current = false;
                });
        }
    });
}

// ✅ 4. المكون الرئيسي
const Editor = ({ cur }: { cur: string | undefined }) => {
    const editorRef = useRef<EditorInstance>(null);
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isRemoteUpdate = useRef(false);
    const editorHolderRef = useRef<HTMLDivElement | null>(null);

    // ✅ دالة توليد المحتوى من الذكاء الاصطناعي

    async function GenerateEditorData(prompt: string) {
        const ai = new GoogleGenAI({
            apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
        });
        const config = {
            responseMimeType: "application/json",
        };
        const model = "gemini-2.0-flash-lite";
        const contents = [
            {
                role: "user",
                parts: [
                    {
                        text: `Reference to Editor.js output:

You are a Editor.js JSON data generator 
Now generate an Editor.js JSON template for the topic: "my front end road map plan".
Return a clean JSON (valid Editor.js format). No markdown or explanation.
use only headings and texts and make it as long as possible 

`,
                    },
                ],
            },
            {
                role: "model",
                parts: [
                    {
                        text: `\`\`\`json
{
  "time": 1678886400000,
  "blocks": [
    {
      "id": "header-1",
      "type": "header",
      "data": {
        "text": "My Comprehensive Front-End Development Road Map",
        "level": 2
      }
    },
    {
      "id": "paragraph-1",
      "type": "paragraph",
      "data": {
        "text": "This detailed roadmap outlines the steps I plan to take to achieve proficiency in front-end development. It's a constantly evolving plan, refined as I acquire new skills and explore new technologies."
      }
    },
    {
      "id": "header-2",
      "type": "header",
      "data": {
        "text": "Phase 1: Foundational Knowledge and Core Skills",
        "level": 3
      }
    },
    {
      "id": "header-3",
      "type": "header",
      "data": {
        "text": "HTML: The Structure of the Web",
        "level": 4
      }
    },
    {
      "id": "paragraph-2",
      "type": "paragraph",
      "data": {
        "text": "In this initial stage, I will focus on mastering the fundamentals of HTML, including understanding semantic elements, structuring content effectively, and ensuring accessibility for all users. This includes learning about headings, paragraphs, lists, and more."
      }
    },
    {
      "id": "header-4",
      "type": "header",
      "data": {
        "text": "CSS: Styling and Presentation",
        "level": 4
      }
    },
    {
      "id": "paragraph-3",
      "type": "paragraph",
      "data": {
        "text": "I will then delve into CSS, learning about selectors, the box model, positioning, and various styling techniques. The focus will be on creating visually appealing and responsive designs, with an emphasis on the importance of a good user experience."
      }
    },
    {
      "id": "header-5",
      "type": "header",
      "data": {
        "text": "JavaScript: Bringing Websites to Life",
        "level": 4
      }
    },
    {
      "id": "paragraph-4",
      "type": "paragraph",
      "data": {
        "text": "This phase covers core JavaScript concepts. I will learn about variables, data types, operators, control flow, functions, and the Document Object Model (DOM). A solid understanding of these will be crucial for the next steps."
      }
    },
    {
      "id": "header-6",
      "type": "header",
      "data": {
        "text": "Phase 2: Intermediate Concepts and Tooling",
        "level": 3
      }
    },
    {
      "id": "header-7",
      "type": "header",
      "data": {
        "text": "Advanced JavaScript",
        "level": 4
      }
    },
    {
      "id": "paragraph-5",
      "type": "paragraph",
      "data": {
        "text": "This involves expanding on JavaScript knowledge by learning about asynchronous operations (Promises, Async/Await), closures, scope, and the principles of object-oriented programming (OOP) and functional programming. This is a crucial step towards building interactive and dynamic web applications."
      }
    },
    {
      "id": "header-8",
      "type": "header",
      "data": {
        "text": "CSS Enhancements and Layout",
        "level": 4
      }
    },
    {
      "id": "paragraph-6",
      "type": "paragraph",
      "data": {
        "text": "The next step involves mastering advanced CSS techniques like Flexbox and Grid for layout and responsive design. This will lead to creating more complex and adaptable web layouts. It will also include a focus on CSS animations and transitions to improve the user interface."
      }
    },
     {
      "id": "header-9",
      "type": "header",
      "data": {
        "text": "Version Control with Git",
        "level": 4
      }
    },
    {
      "id": "paragraph-7",
      "type": "paragraph",
      "data": {
        "text": "I will learn Git and GitHub, which are indispensable for collaborating on projects, tracking changes, and managing code. Understanding these tools is important for professional work."
      }
    },
    {
      "id": "header-10",
      "type": "header",
      "data": {
        "text": "Package Management",
        "level": 4
      }
    },
    {
      "id": "paragraph-8",
      "type": "paragraph",
      "data": {
        "text": "I will also need to become familiar with package managers such as npm or yarn, which are used to manage dependencies and streamline the development process, improving the workflow."
      }
    },
    {
      "id": "header-11",
      "type": "header",
      "data": {
        "text": "Phase 3: Frameworks, Libraries, and Advanced Practices",
        "level": 3
      }
    },
    {
      "id": "header-12",
      "type": "header",
      "data": {
        "text": "Choosing a Front-End Framework",
        "level": 4
      }
    },
    {
      "id": "paragraph-9",
      "type": "paragraph",
      "data": {
        "text": "The next major step involves choosing and learning a popular front-end framework. I will consider React, Vue, or Angular and dive deeply into that framework's features, best practices, and ecosystem. I'll build several applications to reinforce my understanding."
      }
    },
    {
      "id": "header-13",
      "type": "header",
      "data": {
        "text": "Build Tools",
        "level": 4
      }
    },
    {
      "id": "paragraph-10",
      "type": "paragraph",
      "data": {
        "text": "I will learn and use modern build tools (e.g., Webpack, Parcel, or Vite) to optimize the build process. I will get familiar with code bundling, minification, and other performance optimizations."
      }
    },
     {
      "id": "header-14",
      "type": "header",
      "data": {
        "text": "State Management",
        "level": 4
      }
    },
    {
      "id": "paragraph-11",
      "type": "paragraph",
      "data": {
        "text": "Understanding state management is critical when working with complex applications. I will explore state management libraries and tools like Redux (for React), Vuex (for Vue), or Context API. This skill enables me to create more efficient and maintainable applications."
      }
    },
    {
      "id": "header-15",
      "type": "header",
      "data": {
        "text": "Testing Strategies",
        "level": 4
      }
    },
    {
      "id": "paragraph-12",
      "type": "paragraph",
      "data": {
        "text": "I will learn to apply rigorous testing strategies, which will include unit testing, integration testing, and end-to-end (E2E) testing. I will use tools like Jest, Mocha, or Cypress. Testing is crucial for writing robust and reliable code."
      }
    },
    {
      "id": "header-16",
      "type": "header",
      "data": {
        "text": "Phase 4: Advanced Topics and Deployment",
        "level": 3
      }
    },
    {
      "id": "header-17",
      "type": "header",
      "data": {
        "text": "Advanced Framework Concepts",
        "level": 4
      }
    },
    {
      "id": "paragraph-13",
      "type": "paragraph",
      "data": {
        "text": "This phase focuses on learning advanced concepts of the chosen framework, mastering component design, data fetching, and optimization techniques. This will make me more proficient in building complex user interfaces."
      }
    },
    {
      "id": "header-18",
      "type": "header",
      "data": {
        "text": "Server-Side Rendering (SSR)",
        "level": 4
      }
    },
    {
      "id": "paragraph-14",
      "type": "paragraph",
      "data": {
        "text": "I will learn the principles of server-side rendering (SSR) to enhance SEO, improve performance, and optimize initial load times for web applications. This involves understanding frameworks like Next.js (for React) or Nuxt.js (for Vue)."
      }
    },
    {
      "id": "header-19",
      "type": "header",
      "data": {
        "text": "Security Best Practices",
        "level": 4
      }
    },
    {
      "id": "paragraph-15",
      "type": "paragraph",
      "data": {
        "text": "I will familiarize myself with security best practices to protect against common web vulnerabilities, such as cross-site scripting (XSS), cross-site request forgery (CSRF), and injection attacks. Secure coding is of paramount importance."
      }
    },
    {
      "id": "header-20",
      "type": "header",
      "data": {
        "text": "Deployment Strategies",
        "level": 4
      }
    },
    {
      "id": "paragraph-16",
      "type": "paragraph",
      "data": {
        "text": "I will explore different deployment methods, including Netlify, Vercel, and cloud platforms like AWS, to deploy web applications and make them accessible to users."
      }
    },
    {
      "id": "header-21",
      "type": "header",
      "data": {
        "text": "Performance Optimization",
        "level": 4
      }
    },
    {
      "id": "paragraph-17",
      "type": "paragraph",
      "data": {
        "text": "I will learn and apply advanced performance optimization techniques, including code splitting, lazy loading, image optimization, and minimizing HTTP requests, to improve the overall user experience and website speed."
      }
    },
    {
      "id": "header-22",
      "type": "header",
      "data": {
        "text": "Continuous Learning and Staying Current",
        "level": 3
      }
    },
    {
      "id": "paragraph-18",
      "type": "paragraph",
      "data": {
        "text": "Front-end development is a constantly evolving field. I will make sure to stay updated on new technologies, trends, and best practices through reading articles, blogs, and attending conferences. I will also spend time contributing to open-source projects."
      }
    },
    {
      "id": "header-23",
      "type": "header",
      "data": {
        "text": "Building a Portfolio and Job Search",
        "level": 3
      }
    },
    {
      "id": "paragraph-19",
      "type": "paragraph",
      "data": {
        "text": "Finally, I will build a professional portfolio website to showcase my projects and skills. Then I will apply for jobs and continue learning and improving."
      }
    }
  ],
  "version": "2.8.1"
}
\`\`\``,
                    },
                ],
            },
            {
                role: "user",
                parts: [
                    {
                        text: `Reference to Editor.js output:

You are a Editor.js JSON data generator 
Now generate an Editor.js JSON template for the topic: "${prompt}".
Return a clean JSON (valid Editor.js format). No markdown or explanation.
use only headings and texts and make it as long as possible 

`,
                    },
                ],
            },
        ];

        const response = await ai.models.generateContentStream({
            model,
            config,
            contents,
        });
        // let fileIndex = 0;
        // for await (const chunk of response) {
        //     console.log(chunk.text);
        // }

        let fullText = "";
        console.log("loading");

        for await (const chunk of response) {
            fullText += chunk.text;
        }

        console.log(JSON.parse(fullText));

        const editorData = JSON.parse(fullText);

        if (!editorData.blocks) {
            console.error("Invalid data format from AI:", editorData);
            toast.error("AI is not doing it's job (it's not my bad)");
            return;
        }

        editorRef.current?.render(editorData);
    }

    useEffect(() => {
        if (!cur || !editorHolderRef.current) return;

        const editor = new EditorJS({
            holder: editorHolderRef.current,
            placeholder: "Type anything...",
            minHeight: 300,
            tools: getEditorTools(),
            onChange: () =>
                handleEditorSave(
                    editorRef,
                    saveTimeoutRef,
                    isRemoteUpdate,
                    cur
                ),
        });

        editorRef.current = editor;

        const unsubscribe = setupRealtimeListener(
            cur,
            editorRef,
            isRemoteUpdate
        );

        return () => {
            editorRef.current?.destroy?.();
            editorRef.current = null;
            unsubscribe();
        };
    }, [cur]);

    return (
        <div className="p-4">
            <div className="z-30 my-5">
                <GenerateFromAI onGenerate={GenerateEditorData} />
            </div>
            <div ref={editorHolderRef} className="h-full border p-3" />
        </div>
    );
};

export default Editor;
