import {Request, Response} from "express"
import { Match } from "../entities/Match";
import { Team } from "../entities/Team";
import AppDataSource from "../data-source";

class MatchController{

    public async createMatch(req: Request, res: Response): Promise<Response> {
        const { idhost, idvisitor, date } = req.body

        if (!idhost || idhost.toString().trim === '' || !idvisitor || idvisitor.toString().trim === '') {
            return res.json({ error: 'ID is required' })
        }

        if (!date || date.toString().trim === '') {
            return res.json({ error: 'Date is required' })
        }

        const host = await AppDataSource.getRepository(Team).findOneBy({ id: idhost })
        const visitor = await AppDataSource.getRepository(Team).findOneBy({ id: idvisitor })

        const match = new Match();

        if (!host) {
            return res.json({ error: 'Host nao encontradp' })
        }
        else if (!visitor) {
            return res.json({ error: 'Visitor não encontrado' })
        }
        else {
            match.host = host;
            match.visitor = visitor;
            match.date = date;
    
            const response: any = await AppDataSource.manager.save(Match, match) 
                .catch((e: any) => {
                    return { error: e.message }
                })
    
            return res.json(response);
        }
    }

    public async list(req: Request, res: Response): Promise<Response>{
        const {limit, offset} = req.body;
        try{
            const find = await AppDataSource.getRepository(Match).find({order:{date:"DESC"}, relations:{host:true, visitor:true}, skip: offset, take: limit});
            return res.json(find)
        }
        catch(error){
            return res.json(error)
        }
    }
    
    public async getByTeamId(req: Request, res: Response): Promise<Response>{
        const{ id } = req.params;
        try {
            const find = await AppDataSource.getRepository(Match).findOne({where:[{ host: { id: Number(id) } }, { visitor: { id: Number(id) } }], order:{ date: "DESC"}, relations: {host: true, visitor: true}});
            return res.json(find)
        }
        catch (error){
            return res.json(error);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { id, idhost, idvisitor, date } = req.body

        const match = await AppDataSource.getRepository(Match).findOneBy({ id })

        if (!idhost || idhost.toString().trim === '' || !idvisitor || idvisitor.toString().trim === '') {
            return res.json({ error: 'É necessário informar o ID' })
        }

        if (!date || date.toString().trim === '') {
            return res.json({ error: 'É necessário informar a data' })
        }

        const host = await AppDataSource.getRepository(Team).findOneBy({ id: idhost })
        const visitor = await AppDataSource.getRepository(Team).findOneBy({ id: idvisitor })

        if (!match) {
            return res.json({ error: 'Match não encontrada' })
        }
        else if (!host) {
            return res.json({ error: 'Host não encontrado' })
        }
        else if (!visitor) {
            return res.json({ error: 'Visitor não encontrado' })
        }
        else {
            match.host = host;
            match.visitor = visitor;
            match.date = date;
    
            const response: any = await AppDataSource.manager.save(Match, match)
                .catch((e: any) => {
                    return { error: e.message }
                })
    
            return res.json(response)
        }        
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.body;
        try {
          const del = AppDataSource.createQueryBuilder().delete().from(Match).where("id = :id", { id }).execute();
          return res.json(del);
        } catch (error) {
          return res.json(error);
        }
      }
}

const match = new MatchController();

export default match;