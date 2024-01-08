import type { NextApiRequest, NextApiResponse } from "next";
import MockData from "../../../../public/mock/list.json";
import fs from "fs/promises";
import path from "path";
const filePath = path.join(process.cwd(), "public", "mock", "list.json");

type ResponseData =
  | {
      success: boolean;
      message?: string;
    }
  | (typeof MockData.data)[0];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const productId = req.query.id;
  if (req.method === "PUT") {
    try {
      const currentContent = await fs.readFile(`${filePath}`);
      const parsedData = JSON.parse(currentContent.toString());
      const newPrice = req.body.price;
      const updatedData = parsedData.data.map((item: ProductCardType) =>
        item.id == productId ? { ...item, price: newPrice } : item
      );
      const newContent = JSON.stringify({ data: updatedData }, null, 2);
      await fs.writeFile(filePath, newContent, "utf-8");

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false });
    }
  } else if (req.method === "GET") {
    // Ensure productId is a valid number before attempting to find the item
    if (!productId || isNaN(Number(productId))) {
      res.status(400).json({ success: false, message: "Invalid productId" });
      return;
    }

    // Find the item with the specified productId
    const productItem = MockData.data.find(
      (item) => item.id === Number(productId)
    );

    // Check if the item is found
    if (productItem) {
      res.status(200).json(productItem);
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } else {
    res.status(405).json({ success: false });
  }
}
