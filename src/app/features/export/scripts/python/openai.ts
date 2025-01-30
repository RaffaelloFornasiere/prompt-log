const script = `
import openai
from PromptFormatter import PromptFormatter

tools = {tools}
examples = {examples}
task_description = {task_description}

formatter = PromptFormatter()
formatted_prompt = formatter.generate_prompt(tools, examples, task_description)
print("Custom Delimiters:\\n", formatted_prompt)

response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": formatted_prompt}
    ]
)
print(response.choices[0].message["content"])
`

export default script;