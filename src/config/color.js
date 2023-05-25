
export const color = wichColor(0);

export function wichColor(num) {
    const colors = [
        {
            primaryColor: '#5CC6BA',
            primaryColorLight: '#B8E2DE',
            primaryColorDark: '#4ABAAD',
            primaryColorDark2: '#3AA79B',
            textColor:'#515151',
            textColorDark:'#444',
            text: 'Ciano'
        }, 
        {
            primaryColor: '#60BA62',
            primaryColorLight: '#A4F3A6',
            primaryColorDark: '#58B060',
            primaryColorDark2: '#559D5B',
            textColor: '#515151',
            textColorDark: '#444',
            text: 'Limão'
        },
        {
            primaryColor: '#00AFAB',
            primaryColorLight: '#A9E6E5',
            primaryColorDark: '#015958',
            primaryColorDark2: '#023535',
            textColor: '#515151',
            textColorDark: '#444',
            text: 'Marinho'
        },
        {
            primaryColor: '#f29ab8',
            primaryColorLight: '#FFC7DA',
            primaryColorDark: '#d7819f',
            primaryColorDark2: '#c97593',
            textColor: '#515151',
            textColorDark: '#444',
            text: 'Rosa Claro'
        },
        {
            primaryColor: '#bd83ba',
            primaryColorLight: '#DE9EDA',
            primaryColorDark: '#a0689d',
            primaryColorDark2: '#844e81',
            textColor: '#515151',
            textColorDark: '#444',
            text: 'Roxo'
        },
        {
            primaryColor: '#a66860',
            primaryColorLight: '#E7ACA5',
            primaryColorDark: '#945851',
            primaryColorDark2: '#824842',
            textColor: '#515151',
            textColorDark: '#444',
            text: 'Chocolate'
        },
        {
            primaryColor: '#f36948',
            primaryColorLight: '#FEB39A',
            primaryColorDark: '#ee5637',
            primaryColorDark2: '#e84327',
            textColor: '#515151',
            textColorDark: '#444',
            text: 'Laranja'
        },
        {
            primaryColor: '#C4BC97',
            primaryColorLight: '#F6E9C4',
            primaryColorDark: '#BEB390',
            primaryColorDark2: '#9E967A',
            textColor: '#515151',
            textColorDark: '#444',
            text: 'Bejê'
        },
        {
            primaryColor: "#3d3d3d",
            primaryColorLight: "#979797",
            primaryColorDark: "#242424",
            primaryColorDark2: "#191919",
            textColor: '#515151',
            textColorDark: '#444',
            text: "Preto"
          }
    ]

    if(num == 'todos') {
        return colors;
    }
    return colors[num]

}