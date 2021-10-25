import React, { useContext, useEffect } from 'react';
import { Context } from '../Context';
import PageHeader from '../Components/PageHeader';
import PageItem from '../Components/PageItem';
import Loading from '../Components/Loading';

const Departments = () => {
    const { departmentsData, setDepartmentsData } = useContext(Context);

    const fetchAllDepartments = async () => {
        try {
            const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/departments`);
            const data = await response.json();
            setDepartmentsData(data);
        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        if(departmentsData.departments.length === 0) fetchAllDepartments();
    }, [])

    return (
        <div className='Page col'>
            <PageHeader
                heading='Departments'
                subheading='&ndash; &nbsp; All available Departments at the Metropolitan Art Museum &nbsp; &ndash;'
            />

            <div className='Page__list row'>
                {
                    departmentsData.departments.length > 0 ?
                    departmentsData.departments.map((curr, index) => 
                        <PageItem
                            key={index}
                            fullData={curr}
                            objectName={curr.displayName}
                        />
                    ) :
                    <Loading/>
                }
            </div>
        </div>
    )
}

export default Departments;