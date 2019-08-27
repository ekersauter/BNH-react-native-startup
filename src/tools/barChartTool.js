import React from 'react'
import { View } from 'react-native'
import { BarChart, Grid } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'

class BarChartHorizontalWithLabelsTool extends React.PureComponent {

    constructor(props){
        super(props)
        this.state = {
          isVisible: false,
          headerImgVisible: this.props.headerImgShow,
          options: this.props.options,
          data: this.props.data,
          dataText: this.props.dataText,
          cut_off: this.props.cut_off,

        }
    }

    render() {

        const data = this.state.data
        const CUT_OFF = this.state.cut_off
        const Labels = ({  x, y, bandwidth, data }) => (
            data.map((value, index) => (
                <Text
                    key={ index }
                    x={ value > CUT_OFF ? x(0) + 10 : x(value) + 10 }
                    y={ y(index) + (bandwidth / 2) }
                    fontSize={ 14 }
                    fill={ value > CUT_OFF ? 'white' : 'black' }
                    alignmentBaseline={ 'middle' }
                >
                    {value}% { this.state.dataText[index] }
                </Text>
            ))
        )

        return (
            <View style={{ flexDirection: 'row', height: 300, paddingVertical: 16 }}>
                <BarChart
                    style={{ flex: 1, marginLeft: 0 }}
                    data={data}
                    horizontal={true}
                    svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                    contentInset={{ top: 10, bottom: 10 }}
                    spacing={0.2}
                    gridMin={0}
                >
                    <Grid direction={Grid.Direction.VERTICAL}/>
                    <Labels/>
                </BarChart>
            </View>
        )
    }

}

export default BarChartHorizontalWithLabelsTool