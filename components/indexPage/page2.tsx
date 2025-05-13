import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import React, { useEffect } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { styles } from './style';

export interface PageTwoProps {
    handleFirstYearChange: (id: string) => void
    handleSecondYearChange: (id: string) => void
    
    handleFirstYearQuarter1Change: (checked: boolean) => void
    handleFirstYearQuarter2Change: (checked: boolean) => void
    handleFirstYearQuarter3Change: (checked: boolean) => void
    handleFirstYearQuarter4Change: (checked: boolean) => void
    handleSecondYearQuarter1Change: (checked: boolean) => void
    handleSecondYearQuarter2Change: (checked: boolean) => void
    handleSecondYearQuarter3Change: (checked: boolean) => void
    handleSecondYearQuarter4Change: (checked: boolean) => void
}

export default function PageTwo(props: PageTwoProps) {
    const [firstYear, setFirstYear] = React.useState<string>('2022');
    const [secondYear, setSecondYear] = React.useState<string>('2024');

    const [firstYearQuarter1, setFirstYearQuarter1] = React.useState<boolean>(true);
    const [firstYearQuarter2, setFirstYearQuarter2] = React.useState<boolean>(true);
    const [firstYearQuarter3, setFirstYearQuarter3] = React.useState<boolean>(true);
    const [firstYearQuarter4, setFirstYearQuarter4] = React.useState<boolean>(true);
    const [secondYearQuarter1, setSecondYearQuarter1] = React.useState<boolean>(true);
    const [secondYearQuarter2, setSecondYearQuarter2] = React.useState<boolean>(true);
    const [secondYearQuarter3, setSecondYearQuarter3] = React.useState<boolean>(true);
    const [secondYearQuarter4, setSecondYearQuarter4] = React.useState<boolean>(true);
    
    function firstYearHandler(itemValue: string): void {
        props.handleFirstYearChange(itemValue);
        setFirstYear(itemValue);
    }

    function secondYearHandler(itemValue: string): void {
        props.handleSecondYearChange(itemValue);
        setSecondYear(itemValue);
    }

    useEffect(() => {
        props.handleFirstYearQuarter1Change(firstYearQuarter1);
    }, [firstYearQuarter1]);

    useEffect(() => {
        props.handleFirstYearQuarter2Change(firstYearQuarter2);
    }, [firstYearQuarter2]);

    useEffect(() => {
        props.handleFirstYearQuarter3Change(firstYearQuarter3);
    }, [firstYearQuarter3]);

    useEffect(() => {
        props.handleFirstYearQuarter4Change(firstYearQuarter4);
    }, [firstYearQuarter4]);

    useEffect(() => {
        props.handleSecondYearQuarter1Change(secondYearQuarter1);
    }, [firstYearQuarter1]);

    useEffect(() => {
        props.handleSecondYearQuarter2Change(secondYearQuarter2);
    }, [firstYearQuarter2]);

    useEffect(() => {
        props.handleSecondYearQuarter3Change(secondYearQuarter3);
    }, [firstYearQuarter3]);

    useEffect(() => {
        props.handleSecondYearQuarter4Change(secondYearQuarter4);
    }, [firstYearQuarter4]);

    return (
        <View style={styles.containerView}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>שלב ב': בחר תקופות להשוואה</Text>
                <Text>בחר שנה / רבעון ראשונה לצורך השוואה</Text>
                <Picker
                    mode="dropdown"
                    style={styles.picker}
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
                <View style={styles.checkboxContainer}>
                    <Checkbox value={firstYearQuarter1} onValueChange={() => { setFirstYearQuarter1(!firstYearQuarter1); }} />
                    <Pressable style={styles.checkboxText} onPress={() => setFirstYearQuarter1(!firstYearQuarter1)}><Text>רבעון ראשון</Text></Pressable>
                </View>
                <View style={styles.checkboxContainer}>
                    <Checkbox value={firstYearQuarter2} onValueChange={() => { setFirstYearQuarter2(!firstYearQuarter2); }} />
                    <Pressable style={styles.checkboxText} onPress={() => setFirstYearQuarter2(!firstYearQuarter2)}><Text>רבעון שני</Text></Pressable>
                </View>
                <View style={styles.checkboxContainer}>
                    <Checkbox value={firstYearQuarter3} onValueChange={() => { setFirstYearQuarter3(!firstYearQuarter3); }} />
                    <Pressable style={styles.checkboxText} onPress={() => setFirstYearQuarter3(!firstYearQuarter3)}><Text>רבעון שלישי</Text></Pressable>
                </View>
                <View style={styles.checkboxContainer}>
                    <Checkbox value={firstYearQuarter4} onValueChange={() => { setFirstYearQuarter4(!firstYearQuarter4); }} />
                    <Pressable style={styles.checkboxText} onPress={() => setFirstYearQuarter4(!firstYearQuarter4)}><Text>רבעון רביעי</Text></Pressable>
                </View>
                <Text>בחר שנה / רבעון שנייה לצורך השוואה</Text>
                <Picker
                    mode="dropdown"
                    style={styles.picker}
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
                <View style={styles.checkboxContainer}>
                    <Checkbox value={secondYearQuarter1} onValueChange={() => { setSecondYearQuarter1(!secondYearQuarter1); }} />
                    <Pressable style={styles.checkboxText} onPress={() => setSecondYearQuarter1(!secondYearQuarter1)}><Text>רבעון ראשון</Text></Pressable>
                </View>
                <View style={styles.checkboxContainer}>
                    <Checkbox value={secondYearQuarter2} onValueChange={() => { setSecondYearQuarter2(!secondYearQuarter2); }} />
                    <Pressable style={styles.checkboxText} onPress={() => setSecondYearQuarter2(!secondYearQuarter2)}><Text>רבעון שני</Text></Pressable>
                </View>
                <View style={styles.checkboxContainer}>
                    <Checkbox value={secondYearQuarter3} onValueChange={() => { setSecondYearQuarter3(!secondYearQuarter3); }} />
                    <Pressable style={styles.checkboxText} onPress={() => setSecondYearQuarter3(!secondYearQuarter3)}><Text>רבעון שלישי</Text></Pressable>
                </View>
                <View style={styles.checkboxContainer}>
                    <Checkbox value={secondYearQuarter4} onValueChange={() => { setSecondYearQuarter4(!secondYearQuarter4); }} />
                    <Pressable style={styles.checkboxText} onPress={() => setSecondYearQuarter4(!secondYearQuarter4)}><Text>רבעון רביעי</Text></Pressable>
                </View>
            </ScrollView>
        </View>
    );  
}

