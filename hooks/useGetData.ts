import { useState } from "react";
import axios from "axios";
import { ElementInterface } from "@/interfaces/element.interface";
import { ResponseDataInterface } from "@/interfaces/responseData.inteface";
import { AreasEnum } from "@/enums/area.enum";
import { FeloniesEnum } from "@/enums/felonies.enum";

const useGetData = () => {
    const [data1, setData1] = useState<ResponseDataInterface>();
    const [data2, setData2] = useState<ResponseDataInterface>();
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const postDataTemplate = {
        resource_id: '', // tells me what year to Examine
        filters: {}, // tells me How to filter, both area and fellony
        q: "",
        distinct: false,
        limit: 1,
        offset: 0,
        fields: ["FictiveIDNumber"],
        sort: "",
        include_total: true,
        records_format: "objects"
    }

    // Create an Axios instance with default settings
    const axiosInstance = axios.create({
        baseURL: 'https://data.gov.il/api/3/action/datastore_search',  // Set the base URL for the API
        headers: {
            'Content-Type': 'application/json',  // Set the Content-Type to JSON
        },
    });

    const getYearID = (year: string) => {
        switch (year) {
            case '2020':
                return '5fc13c50-b6f3-4712-b831-a75e0f91a17e'; // Example resource ID for 2020
            case '2021':
                return '32aacfc9-3524-4fba-a282-3af052380244'; // Example resource ID for 2021
            case '2022':
                return 'a59f3e9e-a7fe-4375-97d0-76cea68382c1'; // Example resource ID for 2022
            case '2023':
                return '3f71fd16-25b8-4cfe-8661-e6199db3eb12'; // Example resource ID for 2022
            case '2024':
                return '520597e3-6003-4247-9634-0ae85434b971'; // Example resource ID for 2022
            default:
                throw new Error('Invalid year provided');
        }
    }

    const setFilterObject = (selectedCity: ElementInterface, selectedItem: ElementInterface) => {
        const filter: any = {};

        if (selectedCity?.catID === AreasEnum.BOROUGHS) {
            filter['StatisticAreaKod'] = selectedCity.id; // Set the StatisticAreaKod filter to the selected city ID
        }
        else if (selectedCity?.catID === AreasEnum.POLICE_DISTRICTS) {
            filter['PoliceDistrictKod'] = selectedCity.id; // Set the StatisticAreaKod filter to the selected city ID
        }
        else if (selectedCity?.catID === AreasEnum.POLICE_STATIONS) {
            filter['PoliceMerhavKod'] = selectedCity.id; // Set the StatisticAreaKod filter to the selected city ID
        }
        else if (selectedCity?.catID === AreasEnum.MUNICIPALITIES) {
            filter['municipalKod'] = selectedCity.id; // Set the StatisticAreaKod filter to the selected city ID
        }
        else if (selectedCity?.catID === AreasEnum.MERHAVIM) {
            filter['PoliceMerhavKod'] = selectedCity.id; // Set the StatisticAreaKod filter to the selected city ID
        }
        else if (selectedCity?.catID === AreasEnum.CITIES) {
            filter['YeshuvKod'] = selectedCity.id; // Set the StatisticAreaKod filter to the selected city ID
        }

        if (selectedItem?.catID === FeloniesEnum.GROUP) {
            filter['StatisticGroupKod'] = selectedItem.id; // Set the StatisticAreaKod filter to the selected city ID
        } else if (selectedItem?.catID === FeloniesEnum.TYPE) {
            filter['StatisticTypeKod'] = selectedItem.id; // Set the StatisticAreaKod filter to the selected city ID
        }
        
        return filter;
    }

    // Function to send two POST requests concurrently
    const sendPostRequests = async (selectedCity: ElementInterface, selectedItem: ElementInterface, year1: string, year2: string, yearQuarter1: string, yearQuarter2: string) => {
        const postData1 = {...postDataTemplate};
        const postData2 = {...postDataTemplate};

        const filter = setFilterObject(selectedCity, selectedItem);
        const filter1 = { ...filter, "YearQuarterKod": yearQuarter1 !== 'all' ? yearQuarter1 : undefined };
        const filter2 = { ...filter, "YearQuarterKod": yearQuarter2 !== 'all' ? yearQuarter2 : undefined  };

        postData1.resource_id = getYearID(year1) as string;
        postData1.filters = filter1;

        postData2.resource_id = getYearID(year2) as string;
        postData2.filters = filter2;

        try {
            // Send both POST requests concurrently using Promise.all
            const [response1, response2] = await Promise.all([
                axiosInstance.post('', postData1),
                axiosInstance.post('', postData2),
            ]);

            // Access the response data
            console.log('Response 1:', response1.data);
            console.log('Response 2:', response2.data);
            setData1(response1.data);
            setData2(response2.data);
            setLoading(false);
            setError(null);
        } catch (error) {
            console.error('Error sending POST requests:', error);
            setError(error);
            setLoading(false);
        }
    };

    return { data1, data2, error, loading, sendPostRequests: sendPostRequests };
}

export default useGetData;