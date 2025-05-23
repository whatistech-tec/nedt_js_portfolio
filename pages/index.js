import Head from "next/head";
import { BiDownload } from "react-icons/bi";
import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa6";
import { GrLinkedinOption } from "react-icons/gr";
import {GoArrowUpRight} from "react-icons/go";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { LuMedal } from "react-icons/lu";
import { PiGraduationCap } from "react-icons/pi";

export default function Home() {

const [activeIndex,setActiveIndex] = useState(0);

const handleHover = (index) =>{
  setActiveIndex(index);
}

const handleMouseOut = () =>{
  setActiveIndex(0);
}

const [loading, setLoading] = useState(true);
const [alldata, setAlldata] = useState([]);
const [allwork, setAllwork] = useState([]);
const [selectedCategory, setSelectedCategory] = useState('All');
const [filteredProjects, setFilteredProjects] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const [projectResponse, blogResponse] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/blogs')
      ])

      const projectData = await projectResponse.json();
      const blogsData = await blogsResponse.json();


      setAllData(projectData);
      setAllwork(blogsData);
    }catch(error){
      console.error('Error Fetching Data', error)
    }finally{
      setLoading(false);
    }
  }
  fetchData();
},[])

useEffect(() => {
  if (selectedCategory === 'All'){
    setFilteredProjects(alldata.filter(pro => pro.status === 'publish'));
  } else{
    setFilteredProjects(alldata.filter(pro => pro.status === 'publish' && pro.projectcategory[0] === selectCategory));
  }
}, [selectedCategory, alldata])

const handleCategoryChange = (category) => {
  setSelectedCategory(category);
}

const formatDate = (date) => {
  if (!date || isNaN(date)){
  return '';
  }
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour12: 'true'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}


  // services data
  const services = [
    {
      title: "Frontend Development",
      description: "I am very good in frontend development offering services, I offer reliable web development services to generate the most remarkable results which your business need."
    },
    {
      title: "Backend Development",
      description: "Experienced backend developer offering innovative solutions. Proficient in creating high-performance, user-centric mobile web applications. Expertise in Django and Next development."
    },
    {
      title: "Digital Marketing(SEO)",
      description: "My digital marketing services will take your business to the next level, we offer remarkable digital marketing strategies that drives traffic to your website, your business, and improves your brand awareness to potential customers."
    },
    {
      title: "Content Creator(Minor)",
      description: "Passionate photographer and videographer capturing moments with creativity. Transforming visions into visual stories. Expert in visual storytelling, skilled in both photography and videography to deliver captivating content."
    }
  ];


  

  return (
    <>
      <Head>
        <title>Hesborn - Personal Portfolio</title>
        <meta name="description" content="vbmcoder - Personal Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
      </Head>

      {/* hero section */}
      <section className="hero">

        <div className="intro_text">
          <svg viewBox="0 0 1320 300">
            <text x='50%' y='50%' text-anchor='middle' className="animate-stroke">HI</text>
          </svg>
        </div>
        <div className="container">
          <div className="flex w-100">
            <div className="heroinfoleft">
              <div className="hero_sb_title" data-aos-delay='3000' data-aos='fade-right'>I'm Hesborn Nyang'ara</div>
              <h1 className="hero_title"  data-aos-delay='3000' data-aos='fade-right'>Fullstack Dev<br/> Based in Kenya</h1>
              <div className="hero_img_box heroimgbox" data-aos='flip-left' data-aos-delay='3000' data-aos-easing='ease-out-cubic' data-aos-duration='2000'> 
                <img src="/img/dp.png" alt="Hesborn"/>
              </div>
              <div className="lead" data-aos-delay='3000' data-aos='fade-up'>I build modern, responsive and user-friendly web interfaces.
                 With clean code and seamless user experiences, I turn ideas into digital solutions that not only look great but also perform flawlessly. 
                 
              </div>
              <div className="hero_btn_box">
                <Link href="/" download={'/img/resume.pdf'} className="download_cv">Download CV <BiDownload/></Link>
                <ul className="hero_social">
                  <li><a href="/"><FaTwitter/></a></li>
                  <li><a href="/"><GrLinkedinOption/></a></li>
                  <li><a href="/"><FaGithub/></a></li>
                 
                </ul>
              </div>
            </div>
            {/* right side of hero section */}
            <div className="heroimageright">
              <div className="hero_img_box" data-aos='flip-left' data-aos-easing='ease-out-cubic' data-aos-duration='2000'>
                <img src="/img/dp.jpg" alt=""/>
              </div>
            </div>

          </div>
          <div className="funfect_area flex flex-sb">
            <div className="funfect_item" data-aos='fade-right'>
              <h3>3+</h3>
              <h4>Years of<br/> Experience</h4>
            </div>
            <div className="funfect_item" data-aos='fade-right'>
              <h3>20+</h3>
              <h4>Projects<br/> Completed</h4>
            </div>
            <div className="funfect_item" data-aos='fade-left'>
              <h3>12</h3>
              <h4>OpenSource<br/> Libraries</h4>
            </div>
            <div className="funfect_item" data-aos='fade-left'>
              <h3>25+</h3>
              <h4>Happy<br/> Clients</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services">
        <div className="container">
          <div className="services_titles">
            <h2>My Quality Services</h2>
            <p>
              {/* I’m passionate about the intersection of design 🎨 and
              development 💻. */}
              I believe the best digital experiences are built
              with a deep understanding of the user 👤 and a commitment to
              innovation 🌟. I bring precision 🎯, creativity ✨ and a
              user-first mindset to every project.</p>
          </div>
          <div className="services_menu">
            {services.map((service, index) => {
              return (
                <div data-aos='fade-up' key={index} className={`services_item ${activeIndex === index ? 'sactive' : ''}`}
                  onMouseOver={() => handleHover(index)}
                  onMouseOut={handleMouseOut}
                >
                  <div className="left_s_box">
                    <span>0{index + 1} </span>
                    <h3>{service.title}</h3>
                  </div>
                  <div className="right_s_box">
                    <p>{service.description}</p>
                  </div>
                  <GoArrowUpRight />
                </div>
              );
            })}

          </div>
        </div>
        
      </section>

      {/* Projects */}
      <section className="projects">
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
                filteredProjects.slice(0, 4).map((pro) => {
                <Link href='/' key={pro._id} data-aos='flip-left' data-aos-easing='ease-out-cubic' data-aos-duration='2000' className="procard">
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
            ) 
          }

          </div>
        </div>
       
      </section>

      {/* Experience study */}
      <section className="exstudy">
          <div className="container flex flex-left flex-sb">
            <div className="experience">
              <div className="experience_title flex gap-1">
                <LuMedal/>
                <h2>My Experience</h2>
              </div>
              <div className="exper_cards">
                <div className="exper_card" data-aos='fade-right'>
                  <span>2023 - Present</span>
                  <h3>FREELANCE SERVICES</h3>
                  <p>Fullstack Developer</p>
                </div>
                <div className="exper_card" data-aos='fade-right'>
                  <span>2024 June - 2024 Oct</span>
                  <h3>MINISTRY OF ICT NAIROBI COUNTY</h3>
                  <p>Front-end developer (internship)</p>
                </div>
                <div className="exper_card" data-aos='fade-right'>
                  <span>2021 - 2023</span>
                  <h3>VAGALLY LLC.</h3>
                  <p>Fullstack Developer</p>
                </div>
               
              </div>
            </div>
            <div className="education">
            <div className="experience_title flex gap-1">
                <PiGraduationCap/>
                <h2>My Education</h2>
              </div>
              <div className="exper_cards">
                <div className="exper_card"data-aos='fade-left'>
                  <span>2021 - 2025</span>
                  <h3>BSC. INFORMATION TECHNOLOGY</h3>
                  <p>Kenyatta University</p>
                </div>
                <div className="exper_card" data-aos='fade-left'>
                  <span>2017 - 2020</span>
                  <h3>HIGH SCHOOL STUDIES</h3>
                  <p>Nyambaria Boys High</p>
                </div>
              </div>
            </div>
          </div>

      </section>

      {/* My Skills */}
      <section className="myskills">
          <div className="container">
            <div className="myskills_title">
              <h2>My Tech Stack</h2>
              <p>I'm a passionate and lifelong learner. Always Evolving My Tech Stack</p>
            </div>
            <div className="myskils_cards">
              <div className="mys_card" data-aos='fade-right'>
                <div className="mys_inner">
                  <img src="/img/python.svg" alt="python" />
                  <h3>85%</h3>
                </div>
                <p className="text-center">Python</p>
              </div>
              <div className="mys_card" data-aos='fade-right'>
                <div className="mys_inner">
                  <img src="/img/mongodb.svg" alt="mongodb" />
                  <h3>90%</h3>
                </div>
                <p className="text-center">MongoDB</p>
              </div>
              <div className="mys_card" data-aos='fade-right'>
                <div className="mys_inner">
                  <img src="/img/redux.svg" alt="redux" />
                  <h3>70%</h3>
                </div>
                <p className="text-center">Redux</p>
              </div>
              <div className="mys_card" data-aos='fade-left'>
                <div className="mys_inner">
                  <img src="/img/react.svg" alt="react" />
                  <h3>92%</h3>
                </div>
                <p className="text-center" >React</p>
              </div>
              <div className="mys_card" data-aos='fade-left'>
                <div className="mys_inner">
                  <img src="/img/js.svg" alt="javascript" />
                  <h3>80%</h3>
                </div>
                <p className="text-center">Javascript</p>
              </div>
            </div>
          </div>
      
      </section>

      {/* Recent Blogs */}
      <section className="recentblogs">
        <div className="container">
          <div className="myskills_title">
            <h2>Recent Blogs</h2>
            <p>Crafting responsive, high-performance websites 🌐 with clean code 💻 and a user-focused approach 👥. Let’s build something amazing together 🚀.
            </p>
          </div>
          <div className="recent_blogs">
            {allwork.slice(0, 3).map((blog) => {
              return <Link href={`/blogs/${blog.slug}`} key={blog._id} className="re_blog">
                <div className="re_bloging">
                  <img src={blog.images[0] || '/img/noimage.png'} alt={blog.title}/>
                  <span>{blog.blogcategory[0]}</span>
                </div>
                <div className="re_bloginfo">
                  <div className="re_topdate flex gap-1">
                    <div className="res_date">
                      <FaCalendarDays/> <span>{formatDate(new Date(blog.createdAt))}</span>
                    </div>
                  </div>
                  <h2>{blog.title}</h2>
                </div>
              </Link>
            })}
          </div>
        </div>
       
      </section>

    </>
  );
}
