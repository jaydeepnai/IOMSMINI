import UserDetail from '../DataRepository/User/UserDetail';

function CreateUrl(apiName, paramsObj) {
    var url = process.env.REACT_APP_BaseAddress + apiName;
    paramsObj?.map((param) => {
        if (param.value != "" && param.value != undefined) {
            url += "&" + param.name + "=" + param.value;
        }
    })
    return url
}

function GetToken() {
}
const onChange = (e, state, setFunction) => {
    e.persist();
    setFunction({ ...state, [e.target.name]: e.target.value });
}
const pageSizeHandeler = (state, setState, setPaginationFocus, setPaginateNumber, setCurrentPage, value) => {
    setState({ ...state, PageSize: value })
    setPaginationFocus(false);
    setInterval(() => {
        setPaginationFocus(true);
    }, 2000);
    setPaginateNumber(0);
    setCurrentPage(1);
}
const resetInputField = (setState) => {
    setState({ Id: '', Name: '', PhoneEmail: '', UserName: '', cheacked: false });
};
async function fetchUserIfNull(obj) {
    if (Object.keys(obj.user).length === 0 || obj.user == null || obj.user == undefined) {
        var userDetails = await UserDetail({ navigation: obj.navigation, setResult: [{}] })
        return userDetails;
    }
}
async function intializeTitles(dispatch) {
    // var titles = await TitleTerminology()
    // dispatch(AddTitle(titles));
}
function getTitleTerminology(obj) {
    if (Object.keys(obj.Terminology).length !== 0) {
        obj.Terminology.map(terminology => {
            if (terminology.name == obj.moduleName) {
                obj.setTitle(terminology.displayName)
            }
        })
    }
}
function Routing(navigation, Module, Page, ID) {
    navigation.push({
        pathname: `/${Module}/${Page}`,
        state: { ID: ID }
    });
}

export { CreateUrl, getTitleTerminology, GetToken, onChange, pageSizeHandeler, resetInputField, fetchUserIfNull, intializeTitles, Routing }