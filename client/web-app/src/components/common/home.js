import react from 'react';
import AppHero from './hero';
import AppAbout from './about';
import AppContact from './contact';
import AppWork from './work';
function AppHome(){

    return(
        <div className="main">
            <AppHero />
            <AppAbout />
            <AppWork />
            <AppContact />
        </div>
    );
}

export default AppHome;