import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    top: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: "center",
        justifyContent: 'center',
        paddingTop: 20,
    },
    icon: {
        height: 60,
        width: 60,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: 'center',
        position: 'relative',
        bottom: 60,
        left: 40,
    },
    picture: {
        height: 200,
        width: 200,
        borderRadius: 190,
        resizeMode: 'cover',
        borderWidth: 4,
        borderStyle: 'solid'
    },
    bottom: {
        flex: 1.5,
        paddingVertical: 20,
        paddingHorizontal: 40
    },
    name: {
        backgroundColor: '#fff',
        padding: 10,
        width: '100%',
        outlineStyle: 'none',
        borderRadius: 5,
        marginVertical: 10
    },
    label: {
        fontSize: 18,
        color: '#FFF',
    },
    save: {
        paddingVertical: 5,
        width: 100,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end'
    },
    textSave: {
        fontSize: 20,
    },
    up: {
        flexDirection: 'row',
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textUp: {
        color: "#515151",
        marginLeft: 10,
        fontSize: 18,
    },
    singout: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 2,
        alignSelf: 'flex-end',
        borderColor: 'white',
        borderRadius: 10
    },
    textLogout: {
        color: 'white',
        paddingHorizontal: 10,
        fontSize: 18
    },
    wrapperColor: {
        paddingVertical: 20
    },
    titleColor: {
        color: "white",
        fontSize: 18,
    },
    boxColor: {
        width: '80%',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: "row"
    },
    paleta: {
        flexDirection: "row"
    }, box: {
        width: 20,
        height: 20,
    },
    textColor: {
        fontSize: 16
    },
    toggle: {
        width: 70,
        height: 30,
        borderRadius: 14, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor:"#fff",
        marginTop:10,
    }

})

export default styles