import { AreasEnum } from '@/enums/area.enum';
import { FeloniesEnum } from '@/enums/felonies.enum';
import useGetData from '@/hooks/useGetData';
import { ElementInterface } from '@/interfaces/element.interface';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

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
        <ScrollView style={styles.width100}>
            <Text style={ styles.title }>שלב ג': תוצאות בדיקה</Text>
            <Text style={[styles.padding10, styles.rightButtonsContainerStyleText, styles.paddingTopbutton, styles.fontBold]}>להלן פרטי השאילתה שנשלחה למאגרי המידע:</Text>
            <Text style={[styles.padding10, styles.rightButtonsContainerStyleText, styles.paddingTopbutton]}>
                {props.selectedCity?.catID === AreasEnum.CITIES ? 'יישוב' : null}
                {props.selectedCity?.catID === AreasEnum.BOROUGHS ? 'רובע' : null}
                {props.selectedCity?.catID === AreasEnum.MERHAVIM ? 'מרחב' : null}
                {props.selectedCity?.catID === AreasEnum.POLICE_DISTRICTS ? 'מחוז' : null}
                {props.selectedCity?.catID === AreasEnum.POLICE_STATIONS ? 'תחנת משטרה' : null}
                {props.selectedCity?.catID === AreasEnum.MUNICIPALITIES ? 'מועצה אזורית' : null}
                { ': '}
                {props.selectedCity?.title}
            </Text>
            <Text style={[styles.padding10, styles.rightButtonsContainerStyleText, styles.paddingTopbutton]}>
                {props.selectedItem?.catID === FeloniesEnum.GROUP ? 'קטגוריה' : null}
                {props.selectedItem?.catID === FeloniesEnum.TYPE ? 'עבירה' : null}
                { ': '}
                {props.selectedItem?.title}
            </Text>
            <Text style={[styles.padding10, styles.rightButtonsContainerStyleText, styles.paddingTopbutton]}>
                שנת התחלה / רבעון: {props.selectedFirstYear}, {props.firstYearQuarter1}, {props.firstYearQuarter2}, {props.firstYearQuarter3}, {props.firstYearQuarter4}
            </Text>
            <Text style={[styles.padding10, styles.rightButtonsContainerStyleText, styles.paddingTopbutton]}>
                שנת סיום / רבעון: {props.selectedSecondYear}, {props.secondYearQuarter1}, {props.secondYearQuarter2}, {props.secondYearQuarter3}, {props.secondYearQuarter4}
            </Text>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 10,
                    paddingRight: 10,
                }}
            />
            <Text style={[styles.padding10, styles.rightButtonsContainerStyleText, styles.paddingTopbutton]}>
                מספר עבירות בשנת ההתחלה: {data1?.result?.total.toLocaleString()}
            </Text>
            <Text style={[styles.padding10, styles.rightButtonsContainerStyleText, styles.paddingTopbutton]}>
                מספר עבירות בשנת הסיום: {data2?.result?.total.toLocaleString()}
            </Text>
            <Text style={[styles.padding10, styles.rightButtonsContainerStyleText, styles.paddingTopbutton]}>
                {(data2?.result?.total as number) > (data1?.result?.total as number) ? 'עלייה' : 'ירידה'} של
                {' '}
                {Math.abs(((data2?.result?.total as number) - (data1?.result?.total as number)) / (data1?.result?.total as number) * 100).toLocaleString('en-US', {
                
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}%
                {' '}
                בעבירות
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    width100: {
        width: '100%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
        marginBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 20,
        width: '100%'
    },
    padding10: {
        paddingLeft: 10,
        paddingRight: 10
    },
    rightButtonsContainerStyleText: {
        direction: 'rtl',
    },
    paddingTopbutton: {
        paddingTop: 5,
        paddingBottom: 5
    },
    fontBold: {
        fontWeight: 'bold',
    }
});