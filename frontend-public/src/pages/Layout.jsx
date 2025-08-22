import {Outlet, useLocation} from "react-router";
import SvgComp from "../components/SvgComp.jsx";
import {HashLink} from "react-router-hash-link";
import {Suspense, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import useAuthStore from "../zustand/store.js";
import {refreshToken} from "../services/service.js";
import SetThemeComp from "../components/SetThemeComp.jsx";
import GetMenuComp from "../components/GetMenuComp.jsx";
import useMediaQuery from "../hooks/useMediaQuery.js";

export default function Layout() {
    const {t, i18n} = useTranslation();
    const [lang, setLang] = useState(i18n.language);
    const isMobile = useMediaQuery('(max-width: 800px)');

    function handleChangeLang(lang) {
        localStorage.setItem('lang', lang);
        i18n.changeLanguage(lang);
        setLang(lang);
    }

    const [isMinifySidebar, setMinifySidebar] = useState(false);
    const location = useLocation();

    const user = useAuthStore(state => state.user);

    useEffect(() => {
        if (!user) {
            const getUser = async () => {
                await refreshToken();
            }

            getUser()
        }
    }, [])

    return (
        <>
            <header className={'header'}>
                <div className={'header-logo'}>
                    <img src={'./iamra-logo.svg'} className={'header-logo-img'} alt={import.meta.env.VITE_APP_NAME}/>
                    <span>{import.meta.env.VITE_APP_NAME}</span>
                </div>

                <SetThemeComp/>

                <GetMenuComp/>

                <div className={'navigation'}>
                    {user ?
                        <a href={user?.role === 'student' ?
                            import.meta.env.VITE_APP_FRONTEND_STUDENT_URL :
                            user?.role === 'instructor' ?
                                import.meta.env.VITE_APP_FRONTEND_INSTRUCTOR_URL :
                                import.meta.env.VITE_APP_FRONTEND_USER_URL + '/member/additional-info#top'}
                           className={'hover-progress'}>{user.full_name}</a> :
                        <a href={import.meta.env.VITE_APP_FRONTEND_USER_URL + '/authentication#top'}
                           className={'hover-progress'}>Login</a>
                    }
                </div>
            </header>
            <nav>
                <HashLink className={'hover-progress'} to="/#top">
                    {t('courses')}
                </HashLink>
                {user ?
                    <a href={user?.role === 'student' ?
                        import.meta.env.VITE_APP_FRONTEND_STUDENT_URL :
                        user?.role === 'instructor' ?
                            import.meta.env.VITE_APP_FRONTEND_INSTRUCTOR_URL :
                            import.meta.env.VITE_APP_FRONTEND_USER_URL + '/member/additional-info#top'}
                       className={'hover-progress'}>{t(user.role)}</a> :
                    <a href={import.meta.env.VITE_APP_FRONTEND_USER_URL + '/authentication#top'}
                       className={'hover-progress'}>Login</a>
                }
                <HashLink className={'hover-progress'} to="/about#top">
                    {t('about')}
                </HashLink>
            </nav>

            <main className={`has-sidebar ${isMinifySidebar ? 'active' : ''}`}>
                <Suspense fallback={<div className={'flex-aic-jcc w-full-dvw h-full-dvh'}>
                    <div className={'loading-spinner'}></div>
                </div>}>
                    <section>
                        <Outlet/>
                    </section>
                </Suspense>
                <aside className={'sidebar-menu'}>
                    <div className="sidebar-menu-title sidebar-menu-item"
                         onClick={() => setMinifySidebar(prevState => !prevState)}>
                        <SvgComp rule={'sidebar-menu-button-svg'} file={'sprite'} icon={'click'}/>
                        <p>Menu</p>
                    </div>
                    <div className="sidebar-menu-element">
                        <HashLink className={`sidebar-menu-item ${location.pathname === '/' ? 'active' : ''}`}
                                  data-title={t('courses')} to="/#top">
                            <SvgComp rule={'sidebar-menu-button-svg'} file={'sprite'} icon={'courses'}/>
                            <p>{t('courses')}</p>
                        </HashLink>
                        <HashLink className={`sidebar-menu-item ${location.pathname === '/about' ? 'active' : ''}`}
                                  data-title={t('about')} to="/about#top">
                            <SvgComp rule={'sidebar-menu-button-svg'} file={'sprite'} icon={'about'}/>
                            <p>{t('about')}</p>
                        </HashLink>
                        <HashLink
                            className={`sidebar-menu-item ${location.pathname === '/certificates' ? 'active' : ''}`}
                            data-title={t('certificates')} to="/certificates#top">
                            <SvgComp rule={'sidebar-menu-button-svg'} file={'sprite'} icon={'certificates'}/>
                            <p>{t('certificates')}</p>
                        </HashLink>
                        {user &&
                            <>
                                <a className={'sidebar-menu-item'} data-title={t('setting')}
                                   href={import.meta.env.VITE_APP_FRONTEND_USER_URL + '/member/additional-info#top'}>
                                    <SvgComp rule={'sidebar-menu-button-svg'} file={'sprite'} icon={'setting'}/>
                                    <p>{t('setting')}</p>
                                </a>
                                {user?.role === 'instructor' ?
                                    <a className={'sidebar-menu-item'} data-title={t('profile')}
                                       href={import.meta.env.VITE_APP_FRONTEND_INSTRUCTOR_URL}>
                                        <SvgComp rule={'sidebar-menu-button-svg'} file={'sprite'} icon={'profile'}/>
                                        <p>{t('profile')}</p>
                                    </a> : user?.role === 'student' ?
                                        <a className={'sidebar-menu-item'} data-title={t('profile')}
                                           href={import.meta.env.VITE_APP_FRONTEND_STUDENT_URL}>
                                            <SvgComp rule={'sidebar-menu-button-svg'} file={'sprite'} icon={'profile'}/>
                                            <p>{t('profile')}</p>
                                        </a> :
                                        <a className={'sidebar-menu-item'} data-title={t('profile')}
                                           href={import.meta.env.VITE_APP_FRONTEND_USER_URL + 'authentication#top'}>
                                            <SvgComp rule={'sidebar-menu-button-svg'} file={'sprite'} icon={'profile'}/>
                                            <p>{t('profile')}</p>
                                        </a>
                                }
                            </>
                        }
                    </div>
                </aside>
            </main>

            <footer style={{
                justifyContent: 'space-around',
                paddingLeft: isMobile ? 'var(--m)' : 269
            }}>
                <div className="grid-start">
                    <img src={'./iamra-logo.svg'} style={{
                        maxWidth: 31,
                        maxHeight: 31
                    }} alt={import.meta.env.VITE_APP_NAME}/>
                    <h1>iamra</h1>
                    <p>Senen, Jakarta Pusat</p>
                    <p>copyright &copy; <a className='text-primary text-hover-underline cursor-pointer' href={import.meta.env.VITE_APP_URL_PROFILE}>Ilham
                        Rahmat Akbar</a> 2025</p>
                </div>

                <div className="grid-start">
                    <h2 className='font-medium mb-s'>My Contact</h2>
                    <a className='text-hover-underline' target='_blank' href={import.meta.env.VITE_LINK_GITHUB}>Github</a>
                    <a className='text-hover-underline' target='_blank' href={import.meta.env.VITE_LINK_EMAIL}>Email</a>
                    <a className='text-hover-underline' target='_blank'
                       href={import.meta.env.VITE_LINK_INSTAGRAM}>Instagram</a>
                    <a className='text-hover-underline' target='_blank'
                       href={import.meta.env.VITE_LINK_WHATSAPP}>Whatsapp</a>
                </div>

                <div className="grid-start">
                    <h2 className='font-medium mb-s'>Feature</h2>
                    <HashLink className={'text-hover-underline capitalize'}
                              smooth
                              to={'/certificate-verify#top'}>
                        {t('certificate_verify')}
                    </HashLink>
                    <HashLink className={'text-hover-underline capitalize'}
                              smooth
                              to={'/courses#top'}>
                        {t('courses')}
                    </HashLink>
                    <div className={'flex-aic-jcs gap-m'}>
                        <div>Lang:</div>
                        <div className={'flex-aic-jcs gap-s'}>
                            <div className={`text-hover-underline cursor-pointer ${lang === 'id' ? 'bg-primary radius-s' : ''}`}
                                 style={{paddingLeft: 3, paddingRight: 3, color: lang === 'id' ? 'white' : 'var(--text-color)'}}
                                 onClick={() => handleChangeLang('id')}>id
                            </div>
                            <div className={`text-hover-underline cursor-pointer ${lang === 'en' ? 'bg-primary radius-s' : ''}`}
                                 style={{paddingLeft: 3, paddingRight: 3, color: lang === 'en' ? 'white' : 'var(--text-color)'}}
                                 onClick={() => handleChangeLang('en')}>en
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}