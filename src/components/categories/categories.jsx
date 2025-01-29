import axios from "axios";
import { useEffect, useState } from "react";

import "./categories.css";

import { useCategory, useFilter } from "../../context";

export const Categories = () => {
    const { state, setState } = useCategory();

    const [categories, setCategories] = useState([]);
    const [testData, setTestData] = useState([]);
    const [numberOfCategoryToShow, setNumberOfCategoryToShow] = useState(0);

    const { dispatchFilter } = useFilter();

    const handleLeftButtonClick = () => {
        setNumberOfCategoryToShow((curr) => curr - 10);
    }

    const handleRightButtonClick = () => {
        setNumberOfCategoryToShow((curr) => curr + 10);
    }

    const handleFilterClick = () => {
        dispatchFilter({
            type: "filter_Modal"
        });
        dispatchFilter({
            type: "reset_apply_status"
        });
        
    };

    useEffect(() => {
        (async () => {
            try{
                const { data : newData} = await axios.get("https://hotels-app-k5v8.onrender.com/api/category");
                setTestData(newData);
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

    return (
        <>
        <section className = "d-flex align-center gap-med categories">
            {numberOfCategoryToShow >= 10 && (
                <button onClick={handleLeftButtonClick} className="arrow-left button btn-category fixed">
                    <span className="material-symbols-outlined cursor-pointer chevron">chevron_left</span>
                </button>
            )}
            
            { categories && categories.map(({_id, category}) => (<span className={`${category===state? "category  gap-custom":"category-hover gap-custom"}`} onClick={() => handleCategory(category)} key={_id}>{category}</span>)) }
            {numberOfCategoryToShow - 10 < categories.length && (
                <button onClick={handleRightButtonClick} className="arrow-right button btn-category-2 fixed">
                    <span className="material-symbols-outlined cursor-pointer arr chevron">chevron_right</span>
                </button>
            )}
            
        </section>
        <button onClick={handleFilterClick} className="filters d-flex align-center">
            <span className="material-symbols-outlined">tune</span>
            <span className="filter-text">Filters</span>
        </button>
        </>
    )
    
}
            
            
            
            
