import { AreasEnum } from "@/enums/area.enum";
import { FeloniesEnum } from "@/enums/felonies.enum";
import { useLoadCategories } from "@/hooks/useLoadCategories";
import { ElementInterface } from "@/interfaces/element.interface";
import { Picker } from "@react-native-picker/picker";
import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from 'react-native';
import { styles } from "./style";

export interface PageOneProps {
    handleSelectedItemChange: (id: ElementInterface) => void
    handleSelectedCityItemChange: (id: ElementInterface) => void
    resetStates: () => void
}

export default function PageOne(props: PageOneProps) {
    const { felonies, location } = useLoadCategories();
    const [filteredFelonies, setFilteredFelonies] = useState<ElementInterface[]>([]);
    const [filteredLocation, setFilteredLocation] = useState<ElementInterface[]>([]);

    const [selectedFilteredFelonies, setSelectedFilteredFelonies] = useState<ElementInterface>();
    const [selectedFilteredLocation, setSelectedFilteredLocation] = useState<ElementInterface>();

    useEffect(() => {
        setFilteredFelonies(felonies);
        setFilteredLocation(location);
    }, [felonies, location]);

    const [isChecked, setChecked] = useState(false);
    const [isAreaChecked, setAreaChecked] = useState(false);

    const [isCategoriesChecked, setCategoriesChecked] = useState(false);
    const [isSingleFelonyChecked, setSingleFelonyChecked] = useState(false);

    const [isCitiesChecked, setCitiesChecked] = useState(false);
    const [isMerhavChecked, setMerhavChecked] = useState(false);
    const [isMunicipalChecked, setMunicipalChecked] = useState(false);
    const [isPoliceStationChecked, setPoliceStationChecked] = useState(false);
    const [isPoliceDistrictChecked, setPoliceDistrictChecked] = useState(false);
    const [isBoroughChecked, setBoroughChecked] = useState(false);

    const onChecked = (value: boolean) => {
        setChecked(value);
        setCategoriesChecked(value);
        setSingleFelonyChecked(value);
        setFilteredFelonies(felonies);
    }

    const onAreaChecked = (value: boolean) => {
        setAreaChecked(value);
        setCitiesChecked(value);
        setMerhavChecked(value);
        setMunicipalChecked(value);
        setPoliceStationChecked(value);
        setPoliceDistrictChecked(value);
        setBoroughChecked(value);
        setFilteredLocation(location);
    }

    useEffect(() => {
        props.resetStates();
    }, [])

    useEffect(() => {
        if (isCategoriesChecked && isSingleFelonyChecked) {
            setFilteredFelonies(felonies);
        } else {
            let filterByCategoryArr: ElementInterface[] = [];
            let filterBSingleFelonyArr: ElementInterface[] = [];
            if (isCategoriesChecked) {
                filterByCategoryArr = felonies.filter((item: ElementInterface) => {
                    return item.catID === FeloniesEnum.GROUP;
                });
            }
            if (isSingleFelonyChecked) {
                filterBSingleFelonyArr = felonies.filter((item: ElementInterface) => {
                    return item.catID === FeloniesEnum.TYPE;
                });
            }

            let unifiedArray = [...filterByCategoryArr, ...filterBSingleFelonyArr];
            unifiedArray = unifiedArray.sort((a, b) => {
                return a.title.localeCompare(b.title)
            });
            
            setFilteredFelonies(unifiedArray);
        }
    }, [isCategoriesChecked, isSingleFelonyChecked]);

    useEffect(() => {
        if (isCitiesChecked && isMerhavChecked && isMunicipalChecked && isPoliceStationChecked && isPoliceDistrictChecked && isBoroughChecked) {
            setFilteredLocation(location);
        } else {
            let filterByCityArr: ElementInterface[] = [];
            let filterByMerhavArr: ElementInterface[] = [];
            let filterByMunicipalArr: ElementInterface[] = [];
            let filterByPoliceStationArr: ElementInterface[] = [];
            let filterByPoliceDistrictArr: ElementInterface[] = [];
            let filterByBoroughArr: ElementInterface[] = [];

            if (isCitiesChecked) {
                filterByCityArr = location.filter((item: ElementInterface) => {
                    return item.catID === AreasEnum.CITIES;
                });
            }
            if (isMerhavChecked) {
                filterByMerhavArr = location.filter((item: ElementInterface) => {
                    return item.catID === AreasEnum.MERHAVIM;
                });
            }
            if (isMunicipalChecked) {
                filterByMunicipalArr = location.filter((item: ElementInterface) => {
                    return item.catID === AreasEnum.MUNICIPALITIES;
                });
            }
            if (isPoliceStationChecked) {
                filterByPoliceStationArr = location.filter((item: ElementInterface) => {
                    return item.catID === AreasEnum.POLICE_STATIONS;
                });
            }
            if (isPoliceDistrictChecked) {
                filterByPoliceDistrictArr = location.filter((item: ElementInterface) => {
                    return item.catID === AreasEnum.POLICE_DISTRICTS;
                });
            }
            if (isBoroughChecked) {
                filterByBoroughArr = location.filter((item: ElementInterface) => {
                    return item.catID === AreasEnum.BOROUGHS;
                });
            }

            let unifiedArray = [...filterByCityArr, ...filterByMerhavArr, ...filterByMunicipalArr, ...filterByPoliceStationArr, ...filterByPoliceDistrictArr, ...filterByBoroughArr];
            unifiedArray = unifiedArray.sort((a, b) => {
                return a.title.localeCompare(b.title)
            });

            setFilteredLocation(unifiedArray);
        }
    }, [isCitiesChecked, isMerhavChecked, isMunicipalChecked, isPoliceStationChecked, isPoliceDistrictChecked, isBoroughChecked]);

    const onSelectItem = (item: ElementInterface, index: number) => {
        props.handleSelectedItemChange(filteredFelonies[index - 1]);
        setSelectedFilteredFelonies(item);
    };

    const onSelectCityItem = (item: ElementInterface, index: number) => {
        // console.log('Selected city item:', item);
        props.handleSelectedCityItemChange(filteredLocation[index - 1]);
        setSelectedFilteredLocation(item);
    };
  
    return (
        <View style={styles.containerView}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>שלב א': בחר קריטריונים להשוואה</Text>
                <Text>בחר את סוג העבירה, במידה ולא תבחר עבירה אז החיפוש יהיה לכל סוגי העברות</Text>
                <Picker
                    mode="dropdown"
                    testID='picker-felony-select-parent'
                    style={styles.picker}
                    selectedValue={selectedFilteredFelonies}
                    onValueChange={(item: ElementInterface, index: number) => onSelectItem(item, index)}>
                    <Picker.Item key={-1} label="כל סוגי העבירות" value="-1" />
                    {filteredFelonies.map((item: ElementInterface, index: number) => (
                        <Picker.Item key={index} label={item.title} value={item.id} />
                    ))}
                </Picker>
                <View style={styles.checkboxContainer}>
                    <Checkbox value={isChecked} onValueChange={() => { onChecked(!isChecked); }} />
                    <Pressable style={styles.checkboxText} onPress={() => onChecked(!isChecked)}><Text>כל העבירות</Text></Pressable>
                </View>
                <View style={styles.checkboxContainer}>
                    <Checkbox value={isCategoriesChecked} onValueChange={() => setCategoriesChecked(!isCategoriesChecked)} />
                    <Pressable style={styles.checkboxText} onPress={() => setCategoriesChecked(!isCategoriesChecked)}><Text>קטגוריות</Text></Pressable>
                </View>
                <View style={styles.checkboxContainer}>
                    <Checkbox value={isSingleFelonyChecked} onValueChange={() => setSingleFelonyChecked(!isSingleFelonyChecked)} />
                    <Pressable style={styles.checkboxText} onPress={() => setSingleFelonyChecked(!isSingleFelonyChecked)}><Text>סוגי עבירות</Text></Pressable>
                </View>
                <Text> </Text>
                <Text>בחר יישוב / מחוז / מרחב / שכונה. במידה ולא תבחר אז החיפוש יהיה לכל הארץ</Text>
                <Picker
                    mode="dropdown"
                    testID='picker-city-select-parent'
                    style={styles.picker}
                    selectedValue={selectedFilteredLocation}
                    onValueChange={(item: ElementInterface, index: number) => onSelectCityItem(item, index)}>
                    <Picker.Item key={-1} label="כל המקומות" value="-1" />
                    {filteredLocation.map((item: ElementInterface, index: number) => (
                        <Picker.Item key={index} label={item.title} value={item.id} />
                    ))}
                </Picker>
                <View style={styles.checkboxContainer}>
                    <Checkbox value={isAreaChecked} onValueChange={() => onAreaChecked(!isAreaChecked)} />
                    <Pressable style={styles.checkboxText} onPress={() => onAreaChecked(!isAreaChecked)}><Text>כל הארץ</Text></Pressable>
                </View>
                <View style={styles.checkboxContainer}>
                    <Checkbox value={isCitiesChecked} onValueChange={() => setCitiesChecked(!isCitiesChecked)} />
                    <Pressable style={styles.checkboxText} onPress={() => setCitiesChecked(!isCitiesChecked)}><Text>ערים</Text></Pressable>
                </View>
                <View style={styles.checkboxContainer}>
                    <Checkbox value={isMerhavChecked} onValueChange={() => setMerhavChecked(!isMerhavChecked)} />
                    <Pressable style={styles.checkboxText} onPress={() => setMerhavChecked(!isMerhavChecked)}><Text>מרחבים</Text></Pressable>
                </View>
                <View style={styles.checkboxContainer}>
                    <Checkbox value={isMunicipalChecked} onValueChange={() => setMunicipalChecked(!isMunicipalChecked)} />
                    <Pressable style={styles.checkboxText} onPress={() => setMunicipalChecked(!isMunicipalChecked)}><Text>מועצות אזוריות</Text></Pressable>
                </View>
                <View style={styles.checkboxContainer}>
                    <Checkbox value={isPoliceStationChecked} onValueChange={() => setPoliceStationChecked(!isPoliceStationChecked)} />
                    <Pressable style={styles.checkboxText} onPress={() => setPoliceStationChecked(!isPoliceStationChecked)}><Text>תחנות משטרה</Text></Pressable>
                </View>
                <View style={styles.checkboxContainer}>
                    <Checkbox value={isPoliceDistrictChecked} onValueChange={() => setPoliceDistrictChecked(!isPoliceDistrictChecked)} />
                    <Pressable style={styles.checkboxText} onPress={() => setPoliceDistrictChecked(!isPoliceDistrictChecked)}><Text>מחוזות</Text></Pressable>
                </View>
                <View style={styles.checkboxContainer}>
                    <Checkbox value={isBoroughChecked} onValueChange={() => setBoroughChecked(!isBoroughChecked)} />
                    <Pressable style={styles.checkboxText} onPress={() => setBoroughChecked(!isBoroughChecked)}><Text>שכונות</Text></Pressable>
                </View>
            </ScrollView>
        </View>
    );
}