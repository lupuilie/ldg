import { Request, Response, NextFunction } from "express";
import { BugsRepository } from "../repositories/bugsRepository";
import { ObjectId } from "mongodb";
import { Bug, IBug } from "../entities/bug";

export const BugsController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const bugs = await BugsRepository.getAllBugs();
      res.json(bugs);
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bug = new Bug(req.body.title, req.body.description);
      await BugsRepository.add(bug);

      res.json(bug);
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params["id"];
      const bug = await BugsRepository.getBug(new ObjectId(id));

      req.body.bug = bug;

      next();
    } catch (error) {
      next(error);
    }
  },

  async bugWithId(req: Request, res: Response, next: NextFunction) {
    try {
      const bug: IBug = req.body.bug;
      res.json(bug);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { bug, ...newProps } = req.body;
      const updated = await BugsRepository.update(bug, newProps);

      res.json(updated);
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const bug: IBug = req.body.bug;
      const removed = await BugsRepository.remove(new ObjectId(bug._id));

      res.json({ _id: bug._id, ...removed });
    } catch (error) {
      next(error);
    }
  },
};
