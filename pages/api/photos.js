import { mongooseConnect } from "@/lib/mongoose";
import { Photo } from "@/models/Photo";


export default async function handle(req, res) {

    if (method === 'GET'){
        if (req.query?.id){
            const photo = await Photo.findById(req.query.id);
            res.json(project);
       
        }else{
            const photos = await Photo.find();
            res.json(projects.reverse());
        }
    }else{
        res.status(405).json({message: 'Method not allowed'});
    }
   
}