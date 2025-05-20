import Head from "next/head";
import { useState } from "react";
import { FaPhoneVolume, FaTwitter } from "react-icons/fa6";
import { GrLinkedin } from "react-icons/gr";
import { MdAttachEmail } from "react-icons/md";


export default function contact() {

    const [name, setName] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [project, setProject] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [messageOk, setMessageOk] = useState('');

    async function createProduct(ev){
        ev.preventDefault();

        setMessageOk('Sending...')

        const date = {name, lname, email, company, phone, country, project, price, description};
        try{
            await axios.post('/api/contacts', data);
            setMessageOk(' message sent successifully')
            setName('');
            setLname('');
            setEmail('');
            setCompany('');
            setPhone('');
            setCountry('');
            setProject('');
            setPrice('');
            setDescription('');
        }catch(error){
            if (error.response){
                console.error('Server error', error.response.data)
            }else if(error.request){
                console.error('Network error', error.request)
            }else{
                console.error('error', error.message)
            }
            setMessageOk(' failed to send message!')
        }
    }

    const handleProjectChange = (projectName) => {
        if (project.includes(projectName)){
            setProject(project.filter(project => project !== projectName))
        } else {
            setProject([...project, projectName])
        }
    }
    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    }

    return <>
        <Head>
            <title>Contact us</title>
        </Head>

        <div className="contactpage">
            <div className="container">
                <div className="contactformp">
                    <div className="leftcontp" data-aos='flip-left' data-aos-easing='ease-out-cubic' data-aos-duration='2000'>
                        <h2>Get in touch</h2>
                        <h2>Let's talk about your project</h2>
                        <p>Thinking about new project, a problem to solve or just want to connect? Let's do it!</p>
                        <p>Use the form on this page or get in touch by other means.</p>
                        <p>We love questions and feedback - and we're always happy to help!</p>
                        <div className="leftsociinfo">
                            <ul>
                                <li><FaPhoneVolume/> <span>Phone: <a target="_blank" href="tel:+254746574144">+254-746574144</a></span></li>
                                <li><MdAttachEmail/> <span>Email: <a target="_blank" href="mailto:anyandarhesbon@gmail.com">anyandarhesbon@gmail.com</a></span></li>
                                <li><GrLinkedin/> <span>Linkedin: <a target="_blank" href="tel:+254746574144">whatistech-tec</a></span></li>
                                <li><FaTwitter/> <span>Twitter: <a target="_blank" href="tel:+254746574144">@hesborn_ny</a></span></li>
                                
                            </ul>
                        </div>
                    </div>
                    <div className="rightcontp" data-aos='flip-left' data-aos-easing='ease-out-cubic' data-aos-duration='2000'>
                        <form onSubmit={createProduct}>
                            <div className="rightconttitle">
                                <h2>Your Contact information</h2>
                            </div>
                            <div className="rightcontinputs">
                                <input type="text" value={name} onChange={ev => setName(ev.target.value)} placeholder="First Name" required></input>
                                <input type="text" value={lname} onChange={ev => setLname(ev.target.value)} placeholder="Last Name" required></input>
                                <input type="email" value={email} onChange={ev => setEmail(ev.target.value)} placeholder="Email address" required></input>
                                <input type="text" value={company} onChange={ev => setCompany(ev.target.value)} placeholder="Company name"></input>
                                <input type="text" value={phone} onChange={ev => setPhone(ev.target.value)} placeholder="Phone No."></input>
                                <select onChange={(e) =>setCountry(e.target.value)} name="country" id="country">
                                    <option value="">Select Country</option>
                                    <option value="kenya">Kenya</option>
                                    <option value="india">India</option>
                                    <option value="singapore">Singapore</option>
                                    <option value="usa">USA</option>
                                    <option value="china">China</option>
                                    <option value="dubai">Dubai</option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="tanzania">Tanzania</option>
                                    <option value="rwanda">Rwanda</option>
                                </select>
                            </div>
                            <div className="rightconttitle">
                                <h2>What services do you need for your project?</h2>
                            </div>
                            <div className="rightcontcheckbox">
                                {[
                                    'Frontend Development',
                                    'Backend Development',
                                    'Fullstack Development',
                                    // 'Design System',
                                    'Website Migration',
                                    'E-commerce Site',
                                    'Performance Evaluation'
                                ].map((projectOption) => (
                                    <label key={projectOption} className="cyberpunk-checkbox-label">
                                        <input type="checkbox"
                                            className="cyberpunk-checkbox"
                                            value={projectOption}
                                            checked={project.includes(projectOption)}
                                            onChange={() => handleProjectChange(projectOption)}
                                        />
                                        {projectOption}
                                    </label>
                                ))}
                            </div>
                            <div className="rightconttitle">
                                <h2>How  much is the anticipated budget for your next project? </h2>
                            </div>
                            <div className="rightcontredio">
                                {['Less than $150', '$150 - $250', '$250 - $500', 'More than $500'].map((priceRange) => (
                                    <div key={priceRange} className="radio-button">
                                        <input type="radio"
                                            id={priceRange}
                                            name="example-radio"
                                            value={priceRange}
                                            checked={price === priceRange}
                                            onChange={handlePriceChange}
                                        />
                                        
                                        <span className="radio"></span>
                                        <label htmlFor={priceRange}>{priceRange}</label>
                                    </div>
                                ))}
                            </div>
                            <div className="rightconttitle">
                                <h2>Tell me about your project</h2>
                            </div>
                            <div className="rightcontpera">
                                <textarea value={description} onChange={ev => setDescription(ev.target.value)} name="description" rows={4} id="" placeholder="Project description"></textarea>
                            </div>
                            <hr/>
                            <div  className="righhcontsbtn flex gap-3">
                                <button type="submit">Submit</button>
                                <p>{messageOk}</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </>
}