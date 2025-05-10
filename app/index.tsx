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
    const [selectedFirstYearQuarter, setSelectedFirstYearQuarter] = React.useState<string>('all');
    const [selectedSecondYearQuarter, setSelectedSecondYearQuarter] = React.useState<string>('all');

    const handleSelectedCityItemChange = (id: ElementInterface) => {
        console.log('Selected city ID:', id);
        setSelectedCity(id);
    }

    const handleSelectedItemChange = (id: ElementInterface) => {
        console.log('Selected item ID:', id);
        setSelectedItem(id);
    }
    
    return (
        
            <View style={styles.container}>
                <StatusBar
                backgroundColor='#FFFFFF'
                style='dark'
                />
                <Wizard>
                    <Step>
                        <PageOne
                            handleSelectedCityItemChange={(id: ElementInterface) => handleSelectedCityItemChange(id)}
                            handleSelectedItemChange={(id: ElementInterface) => handleSelectedItemChange(id)}
                        /> 
                        
                    </Step>
                    <Step>
                        <PageTwo handleFirstYearChange={function (id: string): void {
                            console.log('Selected first year ID:', id);
                            setSelectedFirstYear(id);
                        } } handleSecondYearChange={function (id: string): void {
                            console.log('Selected second year ID:', id);
                            setSelectedSecondYear(id);
                        } } handleFirstYearQuarterChange={function (id: string): void {
                            console.log('Selected first year quarter ID:', id);
                            setSelectedFirstYearQuarter(id);
                        } } handleSecondYearQuarterChange={function (id: string): void {
                            console.log('Selected second year quarter ID:', id);
                            setSelectedSecondYearQuarter(id);
                        } } />
                        
                    </Step>
                    <Step>
                        <PageThree
                            selectedCity={selectedCity}
                            selectedItem={selectedItem}
                            selectedFirstYear={selectedFirstYear}
                            selectedSecondYear={selectedSecondYear}
                            selectedFirstYearQuarter={selectedFirstYearQuarter}
                            selectedSecondYearQuarter={selectedSecondYearQuarter} />
                        
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