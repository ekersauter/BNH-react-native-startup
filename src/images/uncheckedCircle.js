import 'react';
import Svg,{
    Circle,
} from 'react-native-svg';

class uncheckedCircle extends Component {
    render() {
        return (
            <Svg
                height="100"
                width="100"
            >
                <Circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="blue"
                    strokeWidth="2.5"
                    fill="white"
                />
            </Svg>
        );
    }
}