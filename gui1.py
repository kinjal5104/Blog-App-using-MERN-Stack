from tkinter import *
from tkinter import ttk
window = Tk()
window.title("User Information Form")
window.geometry('600x400')
window.configure(background="lightgray")
style = ttk.Style()
style.configure('TLabel', background='lightgray', font=('Arial', 12))
style.configure('TButton', background='green', font=('Arial', 12))
ttk.Label(window, text="Personal Information", style='TLabel').grid(row=1, column=1, columnspan=3, pady=(20, 10))
ttk.Label(window, text="Name:", style='TLabel').grid(row=2, column=1, padx=(10, 0), pady=5, sticky='e')
ttk.Label(window, text="Email Id:", style='TLabel').grid(row=3, column=1, padx=(10, 0), pady=5, sticky='e')
ttk.Label(window, text="Contact Number:", style='TLabel').grid(row=4, column=1, padx=(10, 0), pady=5, sticky='e')
ttk.Label(window, text="Hobbies:", style='TLabel').grid(row=5, column=1, padx=(10, 0), pady=5, sticky='e')

entry_name = Entry(window)
entry_email = Entry(window)
entry_contact = Entry(window)
Checkbutton(window, text="Reading").grid(row=5, column=2, padx=5, pady=5, sticky='w')
Checkbutton(window, text="Running").grid(row=5, column=3, padx=5, pady=5, sticky='w')
Checkbutton(window, text="Drawing").grid(row=5, column=4, padx=5, pady=5, sticky='w')

entry_name.grid(row=2, column=2, pady=5, padx=(0, 10))
entry_email.grid(row=3, column=2, pady=5, padx=(0, 10))
entry_contact.grid(row=4, column=2, pady=5, padx=(0, 10))

def submit():
    first_name = entry_name.get()
    result = f"Welcome, {first_name}!\n"
    lbl_result.config(text=result)

ttk.Button(window, text="Submit", command=submit, style='TButton').grid(row=6, column=1, columnspan=3, pady=20)

lbl_result = ttk.Label(window, text="", style='TLabel')
lbl_result.grid(row=7, column=1, columnspan=3)
window.mainloop()