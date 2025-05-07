import { ElementInterface } from "@/interfaces/element.interface";
import React, { useEffect, useState } from "react";

export const useLoadCategories = () => {
    const [felonies, setFelonies] = useState<ElementInterface[]>([]);
    const [location, setLocation] = useState<ElementInterface[]>([]);
      
    const varFelonies = require('../assets/json/merged_felonies_sorted.json');
    const varLocation = require('../assets/json/merged_location.json');

    useEffect(() => {
        setFelonies(varFelonies);
        setLocation(varLocation);
    }, []);
  
    return { felonies, location };
}