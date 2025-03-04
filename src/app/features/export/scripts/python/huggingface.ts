const script = `
from transformers import pipeline
from PromptFormatter import PromptFormatter

tools = {tools}
examples = {examples}
task_description = {task_description}

formatter = PromptFormatter()
formatted_prompt = formatter.generate_prompt(tools, examples, task_description)
print("Custom Delimiters:\\n", formatted_prompt)

generator = pipeline("text-generation", model="gpt-4")  # Replace with your model
response = generator(formatted_prompt, max_length=500)
print(response[0]["generated_text"])
`

export default script;