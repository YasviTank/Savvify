import React from "react";
import BudgetImage from "./piechart-budg.png";

function Learn() {
  return (
    <div style={{
      padding: "2rem 3rem",
      maxWidth: "900px",
      margin: "0 auto",
      background: "linear-gradient(135deg, #121212, #1e1e1e)",
      color: "#f5f5f5",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      lineHeight: "1.6",
    }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Personal Finance Basics</h1>

      <section style={{ marginBottom: "2rem" }}>
        <p>
          Personal finance is where financial literacy translates into individual financial decision-making. 
          How do you manage your money? Which savings and investment vehicles are you using? Personal finance is about making and meeting your financial goals, whether you want to own a home, help other members of your family, save for your children’s college education, support causes that you care about, plan for retirement, or anything else. 
          Among other topics, it encompasses banking, budgeting, handling debt and credit, and investing.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Introduction to Bank Accounts</h2>
        <p>
          A bank account is typically the first financial account that you’ll open. Bank accounts can hold and build the money you'll need for major purchases and life events. Here’s some background on bank accounts and why they are step one in creating a stable financial future.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Why Do I Need a Bank Account?</h2>
        <p>
          Because it’s safer than holding cash. Assets held in a bank are harder to steal, and in the U.K, they’re generally insured by the Financial Services Compensation Scheme (FSCS). That means you should always have access to your cash, even if every customer decides to withdraw their money at the same time. Having a bank account allows you to:
        </p>
        <ul>
          <li>Use a debit or credit card</li>
          <li>Use payment apps like Venmo or PayPal</li>
          <li>Write a check</li>
          <li>Use an ATM</li>
          <li>Buy or rent a home</li>
          <li>Receive your paycheck from your employer</li>
          <li>Earn interest on your money</li>
        </ul>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Online vs. Brick-and-Mortar Banks</h2>
        <p>
          When you think of a bank, you probably picture a building. This is called a brick-and-mortar bank. Many brick-and-mortar banks also allow you to open accounts and manage your money online.
          Some banks are only online and have no physical buildings. These banks typically offer the same services as brick-and-mortar banks, aside from the ability to visit them in person.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Which Type of Bank Can I Use?</h2>
        <h3>Retail Banks</h3>
        <p>For-profit companies offering checking/savings accounts, loans, credit cards, and insurance. Usually more locations & advanced online tech.</p>
        <h3>Credit Unions</h3>
        <p>Not-for-profit, member-owned. Lower fees, better rates, but fewer branches.</p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Types of Bank Accounts</h2>
        <h3>Savings Account</h3>
        <p>Interest-bearing, flexible, good for emergency funds or short-term goals.</p>
        <h3>Checking Account</h3>
        <p>Highly liquid, used for everyday transactions. Fees vary.</p>
        <h3>High-yield Savings Account</h3>
        <p>Higher interest rates, usually higher minimum balance & fees.</p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Emergency Fund</h2>
        <p>Separate savings for unexpected expenses. Typically 3–6 months of expenses. Should not be used for everyday spending.</p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Introduction to Credit Cards</h2>
        <p>Allows borrowing money to pay back over time. Interest charged if balance not paid in full.</p>
        <h3>Credit vs Debit</h3>
        <p>Debit = money from checking account, no credit history. Credit = borrow money, pay later, build credit history.</p>
        <h3>APR</h3>
        <p>Annual interest on unpaid balance. Higher APR = more interest owed.</p>
        <h3>Choosing a Credit Card</h3>
        <p>Depends on credit score, perks, spending habits. Options: travel rewards, cash-back, balance transfer, low/no APR, secured cards.</p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Budgeting</h2>
        <p>Track income and expenses, set goals, cut unnecessary spending. Save extra money in an emergency fund first.</p>
        <img 
          src={BudgetImage}  // Replace with your image path
          alt="Budget Illustration" 
          style={{
            width: "100%",          // Makes it responsive
            maxWidth: "600px",      // Optional max width
            margin: "1rem 0",       // Spacing around the image
            borderRadius: "12px",   // Rounded corners
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)" // Optional shadow
          }}
/>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Investing Basics</h2>
        <h3>Stock Market</h3>
        <p>Markets/exchanges for buying & selling stocks, ETFs, bonds, etc.</p>
        <h3>How to Invest</h3>
        <p>Use brokers (full-service, online/discount, robo-advisors).</p>
        <h3>Investment Options</h3>
        <p>Stocks, ETFs, mutual funds, bonds — risk varies by type.</p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>The Bottom Line</h2>
        <p>Personal finance is complex but learning the basics helps you plan, save, invest, and build a secure financial future. Use tools like budgeting, bank accounts, credit, and investing wisely. Our chatbot can help explore personalized financial habits!</p>
      </section>
    </div>
  );
}

export default Learn;
