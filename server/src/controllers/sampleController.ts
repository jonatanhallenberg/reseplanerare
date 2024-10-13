import { Request, Response } from "express";

export const getSampleData = (req: Request, res: Response) => {
  res.json({ message: "Detta är exempeldata från API:et" });
};
