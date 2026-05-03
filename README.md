# ⛩️ XRPL Oracle Omikuji (XRPL 大御神)

An autonomous, AI-powered spiritual guide that bridges traditional Japanese Shinto rituals with the high-speed efficiency of the **XRP Ledger**.

## 🌟 Overview

**XRPL Oracle Omikuji** is an agentic commerce experiment. It transforms the traditional "Saisen" (shrine offering) into a seamless blockchain interaction. By sending a micro-payment to the Shrine's address, users trigger an autonomous AI Oracle that decodes their intent and provides a personalized, poetic Japanese fortune.

## 🚀 Key Features

- **Autonomous Agentic Commerce:** A real-time Node.js "Oracle" that monitors the ledger and acts only upon confirmed economic transactions.
- **Intent-Based Metadata:** Utilizing **XRPL Memos** to allow users to choose their fortune category (Health, Work, Love) directly within the payment transaction.
- **Authentic Persona:** AI-generated Omikuji featuring traditional Shinto formatting, Waka poetry, and specific life advice.
- **Real-time Response:** Leveraging the 3-5 second finality of XRPL for an instant "divine" revelation.
- **Privacy-First:** While the payment is on-chain, the spiritual interaction remains off-chain, ensuring user concerns are kept confidential.

## 🛠️ Technology Stack

- **Blockchain:** XRP Ledger (Testnet)
- **AI Engine:** OpenAI GPT-3.5/4
- **Backend:** Node.js (xrpl.js, dotenv)
- **Presentation:** Manus AI

## 🔗 Hackathon Resources & Links

- **Luma**: [Clawathon Tokyo Edition](https://luma.com/zw01ink4?tk=BCY6fF)

### 📜 Project Materials

- **AI Presentation (Manus):** [Interactive Slides](https://manus.im/share/file/14b2b11a-7e9a-45bb-b14e-07d7f1bdecb2)
- **Project Logic (ISEAI):** [Architecture Diagram](https://drive.google.com/file/d/1NYJSOXxbPfO2yXZrdbMIZZ0rXz3j2pCl/view)

### 💎 XRPL Live Data (Testnet)

- **Shrine Address:** `rUFJWbLF81vsmRFCJg6ZZwE2eN9YwiTruG`
- **Tourist Address (User):** `rMcTdDWUAnthqob1Ua6uCxJGubxPRyTE8o`
- **Explorer:** [View Tourist Account on XRPL Testnet](https://testnet.xrpl.org/accounts/rMcTdDWUAnthqob1Ua6uCxJGubxPRyTE8o)

### 🛠️ Developer References

- **XRPL Tools:** [Faucet](https://xrpl.org/resources/dev-tools/xrp-faucets) | [Transaction Sender](https://xrpl.org/resources/dev-tools/tx-sender)
- **Documentation:** [Payment Transactions](https://xrpl.org/docs/references/protocol/transactions/types/payment) | [JS Quickstart](https://github.com/XRPLF/xrpl-dev-portal/tree/master/_code-samples/quickstart/js)
- **Wallet Setup:** [Accessing Testnet on Xaman](https://help.xaman.app/app/learning-more-about-xaman/how-to-access-testnet-on-xrp-ledger)
- **Cultural Context:** [Omikuji Guide](https://omikujijapan.com/en/omikuji)

## 📖 How It Works

1.  **Offering:** The user sends 1 XRP from their wallet (e.g., Xaman) to the Shrine address.
2.  **Intent:** The user includes a **Memo** in the transaction specifying a category (e.g., "Health").
3.  **Oracle Sync:** The Node.js bridge detects the payment and decodes the memo.
4.  **Inference:** The script calls the OpenAI API with a specialized Shinto Priest prompt.
5.  **Revelation:** The terminal/interface displays the sacred Omikuji fortune.

## ⚙️ Setup & Installation

### Prerequisites

- Node.js (v18 or higher)
- An OpenAI API Key
- An XRPL Testnet account (with credentials from the [XRPL Faucet](https://xrpl.org/xrp-testnet-faucet.html))

### Installation

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/your-username/xrpl-oracle-omikuji.git](https://github.com/your-username/xrpl-oracle-omikuji.git)
   cd xrpl-oracle-omikuji
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:

   ```env
   OPENAI_API_KEY=your_sk_key_here
   SHRINE_ADDRESS=your_xrpl_testnet_address
   ```

4. **Run the Oracle:**
   ```bash
   node shrine-bridge-xrp.js
   ```

## 🗺️ Roadmap

- **Verification:** Implementing `xrp-ledger.toml` domain verification to prevent QR-code phishing.
- **NFT Rewards:** Minting specific "Great Blessing" (Dai-Kichi) fortunes as Soulbound Tokens (SBTs).
- **XRPL Hooks:** Migrating business logic to Layer 1 Hooks for full on-chain automation.

## 📄 License

This project is licensed under the MIT License.
