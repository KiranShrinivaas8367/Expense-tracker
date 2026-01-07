export const useGetUserInfo = () => {
    // console.log(localStorage.getItem("auth"));
    if(!localStorage.getItem("auth"))
        return {userID:null, name:null, profilePhoto:null, isAuth:false};
    
    const {userID, name, profilePhoto, isAuth} = JSON.parse(
        localStorage.getItem("auth"));
    return {userID,name,profilePhoto, isAuth}
}