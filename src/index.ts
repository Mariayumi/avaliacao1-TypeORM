import * as express from "express";
import * as dotenv from "dotenv";
import routes from "./routes";
import{Request} from"express";
import * as cors from'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors<Request>());
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));

app.use(routes);