import { Request, Response } from 'express';

const requestHandler = (req: Request, res: Response) => {
  res.status(res.locals.status).json({ data: res.locals.data, message: res.locals.message });
};

export default requestHandler;
