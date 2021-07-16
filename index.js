import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import Providers from './navigation';

AppRegistry.registerComponent(appName, () => Providers);