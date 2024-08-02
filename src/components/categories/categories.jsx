import "./categories.css";
import axios from "axios";
import { useEffect, useState } from "react";

import { useCategory } from "../../context";

export const Categories = () => {
    const { state, setState } = useCategory();

    const [categories, setCategories] = useState([]);
    const [testData, setTestData] = useState([]);
    const [numberOfCategoryToShow, setNumberOfCategoryToShow] = useState(0);

    const handleLeftButtonClick = () => {
        setNumberOfCategoryToShow((curr) => curr - 10);
    }

    const handleRightButtonClick = () => {
        setNumberOfCategoryToShow((curr) => curr + 10);
    }

    useEffect(() => {
        (async () => {
            try{
                const { data : newData} = await axios.get("https://hotels-app-k5v8.onrender.com/api/category");
                setTestData(newData);
                //const categoriesToShow = newData.slice(numberOfCategoryToShow, numberOfCategoryToShow + 5);
                //setCategories(categoriesToShow);
            }catch(err){
                console.log(err);
            }

        })()
    }, []);

    useEffect(() => {
        testData && setCategories(testData.slice(numberOfCategoryToShow + 10 > testData.length ? testData.length - 10: numberOfCategoryToShow, numberOfCategoryToShow > testData.length ? testData.length: numberOfCategoryToShow + 10))
    }, [numberOfCategoryToShow, testData]);

    const handleCategory = (category) => {
        setState(category);
    }

    console.log(state);

    return (
        <section className = "d-flex align-center gap-med cursor-pointer categories">
            {numberOfCategoryToShow >= 10 && (
                <button onClick={handleLeftButtonClick} className="arrow-left button btn-category fixed">
                    <span className="material-symbols-outlined cursor-pointer">chevron_left</span>
                </button>
            )}
            
            { categories && categories.map(({_id, category}) => (<span className={`${category===state? "category":""}`} onClick={() => handleCategory(category)} key={_id}>{category}</span>)) }
            {numberOfCategoryToShow - 10 < categories.length && (
                <button onClick={handleRightButtonClick} className="arrow-right button btn-category fixed">
                    <span className="material-symbols-outlined cursor-pointer arr">chevron_right</span>
                </button>
            )}
        </section>
    )
    
}
            
            
            
            