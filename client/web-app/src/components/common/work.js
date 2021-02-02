import react from 'react';
import { Menu } from 'antd';

function AppWork(){

    return (
        <div id="work" className="block aboutBlock">
            <div className="container-fluid">
                <div className="titleHolder">
                    <h2>How It Work</h2>
                </div>
                <div className="content"  class="div1">
                        <p>
                        By this system we will provide an Secured Online Exam System through which
                        University can conduct Online exams on web-enabled devices like laptops and
                        desktop computers.
                        </p>
                        <p>
                        In the System there are 3 different roles: Organization admin who register
                        organization with this system and add faculties and students, faculty who create
                        exams and specific students and last students who will give the examination.
                        </p>
                        <p>
                        We will provide a website through which University can register themselves and
                        while registration they need to provide university details and documents for
                        verification. After verifying documents we can approve their request and provide
                        user id and password throwout Email.
                        </p>
                        <p>
                        After registration they have to download an application and users can login as
                        Organization Admins using provided user id and password. After login they can
                        add other user admin as well.
                        </p>
                        <p>
                        Now admin can add teachers to the system. Now teachers can add other
                        teachers. After adding teachers now teachers can add more than one student for
                        examination using Excel files. In excel file you need to add name, student id,
                        student email id etc.
                        </p>
                        <p>
                        When students are added to the system, students get email of user id and
                        password using that student can login into the system. Now when the teacher
                        creates an exam student can see an exam and be able to attend an examination.
                        </p>
                        <p>
                        Teachers can create an exam using the create an exam option. In that they need
                        to provide a google form link for MCQ type questions and need to upload a pdf
                        file for the Writing Section.
                        </p>
                </div>
            </div>
        </div>
        )
}

export default AppWork;