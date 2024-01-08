import type { NextApiRequest, NextApiResponse } from "next";
import MockData from "../../../../public/mock/list.json";

type ResponseData = {
  message: string;
} | typeof MockData.data[0];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const productId = req.query.id;
  // Ensure productId is a valid number before attempting to find the item
  if (!productId || isNaN(Number(productId))) {
    res.status(400).json({ message: "Invalid productId" });
    return;
  }

  // Find the item with the specified productId
  const productItem = MockData.data.find((item) => item.id === Number(productId));

  // Check if the item is found
  if (productItem) {
    res.status(200).json(productItem);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
}