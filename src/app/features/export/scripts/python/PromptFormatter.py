import json
from abc import ABC, abstractmethod

class DelimiterStrategy(ABC):
    @abstractmethod
    def get_start(self, section_name: str) -> str:
        pass
    
    @abstractmethod
    def get_end(self, section_name: str) -> str:
        pass

import json
from abc import ABC, abstractmethod

class DelimiterStrategy(ABC):
    @abstractmethod
    def get_start(self, section_name: str) -> str:
        pass
    
    @abstractmethod
    def get_end(self, section_name: str) -> str:
        pass

class CustomWrapperDelimiterStrategy(DelimiterStrategy):
    """Custom wrappers like ---Tools---"""
    def __init__(self, wrapper_chars: str = "---"):
        self.wrapper = wrapper_chars
    
    def start(self, section_name: str) -> str:
        return f"{self.wrapper}{section_name}{self.wrapper}"
    
    def end(self, section_name: str) -> str:
        return f"{self.wrapper}{section_name}{self.wrapper}"
        
        
class PromptFormatter:
    def __init__(
        self,
        delimiter_strategy: DelimiterStrategy = XMLDelimiterStrategy(),
        section_names: dict = None
    ):
        self.delimiter = delimiter_strategy
        self.section_names = section_names or {
            'tools': 'Tools',
            'examples': 'Examples',
            'task': 'Task'
        }

    def build_section(self, section_type: str, content: str) -> str:
        """Wrap content in delimiters for a section."""
        section_name = self.section_names[section_type]
        return (
            f"{self.delimiter.start(section_name)}\\n"
            f"{content}\\n"
            f"{self.delimiter.end(section_name)}"
        )

    def format_tools(self, tools: list) -> str:
        return json.dumps(tools, indent=2) if tools else ""

    def format_examples(self, examples: list) -> str:
        return "\\n".join(ex["content"] for ex in examples) if examples else ""

    def generate_prompt(
        self,
        tools: list,
        examples: list,
        task_description: str
    ) -> str:
        sections = []
        
        # Tools Section
        if tools:
            tools_content = self.format_tools(tools)
            sections.append(self.build_section('tools', tools_content))
        
        # Task Description (No delimiters)
        sections.append(task_description.strip())
        
        # Examples Section
        if examples:
            examples_content = self.format_examples(examples)
            sections.append(self.build_section('examples', examples_content))
        
        return "\\n\\n".join(sections)