
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 20,
        direction: 'rtl',
        width: '100%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5
    },
    checkboxText: {
        marginRight: 10,
    },
    picker: {
        direction: 'ltr',
        width: '100%',
        textAlign: 'left',
    },
    radioContainer: {
        
    },
    radioItem: {
        marginLeft: 10,  
        marginTop: 5,
        marginBottom: 5,
    }
});