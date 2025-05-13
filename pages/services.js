import Head from "next/head";
import Link from "next/link";
import { HiXMark } from "react-icons/hi2";
import {IoMdCheckmark} from "react-icons/io";

export default function services() {
    return <>
        <Head>
            <title>Services</title>
        </Head>

        <div className="servicespage">
            <div className="topservices">
                <div className="container">
                    <h2 data-aos='fade-right'>Hesborn's Services</h2>
                    <p data-aos='fade-left'>Home <span>&gt;</span>Services</p>
                </div>
            </div>
            <div className="centerservices">
                <div className="container">
                    <div className="cservicesbox">
                        <div className="csservice" data-aos='flip-left' data-aos-easing='ease-out-cubic' data-aos-duration='2000'>
                            <span>01</span>
                            <div>
                                <h2>Web Development</h2>
                                <img src="/img/website_icon.svg" alt=""/>
                            </div>
                            <ul>
                                <li>Performance & Load Time</li>
                                <li>Reusable Components</li>
                                <li>Responsiveness</li>
                                <li>Quality assurance and testing</li>
                                <li>Quality maintenance, updates and bug fixes.</li>
                            </ul>
                            <p>I am very good in web development, I offer reliable web development services to generate the remarkable results which your business need.</p>
                        </div>
                        <div className="csservice" data-aos='flip-left' data-aos-easing='ease-out-cubic' data-aos-duration='2000'>
                            <span>01</span>
                            <div>
                                <h2>Web Development</h2>
                                <img src="/img/website_icon.svg" alt=""/>
                            </div>
                            <ul>
                                <li>Performance & Load Time</li>
                                <li>Reusable Components</li>
                                <li>Responsiveness</li>
                                <li>Quality assurance and testing</li>
                                <li>Quality maintenance, updates and bug fixes.</li>
                            </ul>
                            <p>I am very good in web development, I offer reliable web development services to generate the remarkable results which your business need.</p>
                        </div>
                        <div className="csservice" data-aos='flip-left' data-aos-easing='ease-out-cubic' data-aos-duration='2000'>
                            <span>01</span>
                            <div>
                                <h2>Web Development</h2>
                                <img src="/img/website_icon.svg" alt=""/>
                            </div>
                            <ul>
                                <li>Performance & Load Time</li>
                                <li>Reusable Components</li>
                                <li>Responsiveness</li>
                                <li>Quality assurance and testing</li>
                                <li>Quality maintenance, updates and bug fixes.</li>
                            </ul>
                            <p>I am very good in web development, I offer reliable web development services to generate the remarkable results which your business need.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pricingplansec">
                <div className="container">
                    <div className="pricingtitles text-center">
                        <h3><img src="/img/chevron_right.png" alt="" />PRICING PLAN</h3>
                        <h2>Pricing My Work</h2>
                    </div>

                    <div className="pricingcards">
                        <div className="pricingcard" data-aos='flip-left' data-aos-easing='ease-out-cubic' data-aos-duration='2000'>
                            <h4>Life Plan</h4>
                            <p>Perfect Choice for Individual</p>
                            <h2>$29.00<span> Monthly</span></h2>
                            <Link href="/contact"><button>Get Started Now</button></Link>
                            <div>
                                <h5>Lite includes:</h5>
                                <ul>
                                    <li><IoMdCheckmark/>Powerful admin panel</li>
                                    <li><IoMdCheckmark/>1 native android app</li>
                                    <li><HiXMark/>Multi-language support</li>
                                    <li><HiXMark/>Multi-language support</li>
                                </ul>
                            </div>
                        </div>
                        <div className="pricingcard" data-aos='flip-left' data-aos-easing='ease-out-cubic' data-aos-duration='2000'>
                            <h4>Premium Plan</h4>
                            <p>Perfect Choice for Individual</p>
                            <h2>$59.00<span> Monthly</span></h2>
                            <Link href="/contact"><button>Get Started Now</button></Link>
                            <div>
                                <h5>Everything in Lite, plus:</h5>
                                <ul>
                                    <li><IoMdCheckmark/>Powerful admin panel</li>
                                    <li><IoMdCheckmark/>1 native android app</li>
                                    <li><HiXMark/>Multi-language support</li>
                                    <li><HiXMark/>Multi-language support</li>
                                </ul>
                            </div>
                        </div>
                        <div className="pricingcard"  data-aos='flip-left' data-aos-easing='ease-out-cubic' data-aos-duration='2000'>
                            <h4>Pro Plan</h4>
                            <p>Perfect Choice for Individual</p>
                            <h2>$79.00<span> Monthly</span></h2>
                            <Link href="/contact"><button>Get Started Now</button></Link>
                            <div>
                                <h5>Everything in Premium, plus:</h5>
                                <ul>
                                    <li><IoMdCheckmark/>Powerful admin panel</li>
                                    <li><IoMdCheckmark/>1 native android app</li>
                                    <li><HiXMark/>Multi-language support</li>
                                    <li><HiXMark/>Multi-language support</li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>

    </>
}