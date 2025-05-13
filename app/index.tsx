import PageOne from '@/components/indexPage/page1';
import PageTwo from '@/components/indexPage/page2';
import PageThree from '@/components/indexPage/page3';
import { Wizard } from '@/components/wizard/Wizard';
import { Step } from '@/components/wizard/WizardStep.tsx/wizardStep';
import { ElementInterface } from '@/interfaces/element.interface';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { I18nManager, StyleSheet, View } from 'react-native';
//import { Wizard } from '../components/wizard/Wizard.tsx';

export default function MainPage() {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);

    const [selectedCity, setSelectedCity] = React.useState<ElementInterface | null>(null);
    const [selectedItem, setSelectedItem] = React.useState<ElementInterface | null>(null);
    const [selectedFirstYear, setSelectedFirstYear] = React.useState<string>('2022');
    const [selectedSecondYear, setSelectedSecondYear] = React.useState<string>('2024');
    
    const [firstYearQuarter1, setFirstYearQuarter1] = React.useState<boolean>(true);
    const [firstYearQuarter2, setFirstYearQuarter2] = React.useState<boolean>(true);
    const [firstYearQuarter3, setFirstYearQuarter3] = React.useState<boolean>(true);
    const [firstYearQuarter4, setFirstYearQuarter4] = React.useState<boolean>(true);
    const [secondYearQuarter1, setSecondYearQuarter1] = React.useState<boolean>(true);
    const [secondYearQuarter2, setSecondYearQuarter2] = React.useState<boolean>(true);
    const [secondYearQuarter3, setSecondYearQuarter3] = React.useState<boolean>(true);
    const [secondYearQuarter4, setSecondYearQuarter4] = React.useState<boolean>(true);

    const handleSelectedCityItemChange = (id: ElementInterface) => {
        console.log('Selected city ID:', id);
        setSelectedCity(id);
    }

    const handleSelectedItemChange = (id: ElementInterface) => {
        console.log('Selected item ID:', id);
        setSelectedItem(id);
    }

    const resetStates = () => {
        setSelectedCity(null);
        setSelectedItem(null);
        setSelectedFirstYear('2022');
        setSelectedSecondYear('2024');
        
        setFirstYearQuarter1(true);
        setFirstYearQuarter2(true);
        setFirstYearQuarter3(true);
        setFirstYearQuarter4(true);
        setSecondYearQuarter1(true);
        setSecondYearQuarter2(true);
        setSecondYearQuarter3(true);
        setSecondYearQuarter4(true);
    };
    
    return (
        
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='#f4511e'
                    style='light'
                />
                <Wizard>
                    <Step>
                        <PageOne
                            handleSelectedCityItemChange={(id: ElementInterface) => handleSelectedCityItemChange(id)}
                            handleSelectedItemChange={(id: ElementInterface) => handleSelectedItemChange(id)}
                            resetStates={resetStates}
                        /> 
                        
                    </Step>
                    <Step>
                        <PageTwo handleFirstYearChange={function (id: string): void {
                            console.log('Selected first year ID:', id);
                            setSelectedFirstYear(id);
                        } } handleSecondYearChange={function (id: string): void {
                            console.log('Selected second year ID:', id);
                            setSelectedSecondYear(id);
                        } } handleFirstYearQuarter1Change={function (id: boolean): void {
                            console.log('Selected first year quarter ID:', id);
                            setFirstYearQuarter1(id)
                        } } handleFirstYearQuarter2Change={function (id: boolean): void {
                            console.log('Selected second year quarter ID:', id);
                            setFirstYearQuarter2(id)
                        } } handleFirstYearQuarter3Change={function (id: boolean): void {
                            console.log('Selected first year quarter ID:', id);
                            setFirstYearQuarter3(id)
                        } } handleFirstYearQuarter4Change={function (id: boolean): void {
                            console.log('Selected second year quarter ID:', id);
                            setFirstYearQuarter4(id)
                        } } handleSecondYearQuarter1Change={function (id: boolean): void {
                            console.log('Selected first year quarter ID:', id);
                            setSecondYearQuarter1(id)
                        } } handleSecondYearQuarter2Change={function (id: boolean): void {
                            console.log('Selected second year quarter ID:', id);
                            setSecondYearQuarter2(id)
                        } } handleSecondYearQuarter3Change={function (id: boolean): void {
                            console.log('Selected first year quarter ID:', id);
                            setSecondYearQuarter3(id)
                        } } handleSecondYearQuarter4Change={function (id: boolean): void {
                            console.log('Selected second year quarter ID:', id);
                            setSecondYearQuarter4(id)
                        } } />
                        
                    </Step>
                    <Step>
                        <PageThree
                            selectedCity={selectedCity}
                            selectedItem={selectedItem}
                            selectedFirstYear={selectedFirstYear}
                            selectedSecondYear={selectedSecondYear}
                            firstYearQuarter1={firstYearQuarter1}
                            firstYearQuarter2={firstYearQuarter2}
                            firstYearQuarter3={firstYearQuarter3}
                            firstYearQuarter4={firstYearQuarter4}
                            secondYearQuarter1={secondYearQuarter1}
                            secondYearQuarter2={secondYearQuarter2}
                            secondYearQuarter3={secondYearQuarter3}
                            secondYearQuarter4={secondYearQuarter4}/>

                    </Step>
                </Wizard>
            </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    }
});