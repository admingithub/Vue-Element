const user_GetUserList="/api/user/GetUserList"
const user_GetUserById="/api/user/GetUserById"
const user_UpdateUser="/api/user/UpdateUser"
const user_DeleteUserById="/api/user/DeleteUserById"


//cookie id
const tokenId="vue-Template"

//axios.default.baseURI=ApiUrl;
export default{
	tokenId,
	user:{
		GetUserList:user_GetUserList,
		GetUserById:user_GetUserById,
		UpdateUser:user_UpdateUser,
		DeleteUserById:user_DeleteUserById
	}
}