import tkinter as tk
from tkinter import ttk
import mysql.connector

class CRUDApp:
    def _init_(self, root):
        self.root = root
        self.root.title("CRUD Application")

        # Database Connection
        self.db_connection = mysql.connector.connect(
            host="localhost",
            user="your_username",
            password="your_password",
            database="your_database"
        )
        self.cursor = self.db_connection.cursor()

        # GUI Components
        self.label_name = ttk.Label(root, text="Name:")
        self.label_age = ttk.Label(root, text="Age:")
        self.entry_name = ttk.Entry(root)
        self.entry_age = ttk.Entry(root)
        self.button_create = ttk.Button(root, text="Create", command=self.create_record)
        self.button_read = ttk.Button(root, text="Read", command=self.read_records)
        self.button_update = ttk.Button(root, text="Update", command=self.update_record)
        self.button_delete = ttk.Button(root, text="Delete", command=self.delete_record)

        # Grid Layout
        self.label_name.grid(row=0, column=0, padx=5, pady=5, sticky="e")
        self.label_age.grid(row=1, column=0, padx=5, pady=5, sticky="e")
        self.entry_name.grid(row=0, column=1, padx=5, pady=5)
        self.entry_age.grid(row=1, column=1, padx=5, pady=5)
        self.button_create.grid(row=2, column=0, padx=5, pady=5)
        self.button_read.grid(row=2, column=1, padx=5, pady=5)
        self.button_update.grid(row=3, column=0, padx=5, pady=5)
        self.button_delete.grid(row=3, column=1, padx=5, pady=5)

    def create_record(self):
        name = self.entry_name.get()
        age = self.entry_age.get()
        sql = "INSERT INTO your_table_name (name, age) VALUES (%s, %s)"
        values = (name, age)
        self.cursor.execute(sql, values)
        self.db_connection.commit()
        print("Record created successfully.")

    def read_records(self):
        self.cursor.execute("SELECT * FROM your_table_name")
        records = self.cursor.fetchall()
        print("Records:")
        for record in records:
            print(record)

    def update_record(self):
        name = self.entry_name.get()
        age = self.entry_age.get()
        sql = "UPDATE your_table_name SET age = %s WHERE name = %s"
        values = (age, name)
        self.cursor.execute(sql, values)
        self.db_connection.commit()
        print("Record updated successfully.")

    def delete_record(self):
        name = self.entry_name.get()
        sql = "DELETE FROM your_table_name WHERE name = %s"
        values = (name,)
        self.cursor.execute(sql, values)
        self.db_connection.commit()
        print("Record deleted successfully.")

if __name__ == "_main_":
    root = tk.Tk()
    app = CRUDApp(root)
root.mainloop()