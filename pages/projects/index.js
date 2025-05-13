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
                        <p>I put ideas and thus your wishes in the form of a unique project that inspires you and your customers.</p>
                    </div>
                    <div className="project_buttons">
                        <button className={selectedCategory === 'Website Development' ? 'active' : ''} onClick={() => setSelectedCategory('Website Development')}>All</button>
                        <button className={selectedCategory === 'App Development' ? 'active' : ''} onClick={() => setSelectedCategory('App Development')}>Frontend</button>
                        <button className={selectedCategory === 'E-commerce Site' ? 'active' : ''} onClick={() => setSelectedCategory('E-commerce Site')}>Fullstack</button>
                        <button className={selectedCategory === 'Performance Evaluation' ? 'active' : ''} onClick={() => setSelectedCategory('Performance Evaluation')}>Digital</button>
                        {/* <button className={selectedCategory === 'All' ? 'active' : ''} onClick={() => setSelectedCategory('All')}>Content</button> */}
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