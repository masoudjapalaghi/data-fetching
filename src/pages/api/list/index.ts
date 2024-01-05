import type { NextApiRequest, NextApiResponse } from "next";
import MockData from "../../../../public/mock/list.json";
type ResponseData = typeof MockData;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json(MockData);
}
