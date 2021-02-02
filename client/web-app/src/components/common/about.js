import react from 'react';
import { Menu } from 'antd';

import { Row, Col } from 'antd';


const items = [
    {
        key: '1',
        icon: <i className="fas fa-chart-pie"></i>,
        title: 'High Performance',
        content : 'High performance working systems involve the development of a number of interrelated processes that together make an impact on the performance of the organization through its people in such areas as productivity, quality, and levels of customer service, growth, profits, and ultimately ensuring the delivery of increased shareholder value.',
    },
    {
        key: '2',
        icon: <i className="fas fa-desktop"></i>,
        title: 'Simple Design',
        content : 'High performance working systems involve the development of a number of interrelated processes that together make an impact on the performance of the organization through its people in such areas as productivity, quality, and levels of customer service, growth, profits, and ultimately ensuring the delivery of increased shareholder value.',
    },
    {
        key: '3',
        icon: <i className="fas fa-database"></i>,
        title: 'Simplified Workflow',
        content : 'High performance working systems involve the development of a number of interrelated processes that together make an impact on the performance of the organization through its people in such areas as productivity, quality, and levels of customer service, growth, profits, and ultimately ensuring the delivery of increased shareholder value.',
    }
]
function AppAbout(){

    return (
        <div id="about" className="block aboutBlock">
            <div className="container-fluid">
                <div className="titleHolder">
                    <h2>About System</h2>
                    <p>We are here, Your Welcome.</p>
                </div>
                <div className="contentHolder">
                    <p>Secure Exam System </p>
                </div>
                <Row gutter={[16, 16]}>
                    {items.map(item => {
                        return ( <Col md={ { span: 8 }} key={item.key}> 
                            <div className="content">
                                <div className="icon">
                                    {item.icon}
                                </div>  
                                <h3>{item.title}</h3>
                                <p>{item.content}</p>
                            </div>
                            </Col>
                        );
                    })}
                
                </Row>
            </div>    
        </div>
    );
}

export default AppAbout;