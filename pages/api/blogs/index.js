import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export default async function handle(req, res) {

    await mongooseConnect();

    const { method } = req;

    if (method ==='GET'){
        if (req.query?.id){
            const blog = await Blog.findById(req.query.id);
            res.json(blog);
        }else if (req.query?.blogcategory) {
            const projectcate = await Blog.find({blogcategory: req.query.blogcategory})
            res.json(projectcate);
            
        }else if (req.query?.tags) {
            const projectcate = await Blog.find({blogcategory: req.query.blogcategory})
            res.json(projectcate);
            
        }else if (req.query?.slug) {
            const projectslug = await Blog.find({slug: req.query.slug})
            res.json(projectslug.reverse());
        }else{
            const blogs = await Blog.find();
            res.json(blogs.reverse());
        }
    }else{
        res.status(405).json({message: 'Method not allowed'});
    }
        

}