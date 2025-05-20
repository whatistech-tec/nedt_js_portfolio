import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

export default function projects() {

    const {alldata, loading} = useFetchData('/api/projects');
    const publishedData = alldata.filter(ab => ab.status === 'publish');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState([]);
    
    useEffect(() => {
      if (selectedCategory === 'All'){
        setFilteredProjects(alldata.filter(pro => pro.status === 'publish'));
      } else{
        setFilteredProjects(alldata.filter(pro => pro.status === 'publish' && pro.projectcategory[0] === selectCategory));
      }
    }, [selectedCategory, alldata])
    
    
    return <>
        <Head>
            <title>Project</title>
        </Head>
        <div className="projectpage">
            <div className="projects">
                <div className="container">
                    <div className="project_titles">
            <h2>My Recent Works</h2>
            <p>Explore my latest work, blending creativity and code for functional, responsive websites with clean design and seamless user experiences.</p>
          </div>
          <div className="project_buttons">
            <button className={selectedCategory === 'All Projects' ? 'active' : ''} onClick={() => setSelectedCategory('All Projects')}>All</button>
            <button className={selectedCategory === 'Frontend Development' ? 'active' : ''} onClick={() => setSelectedCategory('Frontend Development')}>Frontend</button>
            <button className={selectedCategory === 'Fullstack Projects' ? 'active' : ''} onClick={() => setSelectedCategory('Fullstack Projects')}>Fullstack</button>
            <button className={selectedCategory === 'E-commerce Site' ? 'active' : ''} onClick={() => setSelectedCategory('E-commerce Site')}>E-commerce</button>
            <button className={selectedCategory === 'Projects Featured in' ? 'active' : ''} onClick={() => setSelectedCategory('Projects Featured in')}>Featured</button>
          </div>
                    <div className="projects_cards">
                        {loading ? <div className="flex flex-center wh_50"><Spinner/></div> : (
                            filteredProjects.length === 0 ? (
                            <h1 className="w-100 flex flex-center mt-3">No Project Found</h1>
                            ): (
                                filteredProjects.map((pro) => {
                                <Link href={`/projects/${pro.slug}`} key={pro._id} className="procard">
                                    <div className="proimgbox">
                                    <img src={pro.images[0]} alt={pro.title}/>
                                    </div>
                                    <div className="procontentbox">
                                    <h2>{pro.title}</h2>
                                    <GoArrowUpRight/>
                                    </div>
                                </Link>
                                })
                            )
                        ) }  
                    </div>
                </div>
            </div>
        </div>
    </>
}