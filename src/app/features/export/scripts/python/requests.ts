const scrip = `
import requests
from PromptFormatter import PromptFormatter

tools = {tools}
examples = {examples}
task_description = {task_description}

formatter = PromptFormatter()
formatted_prompt = formatter.generate_prompt(tools, examples, task_description)
print("Custom Delimiters:\\n", formatted_prompt)

API_URL = "https://api.openai.com/v1/chat/completions"
API_KEY = "your-api-key"

def generate_prompt(prompt):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "gpt-4",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": formatted_prompt}
        ]
    }

    response = requests.post(API_URL, headers=headers, json=data)
    if response.status_code == 200:
        return response.json()["choices"][0]["message"]["content"]
    else:
        return f"Error: {response.status_code} - {response.text}"

# Example usage
if __name__ == "__main__":
    user_prompt = "Write a Python function to calculate Fibonacci numbers."
    response = generate_prompt(user_prompt)
    print(response)
`;

export default scrip;