import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import RadioButtonGroup, { RadioButtonItem } from 'expo-radio-button';

export interface PageTwoProps {
    handleFirstYearChange: (id: string) => void
    handleSecondYearChange: (id: string) => void
    handleFirstYearQuarterChange: (id: string) => void
    handleSecondYearQuarterChange: (id: string) => void
}

export default function PageTwo(props: PageTwoProps) {
    const [firstYear, setFirstYear] = React.useState<string>('2022');
    const [secondYear, setSecondYear] = React.useState<string>('2024');

    const [firstYearQuarter, setFirstYearQuarter] = React.useState<string>('all');
    const [secondYearQuarter, setSecondYearQuarter] = React.useState<string>('all');
    
    function firstYearHandler(itemValue: string): void {
        props.handleFirstYearChange(itemValue);
        setFirstYear(itemValue);
    }

    function secondYearHandler(itemValue: string): void {
        props.handleSecondYearChange(itemValue);
        setSecondYear(itemValue);
    }

    function firstYearQuarterHandler(itemValue: string): void {
        props.handleFirstYearQuarterChange(itemValue);
        setFirstYearQuarter(itemValue);
    }

    function secondYearQuarterHandler(itemValue: string): void {
        props.handleSecondYearQuarterChange(itemValue);
        setSecondYearQuarter(itemValue);
    }

    return (
        <ScrollView style={styles.width100}>
            <Text style={ styles.title }>שלב ב': בחר תקופות להשוואה</Text>
            <Text style={[styles.padding10, styles.rightButtonsContainerStyleText]}>בחר שנה / רבעון ראשונה לצורך השוואה</Text>
            <Picker
                style={styles.picker}
                mode="dropdown"
                selectedValue={firstYear}
                onValueChange={(itemValue, itemIndex) => 
                    firstYearHandler(itemValue)}
                >
                <Picker.Item label="2020" value="2020" />
                <Picker.Item label="2021" value="2021" />
                <Picker.Item label="2022" value="2022" />
                <Picker.Item label="2023" value="2023" />
                <Picker.Item label="2024" value="2024" />
            </Picker>
            <RadioButtonGroup
                containerStyle={styles.radioButtonGroup}
                selected={firstYearQuarter}
                onSelected={(value: string) => firstYearQuarterHandler(value)}
                size={20}
                radioBackground="#000"
            >
                <RadioButtonItem style={styles.RadioButtonItem} value="all" label="כל השנה" />
                <RadioButtonItem style={styles.RadioButtonItem} value="Q1" label="רבעון ראשון" />
                <RadioButtonItem style={styles.RadioButtonItem}value="Q2" label="רבעון שני" />
                <RadioButtonItem style={styles.RadioButtonItem} value="Q3" label="רבעון שליש" />
                <RadioButtonItem style={styles.RadioButtonItem} value="Q4" label="רבעון רביעי" />
            </RadioButtonGroup>
            <Text style={[styles.padding10, styles.rightButtonsContainerStyleText]}>בחר שנה / רבעון שנייה לצורך השוואה</Text>
            <Picker
                style={styles.picker}
                mode="dropdown"
                selectedValue={secondYear}
                onValueChange={(itemValue, itemIndex) =>
                    secondYearHandler(itemValue)
                }>
                <Picker.Item label="2020" value="2020" />
                <Picker.Item label="2021" value="2021" />
                <Picker.Item label="2022" value="2022" />
                <Picker.Item label="2023" value="2023" />
                <Picker.Item label="2024" value="2024" />
            </Picker>
            <RadioButtonGroup
                containerStyle={styles.radioButtonGroup}
                selected={secondYearQuarter}
                onSelected={(value: string) => secondYearQuarterHandler(value)}
                size={20}
                radioBackground="#000"
            >
                <RadioButtonItem style={styles.RadioButtonItem} value="all" label="כל השנה" />
                <RadioButtonItem style={styles.RadioButtonItem} value="Q1" label="רבעון ראשון" />
                <RadioButtonItem style={styles.RadioButtonItem}value="Q2" label="רבעון שני" />
                <RadioButtonItem style={styles.RadioButtonItem} value="Q3" label="רבעון שליש" />
                <RadioButtonItem style={styles.RadioButtonItem} value="Q4" label="רבעון רביעי" />
            </RadioButtonGroup>
        </ScrollView>
    );  
}

const styles = StyleSheet.create({
    width100: {
        width: '100%'
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
    picker: {
        direction: 'rtl',
    },
    radioButtonGroup: {
        direction: 'rtl',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 20,
        marginTop: 20,
        width: '100%'
    },
    RadioButtonItem: {
        marginBottom: 5,
        marginTop: 5,
        marginLeft: 10,
    }
});