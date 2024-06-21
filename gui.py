from tkinter import *
from tkinter import ttk

window = Tk()
window.title("Welcome to TutorialsPoint")
window.geometry('900x700')
window.configure(background = "powderblue");

f = Label(window ,text = "                ", background="powderblue").grid(row = 1,column = 1)
f = Label(window ,text = "                ", background="powderblue").grid(row = 2,column = 3)
f = Label(window ,text = "                ", background="powderblue").grid(row = 2,column = 7)
a = Label(window ,text = "First Name: ", background="grey").grid(row = 3,column = 2)
b = Label(window ,text = "Last Name: ", background="grey").grid(row = 3,column = 7)
f = Label(window ,text = "                ", background="powderblue").grid(row = 4,column = 7)
c = Label(window ,text = "Email Id: ", background="grey").grid(row = 5,column = 4)
f = Label(window ,text = "                ", background="powderblue").grid(row = 6,column = 7)
d = Label(window ,text = "Contact Number: ", background="grey").grid(row = 7,column = 4)
f = Label(window ,text = "                ", background="powderblue").grid(row = 8,column = 7)

f = Label(window ,text = "                ", background="powderblue").grid(row = 10,column = 7)
e = Label(window ,text = "Hobbies: ", background="grey").grid(row = 9,column = 4)

a1 = Entry(window).grid(row = 3,column = 4)
b1 = Entry(window).grid(row = 3,column = 8)
c1 = Entry(window).grid(row = 5,column = 5)
d1 = Entry(window).grid(row = 7,column = 5)
d1 = Entry(window).grid(row = 7,column = 7)
var1 = IntVar()
Checkbutton(window, text="Reading").grid(row=9, column=5)
var2 = IntVar()
Checkbutton(window, text="Running").grid(row=9, column=6)
var3 = IntVar()
Checkbutton(window, text="Drawing").grid(row=9, column=7)
def clicked():
   res = "Welcome to " + txt.get()
   lbl.configure(text= res)
btn = ttk.Button(window ,text="Submit").grid(row=13,column=5)
window.mainloop()