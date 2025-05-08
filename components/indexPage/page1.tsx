import { AreasEnum } from "@/enums/area.enum";
import { FeloniesEnum } from "@/enums/felonies.enum";
import { useLoadCategories } from "@/hooks/useLoadCategories";
import { ElementInterface } from "@/interfaces/element.interface";
import { Picker } from "@react-native-picker/picker";
import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export interface PageOneProps {
    handleSelectedItemChange: (id: ElementInterface) => void
    handleSelectedCityItemChange: (id: ElementInterface) => void
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
        <ScrollView>
            <Text style={ [styles.title, styles.rightButtonsContainerStyleText] }>שלב א': בחר קריטריונים להשוואה</Text>
            <Text style={[styles.padding10, styles.rightButtonsContainerStyleText]}>בחר את סוג העבירה, במידה ולא תבחר עבירה אז החיפוש יהיה לכל סוגי העברות</Text>
            {/* <AutocompleteDropdown
                clearOnFocus={false}
                closeOnBlur={true}
                closeOnSubmit={true}
                onSelectItem={(item: any) => onSelectItem(item)}
                dataSet={filteredFelonies as any}
                containerStyle={styles.autoComplete}
                rightButtonsContainerStyle={styles.rightButtonsContainerStyle}
                // ChevronIconComponent={<></>} // Custom icon for the dropdown
                // ClearIconComponent={<></>} // Custom icon for the clear button
            /> */}
            <Picker
                style={styles.rightButtonsContainerStyleText}
                mode="dropdown"
                selectedValue={selectedFilteredFelonies}
                onValueChange={(item: ElementInterface, index: number) => onSelectItem(item, index)}>
                <Picker.Item key={-1} label="כל סוגי העבירות" value="-1" />
                {filteredFelonies.map((item: ElementInterface, index: number) => (
                    <Picker.Item key={index} label={item.title} value={item.id} />
                ))}
            </Picker>
            <View style={styles.section}>
                <Pressable  onPress={() => onChecked(!isChecked)}><Text style={styles.paragraph}>כל העבירות</Text></Pressable>
                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={() => { onChecked(!isChecked); }} />
            </View>
            <View style={styles.section}>
                <Pressable  onPress={() => setCategoriesChecked(!isCategoriesChecked)}><Text style={styles.paragraph}>קטגוריות</Text></Pressable>
                <Checkbox style={styles.checkbox} value={isCategoriesChecked} onValueChange={() => setCategoriesChecked(!isCategoriesChecked)} />
            </View>
            <View style={styles.section}>
                <Pressable  onPress={() => setSingleFelonyChecked(!isSingleFelonyChecked)}><Text style={styles.paragraph}>סוגי עבירות</Text></Pressable>
                <Checkbox style={styles.checkbox} value={isSingleFelonyChecked} onValueChange={() => setSingleFelonyChecked(!isSingleFelonyChecked)} />
            </View>
            <Text style={styles.padding10}> </Text>
            <Text style={[styles.padding10, , styles.rightButtonsContainerStyleText]}>בחר יישוב / מחוז / מרחב / שכונה. במידה ולא תבחר אז החיפוש יהיה לכל הארץ</Text>
            {/* <AutocompleteDropdown
                clearOnFocus={false}
                closeOnBlur={true}
                closeOnSubmit={true}
                onSelectItem={(item: any) => onSelectCityItem(item)}
                dataSet={filteredLocation as any}
                containerStyle={styles.autoComplete}
                rightButtonsContainerStyle={styles.rightButtonsContainerStyle}
                // ChevronIconComponent={<></>} // Custom icon for the dropdown
                // ClearIconComponent={<></>} // Custom icon for the clear button
            /> */}
            <Picker
                style={styles.rightButtonsContainerStyleText}
                mode="dropdown"
                selectedValue={selectedFilteredLocation}
                onValueChange={(item: ElementInterface, index: number) => onSelectCityItem(item, index)}>
                <Picker.Item key={-1} label="כל המקומות" value="-1" />
                {filteredLocation.map((item: ElementInterface, index: number) => (
                    <Picker.Item key={index} label={item.title} value={item.id} />
                ))}
            </Picker>
            <View style={styles.section}>
                <Pressable  onPress={() => onAreaChecked(!isAreaChecked)}><Text style={styles.paragraph}>כל הארץ</Text></Pressable>
                <Checkbox style={styles.checkbox} value={isAreaChecked} onValueChange={() => onAreaChecked(!isAreaChecked)} />
            </View>
            <View style={styles.section}>
                <Pressable  onPress={() => setCitiesChecked(!isCitiesChecked)}><Text style={styles.paragraph}>ערים</Text></Pressable>
                <Checkbox style={styles.checkbox} value={isCitiesChecked} onValueChange={() => setCitiesChecked(!isCitiesChecked)} />
            </View>
            <View style={styles.section}>
                <Pressable  onPress={() => setMerhavChecked(!isMerhavChecked)}><Text style={styles.paragraph}>מרחבים</Text></Pressable>
                <Checkbox style={styles.checkbox} value={isMerhavChecked} onValueChange={() => setMerhavChecked(!isMerhavChecked)} />
            </View>
            <View style={styles.section}>
                <Pressable  onPress={() => setMunicipalChecked(!isMunicipalChecked)}><Text style={styles.paragraph}>מועצות אזוריות</Text></Pressable>
                <Checkbox style={styles.checkbox} value={isMunicipalChecked} onValueChange={() => setMunicipalChecked(!isMunicipalChecked)} />
            </View>
            <View style={styles.section}>
                <Pressable  onPress={() => setPoliceStationChecked(!isPoliceStationChecked)}><Text style={styles.paragraph}>תחנות משטרה</Text></Pressable>
                <Checkbox style={styles.checkbox} value={isPoliceStationChecked} onValueChange={() => setPoliceStationChecked(!isPoliceStationChecked)} />
            </View>
            <View style={styles.section}>
                <Pressable  onPress={() => setPoliceDistrictChecked(!isPoliceDistrictChecked)}><Text style={styles.paragraph}>מחוזות</Text></Pressable>
                <Checkbox style={styles.checkbox} value={isPoliceDistrictChecked} onValueChange={() => setPoliceDistrictChecked(!isPoliceDistrictChecked)} />
            </View>
            <View style={styles.section}>
                <Pressable  onPress={() => setBoroughChecked(!isBoroughChecked)}><Text style={styles.paragraph}>שכונות</Text></Pressable>
                <Checkbox style={styles.checkbox} value={isBoroughChecked} onValueChange={() => setBoroughChecked(!isBoroughChecked)} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    autoComplete: {
        width: '100%',
        padding: 10,
        direction: 'rtl',
    },
    rightButtonsContainerStyleText: {
        direction: 'rtl',
    },
    rightButtonsContainerStyle: {
        direction: 'ltr',
    },
    clearButtonContainerStyle: {
        left: 5,
        right: null
    },
    padding10: {
        paddingLeft: 10,
        paddingRight: 10
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10
    },
    paragraph: {
        fontSize: 15,
    },
    checkbox: {
        margin: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
        marginBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 20,
    }
});