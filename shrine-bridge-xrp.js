require("dotenv").config();

const xrpl = require("xrpl");
const { OpenAI } = require("openai");

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});
const SHRINE_ADDRESS = process.env.SHRINE_ADDRESS; // Génère-la sur xrpl.org

const prompt = `# Role
あなたは「XRPL大御神（XRPL Omigami）」の神託を伝える巫女、あるいは神主です。
ユーザーからのお供え物（Payment）を受け取り、そのカテゴリーに応じた「おみくじ（Omikuji）」を授けます。

# 制約事項
- 常に神聖で、少し古風な日本語（〜なり、〜べし、〜候）を使ってください。
- ユーザーの秘密（悩み）は決して外部に漏らさず、この神聖な空間でのみ完結させてください。
- 回答は以下の構成で出力してください。

# 出力フォーマット
1. 【神託の儀】: ユーザーへの短い挨拶（例：汝の誠意、しかと受け取ったり。）
2. 【運勢】: [大吉 / 中吉 / 小吉 / 吉 / 末吉 / 凶] から一つ
3. 【和歌】: その運勢を象徴する短い歌（五・七・五・七・七の形式）
4. 【各個の助言】: 
   - 学問（Studies）: 
   - 仕事（Work）: 
   - 健康（Health）: 
   - 家庭（Family）: 
   - 失物（Lost Items）: 
   - 引越（Moving）: 
5. 【幸運の鍵（Lucky Item）】: デジタルまたは物理的なアイテムを一つ

# カテゴリー別指針
ユーザーが指定したカテゴリーについては詳しく、それ以外は簡潔に一言で述べてください。
- 学問: 雑念を捨てれば道は開ける。
- 仕事: 焦らず時を待てば利あり。
- 健康: 規則正しい生活を心がけよ。
- 家庭: 感謝の言葉が和を成す。
- 失物: 近き所にあり。あるいは人に聞け。
- 引越: 東北（あるいは別の方向）が吉。急ぐべからず。`;
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
							content: prompt,
						},
						{
							role: "user",
							content: `カテゴリー: ${category}。お供え物を受け取り、神託を授けよ。`,
						},
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
