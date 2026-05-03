# AKINDO submittion

## What it does

**XRPL Oracle Omikuji** is an autonomous AI-driven spiritual guide that brings the traditional Japanese "Omikuji" (fortune-telling) experience to the blockchain. By sending a micro-payment (Saisen) to the Shrine’s address on the **XRP Ledger**, users receive a personalized, poetic, and private fortune. The AI "Oracle" monitors the ledger in real-time, decodes instructions hidden in transaction memos, and delivers divine wisdom instantly.

## The problem it solves

Most AI services today rely on subscription models or invasive data collection. Our project addresses two main issues:

1. **Friction in Micro-payments:** Using XRPL, we enable "Pay-per-Inference," where users pay a tiny, near-instant fee for a single AI interaction without needing a credit card.
2. **Privacy in Divination:** While the payment is public on-chain, the specific category (e.g., family secrets, health worries) and the resulting fortune are handled by the agent logic, demonstrating a model for private, intent-based AI commerce.

## Challenges I ran into

The biggest challenge was the **pivot**. I originally started with a complex NEAR/IronClaw environment, but faced significant wallet and testnet connectivity issues mid-hackathon. I had to pivot to the **XRP Ledger** with only 90 minutes remaining. Learning the XRPL transaction structure—specifically handling `Memos` and managing the real-time `subscribe` streams to avoid "undefined" property errors—was a high-speed learning curve.

## Technologies I used

- **XRP Ledger (XRPL):** Used for the economic layer and metadata transmission via Memos.
- **Node.js & xrpl.js:** For the real-time blockchain listener and "Oracle" bridge.
- **OpenAI API:** To power the Shinto Oracle’s persona and generate authentic Japanese fortunes.
- **dotenv:** For secure API key and environment management.
- **WSL (Windows Subsystem for Linux):** For the development environment.

## How we built it

We built a "Bridge" architecture. A Node.js script acts as the Shrine's gateway, subscribing to the XRPL Testnet. When a transaction is detected at the Shrine's address, the script:

1. Validates the payment.
2. Decodes the `MemoData` (Hex to UTF-8) to identify the user's chosen life category (Studies, Work, Health, etc.).
3. Triggers an AI inference with a highly specialized "Shinto Oracle" prompt.
4. Outputs a formatted Omikuji including a Waka poem and specific advice.

## What we learned

I learned that **simplicity and speed beat complexity** in a hackathon setting. Pivoting to XRPL taught me the efficiency of "Memos" as a communication protocol between users and agents. I also learned the importance of "Guard Clauses" in real-time stream monitoring to prevent script crashes when the ledger sends metadata instead of full transaction objects.

## What's next for

- **On-chain Fortunes:** Implementing "Hooks" on XRPL to automate responses directly from the ledger.
- **NFT Omikuji:** Minting the fortune as a Soulbound Token (SBT) so users can keep their "Lucky Year" on-chain.
- **Discord Integration:** Connecting the XRPL Oracle to a Discord bot via ISEAI/OpenClaw for a more accessible user interface.
