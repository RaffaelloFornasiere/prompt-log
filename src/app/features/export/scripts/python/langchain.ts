const script = `
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from PromptFormatter import PromptFormatter

tools = {tools}
examples = {examples}
task_description = {task_description}

formatter = PromptFormatter()
formatted_prompt = formatter.generate_prompt(tools, examples, task_description)
print("Custom Delimiters:\\n", formatted_prompt)

chat = ChatOpenAI(model="gpt-4")

prompt = ChatPromptTemplate.from_template(formatted_prompt)
messages = prompt.format_messages()

response = chat(messages)
print(response.content)
`

export default script;