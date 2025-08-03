
export const checkSession = async () => {
    const token = useCookie("token");
    if (!token.value) {
        // console.log("No token found, session is invalid");
        return false;
    }
    else {
        return true;
    }
}