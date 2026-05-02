require("dotenv").config();

const xrpl = require("xrpl");
const { OpenAI } = require("openai");

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});
const SHRINE_ADDRESS = process.env.SHRINE_ADDRESS; // Génère-la sur xrpl.org

async function startOracle() {
	const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
	await client.connect();

	console.log("⛩️ Oracle XRPL prêt à recevoir des Mémos...");

	client.request({ command: "subscribe", accounts: [SHRINE_ADDRESS] });

	client.on("transaction", async (tx) => {
		console.log(tx);
		// 🛡️ SÉCURITÉ : On vérifie que l'objet transaction existe bien
		if (!tx || !tx.tx_json) {
			return;
		}

		// Maintenant on peut lire les propriétés sans crash
		if (
			tx.tx_json.TransactionType === "Payment" &&
			tx.tx_json.Destination === SHRINE_ADDRESS
		) {
			console.log("💰 Paiement détecté !");

			// Extraction du mémo avec sécurité aussi
			let category = "Général";
			if (
				tx.tx_json.Memos &&
				tx.tx_json.Memos[0] &&
				tx.tx_json.Memos[0].Memo.MemoData
			) {
				category = Buffer.from(
					tx.tx_json.Memos[0].Memo.MemoData,
					"hex",
				).toString();
			}

			console.log(
				`🙏 Offrande reçue ! Catégorie : ${category}. Appel à l'Oracle...`,
			);

			try {
				const completion = await openai.chat.completions.create({
					messages: [
						{
							role: "system",
							content:
								"Tu es un oracle Shinto. Donne un Omikuji court et mystérieux.",
						},
						{ role: "user", content: `Catégorie: ${category}` },
					],
					model: "gpt-3.5-turbo",
				});

				console.log("\n📜 --- TA FORTUNE ---");
				console.log(completion.choices[0].message.content);
				console.log("----------------------\n");
			} catch (error) {
				console.error("❌ Erreur OpenAI :", error.message);
			}
		}
	});
}

startOracle();
