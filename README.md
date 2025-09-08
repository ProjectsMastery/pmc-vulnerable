# PMC Vulnerable API Lab 🎯

![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-brightgreen?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-blue?logo=express&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-lightgrey)
![Status](https://img.shields.io/badge/status-educational-orange)

This repository contains a simple **Node.js + Express API** that is deliberately designed with common security vulnerabilities.  

It serves as the **primary practice target and "firing range"** for interns of the **PMC API Security Academy**.  

Throughout the program, you will use this application to **identify, exploit, and mitigate** various API security flaws in a safe and controlled environment.  

---

## 🚀 Getting Started

Follow these instructions to get the API server running on your local machine.  

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Git](https://git-scm.com/)

---

## 📥 Installation & Setup

Clone the repository to your local machine:

```bash
git clone https://github.com/[YOUR_GITHUB_USERNAME]/pmc-vulnerable-api-lab.git
```

Navigate into the project directory:
```bash
cd pmc-vulnerable-api-lab
```
npmnciesss required dependencies:
```bash
npm install
```

▶️ Running the API

To start the server, run the following command from the project root:

you ehconfirmationuld see a confirmation message:

🚀 Server is running on http://localhost:3000

You can now send requests to this local server using tools like Postman.

📡 Endpoints

GET /

Returns a simple welcome message to confirm tcd

GET /api/users/:id

Retrieves a user’s profile by their unique ID.

Example: /api/users/1

🔍 Intended Vulnerabilities

This application is intentionally insecure and currently includes:

1. Broken Object Level Authorization (BOLA / IDOR)

The /api/users/:id endpoint does not verify authorization.

Any user can access any other user’s data simply by changing the id in the URL.


2. Excessive Data Exposure

The API returns the entire user object, including sensitive fields like email and passwordHash.

These should never be exposed to the client.


> ⚡ As the program progresses, more vulnerabilities will be added to this lab.


⚠️ Security Disclaimer

This application is intentionally insecure and built for educational purposes only.

> ❌ Do NOT use this code in production.
Doing so will expose your applications and users to critical security risks.

