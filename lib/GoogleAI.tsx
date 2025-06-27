/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from "@google/genai";

async function main() {
    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
    });
    const config = {
        thinkingConfig: {
            thinkingBudget: -1,
        },
        responseMimeType: "application/json",
    };
    const model = "gemini-2.5-pro";
    const contents = [
        {
            role: "user",
            parts: [
                {
                    text: `Reference to {
   "time": 1550476186479,
   "blocks": [
      {
         "id": "oUq2g_tl8y",
         "type": "header",
         "data": {
            "text": "Editor.js",
            "level": 2
         }
      },
      {
         "id": "zbGZFPM-iI",
         "type": "paragraph",
         "data": {
            "text": "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration."
         }
      },
      {
         "id": "qYIGsjS5rt",
         "type": "header",
         "data": {
            "text": "Key features",
            "level": 3
         }
      },
      {
         "id": "XV87kJS_H1",
         "type": "list",
         "data": {
            "style": "unordered",
            "items": [
               "It is a block-styled editor",
               "It returns clean data output in JSON",
               "Designed to be extendable and pluggable with a simple API"
            ]
         }
      },
      {
         "id": "AOulAjL8XM",
         "type": "header",
         "data": {
            "text": "What does it mean «block-styled editor»",
            "level": 3
         }
      },
      {
         "id": "cyZjplMOZ0",
         "type": "paragraph",
         "data": {
            "text": "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\\"cdx-marker\\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core."
         }
      }
   ],
   "version": "2.8.1"
}

generate template for editor.js in JSON format for "this week to-dos"

`,

                    // here it is  !!
                },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: `**Framing the JSON**

I'm currently focused on dissecting the user's request. My core task is creating an Editor.js JSON template, specifically for a "this week to-dos" list. I've begun by isolating the key elements: the need for an Editor.js template and the "this week" content theme. I'm aiming to understand the underlying requirements.


**Building the Blocks**

I'm now diving deeper into the \`blocks\` array, identifying the building blocks for the "this week to-dos" list. I'm focusing on crafting the individual "block" objects, understanding their structure and the required fields. I'm currently reviewing various Editor.js block types to determine the most suitable ones for representing tasks and their associated information.


**Designing the Blocks**

I've just finalized the block structure.  I'll use a \`header\` block for the title "This Week's To-Dos" at level 2. Following this, a \`checklist\` block will represent each task. The \`checklist\` data will consist of an array of items, each with \`text\` and \`checked\` properties. Finally, a \`paragraph\` block could be added at the end for notes. I'm focusing on crafting the \`checklist\` block data to represent to-do items effectively, allowing for both task description and completion status.


**Formulating the Checklist**

I'm now focusing on the \`checklist\` block within the \`blocks\` array. My plan involves creating a \`checklist\` with initial task items, ensuring each item has both \`text\` and \`checked\` properties. I'm aiming to build a reusable, dynamic component that effectively represents to-do list items, adhering to Editor.js's standards. I'm ready to begin testing.


**Analyzing the Blueprint**

I've been examining the given structure of an Editor.js document. I'm focusing on the relationship between \`time\`, \`blocks\`, and \`version\` keys. The \`blocks\` key is paramount, as its value, an array of objects, holds the actual content. I need to generate unique IDs for each block and format the data object as per the respective block type. I'll utilize this analysis to generate the JSON template.


**Formulating the Structure**

My current focus is on building the specific structure of the JSON document. I'm prioritizing the \`blocks\` array, as that's where the "meat" of the content resides. I'll include a \`header\` block for the title, followed by \`checklist\` blocks to represent individual to-dos. I'm also considering adding introductory paragraph blocks to give more context.


**Finalizing the Structure**

My plan is now to synthesize the JSON object with a header (level 2) for the title, followed by an introductory paragraph. Then I'll build a checklist using an array of items with 'text' and 'checked' properties. Additionally, I'll include another sub-header (level 3) and a second checklist for personal tasks to demonstrate a multi-layered approach. The JSON structure is the last focus, which will allow me to wrap it up and ensure the Editor.js template is finalized.


**Synthesizing the Structure**

I've successfully structured the JSON. I'll include a header (level 2) for the title, "This Week's To-Dos," followed by a paragraph for context.  Then, I'll create a checklist block with the items: "Finish the quarterly report", "Schedule a meeting with the design team", "Review pull request #123", and "Plan the agenda for Friday's stand-up."  I'll then add a sub-header (level 3) labeled "Personal Goals," and follow this with a new checklist that includes items: "Go to the gym 3 times," "Read one chapter of a book," and "Call family." The final output has been tested and is ready to go.


`,
                },
                {
                    text: `Of course. Based on the reference you provided, here is a JSON template for a "this week to-dos" list, formatted for Editor.js.

This template uses the \`header\` block for titles and the \`checklist\` block type, which is standard for to-do lists in Editor.js.

\`\`\`json
{
   "time": 1678886400000,
   "blocks": [
      {
         "id": "main-title-1",
         "type": "header",
         "data": {
            "text": "This Week's To-Dos",
            "level": 2
         }
      },
      {
         "id": "intro-para-1",
         "type": "paragraph",
         "data": {
            "text": "A list of important tasks and goals for this week. Let's get it done!"
         }
      },
      {
         "id": "work-tasks-header",
         "type": "header",
         "data": {
            "text": "Work Tasks",
            "level": 3
         }
      },
      {
         "id": "work-checklist-1",
         "type": "checklist",
         "data": {
            "items": [
               {
                  "text": "Finish the quarterly report",
                  "checked": false
               },
               {
                  "text": "Schedule a meeting with the design team",
                  "checked": true
               },
               {
                  "text": "Review pull request #123",
                  "checked": false
               }
            ]
         }
      },
      {
         "id": "personal-tasks-header",
         "type": "header",
         "data": {
            "text": "Personal Goals",
            "level": 3
         }
      },
      {
         "id": "personal-checklist-1",
         "type": "checklist",
         "data": {
            "items": [
               {
                  "text": "Go to the gym 3 times",
                  "checked": false
               },
               {
                  "text": "Read one chapter of a book",
                  "checked": false
               },
               {
                  "text": "Call family",
                  "checked": true
               }
            ]
         }
      }
   ],
   "version": "2.28.0"
}
\`\`\`

### Key Changes and Explanations:

*   **\`header\` block:** Used for the main title (\`level: 2\`) and section titles like "Work Tasks" (\`level: 3\`).
*   **\`paragraph\` block:** Included for a brief introductory sentence.
*   **\`checklist\` block:** This is the most important block for a to-do list.
    *   Its \`data\` object contains an \`items\` array.
    *   Each item in the array is an object with two properties: \`text\` (the task description) and \`checked\` (a boolean indicating if the task is complete).`,
                },
            ],
        },
        {
            role: "user",
            parts: [
                {
                    text: `INSERT_INPUT_HERE`,
                },
            ],
        },
    ];

    const response = await ai.models.generateContentStream({
        model,
        config,
        contents,
    });
    let fileIndex = 0;
    for await (const chunk of response) {
        console.log(chunk.text);
    }
}

main();
