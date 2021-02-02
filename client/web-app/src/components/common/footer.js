import react from 'react';
import { BackTop } from 'antd';
function AppFooter(){

    return(
        <div id="footer" className="container-fluid">
            <div className="footer">
                <div className="logo">
                    <i class="fas fa-bolt"></i>
                    <a href="./"> Secured Examination System </a>
                </div>
                <div className="copyright"> Copyright &copy; 2021 SOE </div>
                <BackTop>
                    <div className="gotop"><i class="fas fa-arrow-circle-up"></i></div>
                </BackTop>
            </div>
        </div>
    );
}

export default AppFooter;