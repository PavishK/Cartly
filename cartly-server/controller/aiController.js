import { GoogleGenAI } from "@google/genai";

const returnPrompt = (datas) => {
  return `
**Situation**
You have a JSON array of products (electronics and groceries). You need to generate **simulated prices** for demonstration purposes.

**Input (JSON)**
${JSON.stringify(datas, null, 2)}

**Task**
1. Validate product names (ignore empty/invalid names)
2. Generate **realistic simulated price** in INR for each product
3. Use **commas** for thousands separators in all prices (e.g., 23,000)
4. Build a Markdown table with columns: Product Name, Price
5. Compute total aggregate price

**Rules**
* Do NOT fetch from the internet; **simulate the prices**
* Output **only the table and total price**, no extra text
* All prices including total should use **commas**
* Total price should be **bold** and _monospace_ font style

**Output Format**
| Product Name | Price |
| ------------ | ----- |
| [Product 1]  | ₹X    |
| [Product 2]  | ₹Y    |

**Total Aggregate Price:** **_₹[Sum]_**
  `;
}


export const GeminiMain = async( req, res ) => {

    try {
        const { datas } = req.body;
        if(datas.length <=0)
            return res.status(400).json({message:"No products to calculate"});

        const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
        const prompt = returnPrompt( datas );
        const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          thinkingConfig: {
            thinkingBudget: 5,
          },
        }
      });
      return res.status(200).json({response:response.text});   
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}