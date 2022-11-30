import { Link } from "react-router-dom";
import "./CoursesList.css"

const CoursesList = ({articles}) => {                        

    const uniqueIds = [];

    const uniqueArticles = articles.filter(element => {
        const isDuplicate = uniqueIds.includes(element.course_code);
        
        if (!isDuplicate) {
          uniqueIds.push(element.course_code);
          
          return true;
        }
        return false;
    });

    return (
        <>
        <div className="allCourse">
            {uniqueArticles.map(article => (
                <div className="courseButton">
                <Link className="link" style={{textDecoration: 'none'}} key={article.course_code} to={`/c/${article.course_code}`}>
                    <button>{article.course_code}</button>
                </Link> </div>
                ))
            }
        </div>
        </>
    );
}

export default CoursesList;