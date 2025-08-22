import {useLocation} from "react-router";
import {HashLink} from "react-router-hash-link";

const BreadcrumbsComp = () => {
    const location = useLocation();
    const pathNames = location.pathname.split("/").filter(x => x);

    return (
        <div className={'breadcrumb'}>
            <HashLink className={'breadcrumb-item'} smooth to={'/'}>
                Profile
            </HashLink>
            {pathNames.map((value, index) => {
                const to = `/${pathNames.slice(0, index + 1).join("/")}`;

                if (pathNames.length - 1 === index) {
                    return (
                        <>
                            <span>&#8250;</span>
                            <div key={index}
                                 className={'breadcrumb-item active'}>
                                {value}
                            </div>
                        </>
                    )
                } else {
                    return (
                        <>
                            <span>&#8250;</span>
                            <HashLink className={'breadcrumb-item'}
                                      smooth
                                      key={index}
                                      to={to}>
                                {value}
                            </HashLink>
                        </>
                    )
                }
            })}
        </div>
    )
}

export default BreadcrumbsComp;