import {useTranslation} from "react-i18next";
import './About.css';
import SvgComp from "../components/SvgComp.jsx";
import {useState} from "react";
import {HashLink} from "react-router-hash-link";
import Typewriter from "../components/Typewriter.jsx";

export default function About() {
    const {t} = useTranslation();
    const [isBannerHide, setBannerHide] = useState(false);

    const [typeRole, setTypeRole] = useState('student');

    const programming = ['html', 'css', 'javascript', 'laravel', 'mysql', 'postgresql', 'php', 'restapi', 'react', 'github', 'svg']
    const programming2 = ['expressjs', 'mongodb', 'firebase', 'vuejs', 'ajax', 'git', 'cpp', 'python', 'sql-server', 'docker']

    return (
        <>
            {!isBannerHide &&
                <div className={'bg-trans-primary flex-ais-jcc gap-m radius-l p-x'}>
                    <div className={'font-medium font-size-x text-center'}>
                        <p>{t('about_download_the_mobile_version_of_the_android_application')} </p>
                        <a href={'http://ilhamrhmtkbr.github.io/iamra-course-apk-download/'} className={'text-primary capitalize cursor-pointer text-hover-underline'}>{t('now')}</a>
                    </div>
                    <div className={'badge-button-close'} onClick={() => setBannerHide(true)}>
                        <SvgComp file={'sprite'} icon={'close'}/>
                    </div>
                </div>}

            <div className={'grid-start'}>
                <img src={'./bg-about.jpg'}
                     className={'object-fit-cover radius-l'}
                     alt={'ilhamrhmtkbr'}
                     style={{minHeight: 325, maxHeight: 325, width: '100%'}}
                />
                <div className={'grid-start'}>
                    <div>
                        <h1 className={'font-medium font-size-x flex-aic-jcs gap-s'}>
                            <span>{t('welcome')}, </span>
                            <Typewriter data={[t('instructor'), t('student'), t('visitor')]}/>
                        </h1>
                        <h3>{t("about_great_subtitle")}</h3>
                        <p>{t("about_great_desc")}</p>
                    </div>
                    <HashLink className={'button btn-primary ps-center margin-top-m'}
                              smooth to={'#info'}>
                        <p>{t("about_great_button")}</p>
                        <SvgComp rule={'svg-s fill-blue margin-left-s'} file={'sprite'} icon={'mouse'}/>
                    </HashLink>
                </div>
            </div>

            <div className='about__anm__section'>
                <div className="about__anm__container">
                    <div className="about__anm__box">
                        {programming && programming.map((value, i) => (
                            <div className="about__anm__pack" key={i}>
                                <SvgComp rule='about__anm__pack__svg' path='svg' file='programming' icon={value}/>
                            </div>
                        ))}
                        {programming && programming.map((value, i) => (
                            <div className="about__anm__pack" key={i}>
                                <SvgComp rule='about__anm__pack__svg' path='svg' file='programming' icon={value}/>
                            </div>
                        ))}
                    </div>
                    <br/>
                    <div className="about__anm__box">
                        {programming2 && programming2.map((value, i) => (
                            <div className="about__anm__pack" key={i}>
                                <SvgComp rule='about__anm__pack__svg' path='svg' file='programming' icon={value}/>
                            </div>
                        ))}
                        {programming2 && programming2.map((value, i) => (
                            <div className="about__anm__pack" key={i}>
                                <SvgComp rule='about__anm__pack__svg' path='svg' file='programming' icon={value}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={'padding-top-ideal-distance-to-header'} id={'info'}>
                <h2 className={'section-title'}>Info</h2>
                <div className={'flex-aic-jcc gap-m text-link'}>
                    <div
                        className={`cursor-pointer text-hover-underline ${typeRole === 'student' ? 'text-primary' : ''}`}
                        onClick={() => setTypeRole('student')}>{t('student')}</div>
                    <div>|</div>
                    <div
                        className={`cursor-pointer text-hover-underline ${typeRole === 'instructor' ? 'text-primary' : ''}`}
                        onClick={() => setTypeRole('instructor')}>{t('instructor')}</div>
                </div>
                {typeRole === 'student' ?
                    <div className={'max-width-700 ps-center timeline mt-x'}>
                        <div className={'timeline-item'}>
                            <div className={'timeline-key active'}>1</div>
                            <div className={'timeline-content'}>
                                <h3>{t('about_info_student_1_title')}</h3>
                                <p>{t('about_info_student_1_desc')}</p>
                            </div>
                        </div>
                        <div className="timeline-divider"></div>
                        <div className={'timeline-item'}>
                            <div className={'timeline-key active'}>2</div>
                            <div className={'timeline-content'}>
                                <h3>{t('about_info_student_2_title')}</h3>
                                <p>{t('about_info_student_2_desc')}</p>
                            </div>
                        </div>
                        <div className="timeline-divider"></div>
                        <div className={'timeline-item'}>
                            <div className={'timeline-key active'}>3</div>
                            <div className={'timeline-content'}>
                                <h3>{t('about_info_student_3_title')}</h3>
                                <p>{t('about_info_student_3_desc')}</p>
                            </div>
                        </div>
                        <div className="timeline-divider"></div>
                        <div className={'timeline-item'}>
                            <div className={'timeline-key active'}>4</div>
                            <div className={'timeline-content'}>
                                <h3>{t('about_info_student_4_title')}</h3>
                                <p>{t('about_info_student_4_desc')}</p>
                            </div>
                        </div>
                        <div className="timeline-divider"></div>
                        <div className={'timeline-item'}>
                            <div className={'timeline-key active'}>5</div>
                            <div className={'timeline-content'}>
                                <h3>{t('about_info_student_5_title')}</h3>
                                <p>{t('about_info_student_5_desc')}</p>
                            </div>
                        </div>
                    </div> :
                    <div className={'max-width-700 ps-center timeline mt-x'}>
                        <div className={'timeline-item'}>
                            <div className={'timeline-key active'}>1</div>
                            <div className={'timeline-content'}>
                                <h3>{t('about_info_instructor_1_title')}</h3>
                                <p>{t('about_info_instructor_1_desc')}</p>
                            </div>
                        </div>
                        <div className="timeline-divider"></div>
                        <div className={'timeline-item'}>
                            <div className={'timeline-key active'}>2</div>
                            <div className={'timeline-content'}>
                                <h3>{t('about_info_instructor_2_title')}</h3>
                                <p>{t('about_info_instructor_2_desc')}</p>
                            </div>
                        </div>
                        <div className="timeline-divider"></div>
                        <div className={'timeline-item'}>
                            <div className={'timeline-key active'}>3</div>
                            <div className={'timeline-content'}>
                                <h3>{t('about_info_instructor_3_title')}</h3>
                                <p>{t('about_info_instructor_3_desc')}</p>
                            </div>
                        </div>
                        <div className="timeline-divider"></div>
                        <div className={'timeline-item'}>
                            <div className={'timeline-key active'}>4</div>
                            <div className={'timeline-content'}>
                                <h3>{t('about_info_instructor_4_title')}</h3>
                                <p>{t('about_info_instructor_4_desc')}</p>
                            </div>
                        </div>
                        <div className="timeline-divider"></div>
                        <div className={'timeline-item'}>
                            <div className={'timeline-key active'}>5</div>
                            <div className={'timeline-content'}>
                                <h3>{t('about_info_instructor_5_title')}</h3>
                                <p>{t('about_info_instructor_5_desc')}</p>
                            </div>
                        </div>
                    </div>}

                <HashLink className={'button bg-primary ps-center margin-top-ideal-distance-to-header'}
                          smooth to={'/#top'}>
                    {t('explore_now')}
                </HashLink>
            </div>

            <div className={'padding-top-ideal-distance-to-header'}>
                <h2 className={'section-title'}>Frequently Asked Questions</h2>
                <div className={'flex-aic-jcc gap-m text-link'}>
                    <div
                        className={`cursor-pointer text-hover-underline ${typeRole === 'student' ? 'text-primary' : ''}`}
                        onClick={() => setTypeRole('student')}>{t('student')}</div>
                    <div>|</div>
                    <div
                        className={`cursor-pointer text-hover-underline ${typeRole === 'instructor' ? 'text-primary' : ''}`}
                        onClick={() => setTypeRole('instructor')}>{t('instructor')}</div>
                </div>
                {typeRole === 'student' ?
                    <div className={'card-wrapper max-width-700 mt-x ps-center'}>
                        <div className="accordion-item">
                            <input type="checkbox" id="accordion-item1" className="accordion-item-check"/>
                            <label htmlFor="accordion-item1" className="accordion-item-label">
                                <div className={'flex-aic-jcb gap-m'}>
                                    <p>{t('about_faq_student_1_question')}</p>
                                    <span>▼</span>
                                </div>
                                <div className="accordion-item-label-subtitle">{t('about_faq_student_1_subtitle')}</div>
                            </label>
                            <div className="accordion-content">
                                <p>{t('about_faq_student_1_content')}</p>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <input type="checkbox" id="accordion-item2" className="accordion-item-check"/>
                            <label htmlFor="accordion-item2" className="accordion-item-label">
                                <div className={'flex-aic-jcb gap-m'}>
                                    <p>{t('about_faq_student_2_question')}</p>
                                    <span>▼</span>
                                </div>
                                <div className="accordion-item-label-subtitle">{t('about_faq_student_2_subtitle')}</div>
                            </label>
                            <div className="accordion-content">
                                <p>{t('about_faq_student_2_content')}</p>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <input type="checkbox" id="accordion-item3" className="accordion-item-check"/>
                            <label htmlFor="accordion-item3" className="accordion-item-label">
                                <div className={'flex-aic-jcb gap-m'}>
                                    <p>{t('about_faq_student_3_question')}</p>
                                    <span>▼</span>
                                </div>
                                <div className="accordion-item-label-subtitle">{t('about_faq_student_3_subtitle')}</div>
                            </label>
                            <div className="accordion-content">
                                <p>{t('about_faq_student_3_content')}</p>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <input type="checkbox" id="accordion-item4" className="accordion-item-check"/>
                            <label htmlFor="accordion-item4" className="accordion-item-label">
                                <div className={'flex-aic-jcb gap-m'}>
                                    <p>{t('about_faq_student_4_question')}</p>
                                    <span>▼</span>
                                </div>
                                <div className="accordion-item-label-subtitle">{t('about_faq_student_4_subtitle')}</div>
                            </label>
                            <div className="accordion-content">
                                <p>{t('about_faq_student_4_content')}</p>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <input type="checkbox" id="accordion-item5" className="accordion-item-check"/>
                            <label htmlFor="accordion-item5" className="accordion-item-label">
                                <div className={'flex-aic-jcb gap-m'}>
                                    <p>{t('about_faq_student_5_question')}</p>
                                    <span>▼</span>
                                </div>
                                <div className="accordion-item-label-subtitle">{t('about_faq_student_5_subtitle')}</div>
                            </label>
                            <div className="accordion-content">
                                <p>{t('about_faq_student_5_content')}</p>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <input type="checkbox" id="accordion-item6" className="accordion-item-check"/>
                            <label htmlFor="accordion-item6" className="accordion-item-label">
                                <div className={'flex-aic-jcb gap-m'}>
                                    <p>{t('about_faq_student_6_question')}</p>
                                    <span>▼</span>
                                </div>
                                <div className="accordion-item-label-subtitle">{t('about_faq_student_6_subtitle')}</div>
                            </label>
                            <div className="accordion-content">
                                <p>{t('about_faq_student_6_content')}</p>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <input type="checkbox" id="accordion-item7" className="accordion-item-check"/>
                            <label htmlFor="accordion-item7" className="accordion-item-label">
                                <div className={'flex-aic-jcb gap-m'}>
                                    <p>{t('about_faq_student_7_question')}</p>
                                    <span>▼</span>
                                </div>
                                <div className="accordion-item-label-subtitle">{t('about_faq_student_7_subtitle')}</div>
                            </label>
                            <div className="accordion-content">
                                <p>{t('about_faq_student_7_content')}</p>
                            </div>
                        </div>
                    </div> :
                    <div className={'card-wrapper max-width-700 mt-x ps-center'}>
                        <div className="accordion-item">
                            <input type="checkbox" id="accordion-i1" className="accordion-item-check"/>
                            <label htmlFor="accordion-i1" className="accordion-item-label">
                                <div className={'flex-aic-jcb gap-m'}>
                                    <p>{t('about_faq_instructor_1_question')}</p>
                                    <span>▼</span>
                                </div>
                                <div
                                    className="accordion-item-label-subtitle">{t('about_faq_instructor_1_subtitle')}</div>
                            </label>
                            <div className="accordion-content">
                                <p>{t('about_faq_instructor_1_content')}</p>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <input type="checkbox" id="accordion-i2" className="accordion-item-check"/>
                            <label htmlFor="accordion-i2" className="accordion-item-label">
                                <div className={'flex-aic-jcb gap-m'}>
                                    <p>{t('about_faq_instructor_2_question')}</p>
                                    <span>▼</span>
                                </div>
                                <div
                                    className="accordion-item-label-subtitle">{t('about_faq_instructor_2_subtitle')}</div>
                            </label>
                            <div className="accordion-content">
                                <p>{t('about_faq_instructor_2_content')}</p>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <input type="checkbox" id="accordion-i3" className="accordion-item-check"/>
                            <label htmlFor="accordion-i3" className="accordion-item-label">
                                <div className={'flex-aic-jcb gap-m'}>
                                    <p>{t('about_faq_instructor_3_question')}</p>
                                    <span>▼</span>
                                </div>
                                <div
                                    className="accordion-item-label-subtitle">{t('about_faq_instructor_3_subtitle')}</div>
                            </label>
                            <div className="accordion-content">
                                <p>{t('about_faq_instructor_3_content')}</p>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <input type="checkbox" id="accordion-i4" className="accordion-item-check"/>
                            <label htmlFor="accordion-i4" className="accordion-item-label">
                                <div className={'flex-aic-jcb gap-m'}>
                                    <p>{t('about_faq_instructor_4_question')}</p>
                                    <span>▼</span>
                                </div>
                                <div
                                    className="accordion-item-label-subtitle">{t('about_faq_instructor_4_subtitle')}</div>
                            </label>
                            <div className="accordion-content">
                                <p>{t('about_faq_instructor_4_content')}</p>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <input type="checkbox" id="accordion-i5" className="accordion-item-check"/>
                            <label htmlFor="accordion-i5" className="accordion-item-label">
                                <div className={'flex-aic-jcb gap-m'}>
                                    <p>{t('about_faq_instructor_5_question')}</p>
                                    <span>▼</span>
                                </div>
                                <div
                                    className="accordion-item-label-subtitle">{t('about_faq_instructor_5_subtitle')}</div>
                            </label>
                            <div className="accordion-content">
                                <p>{t('about_faq_instructor_5_content')}</p>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <input type="checkbox" id="accordion-i6" className="accordion-item-check"/>
                            <label htmlFor="accordion-i6" className="accordion-item-label">
                                <div className={'flex-aic-jcb gap-m'}>
                                    <p>{t('about_faq_instructor_6_question')}</p>
                                    <span>▼</span>
                                </div>
                                <div
                                    className="accordion-item-label-subtitle">{t('about_faq_instructor_6_subtitle')}</div>
                            </label>
                            <div className="accordion-content">
                                <p>{t('about_faq_instructor_6_content')}</p>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <input type="checkbox" id="accordion-i7" className="accordion-item-check"/>
                            <label htmlFor="accordion-i7" className="accordion-item-label">
                                <div className={'flex-aic-jcb gap-m'}>
                                    <p>{t('about_faq_instructor_7_question')}</p>
                                    <span>▼</span>
                                </div>
                                <div
                                    className="accordion-item-label-subtitle">{t('about_faq_instructor_7_subtitle')}</div>
                            </label>
                            <div className="accordion-content">
                                <p>{t('about_faq_instructor_7_content')}</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}