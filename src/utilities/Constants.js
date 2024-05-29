import { Enum } from "./Enum"
import Urls from "./Constants/Urls"

const CurrentPage = Enum({ Auth: 'auth', Home: 'home' });

export default {
    CURRENT_PAGE: CurrentPage,
    URLS: Urls
}
