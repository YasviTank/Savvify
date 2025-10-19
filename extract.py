#This program aim to extract the data from the CSV file into usable info
import pdfplumber
import csv
import re

special_keyword = 'FASTERPAYMENTS' #For money in
money_in_keywords = ['PAID IN', 'TRANSFER TO', 'PAYROLL', 'SALARY', 
                     'WAGES', 'DEPOSIT', 'REFUND']
money_out_keywords = ['PAYMENT', 'FEE', 'DEBIT', 'STANDING ORDER', 
                      'CHARGE']    

payto = "PAYMENTTO"
on = "ON"

dates = []
descriptions = []
transactions = []
balances = []
companys = []

total_earnings = 0
total_spendings = 0
others = 0

def extract_from_csv(csv_file_name):
    """Turns the CSV file into useful info"""
    global dates
    global descriptions
    global transactions
    global balances
    
    #Open the file and read content
    csv_file = open(csv_file_name, "r", encoding="utf-8")
    content = csv_file.readlines()

    
    #Extract the info into the lists
    for index, item in enumerate(content):
        line = item.split(',')
        
        dates.append(line[0])
        descriptions.append(" ".join(line[1:-2]).strip('"'))
        transactions.append(float(line[-2]))
        balances.append(float(line[-1].strip()))

    #Decide if its money in or out
    for index, descript in enumerate(descriptions):
        
        #If it is a special keyword that means money in
        if special_keyword in descript[:len(special_keyword)]:
            pass
        else:
            for word in money_out_keywords:
                if word.replace(" ","") in descript: #Money is negative(lost)
                    transactions[index] = -1 * transactions[index]

def extract_company_names():
    """Extract Company names from description"""
    global descriptions
    global companys
    
    for index, descript in enumerate(descriptions):
        
        #Only bother with money going out of the account
        if transactions[index] < 0:
            front_index = descript.rfind(payto)
            back_index = descript.rfind(on)
            
            #It will be in the others category
            if front_index == -1 or back_index == -1:
                #This means the transaction belongs to the others category
                companys.append("NULL")
            else:
                substr = descript[front_index + len(payto):back_index]
                companys.append(substr)
        else:
            #This means the transaction is coming into the bank account
            companys.append("POSITIVE")
            
def extract_earning_and_spending():
    """Calculates the total earning, spending and others"""
    global total_earnings
    global total_spendings
    global others
    
    for index, money in enumerate(transactions):
        if companys[index] == "NULL":
            others += abs(money)
        
        if money < 0:
            total_spendings += money
        else:
            total_earnings += money
            
    total_spendings = total_spendings * -1