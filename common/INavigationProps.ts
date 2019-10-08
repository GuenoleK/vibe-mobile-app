import { NavigationStackProp } from "react-navigation-stack";
import { NavigationRoute } from "react-navigation";
import { NavigationParams } from "react-navigation";

export interface INavigationProps {
    navigation: NavigationStackProp<NavigationRoute<NavigationParams>, any>
}