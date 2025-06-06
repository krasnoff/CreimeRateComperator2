import { AreasEnum } from '@/enums/area.enum';
import { FeloniesEnum } from '@/enums/felonies.enum';
import useGetData from '@/hooks/useGetData';
import { ElementInterface } from '@/interfaces/element.interface';
import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { styles } from './style';

export interface PageTThreeProps {
    selectedCity: ElementInterface | null
    selectedItem: ElementInterface | null
    selectedFirstYear: string | null
    selectedSecondYear: string | null
    firstYearQuarter1: boolean
    firstYearQuarter2: boolean
    firstYearQuarter3: boolean
    firstYearQuarter4: boolean
    secondYearQuarter1: boolean
    secondYearQuarter2: boolean
    secondYearQuarter3: boolean
    secondYearQuarter4: boolean
}

export default function PageThree(props: PageTThreeProps) {
    const { data1, data2, error, loading, sendPostRequests } = useGetData();
    
    useEffect(() => {
        console.log('props ', props);
        sendPostRequests(
            props.selectedCity as ElementInterface,
            props.selectedItem as ElementInterface,
            props.selectedFirstYear as string,
            props.selectedSecondYear as string,
            props.firstYearQuarter1 as boolean, 
            props.firstYearQuarter2 as boolean, 
            props.firstYearQuarter3 as boolean, 
            props.firstYearQuarter4 as boolean,
            props.secondYearQuarter1 as boolean, 
            props.secondYearQuarter2 as boolean, 
            props.secondYearQuarter3 as boolean, 
            props.secondYearQuarter4 as boolean)
    }, []);
    
    return (
        <View style={styles.containerView}>
            {(!loading) ? (
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>שלב ג': תוצאות בדיקה</Text>
                <Text>להלן פרטי השאילתה שנשלחה למאגרי המידע:</Text>
                <Text>
                    {props.selectedCity?.catID === AreasEnum.CITIES ? 'יישוב' : null}
                    {props.selectedCity?.catID === AreasEnum.BOROUGHS ? 'רובע' : null}
                    {props.selectedCity?.catID === AreasEnum.MERHAVIM ? 'מרחב' : null}
                    {props.selectedCity?.catID === AreasEnum.POLICE_DISTRICTS ? 'מחוז' : null}
                    {props.selectedCity?.catID === AreasEnum.POLICE_STATIONS ? 'תחנת משטרה' : null}
                    {props.selectedCity?.catID === AreasEnum.MUNICIPALITIES ? 'מועצה אזורית' : null}
                    {props.selectedCity?.catID === undefined ? 'כל הארץ' : null}
                    {props.selectedCity?.catID !== undefined ? ': ' : null}
                    {props.selectedCity?.catID !== undefined ? props.selectedCity?.title : null}
                </Text>
                <Text>
                    {props.selectedItem?.catID === FeloniesEnum.GROUP ? 'קטגוריה' : null}
                    {props.selectedItem?.catID === FeloniesEnum.TYPE ? 'עבירה' : null}
                    {props.selectedItem?.catID === undefined ? 'כל העבירות' : null}
                    {props.selectedItem?.catID !== undefined ? ': ' : null}
                    {props.selectedItem?.catID !== undefined ? props.selectedItem?.title : null}
                </Text>
                <Text>
                    שנת התחלה: { ' ' }
                    {props.selectedFirstYear} {', רבעונים:'}
                    {props.firstYearQuarter1} {props.firstYearQuarter1 ? 'Q1, ' : null}
                    {props.firstYearQuarter2} {props.firstYearQuarter2 ? 'Q2, ' : null}
                    {props.firstYearQuarter3} {props.firstYearQuarter3 ? 'Q3, ' : null}
                    {props.firstYearQuarter4} {props.firstYearQuarter4 ? 'Q4, ' : null}
                </Text>
                <Text>
                    שנת סיום: { ' ' } 
                    {props.selectedSecondYear} {', רבעונים:'}
                    {props.secondYearQuarter1} {props.secondYearQuarter1 ? 'Q1, ' : null}
                    {props.secondYearQuarter2} {props.secondYearQuarter2 ? 'Q2, ' : null}
                    {props.secondYearQuarter3} {props.secondYearQuarter3 ? 'Q3, ' : null}
                    {props.secondYearQuarter4} {props.secondYearQuarter4 ? 'Q4, ' : null}
                </Text>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        marginTop: 15,
                        marginBottom: 15,
                        paddingLeft: 10,
                        paddingRight: 10,
                    }}
                />
                <Text>
                    מספר עבירות בשנת ההתחלה: {data1?.result?.total.toLocaleString()}
                </Text>
                <Text>
                    מספר עבירות בשנת הסיום: {data2?.result?.total.toLocaleString()}
                </Text>
                <Text>
                    {(data2?.result?.total as number) > (data1?.result?.total as number) ? 'עלייה' : 'ירידה'} של
                    {' '}
                    {Math.abs(((data2?.result?.total as number) - (data1?.result?.total as number)) / (data1?.result?.total as number) * 100).toLocaleString('en-US', {
                    
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}%
                    {' '}
                    בעבירות
                </Text>
            </ScrollView>) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" />
                    <Text>Loading...</Text>
                </View>
            )}
        </View>
    );
}