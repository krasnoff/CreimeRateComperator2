import { Picker } from '@react-native-picker/picker';
import RadioButtonGroup, { RadioButtonItem } from 'expo-radio-button';
import React from 'react';
import { ScrollView, Text } from 'react-native';
import { styles } from './style';

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
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>שלב ב': בחר תקופות להשוואה</Text>
            <Text>בחר שנה / רבעון ראשונה לצורך השוואה</Text>
            <Picker
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
                selected={firstYearQuarter}
                onSelected={(value: string) => firstYearQuarterHandler(value)}
                size={20}
                radioBackground="#000"
                style={styles.radioContainer}
            >
                <RadioButtonItem style={styles.radioItem} value="all" label="כל השנה" />
                <RadioButtonItem style={styles.radioItem} value="Q1" label="רבעון ראשון" />
                <RadioButtonItem style={styles.radioItem} value="Q2" label="רבעון שני" />
                <RadioButtonItem style={styles.radioItem} value="Q3" label="רבעון שליש" />
                <RadioButtonItem style={styles.radioItem} value="Q4" label="רבעון רביעי" />
            </RadioButtonGroup>
            <Text>בחר שנה / רבעון שנייה לצורך השוואה</Text>
            <Picker
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
                selected={secondYearQuarter}
                onSelected={(value: string) => secondYearQuarterHandler(value)}
                size={20}
                radioBackground="#000"
            >
                <RadioButtonItem style={styles.radioItem} value="all" label="כל השנה" />
                <RadioButtonItem style={styles.radioItem} value="Q1" label="רבעון ראשון" />
                <RadioButtonItem style={styles.radioItem} value="Q2" label="רבעון שני" />
                <RadioButtonItem style={styles.radioItem} value="Q3" label="רבעון שליש" />
                <RadioButtonItem style={styles.radioItem} value="Q4" label="רבעון רביעי" />
            </RadioButtonGroup>
        </ScrollView>
    );  
}

