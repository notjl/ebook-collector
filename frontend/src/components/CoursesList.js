import { Link } from "react-router-dom";

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
    console.log(articles)

    return (
        <>
        {uniqueArticles.map(article => (
            <Link key={article.course_code} to={`/c/${article.course_code}`}>
                <p>{article.course_code}</p>
            </Link>
            ))
        }
        
        </>
    );
}

export default CoursesList;