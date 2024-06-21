import tkinter as tk
from tkinter import Scrollbar, Text, Entry, Button

class ChatBotUI:
    def __init__(self, master):
        self.master = master
        master.title("ChatBot")

        # Create chat display
        self.chat_display = Text(master, height=20, width=50, state='disabled')
        self.chat_display.grid(row=0, column=0, columnspan=2, padx=10, pady=10)

        # Create scrollbar
        scrollbar = Scrollbar(master, command=self.chat_display.yview)
        scrollbar.grid(row=0, column=2, sticky='nsew')
        self.chat_display['yscrollcommand'] = scrollbar.set

        # Create user input entry
        self.user_input = Entry(master, width=40)
        self.user_input.grid(row=1, column=0, padx=10, pady=10)

        # Create send button
        send_button = Button(master, text="Send", command=self.send_message)
        send_button.grid(row=1, column=1, padx=10, pady=10)

    def send_message(self):
        user_message = self.user_input.get()
        self.display_message(f"User: {user_message}")
        # You can add the logic to process the user's input and get the bot's response here
        # For simplicity, let's assume a dummy response
        bot_response = "ChatBot: Thanks for chatting!"
        self.display_message(bot_response)
        self.user_input.delete(0, 'end')  # Clear the user input field

    def display_message(self, message):
        self.chat_display['state'] = 'normal'
        self.chat_display.insert('end', message + '\n')
        self.chat_display['state'] = 'disabled'
        self.chat_display.see('end')

if __name__ == "__main__":
    root = tk.Tk()
    chat_bot_ui = ChatBotUI(root)
    root.mainloop()
