
export const color = wichColor(0);

export function wichColor(num, darkmode) {
    const colors = [
        {
            primaryColor: '#5CC6BA',
            primaryColorLight: '#B8E2DE',
            primaryColorDark: '#4ABAAD',
            primaryColorDark2: '#3AA79B',
            textColorDark:'#444',
            text: 'Ciano',

            //darkMode
            textColor: darkmode ? '#ffffff' : '#515151',
            icon: darkmode ? '#d3d3d3' : '#7A7A7A',
            bgNavigation: darkmode ? '#000000' : '#ffffff',
            bgColor: darkmode ? '#333333' : '#ffffff',
            cardColor: darkmode ? '#222222' : '#EEEFF1',
            textColor2: darkmode ? '#d3d3d3' : '#515151',
            cardColorReload: darkmode ? '#504F4F' : '#FFFFFF88',
        }, 
        {
            primaryColor: '#60BA62',
            primaryColorLight: '#A4F3A6',
            primaryColorDark: '#58B060',
            primaryColorDark2: '#559D5B',
            textColorDark: '#444',
            text: 'Limão',

             //darkMode
             textColor: darkmode ? '#ffffff' : '#515151',
             icon: darkmode ? '#d3d3d3' : '#7A7A7A',
             bgNavigation: darkmode ? '#000000' : '#ffffff',
             bgColor: darkmode ? '#333333' : '#ffffff',
             cardColor: darkmode ? '#222222' : '#EEEFF1',
             textColor2: darkmode ? '#d3d3d3' : '#515151',
             cardColorReload: darkmode ? '#504F4F' : '#FFFFFF88',
        },
        {
            primaryColor: '#00AFAB',
            primaryColorLight: '#A9E6E5',
            primaryColorDark: '#015958',
            primaryColorDark2: '#229292',
            textColorDark: '#444',
            text: 'Marinho',

             //darkMode
             textColor: darkmode ? '#ffffff' : '#515151',
             icon: darkmode ? '#d3d3d3' : '#7A7A7A',
             bgNavigation: darkmode ? '#000000' : '#ffffff',
             bgColor: darkmode ? '#333333' : '#ffffff',
             cardColor: darkmode ? '#222222' : '#EEEFF1',
             textColor2: darkmode ? '#d3d3d3' : '#515151',
             cardColorReload: darkmode ? '#504F4F' : '#FFFFFF88',
        },
        {
            primaryColor: '#f29ab8',
            primaryColorLight: '#FFC7DA',
            primaryColorDark: '#d7819f',
            primaryColorDark2: '#c97593',
            textColorDark: '#444',
            text: 'Rosa Claro',

             //darkMode
             textColor: darkmode ? '#ffffff' : '#515151',
             icon: darkmode ? '#d3d3d3' : '#7A7A7A',
             bgNavigation: darkmode ? '#000000' : '#ffffff',
             bgColor: darkmode ? '#333333' : '#ffffff',
             cardColor: darkmode ? '#222222' : '#EEEFF1',
             textColor2: darkmode ? '#d3d3d3' : '#515151',
             cardColorReload: darkmode ? '#504F4F' : '#FFFFFF88',
        },
        {
            primaryColor: '#bd83ba',
            primaryColorLight: '#DE9EDA',
            primaryColorDark: '#a0689d',
            primaryColorDark2: '#844e81',
            textColorDark: '#444',
            text: 'Roxo',

             //darkMode
             textColor: darkmode ? '#ffffff' : '#515151',
             icon: darkmode ? '#d3d3d3' : '#7A7A7A',
             bgNavigation: darkmode ? '#000000' : '#ffffff',
             bgColor: darkmode ? '#333333' : '#ffffff',
             cardColor: darkmode ? '#222222' : '#EEEFF1',
             textColor2: darkmode ? '#d3d3d3' : '#515151',
             cardColorReload: darkmode ? '#504F4F' : '#FFFFFF88',
        },
        {
            primaryColor: '#a66860',
            primaryColorLight: '#E7ACA5',
            primaryColorDark: '#945851',
            primaryColorDark2: '#824842',
            textColorDark: '#444',
            text: 'Chocolate',

             //darkMode
             textColor: darkmode ? '#ffffff' : '#515151',
             icon: darkmode ? '#d3d3d3' : '#7A7A7A',
             bgNavigation: darkmode ? '#000000' : '#ffffff',
             bgColor: darkmode ? '#333333' : '#ffffff',
             cardColor: darkmode ? '#222222' : '#EEEFF1',
             textColor2: darkmode ? '#d3d3d3' : '#515151',
             cardColorReload: darkmode ? '#504F4F' : '#FFFFFF88',
        },
        {
            primaryColor: '#f36948',
            primaryColorLight: '#FEB39A',
            primaryColorDark: '#ee5637',
            primaryColorDark2: '#e84327',
            textColorDark: '#444',
            text: 'Laranja',

             //darkMode
             textColor: darkmode ? '#ffffff' : '#515151',
             icon: darkmode ? '#d3d3d3' : '#7A7A7A',
             bgNavigation: darkmode ? '#000000' : '#ffffff',
             bgColor: darkmode ? '#333333' : '#ffffff',
             cardColor: darkmode ? '#222222' : '#EEEFF1',
             textColor2: darkmode ? '#d3d3d3' : '#515151',
             cardColorReload: darkmode ? '#504F4F' : '#FFFFFF88',
        },
        {
            primaryColor: '#C4BC97',
            primaryColorLight: '#F6E9C4',
            primaryColorDark: '#BEB390',
            primaryColorDark2: '#9E967A',
            textColorDark: '#444',
            text: 'Bejê',

             //darkMode
             textColor: darkmode ? '#ffffff' : '#515151',
             icon: darkmode ? '#d3d3d3' : '#7A7A7A',
             bgNavigation: darkmode ? '#000000' : '#ffffff',
             bgColor: darkmode ? '#333333' : '#ffffff',
             cardColor: darkmode ? '#222222' : '#EEEFF1',
             textColor2: darkmode ? '#d3d3d3' : '#515151',
             cardColorReload: darkmode ? '#504F4F' : '#FFFFFF88',
        },
        {
            primaryColor: "#3d3d3d",
            primaryColorLight: "#979797",
            primaryColorDark: "#242424",
            primaryColorDark2: darkmode ? '#A6A4A4' : "#191919",
            textColorDark: '#444',
            text: "Preto",

             //darkMode
             textColor: darkmode ? '#ffffff' : '#515151',
             icon: darkmode ? '#d3d3d3' : '#7A7A7A',
             bgNavigation: darkmode ? '#000000' : '#ffffff',
             bgColor: darkmode ? '#333333' : '#ffffff',
             cardColor: darkmode ? '#222222' : '#EEEFF1',
             textColor2: darkmode ? '#d3d3d3' : '#515151',
             cardColorReload: darkmode ? '#504F4F' : '#FFFFFF88',
          }
    ]

    if(num == 'todos') {
        return colors;
    }
    return colors[num]

}