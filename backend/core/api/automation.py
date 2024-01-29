from core.models.chat import Chat, Message
from core.models.user import User
from core.api import callbacks
from openai import OpenAI

client = OpenAI(
    api_key="sk-xxx"
)

model_configurations = {
    "mixtral" : {
        "model": "",
        "apiBackend": ""
    }
}

def respond_openai_stream(bot: User, chat: Chat, message: Message, model="gpt-3.5-turbo"):
    
    serialized_messages = chat.get_past_messages_openai(5)
    
    completion = client.chat.completions.create(
        model='gpt-3.5-turbo',
        messages=serialized_messages,
        temperature=0,
        stream=True  # this time, we set stream=True
    )
    
    receiver = chat.get_partner(bot)
    
    message_dt = ""
    message_ft = ""

    for chunk in completion:
        message_dt = chunk.choices[0].delta.content
        message_ft += message_dt
        callbacks.partial_message_incoming(message.sender, message_dt)
    

    # create the actual db message
    message = Message.objects.create(
        chat=chat,
        sender=bot,
        recipient=receiver,
        text=message_ft
    )