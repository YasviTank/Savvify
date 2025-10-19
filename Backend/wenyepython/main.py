import tocsv
import extract
import request

#----------------------------- Variables ----------------------------
dates = []
descriptions = []
transactions = []
balances = []
companys = []

balance_before = 0 #Bank balance before the month started
balance_after = 0 #Remaining balance after the month ended

pdf_name = "statement.pdf" #Put the bank statement pdf name here
csv_file_name = "statement.csv" #Put the CSV file name here

total_earnings = 0
total_spendings = 0

needs_cat = ["groceries" , "shopping", "living expenses", "transport", "loan", "taxes", "healthcare", "education"]
wants_cat = ["gifts", "dining/takeaway", "entertainment", "travel/Holiday"]

#key: category name, value: total spending
needs = {} 
wants = {}
others = 0


#-------------------- Dictionary functions --------------------

def update_dict(dict, category, money):
    """Updates the given dictionary, increase the money if category exists"""
    
    if category in dict:
        dict[category] += money
    else:
        dict[category] = money
    
    return dict

def update_needs_and_wants(category, money):
    """Update needs, wants or others"""
    global needs
    global wants
    global others
    
    #If the category is in needs
    if category in needs_cat: 
        needs = update_dict(needs, category, money)
        
    #If the category is in wants
    elif category in wants_cat: 
        wants = update_dict(wants, category, money)
        
    #If it doesnt fit, throw it into the others category
    else: 
        others += money

#----------------- Set up CSV file and extract data -----------------------

def main(pdf_name):
    tocsv.pdf_to_csv(pdf_name, csv_file_name)
    extract.extract_from_csv(csv_file_name)
    extract.extract_company_names()
    extract.extract_earning_and_spending()


    dates = extract.dates
    descriptions = extract.descriptions
    transactions = extract.transactions
    balances = extract.balances
    companys = extract.companys

    balance_before = balances[0] - transactions[0]
    balance_after = balances[-1]

    total_spendings = extract.total_spendings
    total_earnings = extract.total_earnings
    others = extract.others

    #-------------------------- Requests to Gemini --------------------------

    print(f"--- Asking Gemini for categorizing ---")

    for index, company in enumerate(companys):
        
        #Skip one loop if the company isnt required to be searched
        if company == "NULL" or company == "POSITIVE":
            continue
        
        category = request.categorize_company(company).lower() #Ask for the category of the company name
        
        #Updates the needs and wants dictionaries
        update_needs_and_wants(category, abs(transactions[index]))


    #----------------------------- Caculations ------------------------------

    total_needs = sum(needs.values())
    total_wants = sum(wants.values())

    p1 = total_needs/total_spendings * 100
    p2 = total_wants/total_spendings * 100
    p3 = others/total_spendings * 100

    output_name_list = ["needs", "wants", "others"]
    output_percentage_list = [p1, p2, p3]
    
    return output_name_list, output_percentage_list