const nearAPI = require("near-api-js");
const fetch = require("node-fetch");

const SHRINE_ACCOUNT = "ton-sanctuaire.testnet"; // TON ADRESSE
const ISEAI_API_KEY = "TA_CLE_ISEAI"; // Trouve ça sur iseai.jp

async function listenToSaisen() {
	const { providers } = nearAPI;
	const provider = new providers.JsonRpcProvider({
		url: "https://rpc.testnet.near.org",
	});

	console.log("⛩️  Le Sanctuaire écoute les offrandes...");

	// On poll le compte toutes les 5 secondes (plus rapide pour un hackathon)
	setInterval(async () => {
		const result = await provider.query({
			request_type: "view_account",
			finality: "final",
			account_id: SHRINE_ACCOUNT,
		});

		// Note: Pour une démo, vérifie juste le dernier hash de transaction
		// Si montant > 0.1 NEAR, déclenche l'oracle
		console.log("Vérification des dons...");
	}, 5000);
}

async function askOracle(category, userAddress) {
	const response = await fetch("https://api.iseai.jp/v1/chat/completions", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${ISEAI_API_KEY}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			model: "iseai-oracle", // ou le nom de ton agent sur ISEAI
			messages: [
				{
					role: "system",
					content: "Tu es un Oracle Shinto. Ne révèle la fortune qu'en privé.",
				},
				{
					role: "user",
					content: `Offrande reçue de ${userAddress} pour la catégorie ${category}. Donne-moi mon Omikuji.`,
				},
			],
		}),
	});
	const data = await response.json();
	console.log("📜 FORTUNE PRIVÉE :", data.choices[0].message.content);
}
