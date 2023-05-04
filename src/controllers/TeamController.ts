import {Request, Response} from "express";
import { Team } from "../entities/Team";
import AppDataSource from "../data-source";
import { ILike } from "typeorm";

class TeamController{
    public async create(req:Request, res:Response): Promise<Response>{
        const {name} = req.body;
        if (!name || name.trim() === ""){
            return res.json({error:"Nome necessário"});
        }
        const team = new Team();
        team.name = name;

        const response:any = await AppDataSource.manager.save(Team,team).catch((e) => {
            return {error:e.message};
        });
        return res.json(response);
    }

    public async list(req:Request, res:Response): Promise<Response>{
        const teams = await AppDataSource.getRepository(Team).find({
            order:{
                name: "asc"
            }
        });
        return res.json(teams);
    }

    public async listByName(req:Request, res:Response): Promise<Response>{
        const {name} = req.params;
        const teams = await AppDataSource.getRepository(Team).find({
            where: {
                name: ILike(`%${name}%`)
            },
            order:{
                name: "asc"
            }
        });
        return res.json(teams);
    }

    public async update(req:Request, res:Response): Promise<Response>{
        const {id,name} = req.body;
        const existingTeam = await AppDataSource.getRepository(Team).findOneBy({ name });
        if (existingTeam) {
          return res.status(400).json({ error: 'O nome já existe' });
        }
        const team = await AppDataSource.getRepository(Team).findOneBy({id: id})
        team.name = name
        await AppDataSource.getRepository(Team).save(team)
        return res.json(team)
      }

      public async delete (req:Request, res: Response):Promise<Response>{
        const {id} = req.body
        const team = await AppDataSource.getRepository(Team).findOneBy({id});
        if (!team) {
            return res.status(404).json({ id, error: 'O id informado não existe' });
          }
          const result = await AppDataSource.getRepository(Team).delete({ id });
          if (result.affected > 0) {
            return res.json({ id, message: 'Time deletado com sucesso' });
          }
          return res.status(500).json({ id, error: 'Ocorreu um erro ao deletar o time' });
    }
}

const team = new TeamController();
export default team;