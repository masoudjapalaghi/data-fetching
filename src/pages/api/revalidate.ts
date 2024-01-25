import config from "@/helpers/config";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== config.tokenRevalidate) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // This should be the actual path, not a rewritten path
    // e.g., for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate("/pagesRoute/getStaticProps/onDemandRevalidation/[id]");
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.log(err);
    return res.status(500).send("Error revalidating" + err);
  }
}
