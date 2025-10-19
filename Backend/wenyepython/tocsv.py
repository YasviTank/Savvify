import pdfplumber #pip install pdfplumber
import csv
import re

#Change this variable to the name of the bank statement pdf to generate
#A CSV file of the bank statement
money_in_keywords = ['PAID IN', 'TRANSFER TO', 'FASTER PAYMENTS', 'PAYROLL', 'SALARY', 'WAGES', 'DEPOSIT', 'REFUND']
money_out_keywords = ['PAYMENT', 'FEE', 'DEBIT', 'STANDING ORDER', 'CHARGE']    

def pdf_to_csv(pdf_name, csv_file_name):
    """Create a CSV file of the bank statement"""
    with pdfplumber.open(pdf_name) as pdf:
        rows = []
        for page in pdf.pages:
            text = page.extract_text()
            for line in text.split("\n"):
                # this depends on your bank’s format — you’ll need to adjust
                parts = line.strip().split()
                if len(parts) >= 4:
                    date = parts[0]
                    balance = parts[-1].replace(",","")
                    money = parts[-2].replace(",","")
                    description = " ".join(parts[1:-2])
                    rows.append([date, description,  money, balance])     

    #Save to CSV
    with open("temp.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerows(rows)

    #Edit the CSV file
    pdf = open("temp.csv", "r", encoding="utf-8")
    file = open(csv_file_name, "w+", newline="", encoding="utf-8")
    lines = pdf.readlines()
    new_lines = []


    #Get rid off everything before the data
    for line_number, line in enumerate(lines):
        splitted = re.split(r'[\s,]', line)
        if splitted[0] == "Date" and splitted[1] == "Description":
            lines = lines[line_number + 1:]
            break

    #Get rid off the headings of each row
    for line_number, line in enumerate(lines):
        splitted = re.split(r'[\s,]', line)
        if splitted[0] != "Date":
            new_lines.append(line)

    file.writelines(new_lines)
    file.close()